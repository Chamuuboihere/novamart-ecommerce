export const products = [
  // --- SNEAKERS ---
  { id: 1, name: "Air Max Pulse", category: "Sneakers", price: "$299", description: "Experience highly responsive cushioning built specifically for performance.", img: "/products/air-max-pulse.png", rating: 4.8, reviews: 124 },
  { id: 11, name: "Midnight Runners", category: "Sneakers", price: "$180", description: "Carbon plated mid-night marathon trainers. Lightest in its class.", img: "/products/midnight-runners.png", rating: 4.8, reviews: 68 },
  { id: 101, name: "Neon Flux", category: "Sneakers", price: "$210", description: "Vibrant neon trainers for the modern streetwear aesthetic.", img: "/products/neon-flux.png", rating: 4.7, reviews: 45 },
  { id: 102, name: "Classic Hightops", category: "Sneakers", price: "$140", description: "Timeless vintage hightop design, upgraded with modern durability.", img: "/products/classic-hightops.png", rating: 4.9, reviews: 520 },
  { id: 103, name: "Phantom Cleats", category: "Sneakers", price: "$320", description: "Professional grade footwear for agile and explosive movement.", img: "/products/phantom-cleats.png", rating: 4.6, reviews: 33 },

  // --- WATCHES ---
  { id: 2, name: "Quantum Smart Watch", category: "Watches", price: "$499", description: "The ultimate standalone smartwatch with aerospace titanium edge.", img: "/products/quantum-smart-watch.png", rating: 4.9, reviews: 341 },
  { id: 14, name: "Classic Mesh Watch", category: "Watches", price: "$195", description: "Minimalist stainless steel mesh watch perfect for everyday settings.", img: "/products/classic-mesh-watch.png", rating: 4.7, reviews: 250 },
  { id: 201, name: "Noir Automatic", category: "Watches", price: "$650", description: "A dark finish automatic mechanical watch crafted for elegance.", img: "/products/noir-automatic.png", rating: 4.9, reviews: 88 },
  { id: 202, name: "Silver Aviator", category: "Watches", price: "$230", description: "Classic aviator chronometer with scratch-resistant sapphire drop.", img: "/products/silver-aviator.png", rating: 4.5, reviews: 105 },
  { id: 203, name: "Diver Pro 300m", category: "Watches", price: "$890", description: "Deep diving luxury sports watch with helium escape valves.", img: "/products/diver-pro-300m.png", rating: 5.0, reviews: 14 },

  // --- AUDIO GEAR ---
  { id: 3, name: "Aero X Headphones", category: "Audio Gear", price: "$349", description: "Studio quality wireless audio with active noise cancellation.", img: "/products/aero-x-headphones.png", rating: 4.7, reviews: 89 },
  { id: 301, name: "BassPods Pro", category: "Audio Gear", price: "$159", description: "True wireless earbuds featuring 3D spatial audio.", img: "/products/basspods-pro.png", rating: 4.8, reviews: 412 },
  { id: 302, name: "Studio Monitor Z", category: "Audio Gear", price: "$499", description: "Over-ear reference headphones for pristine mixing and mastering.", img: "/products/studio-monitor-z.png", rating: 4.9, reviews: 67 },
  { id: 303, name: "Sonic Boom Speaker", category: "Audio Gear", price: "$220", description: "Portable bluetooth speaker that delivers massive punch.", img: "/products/sonic-boom.png", rating: 4.6, reviews: 231 },

  // --- STREETWEAR ---
  { id: 4, name: "Cyberpunk Jacket", category: "Streetwear", price: "$899", description: "Next generation cyberpunk aesthetic wearable. Premium leather.", img: "/products/cyberpunk-jacket.png", rating: 5.0, reviews: 42 },
  { id: 401, name: "Urban Fleece Hoodie", category: "Streetwear", price: "$120", description: "Heavyweight drop-shoulder fleece hoodie for ultimate comfort.", img: "/products/urban-fleece-hoodie.png", rating: 4.8, reviews: 512 },
  { id: 402, name: "Reflective Cargo Pants", category: "Streetwear", price: "$145", description: "Tech-wear infused cargo pants with 3M reflective trims.", img: "https://images.unsplash.com/photo-1517438476312-10d91c4ce756?w=800&q=80", rating: 4.5, reviews: 93 },
  { id: 403, name: "Graphic T-Shirt Box Fit", category: "Streetwear", price: "$65", description: "Premium combed cotton printed with high-density graphics.", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80", rating: 4.7, reviews: 156 },

  // --- ELECTRONICS / MISC ---
  { id: 5, name: "Stellar VR Headset", category: "Electronics", price: "$799", description: "Seamless standalone VR headset. Dive right into metaverse computing.", img: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&q=80", rating: 4.6, reviews: 156 },
  { id: 12, name: "Nova Sunnies", category: "Accessories", price: "$120", description: "Premium polarized aviation sunglasses.", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80", rating: 4.5, reviews: 29 },
  { id: 13, name: "Urban Backpack", category: "Accessories", price: "$150", description: "24L everyday carry with tactical padding and sleeve.", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80", rating: 4.9, reviews: 112 },
];

export const getProductById = (id) => {
  return products.find(p => p.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  // Decode safely in case of URL spacing
  const query = decodeURIComponent(category).toLowerCase();
  return products.filter(p => p.category.toLowerCase() === query);
};
