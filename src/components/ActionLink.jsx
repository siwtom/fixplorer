import React, { Component } from "react";

class ActionLink extends Component {

  handleClick = ev => {
    //console.log("Prev Default", ev.preventDefault);
    ev.preventDefault();
    this.props.onClick(ev);
  };
  render() {
    const {href, children} = this.props
    return (
      <a href={href || "#"} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}

export default ActionLink;
