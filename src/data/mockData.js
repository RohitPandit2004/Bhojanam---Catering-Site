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
  { id: 'f4', name: 'Gulab Jamun', category: 'desserts', price: 80, veg: true, popular: true, desc: 'Warm milk dumplings soaked in cardamom-scented sugar syrup.', ingredients: 'Khoya, maida, sugar, cardamom, rose water', image: '/images/Gulab Jamun.jpeg' },
  { id: 'f5', name: 'Hara Bhara Kebab', category: 'starters', price: 140, veg: true, popular: false, desc: 'Spinach and green pea patties, shallow-fried till crisp.', ingredients: 'Spinach, green peas, potato, chana dal, spices', image:'/images/Hara-Bhara-Kabab.jpg'  },
  { id: 'f6', name: 'Chicken Seekh Kebab', category: 'starters', price: 190, veg: false, popular: false, desc: 'Minced chicken skewers grilled over coals with ginger and green chili.', ingredients: 'Minced chicken, ginger, green chili, roasted gram flour', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80' },
  { id: 'f7', name: 'Butter Naan', category: 'breads', price: 45, veg: true, popular: false, desc: 'Leavened flatbread baked in the tandoor, brushed with butter.', ingredients: 'Maida, yeast, yogurt, butter', image: '/images/Garlic-Butter-nan-recipe.jpg' },
  { id: 'f8', name: 'Tandoori Roti', category: 'breads', price: 30, veg: true, popular: false, desc: 'Whole-wheat flatbread, cooked over an open flame.', ingredients: 'Whole wheat flour, water, salt', image: '/images/Tandoori-Butter-Roti.jpg' },
  { id: 'f9', name: 'Masala Chai', category: 'beverages', price: 40, veg: true, popular: false, desc: 'Spiced milk tea brewed with cardamom, ginger and cloves.', ingredients: 'Tea leaves, milk, ginger, cardamom, cloves', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80' },
  { id: 'f10', name: 'Sweet Lassi', category: 'beverages', price: 60, veg: true, popular: true, desc: 'Chilled churned yogurt drink, lightly sweetened.', ingredients: 'Yogurt, sugar, cardamom', image: '/images/lassi-recipe.jpg' },
  { id: 'f11', name: 'Dal Makhani', category: 'mains', price: 160, veg: true, popular: false, desc: 'Black lentils simmered overnight with butter and cream.', ingredients: 'Black urad dal, rajma, butter, cream, tomato', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&q=80' },
  { id: 'f12', name: 'Mutton Rogan Josh', category: 'mains', price: 260, veg: false, popular: false, desc: 'Slow-braised mutton in a Kashmiri red chili and yogurt gravy.', ingredients: 'Mutton, yogurt, Kashmiri chili, fennel, ginger', image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=600&q=80' },
  { id: 'f13', name: 'Paneer Tikka', category: 'starters', price: 170, veg: true, popular: false, desc: 'Marinated paneer cubes grilled in a smoky tandoor spice mix.', ingredients: 'Paneer, yogurt, bell pepper, onion, tandoori masala', image: '/images/Paneer-Tikka.jpg' },
  { id: 'f14', name: 'Vegetable Samosa', category: 'starters', price: 80, veg: true, popular: false, desc: 'Crisp pastry parcels filled with spiced potatoes and peas.', ingredients: 'Potato, green peas, maida, cumin, garam masala', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80' },
  { id: 'f15', name: 'Aloo Tikki', category: 'starters', price: 90, veg: true, popular: false, desc: 'Shallow-fried spiced potato patties, crisp outside and soft within.', ingredients: 'Potato, green chili, coriander, chaat masala', image: '/images/Aloo tikki.jpg' },
  { id: 'f16', name: 'Shahi Paneer', category: 'mains', price: 190, veg: true, popular: false, desc: 'Paneer simmered in a mildly sweet, creamy cashew gravy.', ingredients: 'Paneer, cashew, cream, tomato, mild spices', image: '/images/ShahiPaneer.jpg' },
  { id: 'f17', name: 'Chana Masala', category: 'mains', price: 140, veg: true, popular: false, desc: 'Chickpeas simmered in a tangy onion-tomato masala.', ingredients: 'Chickpeas, onion, tomato, amchur, garam masala', image: '/images/Chana Masala.jpeg' },
  { id: 'f18', name: 'Butter Chicken', category: 'mains', price: 240, veg: false, popular: false, desc: 'Tandoori chicken simmered in a velvety butter-tomato gravy.', ingredients: 'Chicken, butter, tomato, cream, fenugreek', image: '/images/Nutter Chicken.jpeg' },
  { id: 'f19', name: 'Mutton Biryani', category: 'biryani', price: 280, veg: false, popular: false, desc: 'Tender mutton layered with fragrant basmati rice, dum-cooked.', ingredients: 'Mutton, basmati rice, saffron, fried onions, yogurt', image: '/images/Mutton Biryani.jpeg' },
  { id: 'f20', name: 'Jeera Rice', category: 'biryani', price: 110, veg: true, popular: false, desc: 'Basmati rice tempered with roasted cumin seeds.', ingredients: 'Basmati rice, cumin seeds, ghee, bay leaf', image: '/images/Jeera-_rice.jpg' },
  { id: 'f21', name: 'Vegetable Pulao', category: 'biryani', price: 120, veg: true, popular: false, desc: 'Lightly spiced rice cooked with mixed seasonal vegetables.', ingredients: 'Basmati rice, mixed vegetables, whole spices, ghee', image: '/images/Veg Pulao.jpg' },
  { id: 'f22', name: 'Garlic Naan', category: 'breads', price: 60, veg: true, popular: false, desc: 'Tandoor-baked naan topped with roasted garlic and coriander.', ingredients: 'Maida, yeast, garlic, butter, coriander', image: '/images/Garlic Naan.jpeg' },
  { id: 'f23', name: 'Laccha Paratha', category: 'breads', price: 55, veg: true, popular: false, desc: 'Flaky, layered flatbread cooked on the tawa.', ingredients: 'Whole wheat flour, ghee, maida', image: '/images/Lachha-Paratha.jpg' },
  { id: 'f24', name: 'Butter Roti', category: 'breads', price: 35, veg: true, popular: false, desc: 'Whole-wheat flatbread finished with a brush of butter.', ingredients: 'Whole wheat flour, water, butter', image: '/images/Butter Roti.jpg' },
  { id: 'f25', name: 'Rasmalai', category: 'desserts', price: 100, veg: true, popular: false, desc: 'Soft cottage-cheese dumplings soaked in sweetened, cardamom milk.', ingredients: 'Paneer, milk, sugar, cardamom, pistachio', image: '/images/Rasmalai.jpeg' },
  { id: 'f26', name: 'Kheer', category: 'desserts', price: 80, veg: true, popular: false, desc: 'Slow-simmered rice pudding finished with saffron and nuts.', ingredients: 'Rice, milk, sugar, saffron, cashew, pistachio', image: '/images/Kheer.jpeg' },
  { id: 'f27', name: 'Jalebi', category: 'desserts', price: 70, veg: true, popular: false, desc: 'Crisp, syrup-soaked spirals of fermented batter.', ingredients: 'Maida, yogurt, sugar syrup, saffron', image: '/images/jalebi.jpeg' },
  { id: 'f28', name: 'Mango Lassi', category: 'beverages', price: 80, veg: true, popular: false, desc: 'Chilled yogurt drink blended with ripe mango pulp.', ingredients: 'Yogurt, mango pulp, sugar', image: '/images/Mango Lassi.jpg' },
  { id: 'f29', name: 'Fresh Lime Soda', category: 'beverages', price: 60, veg: true, popular: false, desc: 'A refreshing mix of fresh lime, soda and a touch of salt or sugar.', ingredients: 'Lime, soda water, sugar/salt', image: '/images/Fresh Lime Soda.jpg' },
  { id: 'f30', name: 'Masala Buttermilk', category: 'beverages', price: 50, veg: true, popular: false, desc: 'Spiced, churned buttermilk with curry leaves and ginger.', ingredients: 'Buttermilk, ginger, curry leaves, roasted cumin', image: '/images/Masala Buttermilk.jpeg' },
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
