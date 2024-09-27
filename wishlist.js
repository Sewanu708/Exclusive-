import { itemPrice, discountDisplay,color,colorColored,colorDisplay, remove  } from './utils.js';
import { cart } from './cart.js';
export let wishlist=JSON.parse(localStorage.getItem('wishlist'))? JSON.parse(localStorage.getItem('wishlist')) : []; 
import {hamburgerDisplay,harmburgerClose,myAccountDropdownDisplay,myAccountInnerDropdownDisplay,categoryInnerDropdownDisplay} from "./landing-page.js";
import { addToWishlistVerify,pageLoadWishlistDisplay,cartCheck,renderColor } from "./general.js";



document.querySelector('.js-wishlist').innerHTML = wishlist.length;
document.querySelector('.js-cart').innerText = cart.length;




export function addToWishlist(id){
    
    if (wishlist.includes(id)){  
       document.querySelectorAll(`.js-favourite-${id}`).forEach(element => {
        
        element.classList.remove('change-bg');
        element.innerHTML=`<img src="./images/icons/heart.svg" alt="">`
        document.querySelectorAll(`.js-added-${id}`).forEach(element=>{element.innerHTML=`
            Removed from Wishlist
        `});
        document.querySelectorAll(`.js-added-${id}`).forEach(element=>{element.style.display='block';});
        setTimeout(()=>{
        document.querySelectorAll(`.js-added-${id}`).forEach(element=>{element.style.display='none';});;
        },2000);
       
        wishlist=remove(wishlist,id)
        
        
    })

    } else{
        wishlist.push(id)
        document.querySelectorAll(`.js-favourite-${id}`).forEach(element => 
            {   
                element.classList.add('change-bg');
                element.innerHTML=`<img src="./images/icons/favourite-white.svg" alt="">`
                document.querySelectorAll(`.js-added-${id}`).forEach(element=>{element.style.display='block';})
                document.querySelectorAll(`.js-added-${id}`).forEach(element=>{element.innerHTML=`
                    Added to Wishlist
                    `});
                setTimeout(()=>{
                    document.querySelectorAll(`.js-added-${id}`).forEach(element=>{element.style.display='none';});
                },2000);
        })
    }
    
    localStorage.setItem('wishlist',JSON.stringify(wishlist));
    document.querySelector('.js-wishlist').innerHTML = wishlist.length
    
}   

export function wishlistDisplay(id){
    if (wishlist.includes(id)){
        const element=document.querySelectorAll(`.js-favourite-${id}`);
        
        element.forEach(subElement=>{
            
            subElement.classList.add('change-bg');
            subElement.innerHTML=`<img src="./images/icons/favourite-white.svg" alt="">`;

          
    
        })
    }
}

export function randNumGen(){
    let accum=[];
    for(let i=0; i<1000;i++){
        const num =Math.round(Math.random()*20)
        index = accum.indexOf(num)
        if (index===-1){
            accum.push(num)
        }else{
            continue
        }
    }
    let filtered = accum.filter(num => num < 11);
    return filtered
}
import { products } from './data/products.js';
export function renderWishlistPage(){
    const jsProducts = document.querySelectorAll('.js-products');
    jsProducts.forEach((product) => {
    product.addEventListener('click', () => {

        localStorage.setItem('productCategory',JSON.stringify(product.children[0].innerHTML))
        
    }); 
    });
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
    function randNumGen(){
        let accum=[];
        
        for(let i=0; i<1000;i++){
            
            const num =Math.round(Math.random()*20)
            if (!accum.includes(num)){
                accum.push(num)
            }
            if (accum.length==15){
                break
            }
        }
        
        let filtered = accum.filter(num => num < 11);
        return filtered
    }
    
    function displayWishlist() {

        if (wishlist.length > 0) {

            let wishlistCode="";
            wishlist.forEach(id => {
                const product = matchId(id);
                // console.log(wishlist)     
                const availableColors = Object.keys(product.image);
                
                wishlistCode += `
                        <div class="item-and-description">
                            <div class="item">
                                
                                <div class="item-img" data-product-id="${product.id}">
                                    <img src="images/Product/${product.name}/${availableColors[0]}/${product.image[availableColors[0]][0]}" alt="">
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
                            <div class="delete js-delete-${product.id}" data-product-id="${product.id}">
                                    <img src="./images/icons/icon-delete.svg" alt="">
                                </div>
                            </div>
                        </div>
                `;
            });
            document.querySelector('.js-items').innerHTML = wishlistCode;
            
        } else {
            
            document.querySelector('.js-wishlist-products').innerHTML = `
            `;
        }
  
        let wishlistCode="";
        
        const index =  randNumGen();
        console.log(index)
        for(let i=0; i<index.length; i++){
            const product = products[i]
            const availableColors = Object.keys(product.image);
            wishlistCode += `
                    <div class="item-and-description">
                        <div class="item"  data-product-id="${product.id}">
                            <div class="item-img">
                                <img src="images/Product/${product.name}/${availableColors[0]}/${product.image[availableColors[0]][0]}" alt="">
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
        
                            ${colorDisplay(availableColors, product.id)}
        
                        </div>
                        <div class="overlays">
                    
                            <div class="favourite-view">
                                <div class="favourite js-favourite-${product.id}" data-product-id="${product.id}">
                                    <img src="./images/icons/heart.svg" alt="">
                                </div>
                                
                                
                                <div class="view js-view-${product.id}" data-product-id="${product.id}">
                                    <img src="./images/icons/Quick View.svg" alt="">
                                </div>
                                
                            </div>

                            <div class="confirm-added js-added-${product.id}">
                                Added to Wishlist
                            </div>
                        </div>
                    </div>
            `;
        }
        document.querySelector('.js-wishlist-items').innerHTML = wishlistCode;
        
            
    }
            
        
    function removeFromWishlist(id){
        wishlist.splice(wishlist.indexOf(id),1);
        localStorage.setItem('wishlist',JSON.stringify(wishlist));
    }
    displayWishlist()
    document.querySelectorAll(`.delete`).forEach(deleteItem=>{
        console.log(deleteItem)
        deleteItem.addEventListener('click',()=>{
            removeFromWishlist(deleteItem.dataset.productId);
            renderWishlistPage();
        })
    })

    products.forEach(product=>{
        const availableColors=Object.keys(product.image);
        colorColored(availableColors,product);
    })
    hamburgerDisplay();
    harmburgerClose();
    myAccountDropdownDisplay();
    myAccountInnerDropdownDisplay();
    categoryInnerDropdownDisplay();
    renderColor();
    pageLoadWishlistDisplay();
    addToWishlistVerify();
}

export function moveToCart(){
    document.querySelector('.js-move').addEventListener('click',()=>{
        wishlist.forEach((productId)=>{
            if (!cart.includes(productId)){
                cart.push(productId);
                
            }
        })
        localStorage.setItem('cart',JSON.stringify(cart));
        location.href="cart.html"
    })
}




export function addToWishlistProductDetail(id){
    
    if (wishlist.includes(id)){
        
       document.querySelectorAll(`.js-favourite-${id}`).forEach(element => {
        
        element.classList.remove('change-bg');
        element.innerHTML = `<img src="./images/icons/heart.svg" alt="Heart Icon">`;
  
        console.log(remove(wishlist,id))
        wishlist=remove(wishlist,id)

        
    })

    

    } else{
        wishlist.push(id)
        console.log(wishlist)
        document.querySelectorAll(`.js-favourite-${id}`).forEach(element => 
            {   console.log(element)
                element.classList.add('change-bg');
                element.innerHTML=`<img src="./images/icons/favourite-white.svg" alt="">`
                
        })
    }
    
    localStorage.setItem('wishlist',JSON.stringify(wishlist));
    document.querySelector('.js-wishlist').innerHTML = wishlist.length
    
}   