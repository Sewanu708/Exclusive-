import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { products } from "./data/products.js";
import { percentageCalculator , itemPrice, discountDisplay,color,colorColored,colorDisplay } from './utils.js';


// import { addToWishlist, wishlist, wishlistDisplay } from './wishlist.js';

export function hamburgerDisplay(){
    document.querySelector('.hamburger').addEventListener('click',()=>{
        console.log('hi')
        document.querySelector('.harmburger-sec').style.display='flex';
        document.querySelector('.hamburger-close').style.display='flex';
        document.querySelector('.hamburger').style.display='none';
    })
}
export function harmburgerClose(){
    document.querySelector('.hamburger-close').addEventListener('click',()=>{
        document.querySelector('.harmburger-sec').style.display='none';
        document.querySelector('.hamburger-close').style.display='none';
        document.querySelector('.hamburger').style.display='flex';
    })
}

export function myAccountDropdownDisplay(){
   document.querySelector('.my-account-icon').addEventListener('click',()=>{
    if (document.querySelector('.my-account-icon').classList.contains('my-account-display-prop')){
        document.querySelector('.account-section-on-click').style.display='none';
            
            document.querySelector('.my-account-icon').classList.remove('my-account-display-prop')

            document.querySelector('.my-account-icon').innerHTML=`<img src="./images/icons/user.svg" alt="">`
    }else {
                
                document.querySelector('.account-section-on-click').style.display='flex';
                
                document.querySelector('.my-account-icon').classList.add('my-account-display-prop')

                document.querySelector('.my-account-icon').innerHTML=`<img src="./images/icons/user-white.svg" alt="">`
        }
    })
}

export function myAccountInnerDropdownDisplay(){
    document.querySelector('.my-account-dropdown-header').addEventListener('click',()=>{
        if (document.querySelector('.my-account-dropdown-header').classList.contains('dummyClass')){
            
            document.querySelectorAll('.inner-dropdown').forEach(dropdownElement=>{
                
                dropdownElement.style.display='flex';
            })
            document.querySelector('.my-account-dropdown-header').innerHTML=`<a href="#">My Account <img src="./images/icons/arrow_drop_down_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt=""></a> `
    
            document.querySelector('.my-account-dropdown-header').classList.remove('dummyClass')
        } else{
            
            document.querySelectorAll('.inner-dropdown').forEach(dropdownElement=>{
                dropdownElement.style.display='none';
            })
            document.querySelector('.my-account-dropdown-header').innerHTML=`<a href="#">My Account <img src="./images/icons/arrow_right_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt=""></a>`
    
            document.querySelector('.my-account-dropdown-header').classList.add('dummyClass')
        }
     
        
    })
}
export function categoryInnerDropdownDisplay(){
    document.querySelector('.my-category-dropdown-header').addEventListener('click',()=>{
        if (document.querySelector('.my-category-dropdown-header').classList.contains('dummyClass')){
            
            document.querySelectorAll('.categories-inner-dropdown').forEach(dropdownElement=>{
                
                dropdownElement.style.display='flex';
            })
            document.querySelector('.my-category-dropdown-header').innerHTML=`<a href="#">Categories<img src="./images/icons/arrow_drop_down_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt=""></a> `
    
            document.querySelector('.my-category-dropdown-header').classList.remove('dummyClass')
        } else{
            
            document.querySelectorAll('.categories-inner-dropdown').forEach(dropdownElement=>{
                dropdownElement.style.display='none';
            })
            document.querySelector('.my-category-dropdown-header').innerHTML=`<a href="#">Categories <img src="./images/icons/arrow_right_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt=""></a>`
    
            document.querySelector('.my-category-dropdown-header').classList.add('dummyClass')
        }
     
        
    })
}

function slider(){
    const nxtBtn = document.querySelector('.forward');
    const preBtn = document.querySelector('.backward');
    const productContainer = document.querySelector('.items');
    let containerDimensions = productContainer.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn.addEventListener('click', () => {
       
        productContainer.scrollLeft += containerWidth;
       
    });
    
    preBtn.addEventListener('click', () => {
        productContainer.scrollLeft -= containerWidth;
    });
}


function categoriesSlider(){
    const nxtBtn = document.querySelector('.front');
    const preBtn = document.querySelector('.back');
    const productContainer = document.querySelector('.browse-categories');
    let containerDimensions = productContainer.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn.addEventListener('click', () => {
        
        productContainer.scrollLeft += containerWidth;
        
        
    });
    
    preBtn.addEventListener('click', () => {
        productContainer.scrollLeft -= containerWidth;
    });
}




function countDown(endDate){
    let daysInSecond = endDate.diff(dayjs(),'seconds');

    let daysRemain = Math.floor(daysInSecond/(24 * 60 * 60))
    daysRemain=daysRemain<10? "0" + daysRemain: daysRemain;
    daysRemain=daysRemain<1? "00":daysRemain;

    let hoursRemain = Math.floor(daysInSecond%(24 * 60 * 60)/3600);
    hoursRemain=hoursRemain<10? "0" + hoursRemain: hoursRemain;
    hoursRemain=hoursRemain<1? "00":hoursRemain;

    let minutesRemain = Math.floor(((daysInSecond%(24 * 60 * 60))%(60*60))/60);
    minutesRemain=minutesRemain<10? "0" + minutesRemain:minutesRemain;
    minutesRemain=minutesRemain<1? "00":minutesRemain;

    let secondsRemain = ((daysInSecond%(24 * 60 * 60))%(60*60))%60;
    secondsRemain=secondsRemain<10? "0" + secondsRemain : secondsRemain;
    secondsRemain=secondsRemain<1? "00":secondsRemain;

    return [daysRemain,hoursRemain,minutesRemain,secondsRemain];
}
function countDownRender(endDate, class_){
    setInterval(()=>{
        const time = countDown(endDate);
        if (class_ ==='time'){
            document.querySelector('.time').innerHTML = `<div class="time">
            <p class="day">${time[0]}</p>
            <p class="column">:</p>
            <p class="hours">${time[1]}</p>
            <p class="column">:</p>
            <p class="minutes">${time[2]}</p>
            <p class="column">:</p>
            <p class="seconds">${time[3]}</p>
        </div>`
        } else{
            document.querySelector('.category-time').innerHTML = `
            <div class="cat-days">
                    ${time[0]}
                </div>
                <div class="cat-hours">
                     ${time[1]}
                </div>
                <div class="cat-minutes">
                ${time[2]}
                </div>
                <div class="cat-seconds">
                ${time[3]}
                </div>`
        }
     
    },999.999)
}

function backToTop(){
    document.querySelector('.back-to-top').addEventListener('click',()=>{
        document.body.scrollTop=0;
        document.documentElement.scrollTop = 0;
    })
     
}



export function renderLandingPage2(){
    
slider();
hamburgerDisplay();
harmburgerClose();
myAccountDropdownDisplay();
myAccountInnerDropdownDisplay();
categoryInnerDropdownDisplay();
categoriesSlider();
discountDisplay(products);  
countDownRender(dayjs('2024-10-02T00:00:00'),'category-time');
backToTop();

let productHTML='';
products.forEach((product)=>{
    
    const avilableColors=Object.keys(product.image)

    
    countDownRender(dayjs('2024-10-02T00:00:00'),'time')
        
        const productCode = `
        <div class="item-and-description">
            <div class="item"  data-product-id="${product.id}">
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
                        <img src="./images/ratings/${product.rating}.png" alt="">
                    </div>
                    
                    <p>(${product.count})</p>
                </div>

            </div>
            <div class="overlays">
                <div class="discount js-discount-${product.id}">-${product.price.discount}
                </div>
                
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
        </div>
    `
  
    
    productHTML+=productCode; 

    
    
})


document.querySelector('.items').innerHTML=productHTML;


document.querySelectorAll('.view').forEach(element=>{
    
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

document.querySelectorAll('.item').forEach(element=>{
    
    element.addEventListener('click',()=>{
        const productId = element.dataset.productId;
        const productDetailsHTML="";
        for (let i=0; i <products.length; i++ ){
            console.log('j')
            if (productId===products[i].id){
                const product = products[i];
                localStorage.setItem('product',JSON.stringify(product));

                window.location.href="product-details.html";
                
            }
        }
        
      })
        
});






}

