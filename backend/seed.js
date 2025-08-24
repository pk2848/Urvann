const mongoose = require('mongoose');
const Plant = require('./models/Plant');
// require('dotenv').config();
const MONGO_URI = 'mongodb://localhost:27017/plantstore';

const plantsData = [
  { name: 'Money Plant', price: 12.99, categories: ['Indoor', 'Home Decor'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Money+Plant' },
  { name: 'Snake Plant', price: 15.50, categories: ['Indoor', 'Air Purifying'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Snake+Plant' },
  { name: 'ZZ Plant', price: 18.00, categories: ['Indoor', 'Low Maintenance'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=ZZ+Plant' },
  { name: 'Pothos', price: 10.00, categories: ['Indoor', 'Trailing'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Pothos' },
  { name: 'Fiddle Leaf Fig', price: 45.00, categories: ['Indoor', 'Statement Plant'], stockAvailability: false, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Fiddle+Leaf+Fig' },
  { name: 'Aloe Vera', price: 8.75, categories: ['Indoor', 'Medicinal', 'Succulent'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Aloe+Vera' },
  { name: 'Spider Plant', price: 9.50, categories: ['Indoor', 'Air Purifying'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Spider+Plant' },
  { name: 'Peace Lily', price: 14.25, categories: ['Indoor', 'Flowering'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Peace+Lily' },
  { name: 'Monstera Deliciosa', price: 30.00, categories: ['Indoor', 'Tropical'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Monstera+Deliciosa' },
  { name: 'Cactus', price: 7.00, categories: ['Indoor', 'Succulent', 'Low Maintenance'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Cactus' },
  { name: 'Rosemary', price: 6.50, categories: ['Outdoor', 'Herbs'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Rosemary' },
  { name: 'Lavender', price: 9.00, categories: ['Outdoor', 'Flowering', 'Herbs'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Lavender' },
  { name: 'Sunflower', price: 5.00, categories: ['Outdoor', 'Flowering'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Sunflower' },
  { name: 'Tomato Plant', price: 7.25, categories: ['Outdoor', 'Edible'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Tomato+Plant' },
  { name: 'Mint', price: 6.00, categories: ['Outdoor', 'Herbs'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Mint' },
  { name: 'Jade Plant', price: 11.00, categories: ['Indoor', 'Succulent'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Jade+Plant' },
  { name: 'Orchid', price: 25.00, categories: ['Indoor', 'Flowering'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Orchid' },
  { name: 'Fern', price: 13.00, categories: ['Indoor', 'Tropical'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Fern' },
  { name: 'Rubber Plant', price: 22.00, categories: ['Indoor', 'Statement Plant'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Rubber+Plant' },
  { name: 'Prayer Plant', price: 16.00, categories: ['Indoor', 'Patterned Leaves'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Prayer+Plant' },
  { name: 'Bird of Paradise', price: 55.00, categories: ['Indoor', 'Tropical', 'Statement Plant'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Bird+of+Paradise' },
  { name: 'String of Pearls', price: 10.50, categories: ['Indoor', 'Succulent', 'Trailing'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=String+of+Pearls' },
  { name: 'Echeveria', price: 7.50, categories: ['Indoor', 'Succulent'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Echeveria' },
  { name: 'Haworthia', price: 8.00, categories: ['Indoor', 'Succulent', 'Low Maintenance'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Haworthia' },
  { name: 'Lithops', price: 9.00, categories: ['Indoor', 'Succulent', 'Unique'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Lithops' },
  { name: 'Air Plant', price: 6.00, categories: ['Indoor', 'Low Maintenance', 'Unique'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Air+Plant' },
  { name: 'Venus Flytrap', price: 15.00, categories: ['Indoor', 'Carnivorous'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Venus+Flytrap' },
  { name: 'Pitcher Plant', price: 20.00, categories: ['Indoor', 'Carnivorous'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Pitcher+Plant' },
  { name: 'Bonsai Tree', price: 75.00, categories: ['Indoor', 'Outdoor', 'Specialty'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Bonsai+Tree' },
  { name: 'Bamboo Palm', price: 28.00, categories: ['Indoor', 'Air Purifying', 'Tropical'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Bamboo+Palm' },
  { name: 'Areca Palm', price: 32.00, categories: ['Indoor', 'Air Purifying', 'Tropical'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Areca+Palm' },
  { name: 'Dracaena', price: 19.00, categories: ['Indoor', 'Air Purifying'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Dracaena' },
  { name: 'Croton', price: 17.00, categories: ['Indoor', 'Colorful Leaves'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Croton' },
  { name: 'Coleus', price: 8.00, categories: ['Outdoor', 'Colorful Leaves'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Coleus' },
  { name: 'Petunia', price: 4.00, categories: ['Outdoor', 'Flowering'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Petunia' },
  { name: 'Marigold', price: 3.50, categories: ['Outdoor', 'Flowering'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Marigold' },
  { name: 'Zinnia', price: 4.50, categories: ['Outdoor', 'Flowering'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Zinnia' },
  { name: 'Basil', price: 5.00, categories: ['Outdoor', 'Herbs', 'Edible'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Basil' },
  { name: 'Thyme', price: 5.50, categories: ['Outdoor', 'Herbs', 'Edible'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Thyme' },
  { name: 'Oregano', price: 5.25, categories: ['Outdoor', 'Herbs', 'Edible'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Oregano' },
  { name: 'Bell Pepper', price: 6.00, categories: ['Outdoor', 'Edible'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Bell+Pepper' },
  { name: 'Cucumber', price: 6.50, categories: ['Outdoor', 'Edible'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Cucumber' },
  { name: 'Strawberry', price: 7.00, categories: ['Outdoor', 'Edible'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Strawberry' },
  { name: 'Blueberry Bush', price: 25.00, categories: ['Outdoor', 'Edible'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Blueberry+Bush' },
  { name: 'Lemon Tree', price: 60.00, categories: ['Outdoor', 'Edible', 'Fruit Tree'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Lemon+Tree' },
  { name: 'Fig Tree', price: 40.00, categories: ['Outdoor', 'Edible', 'Fruit Tree'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Fig+Tree' },
  { name: 'Grape Vine', price: 35.00, categories: ['Outdoor', 'Edible', 'Fruit'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Grape+Vine' },
  { name: 'Rose Bush', price: 20.00, categories: ['Outdoor', 'Flowering'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Rose+Bush' },
  { name: 'Hydrangea', price: 28.00, categories: ['Outdoor', 'Flowering'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Hydrangea' },
  { name: 'Azalea', price: 22.00, categories: ['Outdoor', 'Flowering'], stockAvailability: true, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Azalea' }
];

(async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for seeding');

    await Plant.deleteMany({});
    console.log('Existing plants removed');

    await Plant.insertMany(plantsData);
    console.log(`${plantsData.length} plants seeded successfully!`);

  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
})();
