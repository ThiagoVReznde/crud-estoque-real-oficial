// src/layout/MainLayout.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "bg-blue-700 shadow-inner" : "hover:bg-blue-500 transition-colors";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* HEADER MODERNO */}
      <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📦</span>
              <h1 className="text-xl font-bold tracking-tight">EstoqueMaster</h1>
            </div>
            <div className="flex space-x-2">
              <Link to="/" className={`px-4 py-2 rounded-md text-sm font-medium ${isActive('/')}`}>
                📦 Listagem
              </Link>
              <Link to="/cadastrar" className={`px-4 py-2 rounded-md text-sm font-medium ${isActive('/cadastrar')}`}>
                ➕ Novo Produto
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ÁREA DE CONTEÚDO */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          {children}
        </div>
      </main>

      {/* FOOTER DISCRETO */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center">
        <p className="text-slate-500 text-sm italic">
          &copy; 2025 • Sistema Integrado de Gestão de Estoque
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;