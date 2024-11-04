let order = {
    selSoup: null,
    selMaindish: null,
    selSalad: null,
    selDrink: null,
    selDessert: null
};

//Функция подсчета конечной цены
function totalPrice() {
    const totalPrice = document.getElementById('total');
    let total = 0;

    if (order.selSoup) { 
        total += order.selSoup.price;
    }
    if (order.selMaindish) { 
        total += order.selMaindish.price;
    }
    if (order.selSalad) { 
        total += order.selSalad.price;
    }
    if (order.selDrink) { 
        total += order.selDrink.price;
    }
    if (order.selDessert) { 
        total += order.selDessert.price;
    }
    totalPrice.textContent = `${total}₽`;
}

//Функция для отображения блюд в заказе
function updateDisplay() {
    const noSelection = document.getElementById('nothing');
    const selectedOrder = document.getElementById('selectedOrder');

    if (order.selSoup || order.selDrink || order.selMaindish ||
         order.selDessert || order.selSalad) {
        noSelection.style.display = 'none';
        selectedOrder.style.display = 'flex';
        totalPrice();
    } else {
        noSelection.style.display = 'block';
        selectedOrder.style.display = 'none';
    }
}

// Функция для добавления блюда в заказ
function selectDish(keyword) {
  
    const selectedDish = dishes.find(dish => dish.keyword === keyword);
    
    if (selectedDish.category === 'soup') {
        order.selSoup = selectedDish;
        document.getElementById("soup-select-no").textContent = 
        selectedDish.name + ' - ' + selectedDish.price + '₽';
    } else if (selectedDish.category === 'maindish') {
        order.selMaindish = selectedDish;
        document.getElementById("maindish-select-no").textContent = 
        selectedDish.name + ' - ' + selectedDish.price + '₽';
    } else if (selectedDish.category === 'salad') {
        order.selSalad = selectedDish;
        document.getElementById("salad-select-no").textContent = 
        selectedDish.name + ' - ' + selectedDish.price + '₽';
    } else if (selectedDish.category === 'drink') {
        order.selDrink = selectedDish;
        document.getElementById("drink-select-no").textContent =
         selectedDish.name + ' - ' + selectedDish.price + '₽';
    } else if (selectedDish.category === 'dessert') {
        order.selDessert = selectedDish;
        document.getElementById("dessert-select-no").textContent = 
        selectedDish.name + ' - ' + selectedDish.price + '₽';
    }

    updateDisplay();
}


// Функция для отображения блюд
function displayDishes(dishes) {
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

        if (dish.category === 'soup') { 
            dishSections[0].append(dishCard);
        } else if (dish.category === 'maindish') {
            dishSections[1].append(dishCard);
        } else if (dish.category === 'salad') {
            dishSections[2].append(dishCard);
        } else if (dish.category === 'drink') {
            dishSections[3].append(dishCard);
        } else if (dish.category === 'dessert') {
            dishSections[4].append(dishCard);
        }
       
        dishCard.querySelector('button').onclick =
         () => selectDish(dishCard.getAttribute('data-dish'));
        
    });
    
}

document.addEventListener("DOMContentLoaded", displayDishes(dishes));

// Функция для отображения блюд по выбранной категории
function filterDishes(kind, category) {
    const dishSections = document.querySelectorAll(`.${category} .dishes`);

    // Очистка существующих блюд
    dishSections.forEach(section => section.innerHTML = '');

    if (kind === null) {
        const allDishesInCategory = dishes.filter((dish) =>
            dish.category === category);
        document.addEventListener("DOMContentLoaded",
            displayDishes(allDishesInCategory));
    } else { 
        const filteredDishes = dishes.filter((dish) => 
            dish.kind === kind && dish.category === category);
        document.addEventListener("DOMContentLoaded",
            displayDishes(filteredDishes));
    }
}

// Обработчик событий для фильтров
function setupFilters(dishCategory) {
    const filters =
     document.querySelectorAll(`input[name="filter${dishCategory}"]`);

    filters.forEach(filter => {
        filter.addEventListener('click', function(event) {
            const radio = event.target;
            // Проверка, является ли радио-кнопка активной
            if (radio.checked) {
                if (radio.classList.contains("active")) {
                    //Деактивируем фильтр, если он активен
                    radio.checked = false;
                    radio.classList.remove("active");
                    filterDishes(null, this.getAttribute('data-category'));
                } else {
                    //Активируем фильтр
                    filters.forEach(f => {
                        if (f !== radio) {
                            f.classList.remove("active");
                        }
                    });
                    radio.classList.add("active");
                    filterDishes(this.getAttribute('data-kind'), 
                        this.getAttribute('data-category'));
                }
            }
        });
    });
}

// Настраиваем фильтры для каждой категории
setupFilters('Soup');
setupFilters('Main');
setupFilters('Salad');
setupFilters('Drink');
setupFilters('Dessert');

document.getElementById('resetButton').onclick = function() {
    order.selSoup = null;
    order.selMaindish = null;
    order.selSalad = null;
    order.selDrink = null;
    order.selDessert = null;
    updateDisplay();
};

document.getElementById('submitButton').onclick = function(event) {
    const soupValue = document.getElementById('hiddenSoup');
    const mainValue = document.getElementById('hiddenMain');
    const saladValue = document.getElementById('hiddenSalad');
    const drinkValue = document.getElementById('hiddenDrink');
    const dessertValue = document.getElementById('hiddenDessert');
    if (order.selSoup) {
        soupValue.value = order.selSoup.keyword;
    }
    if (order.selMaindish) {
        mainValue.value = order.selMaindish.keyword;
    }
    if (order.selSalad) {
        saladValue.value = order.selSalad.keyword;
    }
    if (order.selDrink) {
        drinkValue.value = order.selDrink.keyword;
    }
    if (order.selDessert) {
        dessertValue.value = order.selDessert.keyword;
    }
};