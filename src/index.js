import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import Popup from "react-popup";
import { SIDE_WIDTH } from "./settings";

window.globals = {
  marginLeft: SIDE_WIDTH
};

Popup.registerPlugin("popover", function(header, content, target) {
  this.create({
    content: (
      <div>
        <h4>{header}</h4>
        {content}
      </div>
    ),
    className: "popover",
    noOverlay: true,
    position: function(box) {
      box.style.width = Math.max(header.length * 20, 300) + "px";
      let bodyRect = document.body.getBoundingClientRect();
      let btnRect = target.getBoundingClientRect();
      let btnOffsetLeft = btnRect.left - bodyRect.left;

      let scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      let btnOffsetTop = btnRect.top - bodyRect.top;

      if (btnRect.top < 250 || btnRect.top < box.offsetHeight) {
        box.style.top = btnOffsetTop + 20 - scroll + "px";
      } else {
        box.style.top = btnOffsetTop - box.offsetHeight - 10 - scroll + "px";
      }
      if (bodyRect.width - btnRect.right < box.offsetWidth) {
        box.style.left =
          btnOffsetLeft + target.offsetWidth - box.offsetWidth + "px";
      } else if (btnRect.left - window.globals.marginLeft < 100) {
        box.style.left = btnOffsetLeft + "px";
      } else {
        box.style.left =
          btnOffsetLeft + target.offsetWidth / 2 - box.offsetWidth / 2 + "px";
      }

      box.style.margin = 0;
      box.style.opacity = 1;
    }
  });
});

ReactDOM.render(
  <App ref={elem => (window.reactRoot = elem)} />,
  document.getElementById("root")
);
