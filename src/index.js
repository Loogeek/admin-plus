import { render } from 'react-dom'
import { BroserRouter, Route, Switch } from 'react-router-dom'
import routes from './routes'
import 'antd/dist/antd.css'
import './assets/scss/common.scss'

const rootElement = document.getElementById('app')

render(
    <BroserRouter>
        <Switch>
            {
                
            }
        </Switch>
    </BroserRouter>,
    rootElement
)