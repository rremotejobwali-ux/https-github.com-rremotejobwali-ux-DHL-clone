import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Globe } from 'lucide-react';
import { Category } from '../types';

const CATEGORIES: Category[] = ['World', 'Politics', 'Business', 'Tech', 'Sports', 'Entertainment', 'Health'];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50 border-b-4 border-red-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-red-600 p-1.5 rounded-sm group-hover:bg-red-700 transition-colors">
                 <Globe className="h-6 w-6 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tighter">GNN</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat} 
                to={`/category/${cat.toLowerCase()}`}
                className="text-sm font-medium hover:text-red-500 transition-colors uppercase"
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search news..."
                className="bg-gray-900 text-white border border-gray-700 rounded-full py-1.5 px-4 pl-10 focus:outline-none focus:border-red-600 w-48 transition-all focus:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 pb-4">
           <form onSubmit={handleSearch} className="px-4 pt-4 pb-2 relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-black text-white border border-gray-700 rounded-md py-2 px-4 pl-10 focus:outline-none focus:border-red-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
               <Search className="absolute left-7 top-1/2 transform translate-y-1 h-4 w-4 text-gray-400" />
            </form>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${cat.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 uppercase"
                >
                  {cat}
                </Link>
              ))}
            </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;