console.log('lkoi')
import { cart } from "./cart.js";
import { percentageCalculator} from './utils.js';
import {products } from "./data/products.js";
console.log(cart)
document.querySelector('.js-cart').innerText = cart.length;
function matchId(id){
    for(let i=0; i<=products.length; i++){
            const product = products[i]
            if (product.id===id){
                return product
            } else{
                continue
            }
        
    }
}

let cartCode="";
let total=0;
cart.forEach(productId=>{
        
    const product = matchId(productId)
    
    const availableColors = Object.keys(product.image);
    cartCode+=`
        <div class="product_">
            <div class="image">
                <img src="images/Product/${product.name}/${availableColors[0]}/${product.image[availableColors[0]][0]}" alt="">
            </div>
            <div class="product-name-price">
                <div class="name">${product.name}</div>
                <div>  $${percentageCalculator(product.price.discount,product.price.actualPrice)}</div>
            </div>
        </div>
    `

    // console.log(cartCode)

    total += Number(percentageCalculator(product.price.discount,product.price.actualPrice))
    console.log()

})



document.querySelector('.products_').innerHTML=cartCode;
document.querySelector('.js-subtotal').innerText = `$${total.toFixed(2)}`
document.querySelector('.js-total').innerText = `$${total.toFixed(2)}`