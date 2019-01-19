import React, { Component } from "react";
import { fetchContent, descriptionToComponent } from "../utils"
import "./styles.css";

import { CONTENT_SERVER_URL, CONTENT_MARGIN } from "../settings"

class BaseNameDescListing extends Component {

	state = {
		data: []
	}

	componentDidMount() {
		fetchContent(this.props.contentUrl, res => {
			const data = res.data
			this.setState({data})
		})
  };

	createRow = (d, i) => {
		const name = d["name"]
		return (
			<tr key={i}>
				<td key="name" className="ListNameContent"><a name={name}>{name}</a></td>
				<td key="desc" className="ListDescContent">{descriptionToComponent(d["description"])}</td>
			</tr>
		)
	}
		
	render() {

		const { data } = this.state

		return (
			<div className="divPaneList"
			     style={{width: "100%", margin: CONTENT_MARGIN}}>
				<h2 className="underline">{this.props.header}</h2>
				<table className="ListContent" style={{width: "100%"}}>
					<tbody>
						<tr key="hdrRow">
							<th key="hdrName" className="ListNameHdrContent">
								Name
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

export default BaseNameDescListing;
