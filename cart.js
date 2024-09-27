
import { percentageCalculator, remove } from './utils.js';
import {products } from "./data/products.js";
export let cart=JSON.parse(localStorage.getItem('cart'))? JSON.parse(localStorage.getItem('cart')) : []; 
import {hamburgerDisplay,harmburgerClose,myAccountDropdownDisplay,myAccountInnerDropdownDisplay,categoryInnerDropdownDisplay} from "./landing-page.js";




export function cartDisplay(){
    document.querySelector('.js-cart').innerText = cart.length;
    let cartCode="";
    let total=0;
    cart.forEach(productId=>{
        
        const product = matchId(productId)
        
        const availableColors = Object.keys(product.image);
        cartCode+=`<div class="product-row" data-product-id=${product.id}>
                        <div class="product-and-image">
                            <div class="product-img">
                                <img src="images/Product/${product.name}/${availableColors[0]}/${product.image[availableColors[0]][0]}" alt="">
                            </div>
        
                            <div class="style-name">${product.name}</div>
                        </div>
        
                        <div class="price-col">
                             $${percentageCalculator(product.price.discount,product.price.actualPrice)}
                        </div>
        
                        <div class="quantity-input">
                            <div class="quan-inp">
                                <div class="input">
                                    <input type="number" max="100" min="0" value="1" name="" id="" class="inp">
                                </div>
                                <div class="increment-decrement">
                                    <i class="fa-solid fa-chevron-up up" data-product-id="me"></i>
                                    <i class="fa-solid fa-chevron-down down" data-product-id="me"></i>
                                </div>
                            </div>
                        </div>
        
                        <div class="subtotal-col">
                            $${percentageCalculator(product.price.discount,product.price.actualPrice)}
                        </div>
                        <div class="delete">
                            <button class="js-delete style-delete"> Delete </button>

                            <div class="js-delete  style-close"> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></div>
                        </div>
                    </div>`
    
    total += Number(percentageCalculator(product.price.discount,product.price.actualPrice))
    
    })
    document.querySelector('.js-product').innerHTML=cartCode;
    
    
    updateCart();
    
    document.querySelectorAll('.quan-inp').forEach(inputElement=>{
        const up = inputElement.querySelector('.up')
        const down = inputElement.querySelector('.down')
        const input = inputElement.querySelector('.inp')
            up.addEventListener('click',()=>{
               input.stepUp();
               quantity=input.value
                
            })
            input.addEventListener('keydown',(event)=>{
                if (event.key==="Enter"){
                    updateCart()
                }
            })
            
            down.addEventListener('click',()=>{
                input.stepDown()
                quantity=input.value
                // console.log(quantity)
             })
    })
    
    
    function updateCart(){
        let total =0;
            document.querySelectorAll('.product-row').forEach(product=>{
                const productId = product.dataset.productId
                const price = (product.querySelector('.price-col').innerText).replace("$","").trim()
                const quantity = product.querySelector('.inp').value
                product.querySelector('.subtotal-col').innerHTML = `$${(price * quantity).toFixed(2)}`
                product.querySelector('.js-delete').addEventListener('click',()=>{
                
                    cart = remove(cart,productId);
                   
                    localStorage.setItem('cart',JSON.stringify(cart))
                    cartDisplay()
                })
                total += (price * quantity)
            })
            
            document.querySelector('.js-subtotal').innerText = `$${total.toFixed(2)}`
            document.querySelector('.js-total').innerText = `$${total.toFixed(2)}`
     
    }
    
    document.querySelector('.js-subtotal').innerText = `$${total.toFixed(2)}`
    document.querySelector('.js-total').innerText = `$${total.toFixed(2)}`
    
    
    document.querySelector('.update').addEventListener('click',()=>{
        updateCart()
    })

    const jsProducts = document.querySelectorAll('.js-products');
    jsProducts.forEach((product) => {
    product.addEventListener('click', () => {

        localStorage.setItem('productCategory',JSON.stringify(product.children[0].innerHTML))
        
    }); 
    });

    hamburgerDisplay();
harmburgerClose();
myAccountDropdownDisplay();
myAccountInnerDropdownDisplay();
categoryInnerDropdownDisplay();
}

export function matchId(id){
    for(let i=0; i<=products.length; i++){
            const product = products[i]
            if (product.id===id){
                return product
            } else{
                continue
            }
        
    }
}
