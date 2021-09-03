const goods = require('./data/goods.json');
const validate = require('./utils/validate');
const {
  filterAndReduce,
  alphabeticalSort,
  costSort,
  orangesWithLeastPrice,
  goodsCost
} = require('./utils/funcs');

if (!validate(goods)) return;

console.log(`Watermelons - ${ filterAndReduce(goods, 'watermelon', 'quantity') }`);
console.log(`Apples - ${ filterAndReduce(goods, 'apple', 'weight') }`);
console.log(alphabeticalSort(goods));
console.log(`The cheapest orange type is: ${ orangesWithLeastPrice(goods) }`);
console.log(costSort(goods));
console.log(goodsCost(goods));
