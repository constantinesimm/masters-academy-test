const getGoodPrice = str => +str.replace(/\$/, '').replace(',', '.');
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
const itemQuant = item => item.quantity !== undefined ? item.quantity : item.weight;
const itemPricePerField = item => item.pricePerKilo !== undefined ? getGoodPrice(item.pricePerKilo) : getGoodPrice(item.pricePerItem);


const filterAndReduce = (goods, itemName, itemField) => {
  return goods
      .filter(goodItem => goodItem.item === itemName)
      .reduce((acc, curr) => acc + curr[itemField], 0);
};

const alphabeticalSort = data => data.sort((a, b) => a.item.localeCompare(b.item));

const costSort = data => data.sort((a, b) => itemPricePerField(a) - itemPricePerField(b));

const orangesWithLeastPrice = data => {
  const orangeItem = data
      .filter(goodItem => goodItem.item === 'orange')
      .sort((a, b) => getGoodPrice(a.pricePerKilo) - getGoodPrice(b.pricePerKilo))
      .shift();

  return orangeItem.type;
};

const goodsCost = data => {
  const uniqueItems = [...new Set(data.map(good => good.item))];
  let resultStr = '';

  for (let good of uniqueItems) {
    const totalGoodPrice = data
        .filter(goodItem => goodItem.item === good)
        .reduce((acc, curr) => acc + (itemPricePerField(curr) * 100) * itemQuant(curr), 0);

    resultStr += `${ capitalize(good) }s - ${ totalGoodPrice / 100 }, `
  }

  return resultStr.substring(0, resultStr.length - 2);
};


module.exports = {
  filterAndReduce,
  alphabeticalSort,
  costSort,
  orangesWithLeastPrice,
  goodsCost
}
