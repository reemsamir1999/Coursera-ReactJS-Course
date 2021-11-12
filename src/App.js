import './App.css';
import React from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();



export default class App extends React.Component{

  render(){
  return<Provider store={store}>
  <BrowserRouter>
    <div className="App">
      <Main />
    </div>
  </BrowserRouter>
</Provider>
}}

