import { addToWishlist, wishlist, wishlistDisplay } from './wishlist.js';
import { percentageCalculator , itemPrice, discountDisplay,color,colorColored,colorDisplay } from './utils.js';
import { products} from "./data/products.js";
import { cart } from './cart.js';

export function renderLandingPage(){
    document.querySelector('.js-wishlist').innerHTML = wishlist.length;
document.querySelector('.js-cart').innerText = cart.length;



const jsProducts = document.querySelectorAll('.js-products');
jsProducts.forEach((product) => {
    product.addEventListener('click', () => {
        localStorage.setItem('productCategory',JSON.stringify(product.children[0].innerHTML))
    }); 
});


function exploreSlider(){
    
    const nxtBtn = document.querySelector('.f');
    const preBtn = document.querySelector('.b');
    const productContainer = document.querySelector('.our-product-items');
    let containerDimensions = productContainer.getBoundingClientRect();
    let containerWidth = containerDimensions.width;
    let productNumber=0;
    let screenNumber=containerWidth<768?4:containerWidth<900?6:8;
    
    
    function renderProducts(products,startindex){
        
        let exploreProductHTMl='';
        for (let i=startindex; i < startindex+screenNumber; i++){
            const product = products[i];
            
            const availableColors=Object.keys(product.image);
            if (i%2==0){
            
            const exploreProductCode = `
            <div class="our-product-item-and-description" data-product-id="${product.id}">
                <div class="our-product-item" data-product-id="${product.id}">
                    <div class="our-product-item-img js-product-image-${product.id}">
                        <img src="images/Product/${product.name}/${availableColors[0]}/${product.image[availableColors[0]][0]}" alt="">
                    </div>
                    <div class="add-to-cart">
                        <button class="js-add-cart-${product.id}" data-product-id=${product.id}><img src="./images/icons/Cart2.svg" alt="">Add to Cart</button>
                    </div>
                </div>
    
                <div class="our-product-item-description">
                    <div class="our-product-item-name" data-product-id="${product.id}">
                        ${product.name}
                    </div>
    
                    <div class="our-product-item-price">
                        ${itemPrice(product)}
                    </div>
    
                    <div class="rating">
                        <div class="rating-img">
                            <img src="/images/ratings/${product.rating}.png" alt="">
                        </div>
                        
                        <p>(${product.count})</p>
                    </div>

                     ${colorDisplay(availableColors,product.id)}
                    
                </div>
                <div class="overlays">
                    <div class="discount js-discount-${product.id}">-${product.price.discount}
                    </div>
                    <div class="favourite-view">
                        <div class="favourite js-favourite-${product.id}" data-product-id="${product.id}">
                            <img src="./images/icons/heart.svg" alt="">
                        </div>
                        <div class="view">
                            <img src="./images/icons/Quick View.svg" alt="">
                        </div>
                    </div>

                    <div class="confirm-added js-added-${product.id}">
                        Added to Wishlist
                    </div>
                </div>
            </div>
            `
            exploreProductHTMl+=exploreProductCode;
            // console.log(exploreProductHTMl)
            } else{
            const exploreProductCode = `
            <div class="our-product-item-and-description" data-product-id="${product.id}">
                <div class="our-product-item">
                    <div class="our-product-item-img js-product-image-${product.id}">
                       <img src="images/Product/${product.name}/${availableColors[0]}/${product.image[availableColors[0]][0]}" alt="">
                    </div>
                    <div class="add-to-cart">
                        <button class="js-add-cart-${product.id}" data-product-id=${product.id}><img src="./images/icons/Cart2.svg" alt="">Add to Cart</button>
                    </div>
                </div>
    
                <div class="our-product-item-description">
                    <div class="our-product-item-name">
                        ${product.name}
                    </div>
    
                    <div class="our-product-item-price">
                        ${itemPrice(product)}
                    </div>
    
                    <div class="rating">
                        <div class="rating-img">
                            <img src="/images/ratings/${product.rating}.png" alt="">
                        </div>
                        
                        <p>(${product.count})</p>
                    </div>

                    ${colorDisplay(availableColors,product.id)}
                  
                    
                </div>
                <div class="overlays">
                    <div class="discount js-discount-${product.id}">-${product.price.discount}
                    </div>
                    <div class="favourite-view">
                        <div class="favourite js-favourite-${product.id}" data-product-id="${product.id}">
                            <img src="./images/icons/heart.svg" alt="">
                        </div>
                        <div class="view">
                            <img src="./images/icons/Quick View.svg" alt="">
                        </div>
                    </div>

                    <div class="confirm-added js-added-${product.id}">
                        Added to Wishlist
                    </div>
                </div>
            </div>
            `
            
            exploreProductHTMl+=exploreProductCode;
            }
            
        }
        // console.log(exploreProductHTMl)
        document.querySelector('.our-product-items').innerHTML=exploreProductHTMl;
        discountDisplay(products)
        
    };

    nxtBtn.addEventListener('click', () => {
        
        let exploreProductHTMl='';
     
        productContainer.scrollLeft += containerWidth;
        if ((productNumber+screenNumber)<(products.length-screenNumber)){
            
            productNumber+=screenNumber
        }else{
            productNumber
        
        }
        
        renderProducts(products,productNumber);
        // addToWishlistVerify();
        renderColor();
        pageLoadCartDisplay();
     });
    
    preBtn.addEventListener('click', () => {
        let exploreProductHTMl='';
        productContainer.scrollLeft -= containerWidth;
        if (productNumber===0){
            productNumber=0;
        }else{
            productNumber-=screenNumber
        }
        renderProducts(products,productNumber);
        // addToWishlistVerify();
        renderColor();
        pageLoadCartDisplay();
    });

    window.addEventListener('resize', () => {
        containerDimensions = productContainer.getBoundingClientRect();
        containerWidth = containerDimensions.width;
        screenNumber = containerWidth < 768 ? 4 : containerWidth < 900 ? 6 : 8;
        
        renderProducts(products,productNumber);
        // addToWishlistVerify();
        renderColor();
        pageLoadWishlistDisplay();
    });

    renderProducts(products,productNumber)
    pageLoadWishlistDisplay();

    document.querySelectorAll('.our-product-item').forEach(element=>{
    
        element.addEventListener('click',()=>{
            const productId = element.dataset.productId;
            const productDetailsHTML="";
            for (let i=0; i <products.length; i++ ){
            
                if (productId===products[i].id){
                    const product = products[i];
                    localStorage.setItem('product',JSON.stringify(product));
    
                    window.location.href="product-details.html";
                    
                }
            }
            
          })
            
    });
    document.querySelectorAll('.our-product-item-name').forEach(element=>{
    
        element.addEventListener('click',()=>{
            const productId = element.dataset.productId;
            const productDetailsHTML="";
            for (let i=0; i <products.length; i++ ){
            
                if (productId===products[i].id){
                    const product = products[i];
                    localStorage.setItem('product',JSON.stringify(product));
    
                    window.location.href="product-details.html";
                    
                }
            }
            
          })
            
    });
}

exploreSlider();
renderColor();
pageLoadWishlistDisplay();
addToWishlistVerify();




}

export function addToWishlistVerify(){
    document.querySelectorAll('.favourite').forEach(element=>{
        element.addEventListener('click',()=>{   
            addToWishlist(element.dataset.productId)
        })
    });
}


export function pageLoadWishlistDisplay(){
    products.forEach(product=>{
        wishlistDisplay(product.id);
        document.querySelectorAll(`.js-add-cart-${product.id}`).forEach(cartItem=>{
            cartItem.addEventListener('click',()=>{
                const productId=cartItem.dataset.productId
                console.log(cartItem)
                cartCheck(cartItem,productId)
                console.log(cartItem)
    
    
            })
        })
    })
}

export function cartCheck(cartItem,id){
    if (!cart.includes(id)){
        cartItem.innerHTML=`<img src="./images/icons/Cart2.svg" alt="">Added to Cart`
        cart.push(id)
    } else{
        cartItem.innerHTML=`<img src="./images/icons/Cart2.svg" alt="">Already in Cart`
        setTimeout(()=>{
            cartItem.innerHTML=`<img src="./images/icons/Cart2.svg" alt="">Added to Cart`
        },2000);
        console.log(cart)
        console.log(id)
    }
    localStorage.setItem('cart',JSON.stringify(cart))

    document.querySelector('.js-cart').innerText = cart.length;
}


export function renderColor(){
    products.forEach(product=>{
        const availableColors=Object.keys(product.image);
        colorColored(availableColors,product);
        
    })
}