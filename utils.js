export function percentageCalculator(value,actualPrice){
    const percentIndex = value.indexOf('%');
    const percentageValue = Number(value.substring(0,percentIndex));
    const discountedPrice = Math.round((actualPrice * 100) *(percentageValue/100))/100
    
    return (actualPrice-discountedPrice).toFixed(2)
}


export function remove(arr,id){
    const accum = []
    for (let i=0;i<arr.length;i++){
        if (arr[i]===id){
            continue
        }else{
            accum.push(arr[i])
        }
    }
    
    return accum
}
// document.querySelectorAll('.favourite').forEach(element=>{
//     element.addEventListener('click',()=>{
//         addToWishlist(element.dataset.productId)
//     })
// });


export function itemPrice(product){
    if (product.price.discount==="0%"){
       
        return `
                <div class="discounted-price">
                    $${product.price.actualPrice}
                </div>
                `
    }
    else{
        return `
            <div class="discounted-price">
                $${percentageCalculator(product.price.discount,product.price.actualPrice)}
            </div>

            <div class="actual-price">
                 $${product.price.actualPrice}
            </div>`
    }
}

export function discountDisplay(products){
    
    products.forEach((product)=>{
        if (product.price.discount==='0%'){
            document.querySelectorAll(`.js-discount-${product.id}`).forEach(element=>{
                element.style.display='none';
            })
        }
    })    
}



export function getfiltervalue(){
    return JSON.parse(localStorage.getItem('productCategory'))
}


export function colorDisplay(availableColors,id){
   
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
export function color(color){
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

export function colorColored(availableColors,product){
    if (availableColors.length>1){
        const radioButtons = document.querySelectorAll(`.js-color-option-${product.id} input[type="radio"]`);
        radioButtons.forEach((radio) => {
        document.querySelector(`.js-color1-${product.id}`).style.backgroundColor =color(availableColors[0])
        document.querySelector(`.js-color2-${product.id}`).style.backgroundColor = color(availableColors[1]);
        radio.addEventListener('click', function() {
            if (this.checked) {
                const selectedColor=radio.value;
                const productId = radio.dataset.productId;
                 console.log(availableColors[Number(selectedColor)])
                console.log(productId)
               
                document.querySelector(`.js-inner-color-${productId}`).style.backgroundColor = availableColors[Number(selectedColor)];
                
                document.querySelector(`.js-product-image-${productId}`).innerHTML=`<img src="images/Product/${product.name}/${availableColors[Number(selectedColor)]}/${product.image[availableColors[Number(selectedColor)]][0]}" alt=""></img>`
                
    }
  });
});
    }
}