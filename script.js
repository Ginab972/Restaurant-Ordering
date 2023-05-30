import { menuArray } from "./data.js";


const menuContainer = document.getElementById('menu-container');
const orderContainer = document.getElementById('order-container')
const orderItems = document.getElementById('order-items');
const orderForm = document.getElementById('pay-form');
const totalPrice = document.getElementById('total-price');


menuArray.forEach((item) => {
    menuContainer.innerHTML += 
        `
            <div class="menu-item">
                <div class="menu-info">
                    <div class="emoji" id="emoji">${item.emoji}</div>
                    <div class="menu-text">
                        <h3>${item.name}</h3>
                        <p>${item.ingredients}</p>
                        <h3>$ ${item.price}</h3>
                    </div>
                </div>
                <button class="btn-add" data-add="${item.id}">+</button>
            </div>
        `
})


document.addEventListener('click', (e) => {
    if(e.target.dataset.add) {
        addToOrder(e.target.dataset.add)
    } else if(e.target.dataset.remove) {
        removeFromOrder(e.target.dataset.remove)
    } else if(e.target.id == 'btn-complete') {
        orderForm.style.display = 'block';
    }
})


function addToOrder(itemId) {
    menuArray[itemId].quantity += 1;
    renderOrder()
}



function removeFromOrder(itemId) {
    menuArray[itemId].quantity -= 1;
    renderOrder()
}


function renderOrder() {
    let totalCost = 0;
    orderItems.innerHTML = ``;
    menuArray.forEach((item) => {
        if(item.quantity > 0) {
            totalCost += item.price * item.quantity
            orderItems.innerHTML += 
                `
                    <div class="order-item">
                        <div class="order-item-info">
                            <p>${item.quantity}</p>
                            <h3>${item.name}</h3>
                            <button class="btn-rem" data-remove="${item.id}">🗑</button>
                        </div>
                        <h3 class="item-price">$ ${item.quantity * item.price}</p>
                    </div>  
                `
        }
        if(totalCost == 0) {
            orderContainer.style.display = 'none';
        } else {
            orderContainer.style.display = 'block';
            totalPrice.innerHTML = `$ ${totalCost}`;
        }
        
    })
}