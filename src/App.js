import React from 'react';
import Tabla from './components/Tabla'; // Asegúrate de tener este componente creado

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-primary">Lista de Productos</h1>
      <Tabla />
      <button className="btn btn-success mt-3">Haz clic aquí</button>
    </div>
  );
}

export default App;
