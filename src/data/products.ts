import { Product } from '../types';

export const products: Product[] = [
  // Electronics - Headphones
  {
    id: 'e1',
    name: 'Sony WH-1000XM4 Noise Cancelling Wireless Headphones',
    description: 'Industry-leading noise cancellation with Dual Noise Sensor microphones. Next-level music with Edge-AI and DSEE Extreme.',
    price: 19990,
    mrp: 29990,
    discount: 33,
    category: 'electronics',
    subcategory: 'headphones',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000',
    stock: 50,
    rating: 4.5,
    reviews: 1250,
    seller: 'RetailNet India',
    highlights: [
      'Industry-leading noise cancellation',
      'Up to 30-hour battery life',
      'Touch controls',
      'Speak-to-chat technology',
      'Multi-device pairing'
    ],
    specifications: {
      'General': [
        'Color: Black',
        'Headphone Type: Over-ear',
        'Connectivity: Bluetooth 5.0',
        'Battery Life: Up to 30 hours'
      ],
      'Audio Features': [
        'Active Noise Cancellation',
        'DSEE Extreme digital sound enhancement',
        'Adaptive Sound Control',
        '40mm drivers'
      ]
    },
    warranty: '1 Year Manufacturer Warranty',
    delivery_time: '2-3 days',
    created_at: new Date().toISOString()
  },
  {
    id: 'e2',
    name: 'Apple AirPods Pro (2nd Generation)',
    description: 'Active Noise Cancellation, Transparency mode, Personalized Spatial Audio with dynamic head tracking',
    price: 17990,
    mrp: 24900,
    discount: 28,
    category: 'electronics',
    subcategory: 'headphones',
    image_url: 'https://images.unsplash.com/photo-1585565804112-f201f68c48b4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 75,
    rating: 4.7,
    reviews: 2380,
    seller: 'Maple Store',
    highlights: [
      'Active Noise Cancellation',
      'Transparency mode',
      'Personalized Spatial Audio',
      'Up to 6 hours of listening time',
      'MagSafe Charging Case'
    ],
    specifications: {
      'General': [
        'Color: White',
        'Type: True Wireless Earbuds',
        'Connectivity: Bluetooth 5.3',
        'Battery Life: Up to 30 hours with case'
      ],
      'Audio Features': [
        'H2 chip for advanced audio',
        'Custom high-excursion Apple driver',
        'Custom high dynamic range amplifier',
        'Adaptive EQ'
      ]
    },
    warranty: '1 Year Apple India Warranty',
    delivery_time: '1-2 days',
    created_at: new Date().toISOString()
  },

  // Electronics - Smartphones
  {
    id: 'e21',
    name: 'iPhone 15 Pro (256GB)',
    description: 'A17 Pro chip, 48MP main camera, Action button, Titanium design',
    price: 134900,
    mrp: 149900,
    discount: 10,
    category: 'electronics',
    subcategory: 'smartphones',
    image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1000',
    stock: 30,
    rating: 4.8,
    reviews: 856,
    seller: 'Maple Store',
    highlights: [
      'A17 Pro chip',
      '48MP main camera',
      'Titanium design',
      'Action button',
      'USB-C connector'
    ],
    specifications: {
      'General': [
        'Color: Natural Titanium',
        'Storage: 256GB',
        'Display: 6.1-inch Super Retina XDR',
        'Processor: A17 Pro chip'
      ],
      'Camera': [
        '48MP Main',
        '12MP Ultra Wide',
        '12MP Telephoto',
        '12MP Front Camera'
      ]
    },
    warranty: '1 Year Apple India Warranty',
    delivery_time: '1-2 days',
    created_at: new Date().toISOString()
  },
  {
    id: 'e22',
    name: 'Samsung Galaxy S24 Ultra 5G (512GB)',
    description: 'Snapdragon 8 Gen 3, 200MP camera, S Pen, AI features',
    price: 129999,
    mrp: 149999,
    discount: 13,
    category: 'electronics',
    subcategory: 'smartphones',
    image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=1000',
    stock: 25,
    rating: 4.6,
    reviews: 642,
    seller: 'RetailNet India',
    highlights: [
      'Snapdragon 8 Gen 3',
      '200MP main camera',
      'S Pen included',
      'AI features',
      '5000mAh battery'
    ],
    specifications: {
      'General': [
        'Color: Titanium Gray',
        'Storage: 512GB',
        'Display: 6.8-inch QHD+ Dynamic AMOLED 2X',
        'Processor: Snapdragon 8 Gen 3'
      ],
      'Camera': [
        '200MP Main',
        '12MP Ultra Wide',
        '50MP Telephoto',
        '12MP Front Camera'
      ]
    },
    warranty: '1 Year Samsung India Warranty',
    delivery_time: '2-3 days',
    created_at: new Date().toISOString()
  },

  // Fashion - Men's Collection
  {
    id: 'f1',
    name: 'Premium Cotton Kurta with Churidar',
    description: 'Handcrafted pure cotton kurta with matching churidar',
    price: 1499,
    mrp: 2499,
    discount: 40,
    category: 'fashion',
    subcategory: 'men',
    image_url: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=1000',
    stock: 100,
    rating: 4.2,
    reviews: 328,
    seller: 'FashionHub',
    highlights: [
      '100% Pure Cotton',
      'Regular Fit',
      'Full Sleeves',
      'Machine Washable',
      'Includes Churidar'
    ],
    specifications: {
      'General': [
        'Color: White',
        'Pattern: Solid',
        'Neck: Mandarin Collar',
        'Sleeve: Full Sleeves'
      ],
      'Material & Care': [
        '100% Cotton',
        'Machine Wash',
        'Gentle Cycle',
        'Do Not Bleach'
      ]
    },
    warranty: '7 days return policy',
    delivery_time: '4-5 days',
    created_at: new Date().toISOString()
  },
  {
    id: 'f2',
    name: 'Designer Nehru Jacket',
    description: 'Elegant silk blend Nehru jacket in royal blue',
    price: 2999,
    mrp: 4999,
    discount: 40,
    category: 'fashion',
    subcategory: 'men',
    image_url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=1000',
    stock: 85,
    rating: 4.4,
    reviews: 156,
    seller: 'FashionHub',
    highlights: [
      'Silk Blend Fabric',
      'Royal Blue Color',
      'Designer Buttons',
      'Perfect for Occasions',
      'Premium Stitching'
    ],
    specifications: {
      'General': [
        'Color: Royal Blue',
        'Pattern: Self Design',
        'Occasion: Festive',
        'Fit: Regular'
      ],
      'Material & Care': [
        'Silk Blend',
        'Dry Clean Only',
        'Store in Garment Cover',
        'Avoid Direct Sunlight'
      ]
    },
    warranty: '7 days return policy',
    delivery_time: '4-5 days',
    created_at: new Date().toISOString()
  },

  // Fashion - Women's Collection
  {
    id: 'f21',
    name: 'Banarasi Silk Saree',
    description: 'Handwoven Banarasi silk saree with intricate zari work',
    price: 5999,
    mrp: 8999,
    discount: 33,
    category: 'fashion',
    subcategory: 'women',
    image_url: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=1000',
    stock: 60,
    rating: 4.6,
    reviews: 245,
    seller: 'WeaverStudio',
    highlights: [
      'Pure Banarasi Silk',
      'Handwoven',
      'Zari Work',
      'Includes Blouse Piece',
      'Traditional Design'
    ],
    specifications: {
      'General': [
        'Color: Red & Gold',
        'Fabric: Pure Silk',
        'Border: Zari',
        'Length: 6.3 meters'
      ],
      'Material & Care': [
        'Pure Banarasi Silk',
        'Dry Clean Only',
        'Store in Muslin Cloth',
        'Avoid Moisture'
      ]
    },
    warranty: '7 days return policy',
    delivery_time: '6-7 days',
    created_at: new Date().toISOString()
  },
  {
    id: 'f22',
    name: 'Designer Anarkali Suit',
    description: 'Embroidered georgette Anarkali suit with dupatta',
    price: 4999,
    mrp: 6999,
    discount: 28,
    category: 'fashion',
    subcategory: 'women',
    image_url: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&q=80&w=1000',
    stock: 75,
    rating: 4.3,
    reviews: 189,
    seller: 'FashionHub',
    highlights: [
      'Georgette Fabric',
      'Heavy Embroidery',
      'Floor Length',
      'Includes Dupatta',
      'Designer Piece'
    ],
    specifications: {
      'General': [
        'Color: Navy Blue',
        'Style: Floor Length',
        'Work: Embroidered',
        'Occasion: Party Wear'
      ],
      'Material & Care': [
        'Georgette',
        'Dry Clean Only',
        'Store in Garment Cover',
        'Iron on Medium Heat'
      ]
    },
    warranty: '7 days return policy',
    delivery_time: '4-5 days',
    created_at: new Date().toISOString()
  }
];

export const categories: Category[] = [
  {
    id: 'cat1',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=1000',
    subcategories: [
      {
        id: 'sub1',
        name: 'Smartphones',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1000'
      },
      {
        id: 'sub2',
        name: 'Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000'
      }
    ]
  },
  {
    id: 'cat2',
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000',
    subcategories: [
      {
        id: 'sub3',
        name: 'Men',
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=1000'
      },
      {
        id: 'sub4',
        name: 'Women',
        image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=1000'
      }
    ]
  }
];