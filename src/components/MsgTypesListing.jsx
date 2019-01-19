import React, { Component } from "react";
import { fetchContent, descriptionToComponent } from "../utils"
import "./styles.css";

import { CONTENT_SERVER_URL, CONTENT_MARGIN } from "../settings"

class MsgTypesListing extends Component {

	state = {
		data: []
	}

	componentDidMount() {
		fetchContent("/msgtypes", res => {
			const data = res.data
			this.setState({data})
		})
  };

	createFlag(b) {
		if (!b) {
			return ""
		}
		return <img
			src={require("../img/y.png")}
			width={20}
			height={20}
			mode={"fit"}
			alt="Y" />
	}

	createRow = (d, i) => {
		return (
			<tr key={i}>
				<td key="name" className="ListNameContent">{d["name"]}</td>
				<td key="code" className="ListCodeContent">{d["code"]}</td>
				<td key="ac" className="ListCodeContent">{this.createFlag(d["ac"])}</td>
				<td key="md" className="ListCodeContent">{this.createFlag(d["md"])}</td>
				<td key="fix" className="ListCodeContent">{this.createFlag(d["fix"])}</td>
				<td key="desc" className="ListDescContent">{descriptionToComponent(d["description"])}</td>
			</tr>
		)
	}
		
	render() {

		const { data } = this.state

		return (
			<div className="divPaneList"
			     style={{width: "100%", margin: CONTENT_MARGIN}}>
				<h2 className="underline">Message Types</h2>
				<table className="ListContent" style={{width: "100%"}}>
					<tbody>
						<tr key="hdrRow">
							<th key="hdrName" className="ListNameHdrContent">
								Name
							</th>
							<th key="hdrCode" className="ListCodeHdrContent">
								Code
							</th>
							<th key="hdrAC" className="ListCodeHdrContent">
								AC
							</th>
							<th key="hdrMD" className="ListCodeHdrContent">
								MD
							</th>
							<th key="hdrFIX" className="ListCodeHdrContent">
								FIX
							</th>
							<th key="hdrDesc" className="ListDescHdrContent">
								Description
							</th>
						</tr>
						{data.map(this.createRow)}
					</tbody>
				</table>
			</div>
		)

	}
}

export default MsgTypesListing;
