const folija25 = require('./img/folija25.png');
const folija5 = require('./img/folija5.png');
const masinska = require('./img/masinski.png');
const baby10 = require('./img/babyrol10.png');
const baby15 = require('./img/babyrol15.png');
const baby15v2 = require('./img/babyrol15v2.png');
const baby10v2 = require('./img/babyrol10v2.png');

const productsData = [
  // --- RUČNI STREČ ---
  {
    id: 1,
    category: 'rucni',
    name: 'Ručna folija 2.5kg',
    img: folija25,
    type: 'standard',
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
    type: 'standard',
    priceRanges: [
      { min: 1, max: 9, price: 1050 },
      { min: 10, max: 19, price: 950 },
      { min: 20, max: 30, price: 900 },
    ],
  },

  // --- MAŠINSKI STREČ ---
  {
    id: 3,
    category: 'masinski',
    name: 'Standardna Mašinska folija 16kg',
    img: masinska,
    type: 'informative',
    pricePerKg: 167,
    //palletDetails: '48 rolni na paleti',
    //description: 'Prodaje se isključivo paletno.',
  },

  // --- BABY ROLLS ---

  // Box of 25
  {
    id: 4,
    category: 'baby',
    name: 'Baby Rolls 10cm (Kutija 25 kom)',
    img: baby10,
    type: 'box',
    piecesPerBox: 25,
    pricePerPiece: 164,
    width: '10cm',
  },

  // Box of 45
  {
    id: 5,
    category: 'baby',
    name: 'Baby Rolls 10cm (Kutija 45 kom)',
    img: baby10v2,
    type: 'box',
    piecesPerBox: 45,
    pricePerPiece: 149,
    width: '10cm',
  },
  {
    id: 6,
    category: 'baby',
    name: 'Baby Rolls 15cm (Kutija 25 kom)',
    img: baby15, // Using same image or placeholder
    type: 'box',
    piecesPerBox: 25,
    pricePerPiece: 194,
    width: '15cm',
  },
  {
    id: 7,
    category: 'baby',
    name: 'Baby Rolls 15cm (Kutija 45 kom)',
    img: baby15v2, // Using same image or placeholder if needed
    type: 'box',
    piecesPerBox: 45,
    pricePerPiece: 179,
    width: '15cm',
  },
];

export default productsData;
