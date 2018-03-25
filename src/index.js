import React from 'react'
import { render } from 'react-dom'
import routes from './routes'
import Nav from './layouts/nav'
import 'antd/dist/antd.css'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
// import './assets/common.sass'

const rootElement = document.getElementById('app')

render(
  <div>
      <Nav />
      <BrowserRouter>
          <Switch>
            {
              routes.map(({ name, path, exact = true, component }) =>(
                <Route path={path} exact={exact} component={component} key={name} />        
              ))
            }
          </Switch>
      </BrowserRouter>
  </div>,
  rootElement
)