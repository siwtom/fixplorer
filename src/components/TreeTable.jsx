import React, { Component } from "react";
import { descriptionToComponent, handleSpecialLinkClicked } from "../utils"
import "./tbstyle.css";

// lazy coding, these globals
let MAX_DEPTH = 0;
let ELMNT_WIDTH = 0;

function tbStyle(level = 0, disp = "") {

	/*
	 * Explanation of the following calculations:
	 *
	 * Input variables:
	 * p: padding size in px
	 * min_b_pct: minimum percent of T reserved for b
	 * i_pct = percentage of T per level of indentation
	 * c_pct = percentage of R for c
	 * d_pct = percentage of R for d
	 * 
	 * Output variables:
	 * a: indentation column width in px
	 * b: code column width in px
	 * c: name column width in px
	 * d: req column width in px
	 * e: comment column width in px
	 * T: total width of the element (working area)
	 * MAX_DEPTH: maximum depth of recursion in the current data
	 * L: left side width in px, consists of paddings and a + b
	 * R: right side width in px, consists of paddings and c + d + e
	 *
	 * Rounding is used to prevent one pixel discrepancies.
	 *
	 * Paddings marked with '[' and ']'.
	 *
	 * [a][b]  [c][d][e]
	 *  \_L_/   \__R__/
	 *
	 */

  const T = ELMNT_WIDTH;

  const p = 5;
  const min_b_pct = 0.2;
  const i_pct = 0.02;
  const c_pct = 0.28;
  // const d_pct = 0.06;

  // Rounding is necessary to prevent one pixel discrepancies on width calculations.
  const L = Math.round((min_b_pct + i_pct * MAX_DEPTH) * T - 4 * p);
  const R = Math.round(T - L);
  const c = R * c_pct;
  // const d = R * d_pct;
  const d = 50;
  const e = R - c - d - 6 * p;
  const a = Math.round(i_pct * level * T);
  const b = Math.round(L - a - 4 * p);

	console.log("indent:", a)
  const tbsize = {
    width: T.toString().concat("px"),
    padding: p.toString().concat("px"),
    /* marginLeft: (m / 2).toString().concat("px"),
    marginRight: (m / 2).toString().concat("px"), */
    display: disp
  };
  const colindt = {
    width: a.toString().concat("px"),
    padding: p.toString().concat("px"),
		display: a === 0 ? "none" : "table-cell"
  };
  const coltag = {
    //width: "100px"
    width: b.toString().concat("px"),
    // When the width of colindt is 0 it will not be rendered.
    // That messes up the width calculations for other cells.
    // To compensate for the loss of width in L we need to double the padding on coltag.
    paddingLeft: level === 0 ? p * 2 : p,
    paddingRight: level === 0 ? p * 2 : p
  };
  const colfield = {
    width: c.toString().concat("px"),
    padding: p.toString().concat("px")
  };
  const colreq = {
    width: d.toString().concat("px"),
    padding: p.toString().concat("px")
  };
  const colcomt = {
    width: e.toString().concat("px"),
    padding: p.toString().concat("px")
  };

  const stylist = [tbsize, colindt, coltag, colfield, colreq, colcomt];
  /* console.log("data: ", level, L, a, b, a+b, stylist, p); */

  return stylist;
}

class ComponentField extends Component {
  state = {
    expanded: false
  };

  handleToggle = ev => {
    const expanded = !this.state.expanded;
    this.setState({ expanded });
  };

  render() {
    let {
      code,
      name,
      req,
      comments,
      children,
      level,
      createTable
    } = this.props;
    const sty = tbStyle(level);
    return (
      <div>
        <table style={sty[0]} className="BodyTable" onClick={this.handleToggle}>
          <tbody>
            <tr className="TreeTableHover">
              <td style={sty[1]} className="MsgIdtContent" />
              <td style={sty[2]} className="MsgTagCompContent">
                {this.state.expanded ? "[-] " + code : "[+] " + code}
              </td>
              <td style={sty[3]} className="MsgFldCompContent">
                {name}
              </td>
              <td style={sty[4]} className="MsgRqdCompContent">
                {req ? (
                  <img
                    src={require("../img/y_inv.png")}
                    width={20}
                    height={20}
                    mode={"fit"}
                    alt="Y"
                  />
                ) : (
                  ""
                )}
              </td>
              <td style={sty[5]} className="MsgCmtCompContent">
                {comments ? comments : "-"}
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ display: this.state.expanded ? "inline" : "none" }}>
          {children.map((x, i, d) => createTable(x, i, d, level + 1))}
        </div>
      </div>
    );
  }
}

class RepeatingField extends Component {

  render() {
    let {
      code,
      name,
      req,
      comments,
      children,
      level,
      url,
      createTable,
    } = this.props;
    const sty = tbStyle(level);
    return (
      <div>
        <table
          style={sty[0]}
          className="BodyCompTable"
          onClick={x => { handleSpecialLinkClicked(url) }} >
          <tbody>
            <tr className="TreeTableHover">
              <td style={sty[1]} className="MsgIdtContent" />
              <td style={sty[2]} className="MsgTagReptContent">
                {code}
              </td>
              <td style={sty[3]} className="MsgFldReptContent">
                {name}
              </td>
              <td style={sty[4]} className="MsgRqdReptContent">
                {req ? (
                  <img
                    src={require("../img/y.png")}
                    width={20}
                    height={20}
                    mode={"fit"}
                    alt="Y"
                  />
                ) : (
                  ""
                )}
              </td>
              <td style={sty[5]} className="MsgCmtReptContent">
                {comments ? comments : "-"}
              </td>
            </tr>
          </tbody>
        </table>
        {children.map((x, i, d) => createTable(x, i, d, level + 1))}
      </div>
    );
  }
}

class Field extends Component {

  render() {
    let {
      code,
      name,
      req,
      comments,
      level,
      url,
      tbstyle,
    } = this.props;
    const sty = tbStyle(level);
    return (
      <div>
        <table
          style={sty[0]}
          className={tbstyle}
          onClick={x => { handleSpecialLinkClicked(url) }}
        >
          <tbody>
            <tr className="TreeTableHover">
              <td style={sty[1]} className="MsgIdtContent" />
              <td style={sty[2]} className="MsgTagContent">
                {code}
              </td>
              <td style={sty[3]} className="MsgFldContent">
                {name}
              </td>
              <td style={sty[4]} className="MsgRqdContent">
                {req ? (
                  <img
                    src={require("../img/y.png")}
                    width={20}
                    height={20}
                    mode={"fit"}
                    alt="Y"
                  />
                ) : (
                  ""
                )}
              </td>
              <td style={sty[5]} className="MsgCmtContent">
                {comments ? comments : "-"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function countRecrLv(data, lv = 0) {
  MAX_DEPTH = lv;
  data.forEach(element => {
    if (element.hasOwnProperty("fields")) {
      MAX_DEPTH = Math.max(MAX_DEPTH, countRecrLv(element["fields"], lv + 1));
    }
  });
  return MAX_DEPTH;
}

class TreeTable extends Component {

  createTable = (x, i, d, l = 0) => {
    const comment = descriptionToComponent(x["comment"]);
    if (x.hasOwnProperty("fields")) {
      if (x["type"] === "RepeatingGroup") {
        let code = "Repeating Group ".concat(x["code"]);
        return (
          <RepeatingField
            key={i}
            level={l}
            code={code}
            name={x["name"]}
            req={x["required"]}
            comments={comment}
            url={x["url"]}
            createTable={this.createTable}
          >
            {x["fields"]}
          </RepeatingField>
        );
      }
      return (
        <ComponentField
          key={i}
          level={l}
          code="Component"
          name={x["name"]}
          req={x["required"]}
          comments={comment}
          createTable={this.createTable}
        >
          {x["fields"]}
        </ComponentField>
      );
    } else {
      if (d.length !== i + 1 && l > 0) {
        return (
          <Field
            key={i}
            level={l}
            code={x["code"]}
            name={x["name"]}
            req={x["required"]}
            comments={comment}
            tbstyle="BodyCompTable"
            bgstyle="ReptBody"
            url={x["url"]}
          />
        );
      } else if (d.length === i + 1 && l > 0) {
        return (
          <Field
            key={i}
            level={l}
            code={x["code"]}
            name={x["name"]}
            req={x["required"]}
            comments={comment}
            tbstyle="BodyLastCompTable"
            bgstyle="ReptBody"
            url={x["url"]}
          />
        );
      } else {
        return (
          <Field
            key={i}
            level={l}
            code={x["code"]}
            name={x["name"]}
            req={x["required"]}
            comments={comment}
            tbstyle="BodyTable"
            url={x["url"]}
          />
        );
      }
    }
  };

  render() {
    const {
      mainPaneFields,
      elmntWidth,
    } = this.props;
    ELMNT_WIDTH = elmntWidth;
    
    MAX_DEPTH = mainPaneFields.length === 0 ? 0 : countRecrLv(mainPaneFields);
    const sty = mainPaneFields.length === 0 ? tbStyle(0, "none") : tbStyle(0);

    return (
      <div ref={this.refCallback}>
        <table style={sty[0]} className="HeaderTable">
          <tbody>
            <tr className="hover">
              <th style={sty[1]} className="MsgIdtHdrContent" />
              <th style={sty[2]} className="MsgTagHdrContent">
                Code
              </th>
              <th style={sty[3]} className="MsgFldHdrContent">
                Name
              </th>
              <th style={sty[4]} className="MsgRqdHdrContent">
                Req
              </th>
              <th style={sty[5]} className="MsgCmtHdrContent">
                Comments
              </th>
            </tr>
          </tbody>
        </table>
        {mainPaneFields.map(this.createTable)}
      </div>
    );
  }
}

export default TreeTable;
