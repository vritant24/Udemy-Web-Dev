var cat = require("cat-me");
var jokes = require("knock-knock-jokes");
var faker = require("faker");
console.log(jokes());
console.log(cat("grumpy"));

for(var i = 0; i < 10; i++) {
  console.log(faker.commerce.productName() + " - $" + faker.commerce.price());
}
