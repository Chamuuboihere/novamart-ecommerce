import React, { createContext, useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nova_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  // Helper to interact with the mock DB
  const getDb = () => JSON.parse(localStorage.getItem('nova_users_db') || '[]');
  const setDb = (db) => localStorage.setItem('nova_users_db', JSON.stringify(db));

  const registerUser = (userData) => {
    const db = getDb();
    if (db.find(u => u.email === userData.email)) {
      return { success: false, error: 'Email already registered.' };
    }
    db.push(userData);
    setDb(db);
    
    // Auto login
    const sessionData = { name: userData.name, email: userData.email, initials: userData.initials, passwordLength: userData.password.length };
    setUser(sessionData);
    localStorage.setItem('nova_user', JSON.stringify(sessionData));
    setShowAuthPopup(false);
    return { success: true };
  };

  const login = (email, password) => {
    const db = getDb();
    const existing = db.find(u => u.email === email);
    
    if (!existing) {
      return { success: false, error: 'No account found with that email.' };
    }
    if (existing.password !== password) {
      return { success: false, error: 'Incorrect password.' };
    }

    const sessionData = { name: existing.name, email: existing.email, initials: existing.initials, passwordLength: existing.password.length };
    setUser(sessionData);
    localStorage.setItem('nova_user', JSON.stringify(sessionData));
    setShowAuthPopup(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nova_user');
  };

  const requireAuth = (callback) => {
    if (user) {
      callback();
    } else {
      setShowAuthPopup(true);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, registerUser, logout, requireAuth, showAuthPopup, setShowAuthPopup }}>
      {children}
      <AuthPopupOverlay show={showAuthPopup} onClose={() => setShowAuthPopup(false)} />
    </AuthContext.Provider>
  );
};

const AuthPopupOverlay = ({ show, onClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="auth-modal-wrapper" style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-panel"
            style={{ 
              position: 'relative', maxWidth: '400px', width: '90%', padding: '32px', 
              background: 'var(--surface)', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}
          >
            <button 
              onClick={onClose} 
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <LogIn size={28} color="var(--accent-1)" />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Login Required</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>You need an account to add items to your shopping cart and complete this purchase.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/login" onClick={onClose} style={{ textDecoration: 'none' }}>
                <button className="btn-primary w-full">Sign In to Continue</button>
              </Link>
              <Link to="/signup" onClick={onClose} style={{ textDecoration: 'none' }}>
                <button className="btn-secondary w-full">Create an Account</button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
