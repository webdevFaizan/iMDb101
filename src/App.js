import React from 'react';
import './App.scss'; 
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/Home/Home';
import Footer from './components/footer/Footer';
import MovieDetail from './components/MovieDetail/MovieDetail';
import PageNotFound from './components/PageNotFound/PageNotFound';

function App() {
  return (
    <>
      <Router>
        <div className='app'>
            <Header/>
            <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route exact path='/movie/:imdbId' element={<MovieDetail/>}/>
              <Route element={<PageNotFound/>}/>
            </Routes>
            <Footer/>
        </div>
      </Router>
    </>
  );
}

export default App;
