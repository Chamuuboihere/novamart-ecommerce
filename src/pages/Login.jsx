import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    if(email && password) {
      setLoading(true);
      setError('');
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const result = login(email, password);
      
      if (!result.success) {
        setError(result.error);
        setLoading(false);
        return;
      }

      navigate(-1);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-bg-glow"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="auth-card glass-panel"
      >
        <div className="auth-header">
          <h1 className="gradient-text">Welcome Back</h1>
          <p>Access your premium 3D experience</p>
        </div>

        <form className="auth-form" onSubmit={handleAuth}>
          {error && <div style={{background:'rgba(239, 68, 68, 0.1)', color:'#ef4444', padding:'12px', borderRadius:'8px', marginBottom:'16px', fontSize:'0.9rem'}}>{error}</div>}
          
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input type="email" required className="input-field with-icon" placeholder="name@novamart.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input type="password" required className="input-field with-icon" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary w-full mt-2" disabled={loading}>
            {loading ? 'Authenticating...' : <span style={{display:'flex', alignItems:'center', gap:'8px', justifyContent:'center'}}>Sign In <ArrowRight size={20} /></span>}
          </button>
        </form>

        <div className="auth-footer">
          <p>New to NovaMart? <Link to="/signup" className="auth-link">Create an account</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
