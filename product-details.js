import { products } from "./data/products.js";
import { cart } from "./cart.js";
import { itemPrice, discountDisplay } from './utils.js';
import { wishlistDisplay,addToWishlistProductDetail } from "./wishlist.js";

const product = JSON.parse(localStorage.getItem('product'));

function imageGenerator(image,selectedColor=0){
    let imageCode='';
    let counter=0;
  
    image.forEach(img=>{
      if (counter<4){
        
        imageCode+=`<div class="image1"><img src="images/Product/${product.name}/${availableColors[Number(selectedColor)]}/${image[counter]}" alt=""></div>`

      }
  
      counter++
    });
    return imageCode;
}

function colorDisplay(availableColors,id){
   
    if (availableColors.length>1){
        const code=`
        <div class="colors">
            Colors:
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
        const code=`
        <div class="colors">
            Colors:
            <label class="color-option add-margin js-color-option-${id}">
                <input type="radio" name="color-${id}" value="0" data-product-id="${id}" checked>

                <span class="color-circle color1 js-color1-${id}"><span class="inner-color1 js-inner-color-${id}"></span></span>
            </label>
        </div>`

        return code

 
    }
}

const availableColors=Object.keys(product.image);

document.querySelector('.product-details').innerHTML = 
    `
                <div class="account-product">
                    <span><a href="#" style="color: #a6a6a6;">Account  / </a></span>
                    <span><a href="#" style="color: #a6a6a6;">Gaming  / </a></span>
                    <span><a href="#" style="color: #000">${product.name}</a></span>
                </div>
                <div class="product-images-description">
                    <div class="product-photos">
                        ${imageGenerator(product.image[availableColors[0]])}
                    </div>
                    <div class="product-main-photo">
                        <img src="images/Product/${product.name}/${availableColors[0]}/${product.image[availableColors[0]][0]}" alt="">
                    </div>
                    <div class="product-description-attributes">
                        <div class="product-name">${product.name}</div>
                        <div class="product-ratings-review">
                            <div class="product-ratings">
                                <img src="/images/ratings/${product.rating}.png" alt="">
                            </div>
                            <p>
                                <span class="product-reviews">(${product.count} Reviews)</span> 
                                | <span class="availability"> In Stock</span>
                            </p>
                        </div>
                        <div class="product-price">
                            $ ${product.price.actualPrice}
                        </div>
                        <div class="product-description-paragraph">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, ducimus iusto. Dolorem praesentium voluptates accusamus molestias nihil provident? Obcaecati quaerat necessitatibus illo maiores sed laudantium. Iste ad sequi vitae quod.
                        </div>
                        ${colorDisplay(availableColors,product.id)}
                        <div class="product-size">
                            <p>Size:</p>
                            <label class="size-option">
                                <input type="radio" name="size">
                                <div class="size-square xs">XS</div>
                            </label>
                            <label class="size-option">
                                <input type="radio" name="size">
                                <div class="size-square s">S</div>
                            </label>
                            <label class="size-option">
                                <input type="radio" name="size">
                                <div class="size-square m">M</div>
                            </label>
                            <label class="size-option">
                                <input type="radio" name="size">
                                <div class="size-square l">L</div>
                            </label>
                            <label class="size-option">
                                <input type="radio" name="size">
                                <div class="size-square xl">XL</div>
                            </label>
                        </div>
                        <div class="product-quantity">
                            <div class="quantity-increment-decrement">
                                <div class="decrement">-</div>
                                <div class="quantity"><input type="text"></div>
                                <div class="increment">+</div>
                            </div>
                            <a class="buy-now-button" href="cart.html">
                                <button data-product-id="${product.id}" class="js-buy">Buy Now</button>
                            </a>
                            <div class="love js-favourite-${product.id}">
                                <img src="./images/icons/heart.svg" alt="">
                            </div>
                        </div>
                        <div class="delivery-service">
                            <div class="free-delivery border-format1">
                                <div class="delivery-icon"><img src="./images/icons/icon-delivery.svg" alt=""></div>
                                <div class="delivery-service-paragraph">
                                    <p>Free Delivery</p>
                                    <a href="#" style="font-size: 12px;">Enter your postal code for Delivery Availability</a>
                                </div>
                            </div>
                            <div class="free-delivery border-format2">
                                <div class="delivery-icon"><img src="./images/icons/Icon-return.svg" alt=""></div>
                                <div class="delivery-service-paragraph">
                                    <p>Return Delivery</p>
                                    <p style="font-size: 12px;">Free 30 Days Delivery Returns. <a href="#">Details</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

colorColored(availableColors,product)
const buy = document.querySelector('.js-buy');
buy.addEventListener('click',()=>{
        console.log(buy.dataset)
    if (!cart.includes(buy.dataset.productId)){
        
        cart.push(buy.dataset.productId)
        localStorage.setItem('cart',JSON.stringify(cart));
        
        
    }
    
})
wishlistDisplay(product.id)
 
document.querySelector(`.js-favourite-${product.id}`).addEventListener('click',()=>{
    
    addToWishlistProductDetail(product.id)
})


let counter = 0;
let relatedProduct = "";
products.forEach(element=>{
    if ((product.category===element.category) && (counter<5)){
        counter++
        if (product.id !== element.id)
        {const availableColors=Object.keys(element.image);
            relatedProduct +=` 
        <div class="item-and-description" data-product-id="${element.id}">
                <div class="item">
                   <div class="item-img">
                   <img src="images/Product/${element.name}/${availableColors[0]}/${element.image[availableColors[0]][0]}" alt="">
                    </div>
                    <div class="add-to-cart">
                            <button><img src="./images/icons/Cart2.svg" alt="">Add to Cart</button>
                    </div>
                </div>
    
                <div class="item-description">
                    <div class="item-name">
                     ${element.name}
                    </div>
    
                    <div class="item-price">
                        ${itemPrice(element)}
                    </div>
    
                    <div class="rating">
                    <div class="rating-img">
                        <img src="/images/ratings/${element.rating}.png" alt="">
                    </div>
                    
                    <p>(${element.count})</p>
                </div>
                </div>
                <div class="overlays">
                    <div class="discount js-discount-${element.id}">-${element.price.discount}
                    </div>
                    <div class="favourite-view">
                        <div class="favourite js-favourite-${element.id}" data-product-id="${element.id}">
                        <img src="./images/icons/heart.svg" alt="">
                         </div>
                    
                    
                        <div class="view js-view-${element.id}" data-product-id="${element.id}">
                            <img src="./images/icons/Quick View.svg" alt="">
                        </div>
                    </div>

                    <div class="confirm-added js-added-${element.id}">
                    Added to Wishlist
                    </div>
                </div>
            </div>
            </div>`
        }
        
    }
})
document.querySelector('.product-item').innerHTML = relatedProduct;
discountDisplay(products)



function color(color){
    if (color=="brown"){
        return "rgb(240, 213, 213)"
    }
    else if (color ==="black"){
        return "rgba(0,0,0,0.8)"
    } else if (color === "white"){
        return "rgb(245,245,245)"
    }
    return color
}

function colorColored(availableColors,product){
    if (availableColors.length>1){
        const radioButtons = document.querySelectorAll(`.js-color-option-${product.id} input[type="radio"]`);
        radioButtons.forEach((radio) => {
        document.querySelector(`.js-color1-${product.id}`).style.backgroundColor =color(availableColors[0])
        document.querySelector(`.js-color2-${product.id}`).style.backgroundColor = color(availableColors[1]);
       
        radio.addEventListener('click', function() {
            if (this.checked) {
                const selectedColor=radio.value;
                const productId = radio.dataset.productId;
                 
               
                document.querySelector(`.js-inner-color-${productId}`).style.backgroundColor = availableColors[Number(selectedColor)];
                
                document.querySelector(`.product-main-photo`).innerHTML=`<img src="images/Product/${product.name}/${availableColors[Number(selectedColor)]}/${product.image[availableColors[Number(selectedColor)]][0]}" alt=""></img>`
                
                
                document.querySelector(`.product-photos`).innerHTML=`${imageGenerator(product.image[availableColors[selectedColor]],selectedColor)}`
                
    }
  });
});
    }
}

// document.querySelectorAll('.item-and-description').forEach(element=>{
    
//     element.addEventListener('click',()=>{
//         const productId = element.dataset.productId;
//         const productDetailsHTML="";
//         for (let i=0; i <products.length; i++ ){
//             console.log('hd')
//             if (productId===products[i].id){
//                 const product = products[i];
//                 localStorage.setItem('product',JSON.stringify(product));

//                 window.location.href="product-details.html";
                
//             }
//         }
        
//       })
        
// });


