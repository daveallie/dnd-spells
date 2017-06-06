import React from "react"
import { Provider } from "react-redux"

import Header from "./Header"
import Main from "./Main"
import store from "../store"

const App = () => (
  <Provider store={store}>
    <div>
      <Header />
      <Main />
    </div>
  </Provider>
)

export default App
