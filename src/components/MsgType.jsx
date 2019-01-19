import React, { Component } from "react";
import TreeTable from "./TreeTable";
import "./styles.css";
import { Button } from "react-bootstrap";
import {
	descriptionToComponent,
	fetchContent } from "../utils"
import { CONTENT_SERVER_URL } from "../settings"

class MsgType extends Component {

	state = {
		"header": "",
		"description": "",
		"fields": [],
		"flags": {}
	}

	loadMsgType = (msgType) => {
		fetchContent("/msgtypes/" + msgType, (res) => {
        let state  = { ...this.state };
        const data = res.data;
        let desc = data["description"];
        state.description = data["description"]
          ? descriptionToComponent(desc)
          : "";
        state.header = data["name"] + " < " + data["code"] + " >";
        state.fields = data["fields"] ? data["fields"] : [];
        state.flags.ac = data["ac"];
        state.flags.md = data["md"];
        this.setState(state);
		})
	}

	componentDidMount() {
		this.loadMsgType(this.props.match.params.msgType)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.msgType === this.props.match.params.msgType &&
		    this.state.header) {
			return
		}
		this.loadMsgType(this.props.match.params.msgType)
	}

  createFlag = (fg, name, tooltip) => {
		if (fg === null) {
			return <div/>
		}
    if (fg) {
      return (
        <Button className="btn-flag">
          <span className="tooltiptext">{tooltip}</span>
          {name}
        </Button>
      );
    } else {
      return <Button className="btn-flag disabled">{name}</Button>;
    }
  };

  render() {
		const { msgType } = this.props.match.params
    const { elmntWidth } = this.props;
		const { fields, description, header, flags } = this.state

    const AC = "Used by Accounts and Execution API (AC)";
    const MD = "Used by Market Data API (MD)";
    
    const btAC = flags ? this.createFlag(flags.ac, "AC", AC) : "";
    const btMD = flags ? this.createFlag(flags.md, "MD", MD) : "";

		return (
			<div className="divPane">
				<div>
					<h1>{header}</h1>
				</div>
				<div>
					{btAC}
					{btMD}
				</div>
				<div className="divMainPaneDesc">{description}</div>
				<TreeTable
					mainPaneFields={fields}
					elmntWidth={elmntWidth}
				/>
			</div>
		);
  }
}

export default MsgType;
