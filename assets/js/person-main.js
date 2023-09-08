//Основные ссылки
const profileTitle = document.querySelector('.profile__title-one');
const profileMinititle = document.querySelector('.profile__title-two');
const cardNum = document.querySelector('#input-card-num');
const inputCardData = document.querySelector('#input-card-data');
const inputCardCVC = document.querySelector('#input-card-cvc');
const labelForCVC = document.querySelector('.profile__cvc-lable');
const inputFirstName = document.querySelector('#input-first-name');
const inputLastName = document.querySelector('#input-last-name');
const inputAdressOne = document.querySelector('#input-adress-one');
const inputAdressTwo = document.querySelector('#input-adress-two');
const inputCity = document.querySelector('#input-city');
const inputEmail = document.querySelector('#input-email');
const inputPhone = document.querySelector('#input-phone');
const inputCountry = document.querySelector('#input-country');
const inputRegNum = document.querySelector('#input-region-num');
const ProfileGoods = document.querySelector('.profile__subscriptions-goods')
const saveBtn = document.querySelector('#saveInfo');
const paySaveBtn = document.querySelector('#payInfoSave');

//Ссылки на название ошибок
const errorFirstName = document.querySelector('.order-main__error-first-name');
const errorLastName = document.querySelector('.order-main__error-last-name');
const errorAdressOne = document.querySelector('.order-main__error-adress-one');
const errorAdressTwo = document.querySelector('.order-main__error-adress-two');
const errorCity = document.querySelector('.order-main__error-ciry');
const errorEmail = document.querySelector('.order-main__error-email');
const errorPhone = document.querySelector('.order-main__error-phone');
const errorCountry = document.querySelector('.order-main__error-region');
const errorRegNum = document.querySelector('.order-main__error-region-num');
const errorCardNum = document.querySelector('.profile__error-card-num');
const errorCardData = document.querySelector('.profile__error-card-data');
const errorCardCVC = document.querySelector('.profile__error-card-cvc');
const errorCurPas = document.querySelector('.order-main__error-сurrent-password');
const errorNewPas = document.querySelector('.order-main__error-new-password');
const errorCurNewPas = document.querySelector('.order-main__error-current-new-password');

//Ссылки на изминение пароля
const currentPassword = document.querySelector('#input-сurrent-password');
const newPassword = document.querySelector('#input-new-password');
const currentNewPassword = document.querySelector('#input-current-new-password');
const passwordBtn = document.querySelector('.profile__change-btn');

//Проверка полей для активации кнопки
currentPassword.addEventListener('input', function(){
    const curPas = currentPassword.value;
    const newPas = newPassword.value;
    const curNewPas = currentNewPassword.value; 
    if(curPas != '' && curNewPas != '' && newPas != '' ){
        passwordBtn.classList.add('active-btn');
    }else{
        passwordBtn.classList.remove('active-btn');
    }
});
newPassword.addEventListener('input', function(){
    const curPas = currentPassword.value;
    const newPas = newPassword.value;
    const curNewPas = currentNewPassword.value; 
    if(curPas != '' && curNewPas != '' && newPas != '' ){
        passwordBtn.classList.add('active-btn');
    }else{
        passwordBtn.classList.remove('active-btn');
    }
});
currentNewPassword.addEventListener('input', function(){
    if(currentPassword.value != '' && newPassword.value != '' && currentNewPassword.value != '' ){
        passwordBtn.classList.add('active-btn');
    }else{
        passwordBtn.classList.remove('active-btn');
    }
});

//Функции для проверки пароля
function examNewPassword(){
    errorNewPas.innerHTML = '';
    if(newPassword.value.length < 6){
        errorNewPas.innerHTML = 'Minimum 6 characters';
    }else{
        console.log('newPassword-Ok')
    }
};

function examCurNewPas(){
    errorCurNewPas.innerHTML = ''
    if(newPassword.value != currentNewPassword.value){
        errorCurNewPas.innerHTML = 'Password mismatch';
    }
};

passwordBtn.addEventListener('click', function(){
    examNewPassword();
    examCurNewPas();
});

//Taбы
function tabs(num){
    body.className = ''
    profileMinititle.innerHTML = "";
    if(num === 1){
        body.classList.add('subscriptions');
        profileTitle.innerHTML = 'Subscriptions';
    }else if(num === 2){
        body.classList.add('orders');
        profileTitle.innerHTML = 'Orders';
    }else if(num === 3){
        body.classList.add('account');
        profileTitle.innerHTML = 'Account Overview';
        profileMinititle.innerHTML = "Regular customer";
    }else if(num === 4){
        body.classList.add('payment');
        profileTitle.innerHTML = 'Payment methods';
    }else if(num === 5){
        body.classList.add('change');
        profileTitle.innerHTML = 'Change Password';
    }else if(num === 6){
        body.classList.add('sign-out');
        profileTitle.innerHTML = 'Sign out';
    }
};

const localInfoTabs = localStorage.getItem('ProfileItem');

(function(){
    if(localInfoTabs == null){
        tabs(1);
    }else{
        let tabsNum = parseFloat(localInfoTabs);
        tabs(tabsNum);
    }
})();

cardNum.addEventListener("input", function (event) {
    const input = event.target;
    let cardNumber = input.value.replace(/\s/g, ""); 

    // Разбиение номера карты на блоки по 4 цифры с добавлением пробелов
    const formattedCardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");

    input.value = formattedCardNumber;
});

inputCardData.addEventListener("input", function (event) {
    const input = event.target;
    let cardNumber = input.value.replace(/[/]/g, "");

    // Разбиение номера карты на блоки по 2 цифры с добавлением слешей
    const formattedCardData = cardNumber.replace(/(\d{2})(?=\d)/g, "$1/");

    input.value = formattedCardData;
});

let inputResCVC = '';
inputCardCVC.addEventListener("input", function(){
    console.log(inputResCVC)
    let arr = [... inputCardCVC.value] ;
    let resArr = arr.map((letter) => letter = '•');
    labelForCVC.value = resArr.join('');
    labelForCVC.innerHTML = labelForCVC.value
    console.log(inputCardCVC.value)
})

// regRex
const regex = /\d/; 
const regLetters = /[a-zA-Z]/
const regEmail = /@/;

//Данные формы
let newOrderData = {
    firstName: '',
    lastName: '',
    adressOne: '',
    adressTwo: '',
    city: '',
    region: '',
    indexLocation: '',
    email: '',
    phoneNumber: '',
};

//Активации кнопки сохранить
let btnInfo = {
    firstName: '',
    lastName: '',
    adressOne: '',
    city: '',
    region: '',
    indexLocation: '',
    email: '',
    phoneNumber: '',
};
// Проверка для активации кнопки
function forSaveBtnActive(orderDataObj) {
    for (const key in orderDataObj) {
        if (orderDataObj.hasOwnProperty(key) && orderDataObj[key] === '') {
            return false; 
        }
    }
    return true; 
};
function btnActiva(){
    if(forSaveBtnActive(btnInfo)){
        saveBtn.classList.add('active-btn');
    }else{
        saveBtn.classList.remove('active-btn');
    }
};
// Данные оплаты
let payInfo = {
    cardNumber: '',
    cardDataNumber: '',
    cardDataCVC: '',
};
//Активации кнопки сохранить реквизиты
let btnPayInfo = {
    cardNumber: '',
    cardDataNumber: '',
    cardDataCVC: '',
};

// Проверка для активации кнопки
function btnSavePayActiva(){
    console.log(payInfo, 'payInfo')
    if(forSaveBtnActive(btnPayInfo)){
        paySaveBtn.classList.add('active-btn');
    }else{
        paySaveBtn.classList.remove('active-btn');
    }
};

//Функции для проверки полей ввода данных
function ExaminationFirstName(){
    dataFisrtName = '';
    newOrderData.firstName = '';
    if(inputFirstName.value === ''){
        errorFirstName.innerHTML = 'Required'
        inputFirstName.classList.add('input-active')
    }else if(regex.test(inputFirstName.value)){
        errorFirstName.innerHTML = 'Only letters can be entered'
        inputFirstName.classList.add('input-active')
    }else if(inputFirstName.value.length <= 3){
        errorFirstName.innerHTML = 'at least three letters'
        inputFirstName.classList.add('input-active')
    }else{
        newOrderData.firstName = inputFirstName.value;
    }
};

function ExaminationLastName(){
    dataLastName = '';
    newOrderData.lastName = '';
    if(inputLastName.value === ''){
        errorLastName.innerHTML = 'Required'
        inputLastName.classList.add('input-active')
    }else if(regex.test(inputLastName.value)){
        errorLastName.innerHTML = 'Only letters can be entered'
        inputLastName.classList.add('input-active')
    }else if(inputLastName.value.length <= 3){
        errorLastName.innerHTML = 'at least three letters'
        inputLastName.classList.add('input-active')
    }else{
        newOrderData.lastName = inputLastName.value;
    }
};

function ExaminationAdressOne(){
    dataAdressOne = '';
    newOrderData.adressOne = '';
    if(inputAdressOne.value === ''){
        errorAdressOne.innerHTML = 'Required'
        inputAdressOne.classList.add('input-active')
    }else if(inputAdressOne.value.length <= 5){
        errorAdressOne.innerHTML = 'The shipping address should be at least 5 characters long'
        inputAdressOne.classList.add('input-active')
    }else{
        newOrderData.adressOne = inputAdressOne.value;
    }
};

function ExaminationAdressTwo(){
    dataAdressTwo = '';
    newOrderData.adressTwo = '';
    if(inputAdressTwo.value.length <= 5 && inputAdressTwo.value.length !== 0){
        errorAdressTwo.innerHTML = 'The shipping address should be at least 5 characters long'
        inputAdressTwo.classList.add('input-active')
    }else{
        newOrderData.adressTwo = inputAdressTwo.value;
    }
};

function ExaminationCity(){
    dataCity = '';
    newOrderData.city = '';
    if(inputCity.value === ''){
        errorCity.innerHTML = 'Required'
        inputCity.classList.add('input-active')
    }else if(regex.test(inputCity.value)){
        errorCity.innerHTML = 'Please enter a valid city name'
        inputCity.classList.add('input-active')
    }else if(inputCity.value.length <= 3){
        errorCity.innerHTML = 'at least three letters'
        inputCity.classList.add('input-active')
    }else{
        newOrderData.city = inputCity.value;
    }
};

function ExaminationRegionCode(){
    dataRegionCode = '';
    newOrderData.indexLocation = '';
    if(inputRegNum.value === ''){
        errorRegNum.innerHTML = 'Required'
        inputRegNum.classList.add('input-active')
    }else if(inputRegNum.value.length <= 3){
        errorRegNum.innerHTML = 'Min 3 characters long'
        inputRegNum.classList.add('input-active')
    }else if (inputRegNum.value.length > 10){
        errorRegNum.innerHTML = 'You can write a maximum of 10 characters'
        inputRegNum.classList.add('input-active')
    }else{
        newOrderData.indexLocation = inputRegNum.value;
    }
};

function ExaminationEmail(){
    dataEmail = '';
    newOrderData.email = '';
    if(inputEmail.value === ''){
        errorEmail.innerHTML = 'Required'
        inputEmail.classList.add('input-active')
    }else if(!regEmail.test(inputEmail.value) !== false){
        errorEmail.innerHTML = 'Please enter a valid email address'
        inputEmail.classList.add('input-active')
    }else if(inputEmail.value.length <= 5){
        errorEmail.innerHTML = 'at least five letters'
        inputEmail.classList.add('input-active')
    }else{
        newOrderData.email = inputEmail.value;
    }
};

function ExaminationNumber(){
    dataNumber = '';
    newOrderData.phoneNumber = '';
    if(inputPhone.value === ''){
        errorPhone.innerHTML = 'Required'
        inputPhone.classList.add('input-active')
    }else if(inputPhone.value.length < 10 || inputPhone.value.length > 12 ){
        errorPhone.innerHTML = 'Please input numbers'
        inputPhone.classList.add('input-active')
    }else{
        newOrderData.phoneNumber = inputPhone.value;
    }
};

function ExaminationSelect(){
    if(inputCountry.textContent == 'NY'){
        errorCountry.innerHTML = 'Please select State/Province'
        inputCountry.classList.add('input-active')
    }else{
        newOrderData.region = inputCountry.textContent;
    }
};

function ExaminationCardNumber(){
    payInfo.cardNumber = '';
    if(cardNum.value === ''){
        errorCardNum.innerHTML = 'Required'
        cardNum.classList.add('input-active')
    }else if(cardNum.value.length < 12 || cardNum.value.length > 20 ){
        errorCardNum.innerHTML = 'Min 12 letters'
        cardNum.classList.add('input-active')
    }else{
        payInfo.cardNumber = cardNum.value;
    }
};

function ExaminationCardData(){
    payInfo.cardDataNumber = '';
    if(inputCardData.value === ''){
        errorCardData.innerHTML = 'Required'
        inputCardData.classList.add('input-active')
    }else if(inputCardData.value.length < 3){
        errorCardData.innerHTML = 'Required'
        inputCardData.classList.add('input-active')
    }else{
        payInfo.cardDataNumber = inputCardData.value;
    }
};

function ExaminationCardCVC(){
    payInfo.cardDataCVC = '';
    if(inputCardCVC.value === ''){
        errorCardCVC.innerHTML = 'Required'
        inputCardCVC.classList.add('input-active')
    }else if(inputCardCVC.value.length < 3){
        errorCardCVC.innerHTML = 'Required'
        inputCardCVC.classList.add('input-active')
    }else if(regLetters.test(inputCardCVC.value)){
        errorCardCVC.innerHTML = 'Please enter numbers only'
        inputCardCVC.classList.add('input-active')
    }else{
        payInfo.cardDataCVC = inputCardCVC.value;
    }
};

//События для удвления ошиюок о неправильнном вводе и активации кнопки сохранить
inputFirstName.addEventListener("input", function(){
    errorFirstName.innerHTML = '';
    inputFirstName.classList.remove('input-active');
    btnInfo.firstName = inputFirstName.value;
    btnActiva();
});

inputLastName.addEventListener("input", function(){
    errorLastName.innerHTML = '';
    inputLastName.classList.remove('input-active');
    btnInfo.lastName = inputLastName.value;
    btnActiva();
});

inputAdressOne.addEventListener("input", function(){
    errorAdressOne.innerHTML = '';
    inputAdressOne.classList.remove('input-active');
    btnInfo.adressOne = inputAdressOne.value;
    btnActiva();
});

inputAdressTwo.addEventListener("input", function(){
    errorAdressTwo.innerHTML = '';
    inputAdressTwo.classList.remove('input-active');
    btnInfo.adressTwo = inputAdressTwo.value;
    btnActiva();
});

inputCity.addEventListener("input", function(){
    errorCity.innerHTML = '';
    inputCity.classList.remove('input-active');
    btnInfo.city = inputCity.value;
    btnActiva();
});


inputRegNum.addEventListener("input", function(){
    errorRegNum.innerHTML = '';
    inputRegNum.classList.remove('input-active');
    btnInfo.indexLocation = inputRegNum.value;
    btnActiva();
});

inputEmail.addEventListener("input", function(){
    errorEmail.innerHTML = '';
    inputEmail.classList.remove('input-active');
    btnInfo.email = inputEmail.value;
    btnActiva();
});

inputPhone.addEventListener("input", function(){
    errorPhone.innerHTML = '';
    inputPhone.classList.remove('input-active');
    btnInfo.phoneNumber = inputPhone.value;
    btnActiva();
});

inputCountry.addEventListener("input", function(){
    errorCountry.innerHTML = '';
    inputCountry.classList.remove('input-active');
    btnActiva();

});

cardNum.addEventListener("input", function(){
    errorCardNum.innerHTML = '';
    cardNum.classList.remove('input-active');
    btnPayInfo.cardNumber = cardNum.value
    btnSavePayActiva()
});

inputCardData.addEventListener("input", function(){
    errorCardData.innerHTML = '';
    inputCardData.classList.remove('input-active');
    btnPayInfo.cardDataNumber = inputCardData.value;
    btnSavePayActiva()
});

inputCardCVC.addEventListener("input", function(){
    errorCardCVC.innerHTML = '';
    inputCardCVC.classList.remove('input-active');
    btnPayInfo.cardDataCVC = inputCardCVC.value;
    btnSavePayActiva()
});

//Функция которая разделяет пробеллом цыфры при вводе данных (реквизиты карточки - номер)
cardNum.addEventListener("input", function (event) {
    const input = event.target;
    let cardNumber = input.value.replace(/\s/g, ""); // Удаление существующих пробелов

    // Разбиение номера карты на блоки по 4 цифры с добавлением пробелов
    const formattedCardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
    input.value = formattedCardNumber;
    btnActiva();
});

//Функция которая разделяет пробеллом цыфры при вводе данных (реквизиты карточки - дата)
inputCardData.addEventListener("input", function (event) {
    const input = event.target;
    let cardNumber = input.value.replace(/[/]/g, ""); // Удаление существующих слешей

    // Разбиение номера карты на блоки по 2 цифры с добавлением слешей
    const formattedCardData = cardNumber.replace(/(\d{2})(?=\d)/g, "$1/");
    input.value = formattedCardData;
});


//Функция проверки всех волей ввода данных пользователя
function orderBtn() {
    ExaminationFirstName();
    ExaminationLastName();
    ExaminationAdressOne();
    ExaminationAdressTwo();
    ExaminationCity();
    ExaminationRegionCode();
    ExaminationEmail();
    ExaminationNumber();
    ExaminationSelect();
}

//Функция проверки всех волей ввода платежных данных
function paySaveBtnFunc() {
    ExaminationCardNumber();
    ExaminationCardData();
    ExaminationCardCVC();
    if(forSaveBtnActive(btnPayInfo)){

    }else{
        console.log('некоректно введены данные')
    }
};

//Кастумный option
function castumSel(num){
    errorCountry.innerHTML = ''
    inputCountry.classList.remove('input-active')
    if(num === 1){
        inputCountry.innerHTML = 'Kiev'
    }else if( num === 2){
        inputCountry.innerHTML = 'Poltava'
    }else if (num ===3){
        inputCountry.innerHTML = 'Sumy'
    }
    btnInfo.region = inputCountry.textContent;
    btnActiva();
}

//Подписка на товары
let profileGoodsArr = [];
let profileScriotArr = [];

function profileloadGoods (arr){
    arr.forEach(function(url){
        loadGoodsAjax(url);
    })
}

//Функция загрузки через Ajax 
function loadGoodsAjax(url){
    var xhrProfile = new XMLHttpRequest();
    xhrProfile.onreadystatechange = function() {
        if (xhrProfile.readyState === 4 && xhrProfile.status === 200) {
            let profileNewContent = this.responseText;
            ProfileGoods.insertAdjacentHTML('beforeend', profileNewContent);
        }
    };
    xhrProfile.open('GET', url, true); // true указывает на асинхронный режим
    xhrProfile.send();
};

//Функция которая считывает данные с кэша браузера, о том какие ссылки на товары нужно передать для загрузки через Ajax
(function(){
    const localInfo = JSON.parse(localStorage.getItem('goods'));
    if(localInfo !== null){
        profileScriotArr = localInfo.script;
        let ProfilePageArr = localInfo.goodsCard;
        const ProfileNewGoodArr = ProfilePageArr.map((url) => url.replace('basket-goods', 'goods-profile'));
        profileGoodsArr.push(...ProfileNewGoodArr);
        console.log(profileScriotArr);
        console.log(profileGoodsArr);
        profileloadGoods(profileGoodsArr);
    }
}())













