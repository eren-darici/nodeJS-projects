// object property shorthand

const name = 'Eren';
const userAge = 19;

const user = {
    name: name,
    age: userAge,
    location: 'Eskişehir'
}

console.log(user);


const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

const {label: productLabel, stock} = product;
console.log(productLabel);
console.log(stock);