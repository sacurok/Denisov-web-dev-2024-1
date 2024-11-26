const dishes = [
    //Супы
    { 
        keyword: 'gaspacho', 
        name: 'Гаспачо',
        price: 195,
        category: 'soup', 
        count: '350 г', 
        image: 'images/soup1.jpg',
        kind: 'veg'
    },
    {
        keyword: 'mushroomsoup', 
        name: 'Грибной суп', 
        price: 180, 
        category: 'soup', 
        count: '350 г', 
        image: 'images/soup2.jpg',
        kind: 'veg'
    },
    {
        keyword: 'norwaysoup', 
        name: 'Норвежский суп', 
        price: 230, 
        category: 'soup', 
        count: '350 г', 
        image: 'images/soup3.jpg',
        kind: 'fish'
    },
    {
        keyword: 'tomyum', 
        name: 'Том ям с креветками', 
        price: 650, 
        category: 'soup', 
        count: '500 г', 
        image: 'images/soup4.jpg',
        kind: 'fish'
    },
    {
        keyword: 'chickensoup', 
        name: 'Куриный суп', 
        price: 330, 
        category: 'soup', 
        count: '350 г', 
        image: 'images/soup5.jpg',
        kind: 'meat'
    },
    {
        keyword: 'ramen', 
        name: 'Рамен', 
        price: 375, 
        category: 'soup', 
        count: '425 г', 
        image: 'images/soup6.jpg',
        kind: 'meat'
    },
    //Главные блюда
    {
        keyword: 'potato', 
        name: 'Жареная картошка с грибами', 
        price: 185, 
        category: 'maindish', 
        count: '250 г', 
        image: 'images/maindish1.jpg',
        kind: 'veg'
    },
    {
        keyword: 'rice', 
        name: 'Жареный рис с овощами', 
        price: 150, 
        category: 'maindish', 
        count: '230 г', 
        image: 'images/maindish4.jpg',
        kind: 'veg'
    },
    {
        keyword: 'lasagna', 
        name: 'Лазанья', 
        price: 350, 
        category: 'maindish', 
        count: '310 г', 
        image: 'images/maindish2.jpg',
        kind: 'meat'
    },
    {
        keyword: 'cutlets', 
        name: 'Котлеты из курицы с картофельным пюре', 
        price: 210, 
        category: 'maindish', 
        count: '280 г', 
        image: 'images/maindish3.jpg',
        kind: 'meat'
    },
    {
        keyword: 'salmon', 
        name: 'Стейк из лосося с тушеными овощами', 
        price: 420, 
        category: 'maindish', 
        count: '370 г', 
        image: 'images/maindish5.jpg',
        kind: 'fish'
    },
    {
        keyword: 'shrimp', 
        name: 'Паста с креветками', 
        price: 340, 
        category: 'maindish', 
        count: '280 г', 
        image: 'images/maindish6.jpg',
        kind: 'fish'
    },
    //Салаты и стартеры
    {
        keyword: 'koreanSalad', 
        name: 'Корейский салат с овощами и яйцом', 
        price: 330, 
        category: 'salad', 
        count: '250 г', 
        image: 'images/salad1.jpg',
        kind: 'veg'
    },
    {
        keyword: 'caprese', 
        name: 'Капрезе с моцареллой', 
        price: 350, 
        category: 'salad', 
        count: '235 г', 
        image: 'images/salad2.jpg',
        kind: 'veg'
    },
    {
        keyword: 'cаezarSalad', 
        name: 'Цезарь с цыпленком', 
        price: 370, 
        category: 'salad', 
        count: '240 г', 
        image: 'images/salad3.jpg',
        kind: 'meat'
    },
    {
        keyword: 'friesKetchup', 
        name: 'Картофель фри с кетчупом', 
        price: 260, 
        category: 'salad', 
        count: '235 г', 
        image: 'images/salad4.jpg',
        kind: 'veg'
    },
    {
        keyword: 'tunaSalad', 
        name: 'Салат с тунцом', 
        price: 480, 
        category: 'salad', 
        count: '250 г', 
        image: 'images/salad5.jpg',
        kind: 'fish'
    },
    {
        keyword: 'friesCaesar', 
        name: 'Картофель фри с соусом цезарь', 
        price: 280, 
        category: 'salad', 
        count: '235 г', 
        image: 'images/salad6.jpg',
        kind: 'veg'
    },
    //Напитки
    {
        keyword: 'orangeJ', 
        name: 'Апельсиновый сок', 
        price: 90, category: 'drink', 
        count: '300 мл', 
        image: 'images/drink1.jpg',
        kind: 'cold'
    },
    {
        keyword: 'appleJ', 
        name: 'Яблочный сок', 
        price: 80, 
        category: 'drink', 
        count: '300 мл', 
        image: 'images/drink2.jpg',
        kind: 'cold'
    },
    {
        keyword: 'carrotJ', 
        name: 'Морковный сок', 
        price: 110, 
        category: 'drink', 
        count: '300 мл', 
        image: 'images/drink3.jpg',
        kind: 'cold'
    },
    {
        keyword: 'blacktea', 
        name: 'Черный чай', 
        price: 90, 
        category: 'drink', 
        count: '200 мл', 
        image: 'images/drink4.jpg',
        kind: 'hot'
    },
    {
        keyword: 'greentea', 
        name: 'Зеленый чай', 
        price: 100, 
        category: 'drink', 
        count: '200 мл', 
        image: 'images/drink5.jpg',
        kind: 'hot'
    },
    {
        keyword: 'cappuccino', 
        name: 'Капучино', 
        price: 180, 
        category: 'drink', 
        count: '200 мл', 
        image: 'images/drink6.jpg',
        kind: 'hot'
    },
    //Десерты
    {
        keyword: 'baklava', 
        name: 'Пахлава', 
        price: 220, 
        category: 'dessert', 
        count: '300 г', 
        image: 'images/dessert1.jpg',
        kind: 'medium-dose'
    },
    {
        keyword: 'cheesecake', 
        name: 'Чизкейк', 
        price: 240, 
        category: 'dessert', 
        count: '125 г', 
        image: 'images/dessert2.jpg',
        kind: 'small-dose'
    },
    {
        keyword: 'chococheesecake', 
        name: 'Шоколадный чизкейк', 
        price: 260, 
        category: 'dessert', 
        count: '125 г', 
        image: 'images/dessert3.jpg',
        kind: 'small-dose'
    },
    {
        keyword: 'chococake', 
        name: 'Шоколадный торт', 
        price: 270, 
        category: 'dessert', 
        count: '140 г', 
        image: 'images/dessert4.jpg',
        kind: 'small-dose'
    },
    {
        keyword: 'donuts4', 
        name: 'Пончики (4 шт)', 
        price: 410, 
        category: 'dessert', 
        count: '350 г', 
        image: 'images/dessert5.jpg',
        kind: 'medium-dose'
    },
    {
        keyword: 'donuts6', 
        name: 'Пончики (6 шт)', 
        price: 650, 
        category: 'dessert', 
        count: '700 г', 
        image: 'images/dessert6.jpg',
        kind: 'big-dose'
    }
];