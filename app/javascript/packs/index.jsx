// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

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

// // ReactDOM.render(
// //   <Provider store ={store}>
// //     <BrowserRouter>
// //     <App />
// //   </BrowserRouter>
// //   </Provider>,
// //   document.getElementById('root')
// // );
