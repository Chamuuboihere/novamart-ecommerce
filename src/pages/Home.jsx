import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { ArrowRight, Zap, Shield, Sparkles, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './Home.css';

const TiltCard = ({ children, className }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={className}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  const { addToCart } = useCart();
  const { requireAuth } = useAuth();

  // Pick some items for the slider
  const sliderProducts = products.slice(0, 5);
  // Pick some items for new arrivals (matching StoreCollections.jsx logic)
  const arrivals = products.slice(-8).reverse().slice(0, 4);

  const categories = [
    { id: 101, name: "Sneakers", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80" },
    { id: 102, name: "Watches", img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80" },
    { id: 103, name: "Audio Gear", img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80" },
    { id: 104, name: "Streetwear", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80" },
  ];

  const handleAddCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    requireAuth(() => addToCart(product));
  };

  return (
    <div className="home-container">
      {/* High-End Dynamic Hero Section */}
      <section className="hero">
        <motion.div className="hero-glow-bg" style={{ y: yBg }}></motion.div>
        
        <div className="container hero-content">
          <div className="hero-grid">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
              className="hero-text-wrapper"
            >
              <span className="badge">Next Generation E-Commerce</span>
              <h1 className="hero-title">Elevate Your <br /><span className="gradient-text">Lifestyle.</span></h1>
              <p className="hero-subtitle">Discover a curated collection of premium gear. Immerse yourself in an industry-leading shopping experience.</p>
              <div className="hero-cta">
                <button className="btn-primary">Shop Collection <ArrowRight size={20} /></button>
                <div className="hero-stats">
                  <div className="stat"><h4>24k+</h4><p>Exclusive Items</p></div>
                  <div className="stat"><h4>4.9/5</h4><p>Global Rating</p></div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="hero-visual"
            >
              <div className="product-showcase-3d">
                <div className="product-background-ring"></div>
                <Link to={`/product/${products[0].id}`}>
                  <TiltCard className="main-product-wrapper">
                    <img src={products[0].img} alt={products[0].name} className="main-product shadow-glow" />
                  </TiltCard>
                </Link>
                {/* Float Cards */}
                <motion.div initial={{ y: 0 }} animate={{ y: [-15, 15, -15] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="floating-card glass-panel fc-1">
                  <Zap size={20} color="var(--accent-2)" />
                  <div className="fc-text"><strong>Ultra Light</strong><span>Aerospace grade</span></div>
                </motion.div>
                <motion.div initial={{ y: 0 }} animate={{ y: [15, -15, 15] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="floating-card glass-panel fc-2">
                  <Sparkles size={20} color="var(--accent-1)" />
                  <div className="fc-text"><strong>Premium</strong><span>Limited Edition</span></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shop Categories */}
      <section className="categories-section container p-section" id="categories">
        <div className="section-header"><h2 className="section-title">Shop by Category</h2><p className="section-desc">Find exactly what you need.</p></div>
        <div className="categories-grid">
          {categories.map((cat, idx) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} className="category-card">
              <Link to={`/category/${cat.name}`} style={{display: 'block', height: '100%'}}>
                <img src={cat.img} alt={cat.name} />
                <div className="cat-overlay"><h3>{cat.name}</h3><span className="shop-link">Explore <ArrowRight size={16}/></span></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured 3D Slider Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header"><h2 className="section-title gradient-text">Trending Collection</h2><p className="section-desc">Swipe to explore our top tier products in 3D coverflow</p></div>
          <Swiper
            effect={'coverflow'} grabCursor={true} centeredSlides={true} slidesPerView={'auto'}
            coverflowEffect={{rotate: 30, stretch: 0, depth: 200, modifier: 1, slideShadows: true}}
            pagination={{ clickable: true }} autoplay={{ delay: 3500, disableOnInteraction: false }} modules={[EffectCoverflow, Pagination, Autoplay]} className="product-swiper"
          >
            {sliderProducts.map(product => (
              <SwiperSlide key={product.id} className="product-slide">
                <Link to={`/product/${product.id}`} style={{display:'block'}}>
                  <div className="product-card glass-panel">
                    <div className="img-container">
                      <img src={product.img} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="price">{product.price}</p>
                      <button className="btn-primary w-full mt-3" onClick={(e) => handleAddCart(e, product)}>Add to Cart</button>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-section container p-section">
        <div className="promo-banner glass-panel">
          <div className="promo-content">
            <span className="badge" style={{marginBottom:'16px'}}>Cyber Week</span>
            <h2>Super Charge Your Style</h2>
            <p>Up to 50% off select high-performance gear. Limited time only.</p>
            <button className="btn-primary" style={{marginTop:'24px'}}>Grab Deals</button>
          </div>
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="arrivals-section container p-section">
        <div className="section-header flex-between mb-40">
          <h2 className="section-title">New Arrivals</h2>
          <Link to="/new-arrivals" className="btn-secondary btn-small" style={{textDecoration:'none'}}>View All</Link>
        </div>
        <div className="arrivals-grid">
          {arrivals.map((item, idx) => (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} className="arrival-card">
              <Link to={`/product/${item.id}`} style={{display:'block', textDecoration:'none', color:'inherit'}}>
                <div className="arrival-img">
                  <img src={item.img} alt={item.name} />
                  <button className="add-to-cart-quick" onClick={(e) => handleAddCart(e, item)}><Plus size={20} /></button>
                </div>
                <div className="arrival-info flex-between mt-3">
                  <h4 style={{fontWeight: 500}}>{item.name}</h4>
                  <p className="price" style={{color: 'var(--text-primary)'}}>{item.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
