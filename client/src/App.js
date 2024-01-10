import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Switch, Route, Routes, Redirect } from 'react-router-dom';
import Cpform from './components/Cpform'
import ViewQuestion from './components/ViewQuestion'
import AddQuestions from './components/AddQuestions'
import Auth  from './components/Auth/Auth';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
         
          <Route exact path='/add-question' Component={AddQuestions} />
          <Route exact path='/question' Component={ViewQuestion} />
          <Route exact path='/Auth' Component={Auth} />
          <Route exact path='/' Component={Cpform} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
