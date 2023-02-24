import { menuArray } from "/data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let menuItems = menuArray
let menu = document.getElementById('menu')
let orderArray = []
const order = document.getElementById("order")
const modal = document.getElementById("modal")
const orderConfirmed = document.getElementById("order-confirmed")


document.addEventListener("click", function(e){
    if(e.target.dataset.item){
        addToCart(e.target.dataset.item)
    } else if (e.target.dataset.remove){
        removeItem(e.target.dataset.remove)
    } else if (e.target.id === "order-btn"){
        modal.classList.add("reveal")
    }
}) 

document.addEventListener('submit', function(e){
    e.preventDefault()
    
    const cardData = new FormData(document.getElementById('form'))
    const cardName = cardData.get('card-name')
    
    modal.style.display = "none"
    order.style.display = "none"
    orderConfirmed.style.display = "block"
    
    orderConfirmed.innerHTML = 
    `<p class='order-message'>Thanks, ${cardName}! Your order is on its way!</p>`
    orderArray = []    
    renderCart()
})

function addToCart(itemId){
    const addedItem = menuItems.filter(function(item){
        return item.uuid === itemId  
    })[0]
    orderArray.push(addedItem)   
    renderCart()
}

function renderCart(){    
    let shoppingCart = ""
    orderArray.forEach(function(item, index){
        shoppingCart += `
            <div class="item">
                <h3 class="item-name">${item.name}</h3>
                <button class="remove-btn" 
                        id="remove-btn"
                        data-remove="${index}"
                    >remove
                </button>
                <p class="item-price">$${item.price}</p>         
            </div>            
        `         
    })
    
    let totalPrice = 0
    orderArray.forEach(item => {
    totalPrice += item.price
    })
    
    order.classList.add("reveal")
    document.getElementById("cart").innerHTML = shoppingCart
    document.getElementById("total-price").innerHTML = "$" + totalPrice
}

function removeItem(itemIndex){
    orderArray.splice(itemIndex, 1)
    renderCart()
}

function getMenuHtml(){
    let menuHtml = ""
    
    menuItems.forEach(function(menuItem){
       
     menuHtml += `
    <div class="menu-item">
        <p class="emoji">${menuItem.emoji}</p>
        <div class="item-description">
            <h3>${menuItem.name}</h3>
            <p class="ingredients">${menuItem.ingredients}</p>
            <p class="price">$${menuItem.price}</p>
        </div>
        <div class="item-add">
            <svg data-item="${menuItem.uuid}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path data-item="${menuItem.uuid}" fill="none" stroke="currentColor" stroke-width="1.5" d="M6 12h6m0 0c2.489 0 6 0 6 0m-6 0V6m0 6v6"></path></svg>
        </div>
    </div>
    <hr class="menu-hr">
    ` 
    })  
    return menuHtml
}


function render(){
    menu.innerHTML = getMenuHtml()
}

render()