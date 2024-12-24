const btns = document.querySelectorAll('.btn');


order = 0;
function numbering(btn){
    order = 1;
        const cartImg = btn.querySelector('.cards-cartImg');
        const btnPara = btn.querySelector('.cards-btn-txt');
        const btnIncr = btn.querySelector('.cards-incr');
        const btnDecr = btn.querySelector('.cards-decr');
    
    if(!btnDecr.decrHandler){
        btnDecr.decrHandler = function decrH(){
            event.stopPropagation()
            console.log('decr event')
            if(order > 1){
            order -= 1;
            btnPara.textContent = `${order}`;
            }else{
                order -= 1;
                btnPara.style.color = 'hsl(14, 65%, 9%)'
                btnIncr.classList.remove('cards-onf');
                cartImg.classList.remove('cards-off');
                btnDecr.classList.remove('cards-on');
                btn.style.backgroundColor = 'hsl(20, 50%, 98%)';
                btnPara.textContent = `Add to Cart`;
            }
        }
    }
    if(!btnIncr.incrHandler){
        btnIncr.incrHandler = function incrH(){
            event.stopPropagation()
            console.log('incr event');
            order += 1;
            btnPara.textContent = `${order}`;
        }
    }
            

            btnIncr.removeEventListener('click',btnIncr.incrHandler);
            btnDecr.removeEventListener('click',btnDecr.decrHandler);

            btnIncr.addEventListener('click',btnIncr.incrHandler);
            btnDecr.addEventListener('click',btnDecr.decrHandler);
        
        btnPara.textContent = `${order}`;
        btnPara.style.color = 'hsl(20, 50%, 98%)';

        btnIncr.classList.add('cards-on');
        cartImg.classList.add('cards-off');
        btnDecr.classList.add('cards-on');
        btn.style.backgroundColor = 'hsl(14, 86%, 42%)';
}


function addEvent(btn){
    btn.addEventListener('click', function (){
        event.stopPropagation()
        console.log('button event')
//remove event listners 
        numbering(btn);
        

    });         
}
btns.forEach(addEvent)