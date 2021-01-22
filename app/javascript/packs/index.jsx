import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from '../serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../main_redux'
import thunk from 'redux-thunk'
import App from '../App'

let store = createStore(reducer, applyMiddleware(thunk))

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store ={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})

serviceWorker.unregister();

