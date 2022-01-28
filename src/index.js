import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { compose, createStore } from "redux"
import App from "./App"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import rootReducer from "./store/reducers"

export const store = createStore(
  rootReducer,
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (noop) => noop)
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

reportWebVitals()
