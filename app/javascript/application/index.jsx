import React from 'react';
import ReactDOM from 'react-dom';
import App from "./views/App"
import { BrowserRouter } from "react-router-dom"

// Render component with data
document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('AppMount')

  ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), node)
})
