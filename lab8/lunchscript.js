let order = {
    selSoup: null,
    selMaindish: null,
    selSalad: null,
    selDrink: null,
    selDessert: null
};

let dishes = [];

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

//Функция для отображения стоимости в панели
function updateDisplay() {
    const orderPanel = document.getElementById('order-panel');
  
    if (order.selSoup || order.selDrink || order.selMaindish ||
         order.selDessert || order.selSalad) {
        orderPanel.style.display = 'flex';
        totalPrice();
    } else {
        orderPanel.style.display = 'none';
    }
}

// Функция для сброса выделения карточки
function resetHighlight(category) {
    document.querySelectorAll(`.dish-card[data-category=
        "${category}"]`).forEach(card => { 
        card.classList.remove('selected');
    });
}

// Функция для обновления выделения карточек
function updateSelectedCards() {
    document.querySelectorAll('.dish-card').forEach(card => {
        card.classList.remove('selected');
    });

    if (order.selSoup) {
        document.querySelector(`[data-dish=
            "${order.selSoup.keyword}"]`)?.classList.add('selected');
    }
    if (order.selMaindish) {
        document.querySelector(`[data-dish=
            "${order.selMaindish.keyword}"]`)?.classList.add('selected');
    }
    if (order.selSalad) {
        document.querySelector(`[data-dish=
            "${order.selSalad.keyword}"]`)?.classList.add('selected');
    }
    if (order.selDrink) {
        document.querySelector(`[data-dish=
            "${order.selDrink.keyword}"]`)?.classList.add('selected');
    }
    if (order.selDessert) {
        document.querySelector(`[data-dish=
            "${order.selDessert.keyword}"]`)?.classList.add('selected');
    }
}

//Функция проверки комбо
function checkCombo() {
    let errorMessage = '';
    if (!order.selSoup && !order.selMaindish && 
        !order.selSalad && !order.selDrink && !order.selDessert) {
        errorMessage = 'Ничего не выбрано. Выберите блюда для заказа';
    } else if ((order.selMaindish || (order.selSoup && order.selSalad))
         && !order.selDrink) {
        errorMessage = 'Выберите напиток';
    } else if (order.selSoup && !order.selMaindish && !order.selSalad) {
        errorMessage = 'Выберите главное блюдо/салат/стартер';
    } else if (order.selSalad && !order.selSoup && !order.selMaindish) {
        errorMessage = 'Выберите суп или главное блюдо';
    } else if ((order.selDrink || order.selDessert) && !order.selMaindish && 
    !order.selSoup) {
        errorMessage = 'Выберите главное блюдо';
    }
    return errorMessage;
}

//Функция доступа к оформлению заказа
function orderLinkAccess() {
    const orderLink = document.getElementById('order-link');
    if (!checkCombo()) {
        orderLink.classList.remove('disabled');
    } else {
        orderLink.classList.add('disabled');
    }
}

// Функция для добавления блюда в заказ
function selectDish(keyword) {
  
    const selectedDish = dishes.find(dish => dish.keyword === keyword);
    
    if (selectedDish.category === 'soup') {
        order.selSoup = selectedDish;
        localStorage.setItem('soup_id', selectedDish.id);
        
    } else if (selectedDish.category === 'main-course') {
        order.selMaindish = selectedDish;
        localStorage.setItem('main_course_id', selectedDish.id);
        
    } else if (selectedDish.category === 'salad') {
        order.selSalad = selectedDish;
        localStorage.setItem('salad_id', selectedDish.id);
        
    } else if (selectedDish.category === 'drink') {
        order.selDrink = selectedDish;
        localStorage.setItem('drink_id', selectedDish.id);
        
    } else if (selectedDish.category === 'dessert') {
        order.selDessert = selectedDish;
        localStorage.setItem('dessert_id', selectedDish.id);
        
    }

    updateDisplay();
    updateSelectedCards();
    orderLinkAccess();

}


// Функция для отображения блюд
function displayDishes(dishes) {
    const sortedDishes = dishes.sort((a, b) => a.name.localeCompare(b.name));
    
    const dishSections = document.querySelectorAll('.dishes');
    
    
    sortedDishes.forEach(dish => {
        const dishCard = document.createElement('div');
        dishCard.classList.add('dish-card');
        dishCard.setAttribute('data-dish', dish.keyword);
        dishCard.setAttribute('data-category', dish.category);
     

        dishCard.innerHTML = `
            <img src='${dish.image}' alt='${dish.name}'>
            <p class='price'>${dish.price} ₽</p>
            <p class='name'>${dish.name}</p>
            <p class='weight'>${dish.count}</p>
            <button>Добавить</button>
        `;

        if (dish.category === 'soup') { 
            dishSections[0].append(dishCard);
        } else if (dish.category === 'main-course') {
            dishSections[1].append(dishCard);
        } else if (dish.category === 'salad') {
            dishSections[2].append(dishCard);
        } else if (dish.category === 'drink') {
            dishSections[3].append(dishCard);
        } else if (dish.category === 'dessert') {
            dishSections[4].append(dishCard);
        }

        updateSelectedCards();
        dishCard.querySelector('button').onclick =
         () => selectDish(dishCard.getAttribute('data-dish'));

    });

    updateDisplay();
    orderLinkAccess();
}

// Функция для загрузки данных о блюдах при помощи запроса к API
async function loadDishes() {

    const apiUrl = 'https://edu.std-900.ist.mospolytech.ru';
    const apiKey = '74902033-57f7-417f-9e55-5a53ba870cb9';
    const url = `${apiUrl}/labs/api/dishes?api_key=${apiKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
        }

        const fetchedDishes = await response.json();
        // Получаем keywords из localStorage
        const selectedKeywords = [
            localStorage.getItem('soup_id'),
            localStorage.getItem('main_course_id'),
            localStorage.getItem('salad_id'),
            localStorage.getItem('drink_id'),
            localStorage.getItem('dessert_id')
        ].filter(Boolean).map(id => Number(id)); 

        // Фильтруем блюда, чтобы отобразить только те, которые выбраны
        const orderedDishes = fetchedDishes.filter(dish =>
            selectedKeywords.includes(dish.id)
        );

        order.selSoup = orderedDishes.find(dish => dish.category === 'soup');
        order.selMaindish = orderedDishes.find(dish => dish.category === 
            'main-course');
        order.selSalad = orderedDishes.find(dish => dish.category === 'salad');
        order.selDrink = orderedDishes.find(dish => dish.category === 'drink');
        order.selDessert = orderedDishes.find(dish => dish.category === 
            'dessert');

        displayDishes(fetchedDishes);

        dishes = fetchedDishes;
    } catch (error) {
        console.error('Не удалось загрузить блюда:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadDishes();
});

// Функция для отображения блюд по выбранной категории
function filterDishes(kind, category) {
    const dishSections = document.querySelectorAll(`.${category} .dishes`);

    // Очистка существующих блюд
    dishSections.forEach(section => section.innerHTML = '');

    if (kind === null) {
        const allDishesInCategory = dishes.filter((dish) =>
            dish.category === category);
        displayDishes(allDishesInCategory);
    } else { 
        const filteredDishes = dishes.filter((dish) => 
            dish.kind === kind && dish.category === category);
        displayDishes(filteredDishes);
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


function showNotification(message) {
    if (document.querySelector('.notification')) return;

    const notification = document.createElement('div');
    notification.classList.add('notification');

    const messageText = document.createElement('p');
    messageText.textContent = message;
    notification.appendChild(messageText);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Окей👌';
    closeButton.classList.add('close-btn');
    closeButton.addEventListener('click', () => notification.remove());
    notification.appendChild(closeButton);

    document.body.appendChild(notification);

}

document.getElementById('order-link').onclick = function(event) {
    document.location.href = 'order.html';
};