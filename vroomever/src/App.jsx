import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, MapPin, PlusCircle, Heart, MessageSquare, User, 
  Car, Home, Smartphone, Tv, Armchair, Shirt, Wrench, 
  Briefcase, Sparkles, Filter, ChevronRight, X, Camera, 
  CheckCircle2, ChevronDown, SlidersHorizontal, ShieldCheck, Tag,
  Phone, Send, Package, RefreshCw, AlertCircle, ShoppingBag,
  Disc, Anchor, Truck, Watch, Laptop, HardDrive, Utensils, 
  BedDouble, Scissors, Compass, Clock, Fuel, Gauge, Layers, Grid,
  Baby, Dog, Wheat, ChevronLeft, Wrench as ToolsIcon, 
  Smile, Compass as LeisureIcon, Leaf, Users, FileText, Monitor, Headphones, Printer, Gamepad2, ShieldAlert, Wifi
} from 'lucide-react';
import './index.css';

const KENYA_LOCATIONS = [
  {
    county: 'Nairobi',
    estates: ['All Nairobi', 'Kilimani', 'Westlands', 'Kileleshwa', 'Lavington', 'CBD', 'South B', 'South C', 'Embakasi', 'Kasarani', 'Roysambu', 'Karen', 'Langata', 'Utawala', 'Donholm']
  },
  {
    county: 'Mombasa',
    estates: ['All Mombasa', 'Nyali', 'Bamburi', 'CBD / Town', 'Tudor', 'Likoni', 'Mtwapa', 'Kisauni', 'Changamwe']
  },
  {
    county: 'Kiambu',
    estates: ['All Kiambu', 'Thika', 'Ruiru', 'Kiambu Town', 'Kikuyu', 'Juja', 'Limuru', 'Banana Hill', 'Ruaka']
  },
  {
    county: 'Nakuru',
    estates: ['All Nakuru', 'Nakuru Town', 'Kiamunyi', 'Milimani', 'Lanet', 'Naivasha', 'Gilgil', 'Njoro']
  },
  {
    county: 'Machakos',
    estates: ['All Machakos', 'Syokimau', 'Mlolongo', 'Athi River', 'Machakos Town', 'Kitengela Border']
  },
  {
    county: 'Uasin Gishu',
    estates: ['All Eldoret', 'Eldoret CBD', 'Langas', 'Pioneer', 'Elgon View', 'Annex']
  },
  {
    county: 'Kisumu',
    estates: ['All Kisumu', 'Milimani Kisumu', 'Mamboleo', 'Nyalenda', 'Kondele', 'CBD']
  }
];

const CATEGORIES = [
  {
    id: 'vehicles',
    name: 'Vehicles',
    icon: <Car className="w-5 h-5 text-emerald-600" />,
    count: '235,400+',
    subcategories: [
      { id: 'cars', name: 'Cars', icon: <Car className="w-4 h-4 text-emerald-600" />, count: '46,200' },
      { id: 'motorcycles', name: 'Motorcycles & Scooters', icon: <Compass className="w-4 h-4 text-amber-600" />, count: '1,200' },
      { id: 'buses', name: 'Buses & Microbuses', icon: <Truck className="w-4 h-4 text-blue-600" />, count: '1,900' },
      { id: 'trucks', name: 'Trucks & Trailers', icon: <Truck className="w-4 h-4 text-indigo-600" />, count: '2,500' },
      { id: 'vehicle-parts', name: 'Vehicle Parts & Accessories', icon: <Wrench className="w-4 h-4 text-rose-600" />, count: '219,600' },
      { id: 'heavy-machinery', name: 'Construction & Heavy Machinery', icon: <Wrench className="w-4 h-4 text-amber-700" />, count: '840' },
      { id: 'watercraft', name: 'Watercraft & Boats', icon: <Anchor className="w-4 h-4 text-cyan-600" />, count: '37' },
      { id: 'personal-mobility', name: 'Personal Mobility', icon: <Gauge className="w-4 h-4 text-purple-600" />, count: '12,400' },
      { id: 'car-services', name: 'Car Services', icon: <Fuel className="w-4 h-4 text-blue-500" />, count: '1,400' }
    ],
    brands: ['All Brands', 'Toyota', 'Nissan', 'Mazda', 'Mercedes-Benz', 'Subaru', 'Honda', 'Volkswagen'],
    conditions: ['All Conditions', 'Brand New', 'Foreign Used', 'Locally Used']
  },
  {
    id: 'property',
    name: 'Property',
    icon: <Home className="w-5 h-5 text-amber-600" />,
    count: '31,500+',
    subcategories: [
      { id: 'new-builds', name: 'New Builds', icon: <Home className="w-4 h-4 text-amber-500" />, count: '137' },
      { id: 'rent-houses', name: 'Houses & Apartments For Rent', icon: <Home className="w-4 h-4 text-amber-600" />, count: '7,300' },
      { id: 'sale-houses', name: 'Houses & Apartments For Sale', icon: <Home className="w-4 h-4 text-emerald-600" />, count: '8,100' },
      { id: 'short-let', name: 'Short Let', icon: <Clock className="w-4 h-4 text-purple-600" />, count: '2,800' },
      { id: 'land-rent', name: 'Land & Plots for Rent', icon: <Layers className="w-4 h-4 text-blue-500" />, count: '177' },
      { id: 'land-sale', name: 'Land & Plots For Sale', icon: <Layers className="w-4 h-4 text-amber-700" />, count: '10,500' },
      { id: 'event-centres', name: 'Event Centres, Venues & Workstations', icon: <Briefcase className="w-4 h-4 text-pink-600" />, count: '36' },
      { id: 'commercial-rent', name: 'Commercial Property For Rent', icon: <Briefcase className="w-4 h-4 text-indigo-600" />, count: '1,100' },
      { id: 'commercial-sale', name: 'Commercial Property For Sale', icon: <Briefcase className="w-4 h-4 text-emerald-700" />, count: '520' }
    ],
    brands: [],
    conditions: ['All Conditions', 'Newly Built', 'Fairly Used', 'Under Construction']
  },
  {
    id: 'phones',
    name: 'Phones & Tablets',
    icon: <Smartphone className="w-5 h-5 text-blue-600" />,
    count: '107,000+',
    subcategories: [
      { id: 'mobile-phones', name: 'Mobile Phones', icon: <Smartphone className="w-4 h-4 text-blue-600" />, count: '10,900' },
      { id: 'phone-accessories', name: 'Accessories for Phones & Tablets', icon: <HardDrive className="w-4 h-4 text-rose-600" />, count: '73,600' },
      { id: 'smart-watches', name: 'Smart Watches', icon: <Watch className="w-4 h-4 text-indigo-600" />, count: '4,900' },
      { id: 'tablets', name: 'Tablets', icon: <Laptop className="w-4 h-4 text-teal-600" />, count: '3,100' },
      { id: 'headphones', name: 'Headphones', icon: <Headphones className="w-4 h-4 text-purple-600" />, count: '16,300' }
    ],
    brands: ['All Brands', 'Apple', 'Samsung', 'Tecno', 'Infinix', 'Xiaomi', 'Oppo', 'Nokia', 'OnePlus'],
    conditions: ['All Conditions', 'Brand New', 'Refurbished', 'Locally Used']
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: <Tv className="w-5 h-5 text-purple-600" />,
    count: '190,000+',
    subcategories: [
      { id: 'laptops-pcs', name: 'Laptops & Computers', icon: <Laptop className="w-4 h-4 text-blue-600" />, count: '20,800' },
      { id: 'tv-video', name: 'TV & Video Equipment', icon: <Tv className="w-4 h-4 text-purple-600" />, count: '24,400' },
      { id: 'video-consoles', name: 'Video Game Consoles', icon: <Gamepad2 className="w-4 h-4 text-rose-600" />, count: '5,500' },
      { id: 'audio-music', name: 'Audio & Music Equipment', icon: <Disc className="w-4 h-4 text-emerald-600" />, count: '54,600' },
      { id: 'cameras', name: 'Photo & Video Cameras', icon: <Camera className="w-4 h-4 text-amber-600" />, count: '4,700' },
      { id: 'security', name: 'Security & Surveillance', icon: <ShieldAlert className="w-4 h-4 text-red-600" />, count: '34,200' },
      { id: 'networking', name: 'Networking Products', icon: <Wifi className="w-4 h-4 text-cyan-600" />, count: '19,900' },
      { id: 'printers', name: 'Printers & Scanners', icon: <Printer className="w-4 h-4 text-slate-700" />, count: '13,000' },
      { id: 'monitors', name: 'Computer Monitors', icon: <Monitor className="w-4 h-4 text-indigo-600" />, count: '4,600' }
    ],
    brands: ['All Brands', 'Sony', 'LG', 'Samsung', 'HP', 'Dell', 'Lenovo', 'Canon', 'Apple'],
    conditions: ['All Conditions', 'Brand New', 'Refurbished', 'Locally Used']
  },
  {
    id: 'home-appliances',
    name: 'Home, Furniture & Appliances',
    icon: <Armchair className="w-5 h-5 text-rose-600" />,
    count: '370,000+',
    subcategories: [
      { id: 'furniture', name: 'Furniture', icon: <Armchair className="w-4 h-4 text-rose-600" />, count: '124,000' },
      { id: 'lighting', name: 'Lighting', icon: <Sparkles className="w-4 h-4 text-amber-500" />, count: '18,100' },
      { id: 'storage', name: 'Storage & Organization', icon: <Layers className="w-4 h-4 text-blue-600" />, count: '11,400' },
      { id: 'home-accessories', name: 'Home Accessories', icon: <BedDouble className="w-4 h-4 text-purple-600" />, count: '94,600' },
      { id: 'home-appliances', name: 'Home Appliances', icon: <Tv className="w-4 h-4 text-emerald-600" />, count: '42,200' },
      { id: 'kitchen-appliances', name: 'Kitchen Appliances', icon: <Utensils className="w-4 h-4 text-amber-600" />, count: '106,700' },
      { id: 'kitchenware', name: 'Kitchenware & Cookware', icon: <Utensils className="w-4 h-4 text-rose-500" />, count: '52,000' },
      { id: 'household-chemicals', name: 'Household Chemicals', icon: <Package className="w-4 h-4 text-indigo-600" />, count: '1,700' },
      { id: 'garden-supplies', name: 'Garden Supplies', icon: <Leaf className="w-4 h-4 text-green-600" />, count: '21,200' }
    ],
    brands: [],
    conditions: ['All Conditions', 'Brand New', 'Custom Made', 'Used']
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: <Shirt className="w-5 h-5 text-pink-600" />,
    count: '95,000+',
    subcategories: [
      { id: 'womens-fashion', name: "Women's Fashion", icon: <Shirt className="w-4 h-4 text-pink-600" />, count: '44,900' },
      { id: 'mens-fashion', name: "Men's Fashion", icon: <ShoppingBag className="w-4 h-4 text-emerald-600" />, count: '43,300' },
      { id: 'kids-fashion', name: "Baby & Kids' Fashion", icon: <Baby className="w-4 h-4 text-rose-500" />, count: '7,500' }
    ],
    brands: ['All Brands', 'Nike', 'Adidas', 'Zara', 'Gucci', 'Ankara / Kitenge', 'Generic'],
    conditions: ['All Conditions', 'Brand New', 'Thrift / Mitumba']
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    icon: <Scissors className="w-5 h-5 text-rose-500" />,
    count: '25,000+',
    subcategories: [
      { id: 'hair-beauty', name: 'Hair Beauty', icon: <Scissors className="w-4 h-4 text-rose-500" />, count: '940' },
      { id: 'face-care', name: 'Face Care', icon: <Sparkles className="w-4 h-4 text-pink-500" />, count: '2,000' },
      { id: 'oral-care', name: 'Oral Care', icon: <CheckCircle2 className="w-4 h-4 text-blue-500" />, count: '550' },
      { id: 'body-care', name: 'Body Care', icon: <User className="w-4 h-4 text-amber-600" />, count: '1,400' },
      { id: 'fragrance', name: 'Fragrance', icon: <Tag className="w-4 h-4 text-purple-500" />, count: '2,100' },
      { id: 'makeup', name: 'Makeup', icon: <Smile className="w-4 h-4 text-pink-600" />, count: '340' },
      { id: 'sexual-wellness', name: 'Sexual Wellness', icon: <Heart className="w-4 h-4 text-red-500" />, count: '1,000' },
      { id: 'beauty-tools', name: 'Tools & Accessories', icon: <Wrench className="w-4 h-4 text-slate-600" />, count: '11,400' },
      { id: 'vitamins', name: 'Vitamins & Supplements', icon: <Package className="w-4 h-4 text-emerald-600" />, count: '1,800' },
      { id: 'massagers', name: 'Massagers', icon: <Gauge className="w-4 h-4 text-indigo-600" />, count: '1,600' },
      { id: 'beauty-services', name: 'Health & Beauty Services', icon: <Briefcase className="w-4 h-4 text-teal-600" />, count: '240' }
    ],
    brands: [],
    conditions: ['All Conditions', 'Brand New', 'Original']
  },
  {
    id: 'services',
    name: 'Services',
    icon: <Wrench className="w-5 h-5 text-cyan-600" />,
    count: '25,000+',
    subcategories: [
      { id: 'building-trades', name: 'Building & Trades Services', icon: <Wrench className="w-4 h-4 text-amber-600" />, count: '5,300' },
      { id: 'car-services-serv', name: 'Car Services', icon: <Car className="w-4 h-4 text-emerald-600" />, count: '1,400' },
      { id: 'it-services', name: 'Computer & IT Services', icon: <Laptop className="w-4 h-4 text-blue-600" />, count: '1,500' },
      { id: 'repair-services', name: 'Repair Services', icon: <ToolsIcon className="w-4 h-4 text-purple-600" />, count: '3,600' },
      { id: 'cleaning-services', name: 'Cleaning Services', icon: <Sparkles className="w-4 h-4 text-cyan-600" />, count: '2,300' },
      { id: 'printing-services', name: 'Printing Services', icon: <Printer className="w-4 h-4 text-slate-700" />, count: '5,300' },
      { id: 'manufacturing', name: 'Manufacturing Services', icon: <Briefcase className="w-4 h-4 text-indigo-600" />, count: '360' },
      { id: 'logistics', name: 'Logistics Services', icon: <Truck className="w-4 h-4 text-blue-700" />, count: '2,200' },
      { id: 'legal-services', name: 'Legal Services', icon: <ShieldCheck className="w-4 h-4 text-amber-700" />, count: '88' },
      { id: 'tax-financial', name: 'Tax & Financial Services', icon: <Tag className="w-4 h-4 text-green-700" />, count: '180' },
      { id: 'recruitment', name: 'Recruitment Services', icon: <Users className="w-4 h-4 text-pink-600" />, count: '120' }
    ],
    brands: [],
    conditions: ['All Conditions', 'Professional', 'Freelance']
  },
  {
    id: 'commercial-equipment',
    name: 'Commercial Equipment & Tools',
    icon: <ToolsIcon className="w-5 h-5 text-indigo-700" />,
    count: '18,400+',
    subcategories: [
      { id: 'industrial-tools', name: 'Industrial Tools & Equipment', icon: <ToolsIcon className="w-4 h-4 text-indigo-700" />, count: '8,200' },
      { id: 'restaurant-equipment', name: 'Restaurant & Catering Equipment', icon: <Utensils className="w-4 h-4 text-amber-600" />, count: '4,100' },
      { id: 'medical-equipment', name: 'Medical Equipment', icon: <CheckCircle2 className="w-4 h-4 text-red-500" />, count: '2,500' },
      { id: 'office-supplies', name: 'Office Supplies & Equipment', icon: <Briefcase className="w-4 h-4 text-blue-600" />, count: '3,600' }
    ],
    brands: [],
    conditions: ['All Conditions', 'Brand New', 'Used']
  },
  {
    id: 'leisure-activities',
    name: 'Leisure & Activities',
    icon: <LeisureIcon className="w-5 h-5 text-amber-500" />,
    count: '9,200+',
    subcategories: [
      { id: 'camping-gear', name: 'Camping & Outdoor Gear', icon: <Compass className="w-4 h-4 text-amber-600" />, count: '3,200' },
      { id: 'musical-instruments', name: 'Musical Instruments', icon: <Disc className="w-4 h-4 text-purple-600" />, count: '4,100' },
      { id: 'sports-fitness', name: 'Sports & Fitness Equipment', icon: <Gauge className="w-4 h-4 text-emerald-600" />, count: '1,900' }
    ],
    brands: [],
    conditions: ['All Conditions', 'Brand New', 'Used']
  },
  {
    id: 'babies-kids',
    name: 'Babies & Kids',
    icon: <Baby className="w-5 h-5 text-pink-500" />,
    count: '14,500+',
    subcategories: [
      { id: 'baby-gear', name: 'Baby Gear & Safety', icon: <Baby className="w-4 h-4 text-pink-500" />, count: '5,200' },
      { id: 'kids-toys', name: 'Toys & Games', icon: <Smile className="w-4 h-4 text-amber-500" />, count: '6,100' },
      { id: 'nursery-furniture', name: 'Nursery Furniture', icon: <BedDouble className="w-4 h-4 text-indigo-500" />, count: '3,200' }
    ],
    brands: [],
    conditions: ['All Conditions', 'Brand New', 'Used']
  },
  {
    id: 'food-agriculture',
    name: 'Food, Agriculture & Farming',
    icon: <Wheat className="w-5 h-5 text-green-600" />,
    count: '16,800+',
    subcategories: [
      { id: 'farm-produce', name: 'Farm Produce & Feeds', icon: <Wheat className="w-4 h-4 text-green-600" />, count: '9,400' },
      { id: 'seeds-plants', name: 'Seeds, Plants & Fertilizers', icon: <Leaf className="w-4 h-4 text-emerald-600" />, count: '4,200' },
      { id: 'farming-tools', name: 'Farming Tools & Machinery', icon: <ToolsIcon className="w-4 h-4 text-amber-700" />, count: '3,200' }
    ],
    brands: [],
    conditions: ['All Conditions', 'Fresh', 'Brand New', 'Used']
  },
  {
    id: 'animals-pets',
    name: 'Animals & Pets',
    icon: <Dog className="w-5 h-5 text-amber-700" />,
    count: '8,400+',
    subcategories: [
      { id: 'dogs-puppies', name: 'Dogs & Puppies', icon: <Dog className="w-4 h-4 text-amber-700" />, count: '4,500' },
      { id: 'cats-kittens', name: 'Cats & Kittens', icon: <Dog className="w-4 h-4 text-orange-500" />, count: '1,800' },
      { id: 'birds-poultry', name: 'Birds & Poultry', icon: <Compass className="w-4 h-4 text-blue-500" />, count: '1,200' },
      { id: 'pet-accessories', name: 'Pet Accessories & Food', icon: <Package className="w-4 h-4 text-rose-500" />, count: '900' }
    ],
    brands: [],
    conditions: ['All Conditions', 'Healthy', 'Vaccinated']
  },
  {
    id: 'jobs',
    name: 'Jobs',
    icon: <Briefcase className="w-5 h-5 text-emerald-700" />,
    count: '12,100+',
    subcategories: [
      { id: 'job-vacancies', name: 'Job Vacancies', icon: <Briefcase className="w-4 h-4 text-emerald-700" />, count: '12,100' }
    ],
    brands: [],
    conditions: ['All Conditions', 'Full-time', 'Part-time', 'Contract']
  },
  {
    id: 'seeking-work',
    name: 'Seeking Work - CVs',
    icon: <FileText className="w-5 h-5 text-blue-700" />,
    count: '9,500+',
    subcategories: [
      { id: 'cv-listings', name: 'Job Seekers & CVs', icon: <FileText className="w-4 h-4 text-blue-700" />, count: '9,500' }
    ],
    brands: [],
    conditions: ['All Conditions', 'Professional', 'Experienced']
  }
];

const PROMO_BANNERS = [
  {
    title: 'Drive Your Dream Car Today!',
    subtitle: 'Verified Foreign & Locally Used Cars with Zero Deposit Financing options.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    tag: 'VIP Vehicles'
  },
  {
    title: 'Upgrade Your Tech & Gadgets',
    subtitle: 'Latest Smartphones, Laptops & Smart TVs with 1-Year Warranty.',
    image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1200&q=80',
    tag: 'Mega Electronics'
  },
  {
    title: 'Prime Real Estate in Nairobi',
    subtitle: 'Discover luxury apartments for rent or sale in Westlands, Kilimani & Lavington.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    tag: 'Property Hub'
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
    title: 'iPhone 15 Pro Max 256GB Natural Titanium (Dual SIM)',
    category: 'Phones & Tablets',
    subCategory: 'Mobile Phones',
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
    id: 4,
    title: '3 Bedroom Master En-suite Apartment in Westlands',
    category: 'Property',
    subCategory: 'Houses & Apartments For Rent',
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
    id: 5,
    title: 'Sony 65 Inch Bravia 4K Ultra HD Smart Google TV',
    category: 'Electronics',
    subCategory: 'TV & Video Equipment',
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

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [expandedCounty, setExpandedCounty] = useState('Nairobi');

  const [mobileCategoryModal, setMobileCategoryModal] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [savedListingIds, setSavedListingIds] = useState([1, 3]);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'messages', 'wishlist', 'profile'
  const [activeChatListing, setActiveChatListing] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatBottomRef = useRef(null);

  const [isPostAdOpen, setIsPostAdOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeCallNumber, setActiveCallNumber] = useState(null);
  const [notification, setNotification] = useState(null);

  // Auto-Looping Carousel for small devices
  const featuredListings = listings.filter(item => item.featured);
  const carouselRef = useRef(null);

  // Scroll direction detection for mobile bottom navigation bar
  const [showBottomNav, setShowBottomNav] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowBottomNav(false); // scrolling down -> hide
      } else {
        setShowBottomNav(true); // scrolling up -> show
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % PROMO_BANNERS.length);
    }, 4500);

    const autoScroll = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 260, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => {
      clearInterval(bannerInterval);
      clearInterval(autoScroll);
    };
  }, []);

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
      let responseText = "Thanks for your inquiry! I am located in " + (activeChatListing?.location || 'Nairobi') + ". When would you like to inspect it?";
      if (messageText.toLowerCase().includes('available')) {
        responseText = "Yes, it is still available! When are you free to visit?";
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
    const newAd = {
      id: listings.length + 1,
      title: 'New Featured Listing',
      category: 'Vehicles',
      subCategory: 'Cars',
      subCategoryIcon: <Car className="w-3.5 h-3.5 text-emerald-600" />,
      brand: 'Toyota',
      price: 2500000,
      location: 'Nairobi, CBD',
      condition: 'Foreign Used',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      seller: { id: 's_new', name: 'Moses Njuguna', phone: '+254 712 999 000', verified: true, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' },
      date: 'Just now',
      featured: true,
      description: 'Clean inspection condition.'
    };

    setListings([newAd, ...listings]);
    setIsPostAdOpen(false);
    setNotification('🎉 Your listing is live on Vroomever!');
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
    if (activeTab === 'wishlist' && !savedListingIds.includes(item.id)) return false;
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
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col antialiased pb-20 md:pb-0">
      
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
            
            <div 
              onClick={() => {
                setSelectedCategory('All Categories');
                setSelectedSubCategory('All Subcategories');
                setSelectedBrand('All Brands');
                setSelectedCondition('All Conditions');
                setSearchQuery('');
                setActiveTab('home');
              }}
              className="cursor-pointer flex items-center gap-2 group shrink-0"
            >
              <div className="bg-amber-400 text-slate-950 font-black text-2xl tracking-tighter px-3.5 py-1.5 rounded-2xl shadow-md group-hover:bg-amber-300 transition flex items-center gap-2">
                <Car className="w-6 h-6 text-slate-900" />
                <span>vroomever</span>
              </div>
            </div>

            {/* Central Search with Location Popup trigger (Desktop) */}
            <div className="flex-1 max-w-2xl hidden md:flex items-center bg-white rounded-2xl shadow-inner p-1">
              <div 
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center px-3 border-r border-slate-200 text-slate-700 min-w-[150px] cursor-pointer hover:bg-slate-50 py-1.5 rounded-l-xl"
              >
                <MapPin className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                <span className="text-xs font-bold truncate">{selectedLocation}</span>
                <ChevronDown className="w-3.5 h-3.5 ml-auto text-slate-400" />
              </div>

              <div className="flex items-center flex-1 px-3">
                <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search vehicles, property, phones, electronics..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none font-medium"
                />
              </div>

              <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition shadow-sm">
                Search
              </button>
            </div>

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

      {/* MOBILE TOP BAR: Search & Area Filter Displayed Above Everything Else on Mobile */}
      <div className="md:hidden bg-emerald-950 px-4 py-3 space-y-2.5 border-b border-emerald-900 sticky top-20 z-30 shadow-md">
        <div className="flex items-center bg-white rounded-xl shadow-sm p-1">
          <div className="flex items-center flex-1 px-2.5">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Search what you need..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none font-medium py-1.5"
            />
          </div>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex-1 flex items-center justify-between bg-emerald-900 hover:bg-emerald-800 text-white px-3 py-2 rounded-xl text-xs font-bold border border-emerald-800 shadow-xs"
          >
            <div className="flex items-center gap-2 truncate">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">{selectedLocation}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />
          </button>

          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-black shadow-xs shrink-0"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Compact, Auto-Looping Featured Carousel (Small Devices Only) */}
        {featuredListings.length > 0 && (
          <section className="space-y-2 md:hidden">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>VIP Spotlight</span>
              </h3>
            </div>

            <div 
              ref={carouselRef}
              className="flex gap-3 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {featuredListings.map((item) => (
                <div 
                  key={`carousel-${item.id}`}
                  className="min-w-[220px] max-w-[220px] bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col shrink-0 snap-start group"
                >
                  <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-1.5 left-1.5 bg-amber-400 text-slate-950 text-[8px] font-black uppercase px-1.5 py-0.5 rounded shadow">
                      VIP
                    </span>
                  </div>
                  <div className="p-2.5 space-y-1 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-emerald-800 font-black text-xs">KSh {item.price.toLocaleString()}</div>
                      <h4 className="text-[11px] font-bold text-slate-800 line-clamp-1">{item.title}</h4>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                      <span className="text-slate-500 truncate max-w-[120px]">{item.location}</span>
                      <button onClick={() => openChatWithSeller(item)} className="bg-emerald-800 text-white px-2 py-0.5 rounded font-bold text-[9px]">Chat</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Category Section (Mobile Grid / Desktop Left List with Background Advert Banner & Hover Subcategory Flyout) */}
        <section className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Grid className="w-4 h-4 text-emerald-700" />
              <span>Explore All Jiji Categories</span>
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

          {/* MOBILE: Grid category view */}
          <div className="grid grid-cols-3 gap-3 md:hidden">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setSelectedSubCategory('All Subcategories');
                    setSelectedBrand('All Brands');
                    setMobileCategoryModal(cat);
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center space-y-2 ${
                    isSelected ? 'bg-emerald-900 text-white border-emerald-900 shadow-md' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-emerald-800 text-white' : 'bg-white shadow-xs'}`}>
                    {cat.icon}
                  </div>
                  <span className="text-[11px] font-black leading-tight line-clamp-2">{cat.name}</span>
                </div>
              );
            })}
          </div>

          {/* LAPTOP / DESKTOP: Left Category List + Banner slideshow + Hover Subcategory Flyout */}
          <div className="hidden md:flex relative gap-4 items-stretch">
            
            <div className="w-72 bg-slate-50 rounded-2xl border border-slate-200 p-2 space-y-1 shrink-0 max-h-[420px] overflow-y-auto scrollbar-none">
              <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3 py-1.5">All Departments</div>
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                const isHovered = hoveredCategory === cat.id;
                return (
                  <div
                    key={cat.id}
                    onMouseEnter={() => setHoveredCategory(cat.id)}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setSelectedSubCategory('All Subcategories');
                      setSelectedBrand('All Brands');
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition ${
                      isSelected || isHovered ? 'bg-emerald-900 text-white font-black shadow-xs' : 'hover:bg-emerald-50 text-slate-700 font-bold'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-xs truncate">
                      <span className={`p-1.5 rounded-lg ${isSelected || isHovered ? 'bg-emerald-800 text-white' : 'bg-white shadow-xs'}`}>{cat.icon}</span>
                      <span className="truncate">{cat.name}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </div>
                );
              })}
            </div>

            {/* Banner Slideshow */}
            <div className="flex-1 relative rounded-2xl overflow-hidden shadow-md min-h-[420px] group">
              <div className="absolute inset-0 bg-slate-950">
                <img 
                  src={PROMO_BANNERS[currentBannerIndex].image} 
                  alt="Advert Banner"
                  className="w-full h-full object-cover opacity-60 transition duration-1000 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent flex flex-col justify-center px-10 space-y-4">
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-full w-max shadow">
                    {PROMO_BANNERS[currentBannerIndex].tag}
                  </span>
                  <div className="space-y-2 max-w-lg">
                    <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight">
                      {PROMO_BANNERS[currentBannerIndex].title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium">
                      {PROMO_BANNERS[currentBannerIndex].subtitle}
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsPostAdOpen(true)}
                    className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider w-max shadow-lg transition"
                  >
                    Post Free Ad Now
                  </button>
                </div>
              </div>

              <div className="absolute bottom-4 right-6 flex items-center gap-1.5 z-10">
                {PROMO_BANNERS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentBannerIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${currentBannerIndex === idx ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/50'}`}
                  />
                ))}
              </div>
            </div>

            {/* Hover Subcategory Flyout */}
            {hoveredCategory && (() => {
              const catData = CATEGORIES.find(c => c.id === hoveredCategory);
              if (!catData) return null;
              return (
                <div 
                  className="absolute top-0 left-76 right-0 bottom-0 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-6 shadow-2xl z-30 flex flex-col justify-between overflow-y-auto"
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-emerald-50 rounded-xl">{catData.icon}</div>
                        <div>
                          <h3 className="text-sm font-black text-slate-900">{catData.name}</h3>
                          <p className="text-[11px] text-slate-500">{catData.count} available listings</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedCategory(catData.name);
                          setSelectedSubCategory('All Subcategories');
                          setHoveredCategory(null);
                        }}
                        className="text-xs font-bold text-emerald-700 hover:underline bg-emerald-50 px-3 py-1.5 rounded-xl"
                      >
                        View All in {catData.name}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {catData.subcategories.map((sub) => (
                        <div
                          key={sub.id}
                          onClick={() => {
                            setSelectedCategory(catData.name);
                            setSelectedSubCategory(sub.name);
                            setHoveredCategory(null);
                          }}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 cursor-pointer transition group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-white rounded-lg shadow-xs">{sub.icon}</div>
                            <span className="text-xs font-bold text-slate-800">{sub.name}</span>
                          </div>
                          <span className="text-[10px] font-extrabold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-md">{sub.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>
        </section>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block lg:col-span-1 space-y-5">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-emerald-900 text-white px-4 py-3 font-extrabold text-xs uppercase tracking-wider flex items-center justify-between">
                <span>Refine Search</span>
              </div>
              <div className="p-4 space-y-4">
                {activeCategoryObj && activeCategoryObj.brands.length > 0 && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-slate-500 uppercase">Brand</label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                    >
                      {activeCategoryObj.brands.map((b, idx) => (<option key={idx} value={b}>{b}</option>))}
                    </select>
                  </div>
                )}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="text-[11px] font-extrabold text-slate-500 uppercase">Price (KSh)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="number" placeholder="Min" value={priceRange.min} onChange={(e) => setPriceRange({...priceRange, min: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-bold" />
                    <input type="number" placeholder="Max" value={priceRange.max} onChange={(e) => setPriceRange({...priceRange, max: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-bold" />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Listing Grid */}
          <div className="lg:col-span-3 space-y-4">
            
            <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-xs font-black text-slate-800 flex items-center gap-2">
                <span>Results:</span>
                <span className="text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">{selectedCategory}</span>
                <span className="text-slate-400">({filteredListings.length})</span>
              </div>

              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-1.5 font-bold text-slate-700"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {filteredListings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
                <div className="text-3xl font-bold">🔍</div>
                <h3 className="text-base font-bold text-slate-800">No items found matching your selection</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {filteredListings.map((item) => {
                  const isSaved = savedListingIds.includes(item.id);
                  return (
                    <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col group relative">
                      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <button onClick={() => toggleBookmark(item.id)} className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 text-slate-700 flex items-center justify-center shadow">
                          <Heart className={`w-4 h-4 ${isSaved ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
                        </button>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          <div className="text-emerald-800 font-black text-base">KSh {item.price.toLocaleString()}</div>
                          <h3 className="text-xs font-bold text-slate-800 line-clamp-2">{item.title}</h3>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                          <span>{item.location}</span>
                          <button onClick={() => openChatWithSeller(item)} className="bg-emerald-800 text-white px-3 py-1 rounded font-bold">Chat</button>
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

      {/* Jiji-Style County & Estate Popup Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-sm">Choose Location (Counties & Estates)</h3>
              </div>
              <button onClick={() => setIsLocationModalOpen(false)} className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-1.5 border-r pr-3">
                <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Counties</div>
                {KENYA_LOCATIONS.map((loc) => (
                  <button
                    key={loc.county}
                    onClick={() => setExpandedCounty(loc.county)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                      expandedCounty === loc.county ? 'bg-emerald-800 text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{loc.county}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>

              <div className="space-y-1.5">
                <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Estates in {expandedCounty}</div>
                {KENYA_LOCATIONS.find(c => c.county === expandedCounty)?.estates.map((est) => (
                  <button
                    key={est}
                    onClick={() => {
                      setSelectedLocation(est === `All ${expandedCounty}` ? expandedCounty : `${expandedCounty}, ${est}`);
                      setIsLocationModalOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 transition"
                  >
                    {est}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Category Subcategories Pop-up Modal */}
      {mobileCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-xs p-0 md:hidden">
          <div className="bg-white rounded-t-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="bg-emerald-900 text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-emerald-800 rounded-xl">{mobileCategoryModal.icon}</span>
                <h3 className="font-extrabold text-sm">{mobileCategoryModal.name} Subcategories</h3>
              </div>
              <button onClick={() => setMobileCategoryModal(null)} className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
              <button
                onClick={() => { setSelectedSubCategory('All Subcategories'); setMobileCategoryModal(null); }}
                className="w-full p-3 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-extrabold flex items-center justify-between"
              >
                <span>All Subcategories in {mobileCategoryModal.name}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {mobileCategoryModal.subcategories.map((sub) => (
                <button
                  key={`mob-sub-${sub.id}`}
                  onClick={() => { setSelectedSubCategory(sub.name); setMobileCategoryModal(null); }}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-xs">{sub.icon}</div>
                    <span>{sub.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-extrabold bg-slate-200 px-2 py-0.5 rounded-md">{sub.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-xs p-0 lg:hidden">
          <div className="bg-white rounded-t-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="bg-emerald-900 text-white px-5 py-4 flex items-center justify-between">
              <h3 className="font-extrabold text-sm">Filter Listings</h3>
              <button onClick={() => setIsFilterModalOpen(false)} className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <button onClick={() => setIsFilterModalOpen(false)} className="w-full bg-emerald-800 text-white py-3 rounded-xl font-black text-xs uppercase">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* In-App Messaging Drawer */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div className="bg-emerald-900 text-white p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center">
                  VC
                </div>
                <div>
                  <h3 className="font-extrabold text-sm">{activeChatListing ? activeChatListing.seller.name : 'Vroomever Chat'}</h3>
                  <p className="text-[10px] text-emerald-200">Active conversation</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-100/50">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs shadow-xs space-y-1 ${msg.sender === 'user' ? 'bg-emerald-800 text-white' : 'bg-white text-slate-800 border'}`}>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input 
                type="text" placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none"
              />
              <button onClick={() => handleSendMessage()} className="bg-emerald-800 text-white p-2.5 rounded-xl">
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
              <h3 className="font-extrabold text-base">Post Free Ad</h3>
              <button onClick={() => setIsPostAdOpen(false)} className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handlePostAdSubmit} className="p-6 space-y-4">
              <input 
                type="text" required placeholder="Ad Title (e.g. Toyota Vitz 2017)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold"
              />
              <button type="submit" className="w-full bg-emerald-800 text-white font-black py-3 rounded-xl text-xs uppercase">
                Publish Ad
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (Shows on scroll up, hides on scroll down) */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl md:hidden transition-transform duration-300 ${
        showBottomNav ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="grid grid-cols-4 h-16 items-center">
          <button 
            onClick={() => { setActiveTab('home'); setSelectedCategory('All Categories'); }}
            className={`flex flex-col items-center justify-center space-y-1 ${activeTab === 'home' ? 'text-emerald-800 font-black' : 'text-slate-500 font-bold'}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
          </button>

          <button 
            onClick={() => { setActiveTab('messages'); setIsChatOpen(true); }}
            className={`flex flex-col items-center justify-center space-y-1 ${activeTab === 'messages' ? 'text-emerald-800 font-black' : 'text-slate-500 font-bold'}`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[10px]">Messages</span>
          </button>

          <button 
            onClick={() => setActiveTab('wishlist')}
            className={`flex flex-col items-center justify-center space-y-1 ${activeTab === 'wishlist' ? 'text-emerald-800 font-black' : 'text-slate-500 font-bold'}`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-[10px]">Wishlist</span>
          </button>

          <button 
            onClick={() => setIsAuthOpen(true)}
            className={`flex flex-col items-center justify-center space-y-1 ${activeTab === 'profile' ? 'text-emerald-800 font-black' : 'text-slate-500 font-bold'}`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px]">Profile</span>
          </button>
        </div>
      </div>

    </div>
  );
}