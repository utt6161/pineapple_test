import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import "./styles/App.css"
import {Provider} from "react-redux";
import {store} from "./store/store";

ReactDom.render(
    <Provider store={store}>
    <App />
    </Provider>
    , document.getElementById('app'))
