import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, LogOut, Package, Shield, CreditCard, ChevronRight } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Route guard
  useEffect(() => {
    if (!user) navigate('/login');
    window.scrollTo(0, 0);
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '80px', background: 'var(--bg-color)' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        {/* Header Block */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: 700, color: '#fff' }}>{user.initials}</span>
          </motion.div>
          <div>
            <h1 className="gradient-text" style={{ fontSize: '2.5rem', margin: 0, lineHeight: 1.2 }}>{user.name}</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Premium Member • {user.email}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)', gap: '40px', alignItems: 'start' }}>
          
          {/* Sidebar Menu */}
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button className="btn-secondary w-full" style={{ justifyContent: 'flex-start', background: 'rgba(255,255,255,0.05)' }}><User size={18} /> Account Details</button>
              <button className="btn-secondary w-full" style={{ justifyContent: 'flex-start', border: 'none' }}><Package size={18} /> Order History</button>
              <button className="btn-secondary w-full" style={{ justifyContent: 'flex-start', border: 'none' }}><CreditCard size={18} /> Payment Methods</button>
              <button className="btn-secondary w-full" style={{ justifyContent: 'flex-start', border: 'none' }}><Shield size={18} /> Security & Privacy</button>
              
              <div style={{ height: '1px', background: 'var(--border-color)', margin: '16px 0' }}></div>
              
              <button onClick={handleLogout} className="btn-secondary w-full" style={{ justifyContent: 'flex-start', border: 'none', color: '#ef4444' }}>
                <LogOut size={18} /> Sign Out securely
              </button>
            </div>
          </motion.div>

          {/* Main Dashboard Panel */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            <div className="glass-panel" style={{ padding: '32px' }}>
              <h3 style={{ marginBottom: '24px' }}>Personal Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>Full Name</label>
                  <p style={{ fontWeight: 500 }}>{user.name}</p>
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>Email Address</label>
                  <p style={{ fontWeight: 500 }}>{user.email}</p>
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>Phone Number</label>
                  <p style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Not provided</p>
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>Password</label>
                  <p style={{ fontWeight: 500 }}>{'•'.repeat(user.passwordLength || 8)}</p>
                </div>
              </div>
              <button className="btn-secondary mt-5">Edit Profile Information</button>
            </div>

            <div className="glass-panel" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ margin: 0 }}>Recent Orders</h3>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', cursor: 'pointer' }}>View All <ChevronRight size={16} style={{display:'inline', verticalAlign:'middle'}}/></span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '32px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
                   <p style={{ color: 'var(--text-secondary)', margin: 0 }}>You haven't placed any orders yet.</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
