let order = {
    selSoup: null,
    selMaindish: null,
    selSalad: null,
    selDrink: null,
    selDessert: null
};

let dishes = [];

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
        if (order.selSoup) {
            document.getElementById("soup-select-no").textContent = 
            order.selSoup.name + ' - ' + order.selSoup.price + '₽';
        }
        if (order.selMaindish) {
            document.getElementById("maindish-select-no").textContent = 
            order.selMaindish.name + ' - ' + order.selMaindish.price + '₽';
        }
        if (order.selSalad) {
            document.getElementById("salad-select-no").textContent = 
            order.selSalad.name + ' - ' + order.selSalad.price + '₽';
        }
        if (order.selDrink) {
            document.getElementById("drink-select-no").textContent =
            order.selDrink.name + ' - ' + order.selDrink.price + '₽';
        }
        if (order.selDessert) {
            document.getElementById("dessert-select-no").textContent = 
            order.selDessert.name + ' - ' + order.selDessert.price + '₽';
        }
    } else {
        document.getElementById("soup-select-no").textContent =
         'Суп не выбран'; 
        document.getElementById("maindish-select-no").textContent =
         'Блюдо не выбрано';
        document.getElementById("salad-select-no").textContent =
         'Блюдо не выбрано';
        document.getElementById("drink-select-no").textContent =
         'Напиток не выбран';
        document.getElementById("dessert-select-no").textContent =
         'Блюдо не выбрано';
        noSelection.style.display = 'block';
        selectedOrder.style.display = 'none';
    }
}

function noSelectedDishes() {
    if (!order.selSoup && !order.selDrink && !order.selMaindish &&
        !order.selDessert && !order.selSalad) {
        const noDishes = document.getElementById('order-container');

        noDishes.innerHTML = `
            <h2>Ничего не выбрано.<br> Чтобы добавить блюда в заказ, 
            перейдите на страницу <a href="lunch.html">Собрать ланч</a>.</h2>
        `;
    }
}

// Функция для удаления блюда из заказа
function deleteDish(keyword) {
  
    const selectedDish = dishes.find(dish => dish.keyword === keyword);
    
    if (selectedDish.category === 'soup') {
        order.selSoup = null;
        document.getElementById("soup-select-no").textContent = 
        'Суп не выбран';
        localStorage.removeItem('soup_id', selectedDish.id);
        
    } else if (selectedDish.category === 'main-course') {
        order.selMaindish = null;
        document.getElementById("maindish-select-no").textContent = 
        'Блюдо не выбрано';
        localStorage.removeItem('main_course_id', selectedDish.id);
        
    } else if (selectedDish.category === 'salad') {
        order.selSalad = null;
        document.getElementById("salad-select-no").textContent = 
        'Блюдо не выбрано';
        localStorage.removeItem('salad_id', selectedDish.id);
        
    } else if (selectedDish.category === 'drink') {
        order.selDrink = null;
        document.getElementById("drink-select-no").textContent =
        'Напиток не выбран';
        localStorage.removeItem('drink_id', selectedDish.id);
        
    } else if (selectedDish.category === 'dessert') {
        order.selDessert = null;
        document.getElementById("dessert-select-no").textContent = 
        'Блюдо не выбрано';
        localStorage.removeItem('dessert_id', selectedDish.id);
        
    }

    noSelectedDishes();
    updateDisplay();
}


// Функция для отображения блюд
function displayDishes(dishes) {
   
    noSelectedDishes();

    const dishSection = document.querySelector('.dishes');

    dishes.forEach(dish => {
        const dishCard = document.createElement('div');
        dishCard.classList.add('dish-card');
        dishCard.setAttribute('data-dish', dish.keyword);
        dishCard.setAttribute('data-category', dish.category);
    

        dishCard.innerHTML = `
            <img src='${dish.image}' alt='${dish.name}'>
            <p class='price'>${dish.price} ₽</p>
            <p class='name'>${dish.name}</p>
            <p class='weight'>${dish.count}</p>
            <button>Удалить</button>
        `;

        dishSection.append(dishCard);

        dishCard.querySelector('button').onclick = () => {
            deleteDish(dishCard.getAttribute('data-dish'));
            dishCard.remove();
        };
    });   

    updateDisplay();
}

// Функция для загрузки данных о блюдах при помощи запроса к API
async function loadDishes() {

    const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';
    
    try {
        const response = await fetch(apiUrl);

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
    
        displayDishes(orderedDishes);

        dishes = orderedDishes;
    } catch (error) {
        console.error('Не удалось загрузить блюда:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadDishes();
});


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

document.getElementById('resetButton').onclick = function() {
    updateDisplay();
};

document.getElementById('submitButton').onclick = async function (event) {
    event.preventDefault();

    // Проверяем состав заказа на наличие ошибок
    let errorMessage = checkCombo();
    if (errorMessage) {
        showNotification(errorMessage);
        return;
    }

    // Формируем данные для отправки
    const apiUrl = 'https://edu.std-900.ist.mospolytech.ru';
    const apiKey = '74902033-57f7-417f-9e55-5a53ba870cb9';
    const url = `${apiUrl}/labs/api/orders?api_key=${apiKey}`;

    const formData = new FormData();
    formData.append('full_name', document.getElementById('cl-name').value);
    formData.append('email', document.getElementById('cl-email').value);
    formData.append('subscribe', document.getElementById('agree').value);
    if (formData.get('subscribe') == 'on') {
        formData.set('subscribe', 1);
    } else {
        formData.set('subscribe', 0);
    }
    formData.append('phone', document.getElementById('cl-tel').value);
    formData.append('delivery_address', 
        document.getElementById('cl-address').value);
    formData.append('delivery_type', 
        document.querySelector('input[name="speed"]:checked').value);
    formData.append('delivery_time', 
        document.getElementById('orders-time').value);
    formData.append('comment', document.getElementById('comment').value || '');

    // Добавляем блюда в заказ
    if (order.selSoup) formData.append('soup_id', order.selSoup.id);
    if (order.selMaindish) formData.append('main_course_id', 
        order.selMaindish.id);
    if (order.selSalad) formData.append('salad_id', order.selSalad.id);
    if (order.selDrink) formData.append('drink_id', order.selDrink.id);
    if (order.selDessert) formData.append('dessert_id', 
        order.selDessert.id);
    
    
    var object = {};
    formData.forEach(function(value, key) {
        object[key] = value;
    });
    console.dir(object);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Не удалось отправить заказ');
        }

        const responseData = await response.json();
        console.log('Заказ успешно отправлен:', responseData);

        alert('Заказ успешно оформлен!');
        
        // Очищаем localStorage и обновляем интерфейс
        localStorage.removeItem('soup_id');
        localStorage.removeItem('main_course_id');
        localStorage.removeItem('salad_id');
        localStorage.removeItem('drink_id');
        localStorage.removeItem('dessert_id');
        order = {
            selSoup: null,
            selMaindish: null,
            selSalad: null,
            selDrink: null,
            selDessert: null,
        };
        updateDisplay();
    } catch (error) {
        console.error('Ошибка отправки заказа:', error);
        alert(`Ошибка отправки заказа: ${error.message}`);
    }
};
