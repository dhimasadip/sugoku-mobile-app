import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import App from './mobile'

export default () => {
 
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}