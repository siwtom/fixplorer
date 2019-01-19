import React, { Component } from "react";
import ActionLink from "./components/ActionLink";
import { Link, Redirect } from "react-router-dom"
import axios from "axios";
import HtmlToReact from "html-to-react";
import Popup from "react-popup";
import { CONTENT_SERVER_URL } from "./settings"

let htmlToReactParser = new HtmlToReact.Parser(React);

export function baseAxiosErrHandler(err) {
	const res = err.response
	console.error(err)
	if (res) {
		alert(res.statusText + " (" + res.status + ")")
	}
}

export function fetchContent(path, callback) {
	axios
		.get(CONTENT_SERVER_URL + path)
		.then(callback).catch(baseAxiosErrHandler)
}

function generatePopup(href, elem) {
	if (!href.startsWith("/")) {
		href = "/" + href
	}
	fetchContent(href, res => {
			const hdrPopup = res.data["name"];
			const descPopup = descriptionToComponent(
				res.data["description"],
				elem
			);
			Popup.plugins().popover(hdrPopup, descPopup, elem)
	})
};

export function handleSpecialLinkClicked(href, elem) {
	// console.log("href", href);
	
	let spl = href ? href.split("/") : "";
	// if (href.startsWith("msgtypes")) {
	//   console.log("generateMainPane");
	//   const msgTypeName = spl[spl.length - 1];
	//   this.loadMsgType(msgTypeName);
	// } 
	if (href.startsWith("fields")) {
		// console.log("generateFieldPane", href);
		const selectedField = spl[spl.length - 1];
		window.reactRoot.setState({ selectedField }, () => {
			window.reactRoot.generateFieldPane();
		});
	} else if (href.startsWith("datatypes")) {
		generatePopup(href, elem);
	} else if (href.startsWith("glossary")) {
		generatePopup(href, elem);
	} else if (href.startsWith("caps")) {
		generatePopup(href, elem);
	} else if (href.startsWith("http")) {
		window.open(href);
	} else {
		console.error("Invalid href:", href);
	}
};

export function descriptionToComponent(data, linkAnchor) {
	let desc = htmlToReactParser.parse(data);
	if (!Array.isArray(desc)) {
		desc = [desc];
	}
	const mapper = x => {
		if (typeof x !== "object") return x;
		if (!x.props || !x.props.children) return x;
		if (x.type === "a") {
			let props = { ...x.props };
			// console.log(x.props)
			let href = props.href
			if (href.startsWith("msgtypes")) {
				return <Link to={"/" + href}>{x.props.children}</Link>
			}
			props.key = href;

			props.onClick = ev => {
				Popup.close();
				if (linkAnchor) {
					handleSpecialLinkClicked(href, linkAnchor)
				} else {
					handleSpecialLinkClicked(href, ev.target)
				}
			};

			return React.createElement(ActionLink, props, x.props.children);
		}
		let props = { ...x.props }
		if (x.type === "table") {
			props.className = "contentTable"
		}
		if (x.type === "td") {
			props.className = "content-td"
		}
		return React.cloneElement(
			x,
			props,
			React.Children.map(props.children, mapper)
		);
	};

	return desc.map(mapper);
}


