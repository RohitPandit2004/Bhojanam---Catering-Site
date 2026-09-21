// Static mock data standing in for a backend API.
// Food images use a warm food-photography placeholder service.

export const categories = [
  { id: 'starters', name: 'Starters', blurb: 'Small plates to open the meal' },
  { id: 'mains', name: 'Main Course', blurb: 'The heart of the thali' },
  { id: 'biryani', name: 'Rice & Biryani', blurb: 'Layered, slow-cooked rice' },
  { id: 'breads', name: 'Breads', blurb: 'Fresh off the tawa and tandoor' },
  { id: 'desserts', name: 'Desserts', blurb: 'A sweet close to the meal' },
  { id: 'beverages', name: 'Beverages', blurb: 'Cooling drinks and chai' },
]

export const foods = [
  { id: 'f1', name: 'Paneer Butter Masala', category: 'mains', price: 180, veg: true, popular: true, desc: 'Rich tomato-cashew gravy with soft paneer cubes, finished with cream.', ingredients: 'Paneer, tomato, butter, cashew, cream, garam masala', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80' },
  { id: 'f2', name: 'Veg Hyderabadi Biryani', category: 'biryani', price: 150, veg: true, popular: true, desc: 'Basmati rice layered with spiced vegetables and saffron, dum-cooked.', ingredients: 'Basmati rice, mixed vegetables, saffron, fried onions, mint', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80' },
  { id: 'f3', name: 'Chicken Dum Biryani', category: 'biryani', price: 220, veg: false, popular: true, desc: 'Marinated chicken layered with fragrant rice, slow-cooked in a sealed handi.', ingredients: 'Chicken, basmati rice, yogurt, saffron, fried onions', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&q=80' },
  { id: 'f4', name: 'Gulab Jamun', category: 'desserts', price: 80, veg: true, popular: true, desc: 'Warm milk dumplings soaked in cardamom-scented sugar syrup.', ingredients: 'Khoya, maida, sugar, cardamom, rose water', image: 'https://images.unsplash.com/photo-1666190092208-2d0b5c9f89e6?w=600&q=80' },
  { id: 'f5', name: 'Hara Bhara Kebab', category: 'starters', price: 140, veg: true, popular: false, desc: 'Spinach and green pea patties, shallow-fried till crisp.', ingredients: 'Spinach, green peas, potato, chana dal, spices', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80' },
  { id: 'f6', name: 'Chicken Seekh Kebab', category: 'starters', price: 190, veg: false, popular: false, desc: 'Minced chicken skewers grilled over coals with ginger and green chili.', ingredients: 'Minced chicken, ginger, green chili, roasted gram flour', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80' },
  { id: 'f7', name: 'Butter Naan', category: 'breads', price: 45, veg: true, popular: false, desc: 'Leavened flatbread baked in the tandoor, brushed with butter.', ingredients: 'Maida, yeast, yogurt, butter', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600&q=80' },
  { id: 'f8', name: 'Tandoori Roti', category: 'breads', price: 30, veg: true, popular: false, desc: 'Whole-wheat flatbread, cooked over an open flame.', ingredients: 'Whole wheat flour, water, salt', image: 'https://images.unsplash.com/photo-1619221882160-16324e94a4d4?w=600&q=80' },
  { id: 'f9', name: 'Masala Chai', category: 'beverages', price: 40, veg: true, popular: false, desc: 'Spiced milk tea brewed with cardamom, ginger and cloves.', ingredients: 'Tea leaves, milk, ginger, cardamom, cloves', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80' },
  { id: 'f10', name: 'Sweet Lassi', category: 'beverages', price: 60, veg: true, popular: true, desc: 'Chilled churned yogurt drink, lightly sweetened.', ingredients: 'Yogurt, sugar, cardamom', image: 'https://images.unsplash.com/photo-1626200926749-33607a49ec5b?w=600&q=80' },
  { id: 'f11', name: 'Dal Makhani', category: 'mains', price: 160, veg: true, popular: false, desc: 'Black lentils simmered overnight with butter and cream.', ingredients: 'Black urad dal, rajma, butter, cream, tomato', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&q=80' },
  { id: 'f12', name: 'Mutton Rogan Josh', category: 'mains', price: 260, veg: false, popular: false, desc: 'Slow-braised mutton in a Kashmiri red chili and yogurt gravy.', ingredients: 'Mutton, yogurt, Kashmiri chili, fennel, ginger', image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=600&q=80' },
]

export const eventTypes = ['Wedding', 'Birthday', 'Corporate', 'Anniversary', 'Other']
export const serviceTypes = ['Buffet', 'Table Service', 'Food Delivery']
export const pricePerGuest = 450

export const seedOrders = [
  { id: 'BH1024', items: [{ foodId: 'f2', qty: 2 }, { foodId: 'f1', qty: 1 }], total: 480, date: '2026-09-15', status: 'Confirmed' },
  { id: 'BH1031', items: [{ foodId: 'f4', qty: 4 }], total: 320, date: '2026-09-18', status: 'Preparing' },
]

export const seedReservations = [
  { id: 'CR204', eventType: 'Birthday', eventDate: '2026-09-25', guests: 150, location: 'Rajahmundry, AP', serviceType: 'Buffet', menu: ['f1', 'f2', 'f4', 'f9'], amount: 67500, status: 'Pending Confirmation' },
  { id: 'CR198', eventType: 'Wedding', eventDate: '2026-10-12', guests: 250, location: 'Hyderabad, TS', serviceType: 'Table Service', menu: ['f3', 'f12', 'f7', 'f4', 'f10'], amount: 112500, status: 'Confirmed' },
]

export const orderStatusFlow = ['Placed', 'Confirmed', 'Preparing', 'Ready', 'Delivered']
export const reservationStatusFlow = ['Requested', 'Confirmed', 'Preparing', 'Completed']
