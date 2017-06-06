import React from "react"
import NavBar from "../components/NavBar/index"
import { fromJS } from "immutable"

const navItems = fromJS([
  {uuid: 1, text: "Spells", url: "/"}
])

const Header = () => (
  <header>
    <nav>
      <NavBar items={ navItems } />
    </nav>
  </header>
)

export default Header
