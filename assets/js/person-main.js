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
    const body = document.body
    body.className = ''
    profileMinititle.innerHTML = "";
    if(num == 1){
        body.classList.add('subscriptions');
        profileTitle.innerHTML = 'Subscriptions';
        localStorage.setItem('ProfileItem', 1);
    }else if(num == 2){
        body.classList.add('orders');
        profileTitle.innerHTML = 'Orders';
        localStorage.setItem('ProfileItem', 2);
    }else if(num == 3){
        body.classList.add('account');
        profileTitle.innerHTML = 'Account Overview';
        profileMinititle.innerHTML = "Regular customer";
        localStorage.setItem('ProfileItem', 3);
    }else if(num == 4){
        body.classList.add('payment');
        profileTitle.innerHTML = 'Payment methods';
        localStorage.setItem('ProfileItem', 4);
    }else if(num == 5){
        body.classList.add('change');
        profileTitle.innerHTML = 'Change Password';
        localStorage.setItem('ProfileItem', 5);
    }else if(num == 6){
        body.classList.add('sign-out');
        profileTitle.innerHTML = 'Sign out';
        localStorage.setItem('ProfileItem', 6);
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
    const formattedCardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
    input.value = formattedCardNumber;
});

inputCardData.addEventListener("input", function (event) {
    const input = event.target;
    let cardNumber = input.value.replace(/[/]/g, "");
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
const regLetters = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
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


function forSaveBtnActive(orderDataObj) {
    for (const key in orderDataObj) {
        if (orderDataObj.hasOwnProperty(key) && orderDataObj[key] === '') {
            console.log(orderDataObj[key])
            return false; 
        }
    }
    return true; 
};
function btnActiva(){
    let btnInfo = {
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        adressOne: inputAdressOne.value,
        city: inputCity.value,
        indexLocation: inputRegNum.value,
        email: inputEmail.value,
        phoneNumber: inputPhone.value,
    };
    let emptyProperties = [];
    for (let key of Object.keys(btnInfo)) {
        if (btnInfo[key] === '') {
            emptyProperties.push(key);
        }
    }
    if (emptyProperties.length > 0) {
        saveBtn.classList.remove('active-btn');
    } else {
        saveBtn.classList.add('active-btn');
    }
};
// Данные оплаты
let payInfo = {
    cardNumber: '',
    cardDataNumber: '',
    cardDataCVC: '',
};


// Проверка для активации кнопки
function btnSavePayActiva(){
    console.log(123)
    let btnPayInfo = {
        cardNumber: cardNum.value,
        cardDataNumber: inputCardData.value,
        cardDataCVC: inputCardCVC.value,
    };
    let emptyProperties = [];
    for (let key of Object.keys(btnPayInfo)) {
        if (btnPayInfo[key] === '') {
            emptyProperties.push(key);
        }
    }
    if (emptyProperties.length > 0) {
        paySaveBtn.classList.remove('active-btn');
    } else {
        paySaveBtn.classList.add('active-btn');
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
    const city = inputCity.value.trim();
    const cityRegExp = /^[a-zA-Zа-яА-ЯёЁ\-]+$/;
    if(inputCity.value === ''){
        errorCity.innerHTML = 'Required'
        inputCity.classList.add('input-active')
    }else if(cityRegExp.test(city)){
        newOrderData.city = inputCity.value;
    }else{
        errorCity.innerHTML = 'Please enter a valid city name'
        inputCity.classList.add('input-active')
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

const thisRegExp = /^[0-9\s]+$/;

function ExaminationCardNumber(){
    payInfo.cardNumber = '';
    const number = cardNum.value.trim();
    if(cardNum.value === ''){
        errorCardNum.innerHTML = 'Required'
        cardNum.classList.add('input-active')
    }else if(!thisRegExp.test(number)){
        errorCardNum.innerHTML = 'only numbers'
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
    const dataRegExp = /^[0-9\s/]+$/;
    const number = inputCardData.value.trim();
    if(inputCardData.value === ''){
        errorCardData.innerHTML = 'Required'
        inputCardData.classList.add('input-active')
    }else if(!dataRegExp.test(number)){
        errorCardData.innerHTML = 'only numbers'
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
    const number = inputCardCVC.value.trim();
    if(inputCardCVC.value === ''){
        errorCardCVC.innerHTML = 'Required'
        inputCardCVC.classList.add('input-active')
    }else if(!thisRegExp.test(number)){
        errorCardCVC.innerHTML = 'Please enter numbers only'
        inputCardCVC.classList.add('input-active')
    }else if(inputCardCVC.value.length < 3){
        errorCardCVC.innerHTML = 'Required'
        inputCardCVC.classList.add('input-active')
    }else{
        payInfo.cardDataCVC = inputCardCVC.value;
    }
};

inputFirstName.addEventListener("input", function(){
    errorFirstName.innerHTML = '';
    inputFirstName.classList.remove('input-active');
    btnActiva();
});

inputLastName.addEventListener("input", function(){
    errorLastName.innerHTML = '';
    inputLastName.classList.remove('input-active');
    btnActiva();
});

inputAdressOne.addEventListener("input", function(){
    errorAdressOne.innerHTML = '';
    inputAdressOne.classList.remove('input-active');
    btnActiva();
});

inputAdressTwo.addEventListener("input", function(){
    errorAdressTwo.innerHTML = '';
    inputAdressTwo.classList.remove('input-active');
    btnActiva();
});

inputCity.addEventListener("input", function(){
    errorCity.innerHTML = '';
    inputCity.classList.remove('input-active');
    btnActiva();
});


inputRegNum.addEventListener("input", function(){
    errorRegNum.innerHTML = '';
    inputRegNum.classList.remove('input-active');
    btnActiva();
});

inputEmail.addEventListener("input", function(){
    errorEmail.innerHTML = '';
    inputEmail.classList.remove('input-active');
    btnActiva();
});

inputPhone.addEventListener("input", function(){
    errorPhone.innerHTML = '';
    inputPhone.classList.remove('input-active');
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
    btnSavePayActiva()
});

inputCardData.addEventListener("input", function(){
    errorCardData.innerHTML = '';
    inputCardData.classList.remove('input-active');
    btnSavePayActiva()
});

inputCardCVC.addEventListener("input", function(){
    errorCardCVC.innerHTML = '';
    inputCardCVC.classList.remove('input-active');
    btnSavePayActiva()
});

cardNum.addEventListener("input", function (event) {
    const input = event.target;
    let cardNumber = input.value.replace(/\s/g, ""); 
    const formattedCardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
    input.value = formattedCardNumber;
    btnActiva();
});

inputCardData.addEventListener("input", function (event) {
    const input = event.target;
    let cardNumber = input.value.replace(/[/]/g, ""); 
    const formattedCardData = cardNumber.replace(/(\d{2})(?=\d)/g, "$1/");
    input.value = formattedCardData;
});

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

function paySaveBtnFunc() {
    ExaminationCardNumber();
    ExaminationCardData();
    ExaminationCardCVC();
    if(forSaveBtnActive(btnPayInfo)){

    }else{
        console.log('некоректно введены данные')
    }
};

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
    xhrProfile.open('GET', url, true); 
    xhrProfile.send();
};

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













