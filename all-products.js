import { products } from "./data/products.js";
import { itemPrice, discountDisplay } from './utils.js';
import { addToWishlistVerify,pageLoadWishlistDisplay,renderColor } from "./general.js";
import { cart } from "./cart.js";
import { wishlist } from "./wishlist.js";
import {hamburgerDisplay,harmburgerClose,myAccountDropdownDisplay,myAccountInnerDropdownDisplay,categoryInnerDropdownDisplay} from "./landing-page.js";


const jsProducts = document.querySelectorAll('.js-products');
jsProducts.forEach((product) => {
    product.addEventListener('click', () => {

        localStorage.setItem('productCategory',JSON.stringify(product.children[0].innerHTML))
        
    }); 
});

document.querySelector('.js-wishlist').innerHTML = wishlist.length;
document.querySelector('.js-cart').innerText = cart.length;

let categories=[];
products.forEach(product=>{
    if (!categories.includes(product.category)){
        categories.push(product.category)
    }
})

function returnProduct(index){
    let categoryProduct=[];
    products.forEach(product=>{
        if (product.category===categories[index]){
            categoryProduct.push(product)
        }

    })

    return categoryProduct
}

// for (let i=0; i<categories.length; i++){
// //     console.log( returnProduct(i))
// // }



function exploreSlider(){
    // const nxtBtn = document.querySelector('.f');
    // const preBtn = document.querySelector('.b');
    const productContainer = document.querySelector('.all-products');
    let containerDimensions = productContainer.getBoundingClientRect();
    

    
    function renderProducts(products,startindex){
       
        let exploreProductHTMl='';
        console.log(`lie ${products.length}`)
        function innerCode(){
            for (let i=0; i < products.length; i++){
                const product =products[i]
                const availableColors=Object.keys(product.image);
                console.log(product)
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
                
            }

            return exploreProductHTMl
        }
        if (startindex ===0){
            return  `
        
            <section class="our-products">
                    <div class="today">Our Products</div>
                    <div class="correct">
                        <div class="text-time">
                            <p class="text">${products[0].category}</p>
                        </div>
                    
                    </div>
                   
                     <div class="our-product-items">
                             ${innerCode()}
    
                     </div>
            </section>
    
            `
        }else{
            return `
                <section class="our-products">
                        <div class="correct">
                            <div class="text-time">
                                <p class="text">${products[0].category}</p>
                            </div>
                        
                        </div>
                    
                        <div class="our-product-items">
                                ${innerCode()}

                        </div>
                </section>

        `
        }
    
        // discountDisplay(products);
        
    };

    let gh='';
    for (let i=0; i<categories.length; i++){
            
            gh += renderProducts(returnProduct(i),i)
    }
    document.querySelector('.js-all-products').innerHTML=gh;
    // document.querySelectorAll('.our-product-item').forEach(element=>{
    
    //     element.addEventListener('click',()=>{
    //         const productId = element.dataset.productId;
    //         const productDetailsHTML="";
    //         for (let i=0; i <products.length; i++ ){
            
    //             if (productId===products[i].id){
    //                 const product = products[i];
    //                 localStorage.setItem('product',JSON.stringify(product));
    
    //                 window.location.href="product-details.html";
                    
    //             }
    //         }
            
    //       })
            
    // });
    // document.querySelectorAll('.our-product-item-name').forEach(element=>{
    
    //     element.addEventListener('click',()=>{
    //         const productId = element.dataset.productId;
    //         const productDetailsHTML="";
    //         for (let i=0; i <products.length; i++ ){
            
    //             if (productId===products[i].id){
    //                 const product = products[i];
    //                 localStorage.setItem('product',JSON.stringify(product));
    
    //                 window.location.href="product-details.html";
                    
    //             }
    //         }
            
    //       })
            
    // });
}



function colorDisplay(availableColors,id){

    if (availableColors.length>1){
        const code=`
        <div class="colors">
            <label class="color-option add-margin js-color-option-${id}">
                <input type="radio" name="color-${id}" value="0" data-product-id="${id}" checked>

                <span class="color-circle color1 js-color1-${id}"><span class="inner-color1 js-inner-color-${id}"></span></span>
            </label>

            <label class="color-option js-color-option-${id}">
                <input type="radio" name="color-${id}" value="1" data-product-id="${id}">

                <span class="color-circle color2 js-color2-${id}"><span class="inner-color2 js-inner-color-${id}"></span></span>
            </label>
    
        </div>
        `

        return code
    }else{
        return "" 
    }
}


exploreSlider()
renderColor();
pageLoadWishlistDisplay();
addToWishlistVerify();
hamburgerDisplay();
harmburgerClose();
myAccountDropdownDisplay();
myAccountInnerDropdownDisplay();
categoryInnerDropdownDisplay();

