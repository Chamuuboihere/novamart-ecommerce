import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    if(email && password && name) {
      setLoading(true);
      setError('');

      if (password.length < 8) {
        setError('Password must be at least 8 characters long for security purposes.');
        setLoading(false);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 800));

      const result = registerUser({ 
        email, 
        name, 
        password,
        initials: name.charAt(0).toUpperCase() 
      });

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
      <div className="auth-bg-glow alt-glow"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="auth-card glass-panel"
      >
        <div className="auth-header">
          <h1 className="gradient-text">Join NovaMart</h1>
          <p>Create your account for exclusive access</p>
        </div>

        <form className="auth-form" onSubmit={handleAuth}>
          {error && <div style={{background:'rgba(239, 68, 68, 0.1)', color:'#ef4444', padding:'12px', borderRadius:'8px', marginBottom:'16px', fontSize:'0.9rem'}}>{error}</div>}

          <div className="input-group">
            <label className="input-label">Full Name</label>
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input type="text" required className="input-field with-icon" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
            </div>
          </div>

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
          </div>

          <button type="submit" className="btn-primary w-full mt-2" disabled={loading}>
            {loading ? 'Creating Account...' : <span style={{display:'flex', alignItems:'center', gap:'8px', justifyContent:'center'}}>Create Account <ArrowRight size={20} /></span>}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login" className="auth-link">Sign In</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
