import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/appRoutes';
import AppNavbar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
