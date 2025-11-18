const folija25 = require('./img/folija25.png');
const folija5 = require('./img/folija5.png');

const productsData = [
  {
    id: 1,
    name: 'Streč folija 2.5kg',
    img: folija25,
    priceRanges: [
      { min: 1, max: 9, price: 580 },
      { min: 10, max: 19, price: 530 },
      { min: 20, max: 30, price: 480 },
    ],
  },
  {
    id: 2,
    name: 'Streč folija 5kg',
    img: folija5,
    priceRanges: [
      { min: 1, max: 9, price: 890 },
      { min: 10, max: 19, price: 810 },
      { min: 20, max: 30, price: 760 },
    ],
  },
];

export default productsData;
