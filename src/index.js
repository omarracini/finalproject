import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './components/Navbar';
import AuthState from './context/auth/authState';
import './index.css';
import { ServicesApp } from './ServicesApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthState>
      <BrowserRouter>
        <Navbar>
          <ServicesApp />
        </Navbar>
      </BrowserRouter>
    </AuthState>
  </React.StrictMode>
);
