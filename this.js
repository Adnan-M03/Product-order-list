const fetchfiles = fetch('./data.json');
const ulist = document.querySelector('.cards');
const cartH = document.querySelector('.cart h2');
const cart = document.querySelector('.cart-prices');

let btns;
let svgs;
let cartTotal = 0;
let orderTotal = 0;
let code = "";
let items = "";
let datas;
let attr;
let quantities = {};
let cartImg;
let btnPara;
let btnIncr;
let btnDecr;
let productImg;
//let comfirmBtn;



fetchfiles.then(response => {
    let objects = response.json();
    objects.then(data => {
        datas = data;
        datas.map((element) => {
            list_fun(element);
            //cart_fun(element);
        })
        // This is where most functionalities must take place, after all content is loaded asyncly
        ulist.innerHTML = code;
        //cart.innerHTML = items + order;

        btns = document.querySelectorAll('.btn');
        btns.forEach(addEvent);

    })
});



function list_fun(elm) {
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
          <button class="btn" id="${elm['id']}"><img class="cards-decr" id="${elm['id']}" src="assets/images/icon-decrement-quantity.svg"> <img class="cards-cartImg" src="assets/images/icon-add-to-cart.svg"><p class="cards-btn-txt">Add to Cart</p> <img id="${elm['id']}" class="cards-incr" src="assets/images/icon-increment-quantity.svg"> </button>
        </div>
        <div class="container-products">
            <p>${elm['category']}</p>
            <p>${elm['name']}</p>
            <p>$${elm['price'].toFixed(2)}</p>
        </div>
    </li>`
}

function cart_fun(elm) {
    // btn.click => map the object with the same id as the button
    if (elm['quantity'] > 0) {
        items += `
            <div class="cart-prices-container">        
                <span class="cart-prices-span">
                    <h4>${elm['name']}</h4>
                    <p class ='quantity'>${elm['quantity']}X</p>
                    <p>@$${elm['price'].toFixed(2)}</p>
                    <p class="cart-order-product">$${(elm['price'] * elm['quantity']).toFixed(2)}</p>
                </span>
                <svg class="svg ${elm['id']}" id="${elm['id']}" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 10 10"><path class="siwii" fill="hsl(12, 20%, 44%)" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
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
                    <p>This is a <b>carbon-neutral</b> delivery</p>
                </div>
                <button id="cart-order-button" >Confirm Order</button>
            </div>`
    }
}

//  Experiment starting HEREEEEEEEEEEEEEEEEEEEEE


function map(polarity) {
    items = '';
    if (polarity == true) {
        datas.map((element) => {
            cart_fun(element);
        });
        cart.innerHTML = items + order;
    } else if (polarity == false) {
        cart.innerHTML = `
    <img src="assets/images/illustration-empty-cart.svg" alt="Empty card Image">
      <p>Your added items will appear here</p>`
    }
}


//      THIS IS FOR THE EVENTS FUNCTION

function numbering(btn) {
    attr = btn.getAttribute('id');
    quantities[`${attr}`]++;
    addQuantity(attr);
    cartTotal++;
    map(true);
    productImg = btn.previousElementSibling;
    cartImg = btn.querySelector('.cards-cartImg');
    btnPara = btn.querySelector('.cards-btn-txt');
    btnIncr = btn.querySelector('.cards-incr');
    btnDecr = btn.querySelector('.cards-decr');
    svgs = document.querySelectorAll('.svg');
    //const orderProduct = document.querySelector('.cart-order-product');    
    if (!btnDecr.decrHandler) {
        btnDecr.decrHandler = function decrH() {

            // Copying attr in each place for it to be dynamic to the image incr,decr and not the button
            attr = btn.getAttribute('id');
            event.stopPropagation()
            console.log('decr event');
            if (quantities[`${attr}`] > 1) {
                quantities[`${attr}`] -= 1;
                subtractQuantity(attr);
                cartTotal -= 1;
                textContent(btnPara, btn);
                map(true);
                addSvgEvent();

            } else {
                cartImg = btn.querySelector('.cards-cartImg');
                btnPara = btn.querySelector('.cards-btn-txt');
                btnIncr = btn.querySelector('.cards-incr');
                btnDecr = btn.querySelector('.cards-decr');
                //btn problem fix
                quantities[`${attr}`] -= 1;
                subtractQuantity(attr);
                cartTotal -= 1;
                btnPara.style.color = 'hsl(14, 65%, 9%)';
                btnIncr.classList.remove('cards-on');
                cartImg.classList.remove('cards-off');
                btnDecr.classList.remove('cards-on');
                btn.classList.toggle('btn-on');
                productImg.classList.toggle('img-on');
                btn.style.backgroundColor = 'hsl(20, 50%, 98%)';
                btnPara.textContent = `Add to Cart`;
                if (cartTotal >= 1) {
                    map(true);
                    cartH.textContent = `Your Cart(${cartTotal})`;
                } else {
                    map(false);
                    cartH.textContent = `Your Cart()`;
                }
                addSvgEvent()
            }
        }
    }
    if (!btnIncr.incrHandler) {
        btnIncr.incrHandler = function incrH() {
            attr = btn.getAttribute('id');
            event.stopPropagation();
            console.log('incr event');
            quantities[`${attr}`] += 1;
            addQuantity(attr);
            cartTotal += 1;
            textContent(btnPara, btn);
            map(true);
            console.log(orderTotal);
            addSvgEvent();

        }
    }


    btnIncr.removeEventListener('click', btnIncr.incrHandler);
    btnDecr.removeEventListener('click', btnDecr.decrHandler);

    btnIncr.addEventListener('click', btnIncr.incrHandler);
    btnDecr.addEventListener('click', btnDecr.decrHandler);

    btnPara.style.color = 'hsl(20, 50%, 98%)';
    textContent(btnPara, btn);
    btnIncr.classList.add('cards-on');
    cartImg.classList.add('cards-off');
    btnDecr.classList.add('cards-on');
    btn.classList.add('btn-on');
    productImg.classList.add('img-on');
    btn.style.backgroundColor = 'hsl(14, 86%, 42%)';
    addSvgEvent();
}


// QUANTITY FUNCTIONS
function addQuantity(btnID) {
    for (var i = 0; i <= 8; i++) {
        if (datas[i]['id'] == btnID) {
            datas[i].quantity++;
            orderTotal += datas[i].price;
        }
    }
}

function subtractQuantity(btnID) {
    for (var i = 0; i <= 8; i++) {
        if (datas[i].id == btnID) {
            datas[i].quantity--;
            orderTotal -= datas[i].price;
        }
    }
}



function addEvent(btn) {
    let id = btn.getAttribute('id');
    quantities[id] = 0;
    btn.addEventListener('click', function (event) {
        event.stopPropagation()
        console.log('button event');
        numbering(btn);
    });
}

function textContent(btnPara, btn) {
    btnPara = btn.querySelector('.cards-btn-txt');
    btnPara.textContent = `${quantities[`${attr}`]}`;
    //orderProduct.textContent = `$${orderTotal.toFixed(2)}`;
    cartH.textContent = `Your Cart(${cartTotal})`;
}

function addSvgEvent() {
    svgs = document.querySelectorAll('.svg');
    confirmBtn = document.getElementById('cart-order-button');
    //Confirm Button Event
    if (confirmBtn != null) {
        confirmBtn.addEventListener('click', () => {
            const div = document.getElementById('div');
            let upper = '';
            let middle = '';
            let lower = '';
            datas.map((elm) => {
                upper = `
                <div class="order-container">
                <div class="order-subcontainer">
                    <svg width="43" height="43" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z" fill="#1EA575"/>
                    <path d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z" fill="#1EA575"/>
                    </svg>
                    <h1>Order Confirmed</h1>
                    <p class="order-para">We hope you enjoy your food!</p>
                    <div class="order-containerTwo">`

                if (elm['quantity'] > 0) {
                    middle += `
                    <div class="order-list">
                        <img src="${elm['image']['thumbnail']}">
                        <span>
                            <p class="order-list-name">${elm['name']}</p>
                            <p class="order-list-quantity">${elm['quantity']}x</p>
                            <p class="order-list-atprice">@$${(elm['price']).toFixed(2)}</p>
                        </span>
                        <p id="order-list-total">$${(elm['price'] * elm['quantity']).toFixed(2)}</p>
                    </div>
            `
                }
                lower = `
                <div class ="order-lower">
                <p>Order Total</p>
                <h2>$${orderTotal.toFixed(2)}</h2>
                </div>
                </div>
                <button id="order-lower-btn">Start New Order</button>
            </div>
            </div>

            `
            })
            div.innerHTML = upper + middle + lower;
            const newOrderBtn = document.querySelector('.order-container button');
            newOrderBtn.addEventListener(('click'), function reset() {
                const images = document.querySelectorAll('.cards-image');
                for (var i = 0; i <= 8; i++) {
                    quantities[`product${i + 1}`] = 0;
                    datas[i].quantity = 0;
                }
                console.log('newOrderBtn Event');
                orderTotal = 0;
                cartTotal = 0;
                map(false);
                cartH.textContent = `Your Cart()`;

                
                btns.forEach((btn) => {
                    cartImg = btn.querySelector('.cards-cartImg');
                    btnPara = btn.querySelector('.cards-btn-txt');
                    btnIncr = btn.querySelector('.cards-incr');
                    btnDecr = btn.querySelector('.cards-decr');
                    svgs = document.querySelectorAll('.svg');
                    // To test the logic
                    btnPara.style.color = 'hsl(14, 65%, 9%)';
                    btnIncr.classList.remove('cards-on');
                    cartImg.classList.remove('cards-off');
                    btnDecr.classList.remove('cards-on');
                    btn.classList.toggle('btn-on');
                    productImg.classList.toggle('img-on');
                    btn.style.backgroundColor = 'hsl(20, 50%, 98%)';
                    btnPara.textContent = `Add to Cart`;
                })
                div.innerHTML = '';
                images.forEach((img) =>{
                    img.classList.remove('img-on');
                })
            })
        })
    }
    //SVG Button Event
    svgs.forEach((svg) => {
        svg.addEventListener('click', function remove() {
            for (var i = 0; i <= 8; i++) {
                if (`${datas[i]['id']}` == svg.getAttribute('id')) {
                    quantities[`${svg.getAttribute('id')}`] = 0;
                    orderTotal -= datas[i].price * datas[i].quantity;
                    cartTotal -= datas[i].quantity;
                    datas[i].quantity = 0;
                    if (cartTotal > 0) {
                        map(true);
                        cartH.textContent = `Your Cart(${cartTotal})`;
                    } else {
                        map(false);
                        cartH.textContent = `Your Cart()`;
                    }
                }
            }
            btns.forEach((btn) => {
                if (btn.getAttribute('id') == svg.getAttribute('id')) {
                    productImg = btn.previousElementSibling;
                    cartImg = btn.querySelector('.cards-cartImg');
                    btnPara = btn.querySelector('.cards-btn-txt');
                    btnIncr = btn.querySelector('.cards-incr');
                    btnDecr = btn.querySelector('.cards-decr');
                    svgs = document.querySelectorAll('.svg');
                    // To test the logic
                    btnPara.style.color = 'hsl(14, 65%, 9%)';
                    btnIncr.classList.remove('cards-on');
                    cartImg.classList.remove('cards-off');
                    btnDecr.classList.remove('cards-on');
                    btn.classList.toggle('btn-on');
                    productImg.classList.toggle('img-on');
                    btn.style.backgroundColor = 'hsl(20, 50%, 98%)';
                    btnPara.textContent = `Add to Cart`;
                }
            })
            console.log('svg event');
            addSvgEvent();
        });
    });

}

