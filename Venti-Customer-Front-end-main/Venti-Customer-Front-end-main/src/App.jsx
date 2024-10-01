/* eslint-disable no-unused-vars */
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
// import ScrollToTop from 'react-scroll-to-top';
import Routing from './Routering';

function App() {
  return (
    <>
      <ToastContainer />
      {/* <ScrollToTop smooth /> */}
      <Router>
        <Routing />
      </Router>
    </>
  )
}

export default App
