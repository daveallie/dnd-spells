import React from "react"
import { Switch, Route } from "react-router-dom"

import { history } from "../store"
import Spells from "./Spells"

const Router = () => (
  <Switch>
    <Route exact path="/" component={ Spells } />
  </Switch>
)

const Main = () => (
  <main>
    <Router history={history} />
  </main>
)

export default Main
