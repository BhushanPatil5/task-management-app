// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import {store, persistedStore} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate persistor={persistedStore}>
         <App />
      </PersistGate>
    </React.StrictMode>
  </Provider>
);