import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import { fetchContent } from "../utils"

class Welcome extends Component {

	state = {
		dataLastModTime: ""
	}

	componentDidMount() {
		fetchContent("/data_last_mod_time", (res) => {
			const dataLastModTime = res.data
			this.setState({dataLastModTime})
		})
	}

	render() {
		return (
			<div className="divPane">
				<div className="welcomeTitle">
					<h1 className="welcomeHeader"><b>Fixplorer&#8480;</b> FIX Dictionary</h1>
					<p className="dataLastModTime">
						Data last modified: {this.state.dataLastModTime}
					</p>
				</div>
				<p>
					Fixplorer contains all the information and relationships of different ZMAPI fields, message types, components, capabilities and so on in an easily explorable interactive format. Fixplorer is comprehensive and should cover the whole ZMAPI specification.
				</p>
				<p>
					To get started, please open the menu on the left side of the window.
				</p>
				<p>
					For bug reports, feedback or missing data please send us <a href="mailto:fixplorer@zmapi.org">email</a>. Alternatively you can discuss in our irc channel <a href="http://webchat.freenode.net/?channels=zmapi">#zmapi @ freenode.net</a>.
				</p>
			</div>
		)
	}
}

export default Welcome;
