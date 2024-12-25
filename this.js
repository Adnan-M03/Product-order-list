const fetchfiles = fetch('./data.json');
const ulist = document.querySelector('.cards');
const cartH = document.querySelector('.cart h3');
const cart = document.querySelector('.cart-prices');

let btns;
let svgs;
let cartTotal = 0;
let orderTotal = 0;
let code ="";
let items ="";
let datas;
let attr;
let quantities = {};
let cartImg;
let btnPara;
let btnIncr;
let btnDecr;



fetchfiles.then(response =>{
        let objects = response.json();
        objects.then(data =>{
            datas = data;
            datas.map((element) =>{
                list_fun(element);
                //cart_fun(element);
            })
            // This is where most functionalities must take place, after all content is loaded asyncly
            ulist.innerHTML = code;
            //cart.innerHTML = items + order;

            const btns = document.querySelectorAll('.btn');
            btns.forEach(addEvent);

        })
});



function list_fun(elm){
    code += `
    <li>
        <div class="container">
          <img 
            srcset="${elm['image'].mobile} 654w,
            ${elm['image'].tablet} 427w,
            ${elm['image'].desktop} 502w"
            sizes="(max-width:400px) 654px,
            (max-width:560px) 427px,
            502px"
            src="" alt="" class="cards-image" >
          <button class="btn" id="${elm['id']}"><img class="cards-decr" src="assets/images/icon-decrement-quantity.svg"> <img class="cards-cartImg" src="assets/images/icon-add-to-cart.svg"><p class="cards-btn-txt">Add to Cart</p> <img class="cards-incr" src="assets/images/icon-increment-quantity.svg"> </button>
        </div>

        <p>${elm['category']}</p>
        <p>${elm['name']}</p>
        <p>$${elm['price'].toFixed(2)}</p>
    </li>`
}

function cart_fun(elm){
    // btn.click => map the object with the same id as the button
    if(elm['quantity']>0){
        items += `
            <div class="cart-prices-container">        
                <span class="cart-prices-writing">
                    <h4>${elm['name']}</h4>
                    <p class ='quantity'>${elm['quantity']}</p>
                    <p>@$${elm['price'].toFixed(2)}</p>
                    <p class="cart-order-product">${(elm['price'] * elm['quantity']).toFixed(2)}</p>
                </span>
                <svg class="svg ${elm['id']}" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path class="siwii" fill="black" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
            </div> `
            //and then in the paragraph add ${orderTotal.toFixed(2)}
        order = `
            <div id="cart-order">
                <div id="cart-order-total">
                    <p>Order Total</p>
                    <p class="cart-orderTotal-para" >$${orderTotal.toFixed(2)}</p>
                </div>
                <div id="cart-order-carbon">
                    <img src="assets/images/icon-carbon-neutral.svg">
                    <p>This is a carbon-neutral delivery</p>
                </div>
                <button id="cart-order-button" >Confirm Order</button>
            </div>`
        }
}

//  Experiment starting HEREEEEEEEEEEEEEEEEEEEEE


function map(polarity){
    items = '';
    if (polarity == true){
        datas.map((element) =>{
        cart_fun(element);
    });
    cart.innerHTML = items + order;
    }else if(polarity == false){
        cart.innerHTML = `
    <img src="assets/images/illustration-empty-cart.svg" alt="Empty card Image">
      <p>Your added items will appear here</p>`
    }
}


//      THIS IS FOR THE EVENTS FUNCTION

function numbering(btn){
    attr = btn.getAttribute('id');
    quantities[`${attr}`] ++;
    addQuantity(attr);
    cartTotal ++;
    map(true);
        cartImg = btn.querySelector('.cards-cartImg');
        btnPara = btn.querySelector('.cards-btn-txt');
        btnIncr = btn.querySelector('.cards-incr');
        btnDecr = btn.querySelector('.cards-decr');
        svgs = document.querySelectorAll('.svg');
        //const orderProduct = document.querySelector('.cart-order-product');    
    if(!btnDecr.decrHandler){
        btnDecr.decrHandler = function decrH(){

                // Copying attr in each place for it to be dynamic to the image incr,decr and not the button
            attr = btn.getAttribute('id');
            event.stopPropagation()
            console.log('decr event');
            if(quantities[`${attr}`] > 1){
                quantities[`${attr}`] -= 1;
                subtractQuantity(attr);
                cartTotal -= 1;
                textContent(btnPara,attr);
                map(true);
            }else{
                quantities[`${attr}`] -= 1;
                subtractQuantity(attr);
                cartTotal -= 1;
                btnPara.style.color = 'hsl(14, 65%, 9%)';
                btnIncr.classList.remove('cards-on');
                cartImg.classList.remove('cards-off');
                btnDecr.classList.remove('cards-on');
                btn.style.backgroundColor = 'hsl(20, 50%, 98%)';
                btnPara.textContent = `Add to Cart`;
                map(true);
                if(cartTotal >= 1){
                    cartH.textContent = `Your Cart(${cartTotal})`;
                }else{
                    map(false);
                    cartH.textContent = `Your Cart()`;
                }
            }
        }
    }
    if(!btnIncr.incrHandler){
        btnIncr.incrHandler = function incrH(){
            attr = btn.getAttribute('id');
            event.stopPropagation();
            console.log('incr event');
            quantities[`${attr}`] += 1;
            addQuantity(attr);
            cartTotal += 1;
            textContent(btnPara,attr);
            map(true);
            console.log(orderTotal);
        }
    }
            

            btnIncr.removeEventListener('click',btnIncr.incrHandler);
            btnDecr.removeEventListener('click',btnDecr.decrHandler);

            btnIncr.addEventListener('click',btnIncr.incrHandler);
            btnDecr.addEventListener('click',btnDecr.decrHandler);
        
        btnPara.style.color = 'hsl(20, 50%, 98%)';
        textContent(btnPara,attr);
        btnIncr.classList.add('cards-on');
        cartImg.classList.add('cards-off');
        btnDecr.classList.add('cards-on');
        btn.style.backgroundColor = 'hsl(14, 86%, 42%)';
        deleteItem();
}


// QUANTITY FUNCTIONS
function addQuantity(btnID){
    for(var i = 0; i <=8; i++){
        if(datas[i]['id'] == btnID){
            datas[i].quantity++;
            orderTotal += datas[i].price;
        }
    }
}

function subtractQuantity(btnID){
    for(var i = 0; i <=8; i++){
        if(datas[i].id == btnID){
            datas[i].quantity--;
            orderTotal -= datas[i].price;
        }
    }
}



function addEvent(btn){
    let id = btn.getAttribute('id');
    quantities[id] = 0;
    btn.addEventListener('click', function (event){
        event.stopPropagation()
        console.log('button event');
        numbering(btn);
    });         
}

function textContent(btnPara,attr){
    btnPara.textContent = `${quantities[`${attr}`]}`;
    //orderProduct.textContent = `$${orderTotal.toFixed(2)}`;
    cartH.textContent = `Your Cart(${cartTotal})`;
}

function deleteItem(){
    svgs = document.querySelectorAll('.svg');
    svgs.forEach((svg) =>{
        svg.addEventListener('click', function remove(){
            for(var i = 0; i <=8; i++){
                if(`svg ${datas[i]['id']}` == svg.getAttribute('class')){
                    orderTotal -= datas[i].price;
                    cartTotal -= datas[i].quantity;
                    datas[i].quantity = 0;
                    if(cartTotal > 0){
                        map(true);
                        cartH.textContent = `Your Cart(${cartTotal})`;
                    }else{
                        map(false);
                        cartH.textContent = `Your Cart()`;
                    }
                }
            }console.log('svg event');
            deleteItem();
        });
    });
    
}

