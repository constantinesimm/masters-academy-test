const getGoodPrice = str => +str.replace(/\$/, '').replace(',', '.');
const itemField = item => item.pricePerKilo !== undefined ? getGoodPrice(item.pricePerKilo) : getGoodPrice(item.pricePerItem);
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const filterAndReduce = (goods, itemName, itemField) => {
  return goods
      .filter(goodItem => goodItem.item === itemName)
      .reduce((acc, curr) => acc + curr[itemField], 0);
};

const alphabeticalSort = data => data.sort((a, b) => a.item.localeCompare(b.item));

const costSort = data => data.sort((a, b) => itemField(a) - itemField(b));

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
        .reduce((acc, curr) => acc + itemField(curr) * 100, 0);

    resultStr += `${ capitalize(good) }s - ${ totalGoodPrice / 100 }, `
  }

  return resultStr;
};


module.exports = {
  filterAndReduce,
  alphabeticalSort,
  costSort,
  orangesWithLeastPrice,
  goodsCost
}
