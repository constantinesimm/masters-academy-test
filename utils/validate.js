const Validator = require('jsonschema').Validator;
const v = new Validator();

const goodsSchema = {
  "type": "array",
  "items": {
    "properties": {
      "item": { "type": "string" },
      "type": { "type": "string" },
      "weight": { "type": "number" },
      "quantity": { "type": "number" },
      "pricePerKilo": {
        "type": "string",
        "pattern": /\$\d/
      },
      "pricePerItem": {
        "type": "string",
        "pattern": /\$\d/
      },
    }
  }
};

module.exports = goods => {
  const validateResult = v.validate(goods, goodsSchema);

  if (validateResult.errors.length) {
    console.error('Validate Error', validateResult.errors.map(err => err.stack));

    return false;
  } else return true;
};
