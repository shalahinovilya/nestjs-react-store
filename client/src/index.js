import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {UserStore} from "./store/UserStore";
import {ProductStore} from "./store/ProductStore";
import {CartStore} from "./store/CartStore";
import {AdminStore} from './store/AdminStore'


export const Context = createContext(null)


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Context.Provider value = {{
        user: new UserStore(),
        product: new ProductStore(),
        cart: new CartStore(),
        admin: new AdminStore()
    }}>
    <App />
    </Context.Provider>
);

