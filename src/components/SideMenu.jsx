import React, { Component } from "react";
import InputField from "./InputField.jsx";
import history from "../history";
import { Route, Link } from "react-router-dom";

class SideMenu extends Component {
  render() {
    const {
      onMsgTypeNameSubmitted,
      onMsgCodeSubmitted,
      onFieldNameSubmitted,
      onFieldCodeSubmitted,
      msgTypes,
      fields
    } = this.props;
    const msgTypeCodes = Object.keys(msgTypes).sort();
    const msgTypeNames = Object.values(msgTypes).sort();
    const fieldCodes = Object.keys(fields).sort();
    const fieldNames = Object.values(fields).sort();

    return (
      <div>
      <div className="divLogo">
        <Link to="/">
          <img
            src={require("../img/webbanner.png")}
            width={300}
            height={150}
            mode={"fit"}
            alt="LOGO"
          />
        </Link>
      </div>
      <div className="divPaneSidemenu">
        <div className="divEmptyLogo"> </div>
        <hr />
        <InputField
          label="MsgType by Name: "
          items={msgTypeNames}
          onSubmitted={onMsgTypeNameSubmitted}
        />
        <InputField
          label="MsgType by Code: "
          items={msgTypeCodes}
          onSubmitted={onMsgCodeSubmitted}
        />
        <InputField
          label="Field by Name: "
          items={fieldNames}
          onSubmitted={onFieldNameSubmitted}
        />
        <InputField
          label="Field by Code: "
          items={fieldCodes}
          onSubmitted={onFieldCodeSubmitted}
        />
        <hr />
        <div className="divEmptyForm"> </div>
        <table className="sidemenu">
          <tbody>
            <tr key={"header"} className="sidemenu-link">
              <td onClick={() => history.push("/header")} className="sidemenu-td">
                Header
              </td>
            </tr>
            <tr key={"caps"} className="sidemenu-link">
              <td onClick={() => history.push("/caps")} className="sidemenu-td">
                Capabilities
              </td>
            </tr>
            <tr key={"datatypes"} className="sidemenu-link">
              <td
                onClick={() => history.push("/datatypes")}
                className="sidemenu-td"
              >
                Datatypes
              </td>
            </tr>
            <tr key={"fields"} className="sidemenu-link">
              <td
                onClick={() => history.push("/fields")}
                className="sidemenu-td"
              >
                Fields
              </td>
            </tr>
            <tr key={"glossary"} className="sidemenu-link">
              <td
                onClick={() => history.push("/glossary")}
                className="sidemenu-td"
              >
                Glossary
              </td>
            </tr>
            <tr key={"msgtypes"} className="sidemenu-link">
              <td
                onClick={() => history.push("/msgtypes")}
                className="sidemenu-td"
              >
                Message Types
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    );
  }
}

export default SideMenu;
