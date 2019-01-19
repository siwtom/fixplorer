import React, { Component } from "react";
import {
	fetchContent,
	descriptionToComponent,
	handleSpecialLinkClicked
} from "../utils"
import "./styles.css";

import { CONTENT_SERVER_URL, CONTENT_MARGIN } from "../settings"

class FieldsListing extends Component {

	state = {
		data: []
	}

	componentDidMount() {
		fetchContent("/fields", res => {
			const data = res.data
			this.setState({data})
		})
  };

	createRow = (d, i) => {
		return (
			<tr key={i}>
				<td key="name" className="ListNameContent">
					<span onClick={() => {
						handleSpecialLinkClicked("fields/" + d["name"]) }}>
						{d["name"]}
					</span>
				</td>
				<td key="code" className="ListCodeContent">{d["code"]}</td>
				<td key="type" className="ListCodeContent">{d["type"]}</td>
				<td key="desc" className="ListDescContent">{descriptionToComponent(d["description"])}</td>
			</tr>
		)
	}
		
	render() {

		const { data } = this.state

		return (
			<div className="divPaneList"
			     style={{width: "100%", margin: CONTENT_MARGIN}}>
				<h2 className="underline">Fields</h2>
				<table className="ListContent" style={{width: "100%"}}>
					<tbody>
						<tr key="hdrRow">
							<th key="hdrName" className="ListNameHdrContent">
								Name
							</th>
							<th key="hdrCode" className="ListCodeHdrContent">
								Code
							</th>
							<th key="hdrType" className="ListCodeHdrContent">
								Type
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

export default FieldsListing;
