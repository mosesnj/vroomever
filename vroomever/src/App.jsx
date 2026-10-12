import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, MapPin, PlusCircle, Heart, MessageSquare, User, 
  Car, Home, Smartphone, Tv, Armchair, Shirt, Wrench, 
  Briefcase, Sparkles, Filter, ChevronRight, X, Camera, 
  CheckCircle2, ChevronDown, SlidersHorizontal, ShieldCheck, Tag,
  Phone, Send, Package, RefreshCw, AlertCircle, ShoppingBag,
  Disc, Anchor, Truck, Watch, Laptop, HardDrive, Utensils, 
  BedDouble, Scissors, Compass, Clock, Fuel, Gauge, Layers, Grid
} from 'lucide-react';
import './index.css' // <-- Verify this line is present!
const CATEGORIES = [
  { 
    id: 'vehicles',
    name: 'Vehicles', 
    icon: <Car className="w-5 h-5 text-emerald-600" />,
    badgeColor: 'bg-emerald-100 text-emerald-800',
    count: '54,200+',
    subcategories: [
      { id: 'cars', name: 'Cars', icon: <Car className="w-4 h-4 text-emerald-600" />, count: '28,400' },
      { id: 'motorcycles', name: 'Motorcycles & Scooters', icon: <Compass className="w-4 h-4 text-amber-600" />, count: '9,100' },
      { id: 'trucks', name: 'Bus, Trucks & Commercial', icon: <Truck className="w-4 h-4 text-blue-600" />, count: '4,500' },
      { id: 'spares', name: 'Spare Parts & Accessories', icon: <Wrench className="w-4 h-4 text-rose-600" />, count: '8,200' },
      { id: 'tyres', name: 'Tyres & Wheels', icon: <Disc className="w-4 h-4 text-purple-600" />, count: '2,800' },
      { id: 'watercraft', name: 'Boats & Watercraft', icon: <Anchor className="w-4 h-4 text-cyan-600" />, count: '1,200' }
    ],
    brands: ['All Brands', 'Toyota', 'Nissan', 'Subaru', 'Mercedes-Benz', 'BMW', 'Honda', 'Mazda', 'Isuzu', 'Hyundai', 'Yamaha'],
    conditions: ['All Conditions', 'Brand New', 'Foreign Used', 'Locally Used', 'Refurbished']
  },
  { 
    id: 'property',
    name: 'Property', 
    icon: <Home className="w-5 h-5 text-amber-600" />,
    badgeColor: 'bg-amber-100 text-amber-800',
    count: '23,100+',
    subcategories: [
      { id: 'rent', name: 'Apartments for Rent', icon: <Home className="w-4 h-4 text-amber-600" />, count: '11,200' },
      { id: 'sale', name: 'Houses for Sale', icon: <Home className="w-4 h-4 text-emerald-600" />, count: '6,400' },
      { id: 'land', name: 'Land & Plots', icon: <Layers className="w-4 h-4 text-amber-700" />, count: '3,800' },
      { id: 'commercial', name: 'Commercial Property', icon: <Briefcase className="w-4 h-4 text-blue-600" />, count: '1,700' }
    ],
    brands: [],
    conditions: ['All Conditions', 'Newly Built', 'Fairly Used', 'Under Construction']
  },
  { 
    id: 'phones',
    name: 'Phones & Tablets', 
    icon: <Smartphone className="w-5 h-5 text-blue-600" />,
    badgeColor: 'bg-blue-100 text-blue-800',
    count: '98,400+',
    subcategories: [
      { id: 'smartphones', name: 'Smartphones', icon: <Smartphone className="w-4 h-4 text-blue-600" />, count: '62,000' },
      { id: 'smartwatches', name: 'Smartwatches & Bands', icon: <Watch className="w-4 h-4 text-indigo-600" />, count: '12,400' },
      { id: 'tablets', name: 'Tablets', icon: <Laptop className="w-4 h-4 text-teal-600" />, count: '8,100' },
      { id: 'phone-acc', name: 'Accessories & Spare Parts', icon: <HardDrive className="w-4 h-4 text-rose-600" />, count: '15,900' }
    ],
    brands: ['All Brands', 'Apple', 'Samsung', 'Tecno', 'Infinix', 'Xiaomi', 'Oppo', 'Nokia', 'OnePlus'],
    conditions: ['All Conditions', 'Brand New', 'Refurbished', 'Locally Used']
  },
  { 
    id: 'electronics',
    name: 'Electronics & Appliances', 
    icon: <Tv className="w-5 h-5 text-purple-600" />,
    badgeColor: 'bg-purple-100 text-purple-800',
    count: '42,300+',
    subcategories: [
      { id: 'tv-audio', name: 'TV & Audio Systems', icon: <Tv className="w-4 h-4 text-purple-600" />, count: '18,300' },
      { id: 'laptops', name: 'Laptops & Computers', icon: <Laptop className="w-4 h-4 text-blue-600" />, count: '14,100' },
      { id: 'cameras', name: 'Cameras & Drones', icon: <Camera className="w-4 h-4 text-amber-600" />, count: '4,100' },
      { id: 'kitchen-app', name: 'Kitchen Appliances', icon: <Utensils className="w-4 h-4 text-emerald-600" />, count: '5,800' }
    ],
    brands: ['All Brands', 'Sony', 'LG', 'Samsung', 'HP', 'Dell', 'Lenovo', 'Canon', 'Apple'],
    conditions: ['All Conditions', 'Brand New', 'Refurbished', 'Locally Used']
  },
  { 
    id: 'furniture',
    name: 'Home & Furniture', 
    icon: <Armchair className="w-5 h-5 text-rose-600" />,
    badgeColor: 'bg-rose-100 text-rose-800',
    count: '31,000+',
    subcategories: [
      { id: 'living', name: 'Living Room Furniture', icon: <Armchair className="w-4 h-4 text-rose-600" />, count: '12,500' },
      { id: 'bedroom', name: 'Bedroom Furniture', icon: <BedDouble className="w-4 h-4 text-indigo-600" />, count: '9,800' },
      { id: 'office', name: 'Office Furniture', icon: <Briefcase className="w-4 h-4 text-blue-600" />, count: '5,100' },
      { id: 'decor', name: 'Home Decor & Lighting', icon: <Sparkles className="w-4 h-4 text-amber-600" />, count: '3,600' }
    ],
    brands: [],
    conditions: ['All Conditions', 'Brand New', 'Custom Made', 'Used']
  },
  { 
    id: 'fashion',
    name: 'Fashion & Beauty', 
    icon: <Shirt className="w-5 h-5 text-pink-600" />,
    badgeColor: 'bg-pink-100 text-pink-800',
    count: '61,200+',
    subcategories: [
      { id: 'clothing', name: 'Clothing & Wear', icon: <Shirt className="w-4 h-4 text-pink-600" />, count: '29,000' },
      { id: 'shoes', name: 'Shoes & Footwear', icon: <ShoppingBag className="w-4 h-4 text-emerald-600" />, count: '18,500' },
      { id: 'watches-jewelry', name: 'Watches & Jewelry', icon: <Watch className="w-4 h-4 text-amber-600" />, count: '7,300' },
      { id: 'beauty', name: 'Health & Beauty', icon: <Scissors className="w-4 h-4 text-rose-600" />, count: '6,400' }
    ],
    brands: ['All Brands', 'Nike', 'Adidas', 'Zara', 'Gucci', 'Ankara / Kitenge', 'Generic'],
    conditions: ['All Conditions', 'Brand New', 'Thrift / Mitumba']
  },
  { 
    id: 'services',
    name: 'Services & Jobs', 
    icon: <Wrench className="w-5 h-5 text-cyan-600" />,
    badgeColor: 'bg-cyan-100 text-cyan-800',
    count: '18,900+',
    subcategories: [
      { id: 'auto-repair', name: 'Auto Repair & Services', icon: <Wrench className="w-4 h-4 text-cyan-600" />, count: '6,200' },
      { id: 'construction', name: 'Construction & Trade', icon: <Home className="w-4 h-4 text-amber-600" />, count: '4,100' },
      { id: 'it-services', name: 'IT & Software Services', icon: <Laptop className="w-4 h-4 text-blue-600" />, count: '3,900' },
      { id: 'job-openings', name: 'Job Vacancies', icon: <Briefcase className="w-4 h-4 text-emerald-600" />, count: '4,700' }
    ],
    brands: [],
    conditions: ['All Conditions', 'Professional', 'Freelance']
  }
];

const INITIAL_LISTINGS = [
  {
    id: 1,
    title: 'Toyota Prado TX-L 2018 Model - Sunroof, Leather Interior',
    category: 'Vehicles',
    subCategory: 'Cars',
    subCategoryIcon: <Car className="w-3.5 h-3.5 text-emerald-600" />,
    brand: 'Toyota',
    price: 5200000,
    bulkPrice: 4950000,
    minBulkQty: 2,
    location: 'Nairobi, Kilimani',
    condition: 'Foreign Used',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80',
    seller: { id: 's1', name: 'Valley Road Motors', phone: '+254 722 100 200', verified: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
    date: 'Today, 14:20',
    featured: true,
    description: 'Clean KDF register, zero accidents, 2700cc petrol, full service history available at Toyota Kenya.'
  },
  {
    id: 2,
    title: 'Yamaha MT-07 Motorcycle 689cc 2021 Dark Edition',
    category: 'Vehicles',
    subCategory: 'Motorcycles & Scooters',
    subCategoryIcon: <Compass className="w-3.5 h-3.5 text-amber-600" />,
    brand: 'Yamaha',
    price: 850000,
    bulkPrice: null,
    location: 'Mombasa, Nyali',
    condition: 'Foreign Used',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    seller: { id: 's2', name: 'Coast Biker Zone', phone: '+254 711 334 455', verified: true, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
    date: 'Today, 12:05',
    featured: true,
    description: 'Excellent condition, Akrapovic exhaust fitted, low mileage, duty fully paid at Kilindini Port.'
  },
  {
    id: 3,
    title: 'Isuzu FRR 34 Commercial Truck 10-Ton Body',
    category: 'Vehicles',
    subCategory: 'Bus, Trucks & Commercial',
    subCategoryIcon: <Truck className="w-3.5 h-3.5 text-blue-600" />,
    brand: 'Isuzu',
    price: 3850000,
    bulkPrice: 3600000,
    minBulkQty: 2,
    location: 'Nairobi, Industrial Area',
    condition: 'Locally Used',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
    seller: { id: 's3', name: 'East Africa Haulers', phone: '+254 733 998 811', verified: true, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
    date: 'Yesterday',
    featured: false,
    description: 'Heavy duty commercial chassis, 6-speed manual, new tires fitted last week.'
  },
  {
    id: 4,
    title: 'Set of 4 Michelin Pilot Sport 225/45 R17 Alloy Wheels & Tyres',
    category: 'Vehicles',
    subCategory: 'Tyres & Wheels',
    subCategoryIcon: <Disc className="w-3.5 h-3.5 text-purple-600" />,
    brand: 'Generic',
    price: 68000,
    bulkPrice: 62000,
    minBulkQty: 3,
    location: 'Nakuru, Town',
    condition: 'Brand New',
    image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80',
    seller: { id: 's4', name: 'Rift Wheel Kings', phone: '+254 700 112 233', verified: true, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
    date: 'Today, 11:20',
    featured: false,
    description: 'Original lightweight sport alloys fitted with Michelin performance radial tyres.'
  },
  {
    id: 5,
    title: 'iPhone 15 Pro Max 256GB Natural Titanium (Dual SIM)',
    category: 'Phones & Tablets',
    subCategory: 'Smartphones',
    subCategoryIcon: <Smartphone className="w-3.5 h-3.5 text-blue-600" />,
    brand: 'Apple',
    price: 165000,
    bulkPrice: 158000,
    minBulkQty: 3,
    location: 'Nairobi, CBD',
    condition: 'Brand New',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    seller: { id: 's5', name: 'iStore Hub Kenya', phone: '+254 700 445 566', verified: true, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
    date: 'Today, 10:15',
    featured: true,
    description: 'Sealed in box with 1 Year Apple Warranty. Free delivery within Nairobi CBD.'
  },
  {
    id: 6,
    title: '3 Bedroom Master En-suite Apartment in Westlands',
    category: 'Property',
    subCategory: 'Apartments for Rent',
    subCategoryIcon: <Home className="w-3.5 h-3.5 text-amber-600" />,
    brand: '',
    price: 110000,
    bulkPrice: null,
    location: 'Nairobi, Westlands',
    condition: 'Newly Built',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    seller: { id: 's6', name: 'Prime Haven Agencies', phone: '+254 720 888 777', verified: true, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80' },
    date: 'Today, 09:40',
    featured: true,
    description: 'Spacious 3BR apartment with swimming pool, gym, high-speed lift, backup generator, and 24/7 security.'
  },
  {
    id: 7,
    title: 'Sony 65 Inch Bravia 4K Ultra HD Smart Google TV',
    category: 'Electronics & Appliances',
    subCategory: 'TV & Audio Systems',
    subCategoryIcon: <Tv className="w-3.5 h-3.5 text-purple-600" />,
    brand: 'Sony',
    price: 98000,
    bulkPrice: 89000,
    minBulkQty: 2,
    location: 'Eldoret, Town',
    condition: 'Brand New',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
    seller: { id: 's7', name: 'Eldo Electronics Direct', phone: '+254 728 332 211', verified: true, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' },
    date: 'Today, 08:30',
    featured: false,
    description: 'Brand new in box with 2 years manufacturer warranty. HDR 10, Dolby Atmos sound, built-in Wi-Fi.'
  },
  {
    id: 8,
    title: 'L-Shaped 7-Seater Chesterfield Sofa in Velvet Fabric',
    category: 'Home & Furniture',
    subCategory: 'Living Room Furniture',
    subCategoryIcon: <Armchair className="w-3.5 h-3.5 text-rose-600" />,
    brand: '',
    price: 52000,
    bulkPrice: 45000,
    minBulkQty: 3,
    location: 'Kisumu, Milimani',
    condition: 'Custom Made',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    seller: { id: 's8', name: 'Lakeside Crafts & Living', phone: '+254 701 990 011', verified: true, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80' },
    date: '3 hours ago',
    featured: false,
    description: 'High-density foam, durable hardwood frame, available in custom colors. Free delivery in Kisumu town.'
  }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All Subcategories');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Kenya');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyBulkPrice, setOnlyBulkPrice] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('recommended');

  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [savedListingIds, setSavedListingIds] = useState([1, 5]);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChatListing, setActiveChatListing] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatBottomRef = useRef(null);

  const [isPostAdOpen, setIsPostAdOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeCallNumber, setActiveCallNumber] = useState(null);
  const [notification, setNotification] = useState(null);

  const [adForm, setAdForm] = useState({
    title: '',
    category: 'Vehicles',
    subCategory: 'Cars',
    brand: 'Toyota',
    price: '',
    hasBulkPrice: false,
    bulkPrice: '',
    minBulkQty: '5',
    condition: 'Foreign Used',
    location: 'Nairobi, CBD',
    description: '',
    sellerName: 'Kamau Njoroge',
    phone: '+254 712 999 000',
    images: []
  });

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const openChatWithSeller = (listing) => {
    setActiveChatListing(listing);
    setIsChatOpen(true);
    setChatMessages([
      {
        id: 1,
        sender: 'seller',
        text: `Jambo! Thanks for reaching out regarding "${listing.title}". How can I help you?`,
        time: 'Just now'
      }
    ]);
  };

  const handleSendMessage = (textToSend) => {
    const messageText = textToSend || inputMessage;
    if (!messageText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: messageText,
      time: 'Just now'
    };

    setChatMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputMessage('');

    setTimeout(() => {
      let responseText = "Thanks for your inquiry! I am located in " + activeChatListing.location + ". When would you like to inspect it?";
      if (messageText.toLowerCase().includes('available')) {
        responseText = "Yes, it is still available! When are you free to visit?";
      } else if (messageText.toLowerCase().includes('price') || messageText.toLowerCase().includes('discount')) {
        responseText = `The price is KSh ${activeChatListing.price.toLocaleString()} slightly negotiable upon physical inspection.`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'seller',
          text: responseText,
          time: 'Just now'
        }
      ]);
    }, 1200);
  };

  const handlePostAdSubmit = (e) => {
    e.preventDefault();
    const activeCatObj = CATEGORIES.find(c => c.name === adForm.category);
    const subObj = activeCatObj?.subcategories.find(s => s.name === adForm.subCategory);

    const newAd = {
      id: listings.length + 1,
      title: adForm.title,
      category: adForm.category,
      subCategory: adForm.subCategory,
      subCategoryIcon: subObj ? subObj.icon : <Car className="w-3.5 h-3.5 text-emerald-600" />,
      brand: adForm.brand,
      price: Number(adForm.price) || 0,
      bulkPrice: adForm.hasBulkPrice ? (Number(adForm.bulkPrice) || null) : null,
      minBulkQty: adForm.hasBulkPrice ? (Number(adForm.minBulkQty) || 2) : null,
      location: adForm.location,
      condition: adForm.condition,
      image: adForm.images.length > 0 
        ? URL.createObjectURL(adForm.images[0]) 
        : 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      seller: {
        id: `s_${Date.now()}`,
        name: adForm.sellerName,
        phone: adForm.phone,
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      },
      date: 'Just now',
      featured: true,
      description: adForm.description
    };

    setListings([newAd, ...listings]);
    setIsPostAdOpen(false);
    setNotification('🎉 Your listing is live on Vroomever!');
    setAdForm({
      title: '',
      category: 'Vehicles',
      subCategory: 'Cars',
      brand: 'Toyota',
      price: '',
      hasBulkPrice: false,
      bulkPrice: '',
      minBulkQty: '5',
      condition: 'Foreign Used',
      location: 'Nairobi, CBD',
      description: '',
      sellerName: 'Kamau Njoroge',
      phone: '+254 712 999 000',
      images: []
    });
  };

  const toggleBookmark = (id) => {
    if (savedListingIds.includes(id)) {
      setSavedListingIds(savedListingIds.filter(item => item !== id));
      setNotification('Removed from saved items');
    } else {
      setSavedListingIds([...savedListingIds, id]);
      setNotification('Saved to your favorites!');
    }
  };

  const activeCategoryObj = CATEGORIES.find(c => c.name === selectedCategory);

  const filteredListings = listings.filter(item => {
    if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) return false;
    if (selectedSubCategory !== 'All Subcategories' && item.subCategory !== selectedSubCategory) return false;
    if (selectedBrand !== 'All Brands' && item.brand !== selectedBrand) return false;
    if (selectedCondition !== 'All Conditions' && item.condition !== selectedCondition) return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchBrand = item.brand ? item.brand.toLowerCase().includes(q) : false;
      if (!matchTitle && !matchDesc && !matchBrand) return false;
    }

    if (selectedLocation !== 'All Kenya' && !item.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
    if (onlyVerified && !item.seller.verified) return false;
    if (onlyBulkPrice && !item.bulkPrice) return false;

    if (priceRange.min && item.price < Number(priceRange.min)) return false;
    if (priceRange.max && item.price > Number(priceRange.max)) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col antialiased">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-800 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border border-emerald-500/30">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
          <span className="font-semibold text-xs sm:text-sm">{notification}</span>
          <button onClick={() => setNotification(null)} className="ml-2 text-emerald-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-emerald-900 text-white shadow-md border-b border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo */}
            <div 
              onClick={() => {
                setSelectedCategory('All Categories');
                setSelectedSubCategory('All Subcategories');
                setSelectedBrand('All Brands');
                setSelectedCondition('All Conditions');
                setSearchQuery('');
              }}
              className="cursor-pointer flex items-center gap-2 group shrink-0"
            >
              <div className="bg-amber-400 text-slate-950 font-black text-2xl tracking-tighter px-3.5 py-1.5 rounded-2xl shadow-md group-hover:bg-amber-300 transition flex items-center gap-2">
                <Car className="w-6 h-6 text-slate-900" />
                <span>vroomever</span>
              </div>
            </div>

            {/* Central Search */}
            <div className="flex-1 max-w-2xl hidden md:flex items-center bg-white rounded-2xl shadow-inner p-1">
              <div className="flex items-center px-3 border-r border-slate-200 text-slate-600 min-w-[130px]">
                <MapPin className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                <select 
                  value={selectedLocation} 
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none w-full cursor-pointer"
                >
                  <option value="All Kenya">All Kenya</option>
                  <option value="Nairobi">Nairobi</option>
                  <option value="Mombasa">Mombasa</option>
                  <option value="Kisumu">Kisumu</option>
                  <option value="Nakuru">Nakuru</option>
                  <option value="Eldoret">Eldoret</option>
                </select>
              </div>

              <div className="flex items-center flex-1 px-3">
                <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search cars, motorcycles, property, spare parts..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none font-medium"
                />
              </div>

              <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition shadow-sm">
                Search
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="hidden sm:flex items-center gap-2 text-emerald-100 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition hover:bg-emerald-800"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>

              <button 
                onClick={() => setIsPostAdOpen(true)}
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black shadow-lg flex items-center gap-2 transform hover:-translate-y-0.5 transition"
              >
                <PlusCircle className="w-5 h-5 text-slate-900" />
                <span>Sell For Free</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Category Grid Section */}
        <section className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Grid className="w-4 h-4 text-emerald-700" />
              <span>Explore Top Categories</span>
            </h2>
            {selectedCategory !== 'All Categories' && (
              <button 
                onClick={() => {
                  setSelectedCategory('All Categories');
                  setSelectedSubCategory('All Subcategories');
                  setSelectedBrand('All Brands');
                }}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Show All Categories</span>
              </button>
            )}
          </div>

          {/* Grid Cards for Main Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setSelectedSubCategory('All Subcategories');
                    setSelectedBrand('All Brands');
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center space-y-2 group relative ${
                    isSelected 
                      ? 'bg-emerald-900 text-white border-emerald-900 shadow-md ring-2 ring-emerald-600/50' 
                      : 'bg-slate-50 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-slate-800'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl transition ${isSelected ? 'bg-emerald-800 text-white' : 'bg-white shadow-xs'}`}>
                    {cat.icon}
                  </div>
                  <span className="text-[11px] font-black leading-tight line-clamp-2">
                    {cat.name}
                  </span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-emerald-800 text-emerald-200' : 'bg-slate-200 text-slate-600'}`}>
                    {cat.count}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Subcategory Visual Chips (Visible when category is selected) */}
          {activeCategoryObj && (
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <span>Subcategories in {activeCategoryObj.name}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSubCategory('All Subcategories')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    selectedSubCategory === 'All Subcategories'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>All Subcategories</span>
                </button>

                {activeCategoryObj.subcategories.map((sub) => {
                  const isSubSelected = selectedSubCategory === sub.name;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubCategory(sub.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                        isSubSelected
                          ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30'
                      }`}
                    >
                      {sub.icon}
                      <span>{sub.name}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-md ${isSubSelected ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        {sub.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-5">
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-emerald-900 text-white px-4 py-3 font-extrabold text-xs uppercase tracking-wider flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-amber-400" />
                  <span>Refine Search</span>
                </div>
                {(selectedSubCategory !== 'All Subcategories' || selectedBrand !== 'All Brands' || selectedCondition !== 'All Conditions') && (
                  <button 
                    onClick={() => { setSelectedSubCategory('All Subcategories'); setSelectedBrand('All Brands'); setSelectedCondition('All Conditions'); }}
                    className="text-[10px] underline text-amber-300 hover:text-white"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="p-4 space-y-4">
                
                {/* Brand Filter */}
                {activeCategoryObj && activeCategoryObj.brands.length > 0 && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                      {selectedCategory === 'Vehicles' ? 'Car / Vehicle Brand' : 'Brand Name'}
                    </label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600"
                    >
                      {activeCategoryObj.brands.map((b, idx) => (
                        <option key={idx} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Condition Filter */}
                {activeCategoryObj && activeCategoryObj.conditions.length > 0 && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Item Condition</label>
                    <select
                      value={selectedCondition}
                      onChange={(e) => setSelectedCondition(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600"
                    >
                      {activeCategoryObj.conditions.map((cond, idx) => (
                        <option key={idx} value={cond}>{cond}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Toggles */}
                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-extrabold text-slate-700">Bulk Discount Deals</span>
                    </div>
                    <input 
                      type="checkbox"
                      checked={onlyBulkPrice}
                      onChange={(e) => setOnlyBulkPrice(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-500 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-extrabold text-slate-700">Verified Sellers Only</span>
                    </div>
                    <input 
                      type="checkbox"
                      checked={onlyVerified}
                      onChange={(e) => setOnlyVerified(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-500 cursor-pointer"
                    />
                  </label>
                </div>

                {/* Price Range */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Price (KSh)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="number"
                      placeholder="Min KSh"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600"
                    />
                    <input 
                      type="number"
                      placeholder="Max KSh"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

              </div>
            </div>

          </aside>

          {/* Listing Grid */}
          <div className="lg:col-span-3 space-y-4">
            
            <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-xs font-black text-slate-800 flex items-center gap-2">
                <span>Showing Results for:</span>
                <span className="text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  {selectedCategory} {selectedSubCategory !== 'All Subcategories' ? `• ${selectedSubCategory}` : ''}
                </span>
                <span className="text-slate-400 font-normal">({filteredListings.length} items)</span>
              </div>

              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-1.5 font-bold text-slate-700 focus:outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {filteredListings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  🚗
                </div>
                <h3 className="text-base font-bold text-slate-800">No Vroomever items matched your filters</h3>
                <button 
                  onClick={() => {
                    setSelectedCategory('All Categories');
                    setSelectedSubCategory('All Subcategories');
                    setSelectedBrand('All Brands');
                    setSelectedCondition('All Conditions');
                    setOnlyBulkPrice(false);
                    setOnlyVerified(false);
                    setPriceRange({ min: '', max: '' });
                    setSearchQuery('');
                  }}
                  className="bg-emerald-800 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-emerald-900 transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {filteredListings.map((item) => {
                  const isSaved = savedListingIds.includes(item.id);
                  return (
                    <div 
                      key={item.id} 
                      className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition duration-300 overflow-hidden flex flex-col group relative"
                    >
                      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />

                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                          {item.featured && (
                            <span className="bg-amber-400 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                              VIP
                            </span>
                          )}
                          <span className="bg-slate-900/80 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                            {item.subCategoryIcon}
                            <span>{item.condition}</span>
                          </span>
                        </div>

                        <button 
                          onClick={() => toggleBookmark(item.id)}
                          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow transition"
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
                        </button>

                        {item.bulkPrice && (
                          <div className="absolute bottom-2 left-2 bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded flex items-center gap-1 shadow">
                            <Package className="w-3 h-3 text-slate-900" />
                            <span>Bulk Available</span>
                          </div>
                        )}
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          <div className="flex items-baseline justify-between">
                            <div className="text-emerald-800 font-black text-base tracking-tight">
                              KSh {item.price.toLocaleString()}
                            </div>
                            {item.bulkPrice && (
                              <div className="text-[10px] text-amber-800 font-extrabold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                Bulk: KSh {item.bulkPrice.toLocaleString()} ({item.minBulkQty}+)
                              </div>
                            )}
                          </div>

                          <h3 className="text-xs font-bold text-slate-800 line-clamp-2 leading-relaxed group-hover:text-emerald-700 transition">
                            {item.title}
                          </h3>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                            <div className="flex items-center gap-1 truncate max-w-[65%]">
                              <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                              <span className="truncate">{item.location}</span>
                            </div>
                            <span>{item.date}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <button
                              onClick={() => setActiveCallNumber(activeCallNumber === item.id ? null : item.id)}
                              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1 transition"
                            >
                              <Phone className="w-3 h-3 text-emerald-700" />
                              <span>{activeCallNumber === item.id ? item.seller.phone : 'Call'}</span>
                            </button>

                            <button
                              onClick={() => openChatWithSeller(item)}
                              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1 transition shadow-sm"
                            >
                              <MessageSquare className="w-3 h-3 text-amber-300" />
                              <span>Chat</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>
      </main>

      {/* In-App Messaging Drawer */}
      {isChatOpen && activeChatListing && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
            
            <div className="bg-emerald-900 text-white p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <img 
                  src={activeChatListing.seller.avatar} 
                  alt="Seller Avatar" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-400"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm">{activeChatListing.seller.name}</h3>
                    {activeChatListing.seller.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                    )}
                  </div>
                  <p className="text-[10px] text-emerald-200">Usually replies within minutes</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 border-b border-slate-200 p-3 flex items-center gap-3">
              <img 
                src={activeChatListing.image} 
                alt="Listing" 
                className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-800 truncate">{activeChatListing.title}</h4>
                <div className="text-xs font-black text-emerald-800">
                  KSh {activeChatListing.price.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-100/50">
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs shadow-xs space-y-1 ${
                      msg.sender === 'user' 
                        ? 'bg-emerald-800 text-white rounded-br-none' 
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                    }`}
                  >
                    <p className="leading-relaxed font-medium">{msg.text}</p>
                    <span className={`text-[9px] block text-right ${msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            <div className="px-3 py-2 bg-white border-t border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button 
                onClick={() => handleSendMessage("Is this still available?")}
                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full border border-emerald-200 whitespace-nowrap"
              >
                Is this still available?
              </button>
              <button 
                onClick={() => handleSendMessage("What is the best last price?")}
                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full border border-emerald-200 whitespace-nowrap"
              >
                What is the best price?
              </button>
            </div>

            <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input 
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600"
              />
              <button 
                onClick={() => handleSendMessage()}
                className="bg-emerald-800 hover:bg-emerald-900 text-white p-2.5 rounded-xl shadow transition shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Post Ad Modal */}
      {isPostAdOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-8 border border-slate-200">
            
            <div className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-base tracking-wide">Post Free Ad on Vroomever</h3>
              </div>
              <button 
                onClick={() => setIsPostAdOpen(false)}
                className="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostAdSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              
              <div className="space-y-1">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Ad Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Toyota Prado TX-L 2018 Model Foreign Used"
                  value={adForm.title}
                  onChange={(e) => setAdForm({...adForm, title: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Category</label>
                  <select 
                    value={adForm.category}
                    onChange={(e) => {
                      const cat = CATEGORIES.find(c => c.name === e.target.value);
                      setAdForm({
                        ...adForm, 
                        category: e.target.value,
                        subCategory: cat ? cat.subcategories[0]?.name || 'General' : 'General',
                        brand: cat && cat.brands.length > 0 ? cat.brands[1] : ''
                      });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
                  >
                    {CATEGORIES.map((c, i) => (
                      <option key={i} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Subcategory</label>
                  <select 
                    value={adForm.subCategory}
                    onChange={(e) => setAdForm({...adForm, subCategory: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
                  >
                    {CATEGORIES.find(c => c.name === adForm.category)?.subcategories.map((sub, idx) => (
                      <option key={idx} value={sub.name}>{sub.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Condition</label>
                  <select 
                    value={adForm.condition}
                    onChange={(e) => setAdForm({...adForm, condition: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
                  >
                    <option value="Foreign Used">Foreign Used</option>
                    <option value="Locally Used">Locally Used</option>
                    <option value="Brand New">Brand New</option>
                    <option value="Refurbished">Refurbished</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Price (KSh)</label>
                    <input 
                      type="number" 
                      required
                      placeholder="e.g. 5200000"
                      value={adForm.price}
                      onChange={(e) => setAdForm({...adForm, price: e.target.value})}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Location</label>
                    <select 
                      value={adForm.location}
                      onChange={(e) => setAdForm({...adForm, location: e.target.value})}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
                    >
                      <option value="Nairobi, CBD">Nairobi, CBD</option>
                      <option value="Nairobi, Kilimani">Nairobi, Kilimani</option>
                      <option value="Mombasa, Nyali">Mombasa, Nyali</option>
                      <option value="Kisumu, Town">Kisumu, Town</option>
                      <option value="Nakuru, Town">Nakuru, Town</option>
                      <option value="Eldoret, Town">Eldoret, Town</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={adForm.hasBulkPrice}
                      onChange={(e) => setAdForm({...adForm, hasBulkPrice: e.target.checked})}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span className="text-xs font-extrabold text-slate-800">Offer Discounted Bulk Price</span>
                  </label>

                  {adForm.hasBulkPrice && (
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Discounted Price (KSh)</label>
                        <input 
                          type="number"
                          placeholder="e.g. 4950000"
                          value={adForm.bulkPrice}
                          onChange={(e) => setAdForm({...adForm, bulkPrice: e.target.value})}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Min Units for Bulk</label>
                        <input 
                          type="number"
                          placeholder="e.g. 2"
                          value={adForm.minBulkQty}
                          onChange={(e) => setAdForm({...adForm, minBulkQty: e.target.value})}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Description</label>
                <textarea 
                  rows="3"
                  placeholder="Provide vehicle condition, mileage, registration details or specs..."
                  value={adForm.description}
                  onChange={(e) => setAdForm({...adForm, description: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-emerald-600"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-black py-3 rounded-xl shadow-lg transition text-xs tracking-wider uppercase mt-4"
              >
                Publish Ad
              </button>

            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 mt-16 pt-12 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="bg-amber-400 text-slate-950 font-black text-lg tracking-tighter px-3 py-1 rounded-xl inline-block shadow">
                vroomever
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kenya's premier online marketplace for buying and selling motor vehicles, spare parts, property, smartphones, and electronics.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Top Vehicle Categories</h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#" className="hover:text-white transition">Cars for Sale in Kenya</a></li>
                <li><a href="#" className="hover:text-white transition">Motorcycles & Scooters</a></li>
                <li><a href="#" className="hover:text-white transition">Commercial Trucks & Buses</a></li>
                <li><a href="#" className="hover:text-white transition">Tyres, Rims & Spare Parts</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#" className="hover:text-white transition">Sell For Free</a></li>
                <li><a href="#" className="hover:text-white transition">Verified Dealerships</a></li>
                <li><a href="#" className="hover:text-white transition">Wholesale & Bulk Deals</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Support</h4>
              <div className="text-xs text-amber-400 font-bold">support@vroomever.co.ke</div>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>© 2026 Vroomever Kenya. All rights reserved.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}