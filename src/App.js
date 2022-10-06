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
            <div className="container">
              <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='/movie/:imdbID' element={<MovieDetail/>}/>
                <Route path='*' element={<PageNotFound/>}/>
                {/* This is the wild card route, when a route is being accessed that does not consist of the route mentioned here, this page must be rendered. */}
              </Routes>
            </div>
            <Footer/>
        </div>
      </Router>
    </>
  );
}

export default App;
