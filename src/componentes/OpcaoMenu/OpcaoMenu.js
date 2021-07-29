import React from "react";

import "./OpcaoMenu.css";

function OpcaoMenu(props) {
  return <p className="item-menu">{props.children}</p>
};

export default OpcaoMenu;
