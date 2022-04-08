
import './App.css';
import React from 'react';
import Header from './components/header/header';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Compras from './pages/compras/compras';
import Produtos from './pages/produtos/produtos';
import Home from "./pages/home/home"

function App() {
  return (
    <Router>
      <div className='App'>
      <Header/>
      <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/buy" element={<Compras/>}/>
          <Route exact path="/create" element={<Produtos/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
