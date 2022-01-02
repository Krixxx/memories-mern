import React from 'react';
import { Container } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  return (
    <Router>
      <Container maxWidth='xl'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to='/posts' />} />
          <Route path='/posts' exact element={<Home />} />
          <Route path='/posts/search' exact element={<Home />} />
          <Route path='/posts/:id' exact element={<PostDetails />} />
          <Route path='/auth' exact element={<Auth />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
