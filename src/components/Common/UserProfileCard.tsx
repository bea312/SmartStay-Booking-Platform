import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Calendar, Heart } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';

const UserProfileCard: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthContext();

  if (!isAuthenticated || !user) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
        <p className="text-gray-500 mb-4 text-sm">Sign in to manage your bookings and favorites.</p>
        <Link
          to="/login"
          className="inline-block px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center gap-4 mb-5">
        <img
          src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
          alt={user.name}
          className="w-14 h-14 rounded-full border-2 border-primary-100 shadow-sm"
        />
        <div className="min-w-0">
          <p className="font-bold text-gray-900 truncate">{user.name}</p>
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
        </div>
      </div>

      <div className="space-y-2">
        <Link
          to="/bookings"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors"
        >
          <Calendar className="w-4 h-4 text-gray-400" />
          My Trips
        </Link>
        <Link
          to="/favorites"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors"
        >
          <Heart className="w-4 h-4 text-gray-400" />
          Saved Properties
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-red-50 text-sm font-medium text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;
