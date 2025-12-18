// src/layout/MainLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css'; // Seus estilos globais

const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <nav className="navbar">
        <h2>Gestão de Estoque</h2>
        <ul>
          <li>
            <Link to="/">Listagem</Link>
          </li>
          <li>
            <Link to="/cadastrar">Novo Produto</Link>
          </li>
        </ul>
      </nav>

      <main className="content">{children}</main>

      <footer className="footer">
        <p>&copy; 2024 Sistema de Estoque</p>
      </footer>
    </div>
  );
};

export default MainLayout;
