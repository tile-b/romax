const folija25 = require('./img/folija25.png');
const folija5 = require('./img/folija5.png');
const masinska = require('./img/masinski.png');
const baby10 = require('./img/babyroll10.png');
const baby25 = require('./img/babyroll25.png');

const productsData = [
  // --- RUČNI STREČ ---
  {
    id: 1,
    category: 'rucni',
    name: 'Ručna folija 2.5kg',
    img: folija25,
    priceRanges: [
      { min: 1, max: 9, price: 580 },
      { min: 10, max: 19, price: 530 },
      { min: 20, max: 30, price: 480 },
    ],
  },
  {
    id: 2,
    category: 'rucni',
    name: 'Ručna folija 5kg',
    img: folija5,
    priceRanges: [
      { min: 1, max: 9, price: 890 },
      { min: 10, max: 19, price: 810 },
      { min: 20, max: 30, price: 760 },
    ],
  },

  // --- MAŠINSKI STREČ ---
  {
    id: 3,
    category: 'masinski',
    name: 'Mašinska folija 16kg',
    img: masinska, // Placeholder image
    priceRanges: [
      { min: 1, max: 9, price: 3500 },
      { min: 10, max: 19, price: 3300 },
      { min: 20, max: 30, price: 3100 },
    ],
  },

  // --- BABY ROLLS ---
  {
    id: 4,
    category: 'baby',
    name: 'Baby Rolls 10cm',
    img: baby10, // Placeholder image
    priceRanges: [
      { min: 1, max: 19, price: 150 },
      { min: 20, max: 49, price: 130 },
      { min: 50, max: 100, price: 110 },
    ],
  },
  {
    id: 5,
    category: 'baby',
    name: 'Baby Rolls 25cm',
    img: baby25, // Placeholder image
    priceRanges: [
      { min: 1, max: 19, price: 250 },
      { min: 20, max: 49, price: 230 },
      { min: 50, max: 100, price: 210 },
    ],
  },
];

export default productsData;
