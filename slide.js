
const slides = document.querySelectorAll('.showroom');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const dots = document.querySelectorAll('.dot');
let counter = 0;
next.addEventListener('click',slideNext)

function slideNext(){
    slides[counter].style.animation = 'next1 1s ease-in-out forwards'

    if (counter>=slides.length-1){
        counter=0;
    }else{
        counter++;
        
    }   

    slides[counter].style.animation = 'next2 1s ease-in-out forwards'
    slides[counter].style.display = 'flex';

    indicator()
}
prev.addEventListener('click',slidePrev)
function slidePrev(){
    console.log(slides.length)
    
    console.log(slides.length)
    slides[counter].style.animation = 'prev1 1s ease-in-out forwards 4'
    console.log(slides.length)
    if (counter===0){
        counter=slides.length-1;
        

    }else{
        counter--;
    }   

    slides[counter].style.animation = 'prev2 1s ease-in-out forwards'
    slides[counter].style.display = 'flex';
    indicator()
}

function indicator(){
    dots.forEach(dot=>{
        dot.className=dot.className.replace(' active','')
    });

    dots[counter].className+=' active'
}


let id;
function autoSlide(){
     id = setInterval(timer,5000);
    function timer(){
        slideNext();
        indicator();
    }
}
autoSlide();

document.querySelector('.showrooms').addEventListener('mouseover',()=>{
    clearInterval(id)
})

document.querySelector('.showrooms').addEventListener('mouseout',autoSlide)



