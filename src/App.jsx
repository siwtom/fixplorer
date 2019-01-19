import React, { Component, Fragment } from "react";
import SplitPane from "react-split-pane";
import SideMenu from "./components/SideMenu";
import FieldPane from "./components/FieldPane";
import Welcome from "./components/Welcome";
import MsgType from "./components/MsgType";
import BaseNameDescListing from "./components/BaseNameDescListing"
import MsgTypesListing from "./components/MsgTypesListing"
import FieldsListing from "./components/FieldsListing"
import MessageHeader from "./components/MessageHeader"
import Popup from "react-popup";
import ActionLink from "./components/ActionLink";
import { handleSpecialLinkClicked, fetchContent } from "./utils";
import {
	Router,
	Route,
	Link,
} from "react-router-dom"
import history from "./history"
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "./components/popupstyle.css";
import { slide as BurgerMenu } from "react-burger-menu"

// import { slide as BurgerMenu } from "react-burger-menu"
// Can this be imported in a nicer way?
// push does not work with react-split-pane ...
// const BurgerMenu = require("react-burger-menu").default.slide.default


import {
	CONTENT_SERVER_URL,
	SIDE_MENU_WIDTH,
	SIDE_WIDTH,
	CONTENT_MARGIN,
	SCROLLBAR_WIDTH
} from "./settings"


class App extends Component {
  state = {
    selectedField: null,
		fieldPaneData: {},
    hdrPopup: "",
    descPopup: "",
    msgTypes: {},
    fields: {},
    documentWidth: 0,
		marginLeft: SIDE_WIDTH
  };

  updateDimensions = ev => {
    const documentWidth = ev.target.document.body.getBoundingClientRect().width;
    this.setState({ documentWidth });
  }

  componentDidMount() {
    window.addEventListener("resize",this.updateDimensions);

    const documentWidth = document.body.getBoundingClientRect().width;
    this.setState({ documentWidth });

		fetchContent("/collections/msgcode_to_msgtype", (res) => {
        const msgTypes = res.data;
        this.setState({ msgTypes });
		})
		fetchContent("/collections/code_to_field", (res) => {
        const fields = res.data;
        this.setState({ fields });
		})

  }

  handleMsgTypeNameSubmitted = (ev, msgTypeName) => {
		history.push("/msgtypes/" + msgTypeName)
    ev.preventDefault();
  };

  handleMsgCodeSubmitted = (ev, msgCode) => {
    if (Object.keys(this.state.msgTypes).includes(msgCode)) {
      const msgTypeName = this.state.msgTypes[msgCode];
			history.push("/msgtypes/" + msgTypeName)
    }
    ev.preventDefault();
  };

  handleFieldNameSubmitted = (ev, selectedField) => {
    this.setState({ selectedField }, () => {
      this.generateFieldPane();
    });
    ev.preventDefault();
  };

  handleFieldCodeSubmitted = (ev, code) => {
    if (Object.keys(this.state.fields).includes(code)) {
      const selectedField = this.state.fields[code];
      this.setState({ selectedField }, () => {
        this.generateFieldPane();
      });
      ev.preventDefault();
    }
  };

	handleBurgerMenuToggled = ({isOpen}) => {

		const main = document.getElementById("Main")

		const marginLeft = isOpen ? SIDE_MENU_WIDTH : SIDE_WIDTH
		window.globals.marginLeft = marginLeft
		this.setState({marginLeft})
	
		// const marginLeftMin = SIDE_WIDTH
		// const marginLeftMax = SIDE_MENU_WIDTH

		// const interval = 500
		// // animationDuration is less than css animation duration because of
		// // the inherent laggy behaviour of setState.
		// const animationDuration = 500
		// let timeAccum = 0
		// console.log("starting timer ...")
		// const intervalId = setInterval(() => {
		// 	timeAccum += interval
		// 	console.log(timeAccum)
		// 	const pct = Math.min(timeAccum / animationDuration, 1)
		// 	const marginLeftDiff = (marginLeftMax - marginLeftMin) * pct
		// 	const marginLeft = isOpen ? 
		// 		marginLeftMin + marginLeftDiff : marginLeftMax - marginLeftDiff
		// 	this.setState({marginLeft})

		// 	if (timeAccum >= animationDuration) {
		// 		clearInterval(intervalId)
		// 	}
		// }, interval)
	};

  generateFieldPane = () => {
    // console.log("generateFieldPane: " + this.state.selectedField + " ...");
		fetchContent("/fields/" + this.state.selectedField, (res) => {
				let fieldPaneData = {}
				fieldPaneData = res.data
        this.setState({ fieldPaneData });
		})
  };

  render() {

    const style = {
      backgroundColor: "#ffffff"
    };

    const {
      msgTypes,
      fieldPaneData,
      hdrPopup,
      descPopup,
      fields,
      mainPaneData,
      documentWidth,
			marginLeft,
			selectedField,
    } = this.state;

		const elmntWidth = documentWidth - marginLeft - CONTENT_MARGIN * 2

		const teststyle = {
			marginLeft: marginLeft,
		}

    return <Router history={history}>
        <div id="App">
          <Popup className="mm-popup" btnClass="mm-popup__btn" closeBtn={true} closeHtml={null} defaultOk="Ok" defaultCancel="Cancel" wildClasses={false} escToClose={true} />
          <BurgerMenu width={SIDE_MENU_WIDTH} noOverlay={true} pageWrapId="Main" outerContainerId="App" onStateChange={this.handleBurgerMenuToggled} styles={{ bmMenuWrap: { transition: "all 0.2s" } }}>
            <SideMenu onMsgTypeNameSubmitted={this.handleMsgTypeNameSubmitted} onMsgCodeSubmitted={this.handleMsgCodeSubmitted} onFieldNameSubmitted={this.handleFieldNameSubmitted} onFieldCodeSubmitted={this.handleFieldCodeSubmitted} msgTypes={msgTypes} fields={fields} />
          </BurgerMenu>
          <div id="LeftBar" />
          <main id="Main" style={teststyle}>
            <SplitPane
							split="horizontal"
							defaultSize={selectedField !== null ? "50%" : "100%"}
							maxSize={-5}
							widthReduction={marginLeft}
							pane2Style={style}>
              <Fragment>
                <Route exact path="/" component={Welcome} />
                <Route exact path="/header" render={props => <MessageHeader {...props} elmntWidth={elmntWidth} />} />
                <Route exact path="/glossary" render={props => <BaseNameDescListing contentUrl="/glossary" header="Glossary" />} />
                <Route exact path="/datatypes" render={props => <BaseNameDescListing contentUrl="/datatypes" header="Datatypes" />} />
                <Route exact path="/caps" render={props => <BaseNameDescListing contentUrl="/caps" header="Capabilities" />} />
                <Route exact path="/msgtypes" component={MsgTypesListing} />
                <Route exact path="/fields" component={FieldsListing} />
                <Route path="/msgtypes/:msgType" render={props => <MsgType {...props} elmntWidth={elmntWidth} />} />
              </Fragment>
              <FieldPane data={fieldPaneData} elmntWidth={elmntWidth} hdrPopup={hdrPopup} descPopup={descPopup} />
            </SplitPane>
          </main>
        </div>
      </Router>;
  }
}



export default App;
