import { products } from "./data/products.js";
import { percentageCalculator, itemPrice } from './utils.js';
// import { addToWishlist,wishlist,wishlistDisplay} from "./wishlist.js";
    let checkList=[];
    for(let i=0;i<20;i++){
    const randomInteger = Math.floor(Math.random() * (10));
    checkList.push(randomInteger)
}


function unique(array){
    const result = [];
    array.forEach(integer=>{
        if (result.findIndex(int=>{
            if (int===integer){
                return -1
            }  
        })===-1){
            result.push(integer)
        } 
    })
    return result
}

let bestSelling='';
for(let i=0;i<7;i++){
    const product = products[unique(checkList)[i]]
    const avilableColors=Object.keys(product.image);
    const bestSellingSectionCode= `
        <div class="item-and-description">
                <div class="item">
                    <div class="item-img">
                        <img src="images/Product/${product.name}/${avilableColors[0]}/${product.image[avilableColors[0]][0]}" alt="">
                    </div>
                    <div class="add-to-cart">
                        <button class="js-add-cart-${product.id}" data-product-id=${product.id}><img src="./images/icons/Cart2.svg" alt="">Add to Cart</button>
                    </div>
                </div>
    
                <div class="item-description">
                    <div class="item-name">
                    ${product.name}
                    </div>

                    <div class="item-price">
                        ${itemPrice(product)}
                    </div>

                    <div class="rating">
                    <div class="rating-img">
                        <img src="/images/ratings/${product.rating}.png" alt="">
                    </div>
                    
                    <p>(${product.count})</p>
                </div>
                </div>
                <div class="overlays">
                   
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
            </div>

                
            `
    bestSelling+=bestSellingSectionCode;
    
    // wishlistDisplay(product.id)
}


document.querySelector('.best-selling').innerHTML=bestSelling;

// document.querySelectorAll('.favourite').forEach(element=>{
//     element.addEventListener('click',()=>{
//         addToWishlist(element.dataset.productId)
//     })
// });


// favouriteDisplay(products)



// document.querySelectorAll('.favourite').forEach(element=>{
//     element.addEventListener('click',()=>{   
//         addToWishlist(element.dataset.productId)
//     })
// });

