// Функция для отображения блюд
function displayDishes() {
    const sortedDishes = dishes.sort((a, b) => a.name.localeCompare(b.name));
    
    const dishSections = document.querySelectorAll('.dishes');
    
    sortedDishes.forEach(dish => {
        const dishCard = document.createElement('div');
        dishCard.classList.add('dish-card');
        dishCard.setAttribute('data-dish', dish.keyword);

        dishCard.innerHTML = `
            <img src='${dish.image}' alt='${dish.name}'>
            <p class='price'>${dish.price} ₽</p>
            <p class='name'>${dish.name}</p>
            <p class='weight'>${dish.count}</p>
            <button>Добавить</button>
        `;

        if(dish.category === 'soup'){
            dishSections[0].append(dishCard);
        }
        else if(dish.category === 'maindish'){
            dishSections[1].append(dishCard);
        }
        else if(dish.category === 'drink'){
            dishSections[2].append(dishCard);
        }
       
        dishCard.querySelector('button').onclick = () => selectDish(dishCard.getAttribute('data-dish'));
        
    });
}

let order = {
    selSoup: null,
    selMaindish: null,
    selDrink: null
};

// Функция для добавления блюда в заказ
function selectDish(keyword) {
  
    const selectedDish = dishes.find(dish => dish.keyword === keyword);
    
    if (selectedDish.category === 'soup'){
        order.selSoup = selectedDish;
        document.getElementById("soup-select-no").textContent = selectedDish.name +' - '+ selectedDish.price + '₽';
    }
    else if (selectedDish.category === 'maindish'){
        order.selMaindish = selectedDish;
        document.getElementById("maindish-select-no").textContent = selectedDish.name +' - '+ selectedDish.price + '₽';
    } 
    else if(selectedDish.category === 'drink'){
        order.selDrink = selectedDish;
        document.getElementById("drink-select-no").textContent = selectedDish.name +' - '+ selectedDish.price + '₽';
    }

    updateDisplay();
}

//Функция для отображения блюд в заказе
function updateDisplay(){
    const noSelection = document.getElementById('nothing');
    const selectedOrder = document.getElementById('selectedOrder')

    if(order.selSoup || order.selDrink || order.selMaindish){
        noSelection.style.display = 'none';
        selectedOrder.style.display = 'flex';
        totalPrice();
    }
    else{
        noSelection.style.display = 'block';
        selectedOrder.style.display = 'none';
    }
}

//Функция подсчета конечной цены
function totalPrice() {
    const totalPrice = document.getElementById('total');
    let total = 0;

    if(order.selSoup) {total += order.selSoup.price};
    if(order.selMaindish) {total += order.selMaindish.price};
    if(order.selDrink) {total += order.selDrink.price};
    totalPrice.textContent = `${total}₽`;
}

document.addEventListener("DOMContentLoaded", displayDishes);

document.getElementById('resetButton').onclick = function(){
    order.selSoup = null;
    order.selMaindish= null;
    order.selDrink = null;
    updateDisplay();
};

document.getElementById('submitButton').onclick = function(event){
    const soupValue = document.getElementById('hiddenSoup');
    const mainValue = document.getElementById('hiddenMain');
    const drinkValue = document.getElementById('hiddenDrink');
    if(order.selSoup) {soupValue.value = order.selSoup.keyword};
    if(order.selMaindish) {mainValue.value = order.selMaindish.keyword};
    if(order.selDrink) {drinkValue.value = order.selDrink.keyword};
};