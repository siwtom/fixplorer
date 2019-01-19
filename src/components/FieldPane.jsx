import React, { Component } from "react";
import ActionLink from "./ActionLink";
import { Link } from "react-router-dom"
import { descriptionToComponent, handleSpecialLinkClicked } from "../utils"
import _ from "lodash"

class FieldPane extends Component {
  tbStyle = () => {
    const m = 0;
    const p = 5;
    const T = this.props.elmntWidth - 2 * m;
    const v = 0.1 * T;
    let sty = [];

    const tbsize = {
      width: T.toString().concat("px")
    };
    const colval = {
      width: v.toString().concat("px"),
      padding: p.toString().concat("px")
    };
    sty = [tbsize, colval];
    return sty;
  };

	componentDidMount() {
	}

  createRow = (k, v) => {
    const sty = this.tbStyle();
    return (
      <tr key={k}>
        <td style={sty[1]} className="MsgValueContent">
          {k}
        </td>
        <td className="MsgDesContent">{v}</td>
      </tr>
    );
  };

  createTable = values => {
		const { type } = this.props.data;
    const sty = this.tbStyle();
    return (
      <div>
        <table style={sty[0]} className="FieldsContent">
          <tbody>
            <tr>
              <th style={sty[1]} className="MsgValueHdrContent">
                Value
              </th>
              <th className="MsgDesHdrContent">Description</th>
            </tr>
            {Object.keys(values)
							// int keys to numerical order, otherwise lexicographical order
              .sort(type === "int" ? (a, b) => a - b : undefined)
              .map(k => {
                const v = descriptionToComponent(values[k]);
                return this.createRow(k, v);
              })}
          </tbody>
        </table>
      </div>
    );
  };

  createUsedInContent = (v, i, createLink=false) => {
		if (!createLink) {
			return  <p key={i} className="inline">[{v}]</p>
		} else {
			return (
				<p key={i} className="inline">
				  [<Link to={"/msgtypes/" + v}>{v}</Link>]</p>)
		}
  };

  generateViewFieldPane = data => {
		const desc = descriptionToComponent(data["description"])
    return <div>
				<div className="fieldPaneHeader">
					<h4>{data["name"] + " < " + data["code"] + " >"}</h4>
					<p>
						Type: <ActionLink onClick={ev => {
								handleSpecialLinkClicked("datatypes/" + data["type"], ev.target);
							}}>
							{data["type"]}
						</ActionLink>
					</p>
				</div>
        <div className="divMainPaneDesc">
					{desc}
        </div>
        {!data["values"] ? "" : this.createTable(data["values"])}
        <hr />
        <div>
          <p>Used in messages: </p>
          {!data["used_in_msgtypes"] ? "" : Object.values(data["used_in_msgtypes"])
                .sort()
                .map((v, i) => this.createUsedInContent(v, i, true))}
        </div>
        <hr />
        <div>
          <p>Used in components: </p>
          {!data["used_in_components"] ? "" : Object.values(data["used_in_components"])
                .sort()
                .map((v, i) => this.createUsedInContent(v, i, false))}
        </div>
      </div>;
  };


//                 .map(v => {
//                   return this.createUsedInContent(v);
//                 })}

  render() {
    const { data } = this.props;
		console.log(_.isEmpty(data) ? "yes": "no")

    return (
      <div className="divPane">
        {!_.isEmpty(data) ? this.generateViewFieldPane(data) : ""}
      </div>
    );
  }
}

export default FieldPane;
