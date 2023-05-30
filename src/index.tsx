import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import Pc from "./layout/pc";
import Mobile from './layout/mobile'

var width = document.documentElement.clientWidth

ReactDOM.render(
  <React.StrictMode>
    {width > 500 ?<Pc/> : <Mobile /> }
  </React.StrictMode>,
  document.getElementById("root")
);
