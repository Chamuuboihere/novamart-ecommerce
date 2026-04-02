import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Phone, Mail, Box, ShieldCheck, HelpCircle } from 'lucide-react';

const PageWrapper = ({ title, children }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="container" style={{maxWidth: '800px'}}>
        <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '32px', textAlign: 'center' }}>{title}</h1>
        {children}
      </div>
    </div>
  );
};

export const OrderTracking = () => {
  return (
    <PageWrapper title="Track Your Order">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{padding: '40px'}}>
        <p style={{textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '32px'}}>Enter your order number and email address to see your shipping status.</p>
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div className="input-wrapper">
            <Box className="input-icon" size={20} />
            <input type="text" className="input-field with-icon" placeholder="Order ID (e.g. NV-10928)" />
          </div>
          <div className="input-wrapper">
            <Mail className="input-icon" size={20} />
            <input type="email" className="input-field with-icon" placeholder="Billing Email Address" />
          </div>
          <button className="btn-primary w-full" style={{marginTop:'16px'}}>Track Package</button>
        </div>
      </motion.div>
    </PageWrapper>
  );
};

export const Contact = () => {
  return (
    <PageWrapper title="Contact Us">
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px'}}>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="glass-panel" style={{padding: '32px'}}>
          <h3 style={{marginBottom: '24px'}}>Send a Message</h3>
          <form style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <input type="text" className="input-field" placeholder="Full Name" />
            <input type="email" className="input-field" placeholder="Email Address" />
            <textarea className="input-field" placeholder="How can we help?" rows="4" style={{resize:'none'}}></textarea>
            <button className="btn-primary">Send Message</button>
          </form>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
          <div style={{background: 'var(--surface-glass)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-color)', height: '100%'}}>
            <h3 style={{marginBottom: '24px'}}>Contact Information</h3>
            <div style={{display: 'flex', flexDirection:'column', gap:'24px', color: 'var(--text-secondary)'}}>
              <div style={{display:'flex', gap:'16px'}}><MapPin color="var(--accent-1)" /><span>123 NovaMart Ave<br/>Silicon Valley, CA 94000</span></div>
              <div style={{display:'flex', gap:'16px'}}><Phone color="var(--accent-1)" /><span>+1 (800) 123-4567</span></div>
              <div style={{display:'flex', gap:'16px'}}><Mail color="var(--accent-1)" /><span>support@novamart.com</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export const HelpCenter = () => {
  return (
    <PageWrapper title="Help Center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{display:'flex', flexDirection:'column', gap:'16px'}}>
        <div className="search-bar" style={{marginBottom:'24px', width:'100%'}}>
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search for answers..." style={{width:'100%', background:'var(--surface-glass)', padding:'16px 16px 16px 48px', border:'1px solid var(--border-color)', borderRadius:'12px', color:'white'}} />
        </div>
        {[ 
          "How long does shipping take?",
          "Can I modify my order after placement?",
          "Do you ship internationally?",
          "How do I claim my warranty?",
        ].map((q, idx) => (
          <div key={idx} className="glass-panel" style={{padding: '24px', display:'flex', alignItems:'center', gap:'16px', cursor:'pointer'}}>
            <HelpCircle size={24} color="var(--accent-2)" />
            <h4 style={{margin:0}}>{q}</h4>
          </div>
        ))}
      </motion.div>
    </PageWrapper>
  );
};

export const Returns = () => {
  return (
    <PageWrapper title="Returns & Refunds">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel" style={{padding: '40px', lineHeight: '1.8', color:'var(--text-secondary)'}}>
        <ShieldCheck size={48} color="var(--accent-1)" style={{marginBottom:'24px'}} />
        <h3 style={{color:'white', marginBottom:'16px'}}>Our 30-Day Guarantee</h3>
        <p style={{marginBottom:'24px'}}>NovaMart stands behind the quality of our premium products. If you are not completely satisfied with your purchase, you may return the item in its original condition within 30 days of receipt for a full refund or exchange.</p>
        
        <h4 style={{color:'white', marginBottom:'12px'}}>How to Initiate a Return</h4>
        <ol style={{paddingLeft:'24px', marginBottom:'24px'}}>
          <li>Log into your NovaMart account and navigate to Order History.</li>
          <li>Select the item(s) you wish to return and print the provided shipping label.</li>
          <li>Pack the item securely including all original packaging.</li>
          <li>Drop it off at any authorized courier location.</li>
        </ol>

        <p>Refunds will be processed to the original payment method within 5-7 business days of our warehouse receiving the returned item.</p>
      </motion.div>
    </PageWrapper>
  );
};
