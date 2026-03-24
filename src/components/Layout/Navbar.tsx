import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, Heart, User, LogOut, Menu } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import { useFilterContext } from '../../context/FilterContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthContext();
  const { updateFilter } = useFilterContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    // Map free-text to a known placeId or pass as-is; navigate home to trigger refetch
    updateFilter('location', searchInput.trim());
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
          <div className="w-8 h-8 bg-primary-600 rounded-xl flex items-center justify-center -rotate-6 shadow-sm">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">SmartStay</span>
        </Link>

        {/* Search Bar - Center */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search destinations..."
              className="w-full h-11 pl-5 pr-12 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm group-hover:shadow-md"
            />
            <button type="submit" className="absolute right-1.5 top-1.5 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Right Nav */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/favorites" className="hidden sm:flex text-gray-500 hover:text-primary-600 transition-colors">
                <Heart className="w-5 h-5" />
              </Link>
              <Link to="/bookings" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Bookings
              </Link>
              
              <div className="relative">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 border-2 border-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-all bg-white text-gray-900 font-medium"
                >
                  <Menu className="w-4 h-4" />
                  <img src={user?.avatar} alt={user?.name} className="w-7 h-7 rounded-full bg-gray-200" />
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 overflow-hidden animate-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-gray-100 mb-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <Link to="/favorites" onClick={() => setIsMenuOpen(false)} className="sm:hidden flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Heart className="w-4 h-4 text-gray-400" /> Favorites
                    </Link>
                    <Link to="/bookings" onClick={() => setIsMenuOpen(false)} className="sm:hidden flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <User className="w-4 h-4 text-gray-400" /> My Bookings
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left">
                      <LogOut className="w-4 h-4" /> Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link 
              to="/login"
              className="px-5 py-2.5 text-sm font-bold text-white bg-gray-900 hover:bg-gray-700 rounded-full transition-all shadow-sm hover:shadow-md"
            >
              Sign In
            </Link>
          )}
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
