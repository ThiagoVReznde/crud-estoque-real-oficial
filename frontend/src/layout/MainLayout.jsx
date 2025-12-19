
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const location = useLocation();


  const activeClass = (path) => 
    location.pathname === path 
      ? "bg-blue-700 text-white shadow-md" 
      : "text-blue-100 hover:bg-blue-500 hover:text-white transition-all";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* NAVBAR */}
      <nav className="bg-blue-600 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* LOGO / TÍTULO */}
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">📦 EstoqueMaster</h1>
            </div>

            {/* LINKS DE ACESSO ÀS PÁGINAS */}
            <div className="flex space-x-2">
              <Link to="/" className={`px-4 py-2 rounded-md text-sm font-bold ${activeClass('/')}`}>
                Produtos
              </Link>
              <br/>
              <Link to="/fornecedores" className={`px-4 py-2 rounded-md text-sm font-bold ${activeClass('/fornecedores')}`}>
                Fornecedores
              </Link>
              <br/>
              <Link to="/unidades" className={`px-4 py-2 rounded-md text-sm font-bold ${activeClass('/unidades')}`}>
                Unidades
              </Link>
            </div>

          </div>
        </div>
      </nav>

      {/* ÁREA DE CONTEÚDO DINÂMICO */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[60vh]">
          {children}
        </div>
      </main>

      {/* RODAPÉ */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center">
        <p className="text-slate-500 text-sm">
          &copy; 2025 • Sistema de Gestão de Estoque Oficial
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;