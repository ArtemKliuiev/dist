const inputFirstName = document.querySelector('#input-first-name');
const inputLastName = document.querySelector('#input-last-name');
const inputAdressOne = document.querySelector('#input-adress-one');
const inputAdressTwo = document.querySelector('#input-adress-two');
const inputCity = document.querySelector('#input-city');
const inputEmail = document.querySelector('#input-email');
const inputPhone = document.querySelector('#input-phone');
const inputCountry = document.querySelector('#input-country');
const inputRegNum = document.querySelector('#input-region-num');
const inputCardNum2 = document.querySelector('#input-card-num');
const inputCardData = document.querySelector('#input-card-data');
const inputCardCVC = document.querySelector('#input-card-cvc');


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
const errorCardNum = document.querySelector('.order-main__error-card-num');
const errorCardData = document.querySelector('.order-main__error-card-data');
const errorCardCVC = document.querySelector('.order-main__error-card-cvc');


// regRex
const regex = /\d/; 
const regLetters = /[a-zA-Z]/
const regEmail = /@/;

console.log()
function ExaminationFirstName(){
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
        console.log(inputFirstName.value)
    }
}

inputFirstName.addEventListener("input", function(){
    errorFirstName.innerHTML = '';
    inputFirstName.classList.remove('input-active');
})

function ExaminationLastName(){
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
        console.log(inputLastName.value)
    }
}

inputLastName.addEventListener("input", function(){
    errorLastName.innerHTML = '';
    inputLastName.classList.remove('input-active');
})


function ExaminationAdressOne(){
    if(inputAdressOne.value === ''){
        errorAdressOne.innerHTML = 'Required'
        inputAdressOne.classList.add('input-active')
    }else if(inputAdressOne.value.length <= 5){
        errorAdressOne.innerHTML = 'The shipping address should be at least 5 characters long'
        inputAdressOne.classList.add('input-active')
    }else{
        console.log(inputAdressOne.value)
    }
}

inputAdressOne.addEventListener("input", function(){
    errorAdressOne.innerHTML = '';
    inputAdressOne.classList.remove('input-active');
})

function ExaminationAdressTwo(){
    if(inputAdressTwo.value.length <= 5 && inputAdressTwo.value.length !== 0){
        errorAdressTwo.innerHTML = 'The shipping address should be at least 5 characters long'
        inputAdressTwo.classList.add('input-active')
    }else{
        console.log(inputAdressTwo.value)
    }
}

inputAdressTwo.addEventListener("input", function(){
    errorAdressTwo.innerHTML = '';
    inputAdressTwo.classList.remove('input-active');
})


function ExaminationCity(){
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
        console.log(inputCity.value)
    }
}

inputCity.addEventListener("input", function(){
    errorCity.innerHTML = '';
    inputCity.classList.remove('input-active');
})

function ExaminationRegionCode(){
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

    }
    console.log(inputRegNum.value.length )
}

inputRegNum.addEventListener("input", function(){
    errorRegNum.innerHTML = '';
    inputRegNum.classList.remove('input-active');
})

function ExaminationEmail(){
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
        console.log(regEmail.test(inputEmail.value))
    }
}

inputEmail.addEventListener("input", function(){
    errorEmail.innerHTML = '';
    inputEmail.classList.remove('input-active');
})

function ExaminationNumber(){
    if(inputPhone.value === ''){
        errorPhone.innerHTML = 'Required'
        inputPhone.classList.add('input-active')
    }else if(inputPhone.value.length < 10 || inputPhone.value.length > 12 ){
        errorPhone.innerHTML = 'Please input numbers'
        inputPhone.classList.add('input-active')
    }else{
        console.log(inputPhone.value.length)
    }
}

inputPhone.addEventListener("input", function(){
    errorPhone.innerHTML = '';
    inputPhone.classList.remove('input-active');
})

function ExaminationCardNumber(){
    if(inputCardNum2.value === ''){
        errorCardNum.innerHTML = 'Required'
        inputCardNum2.classList.add('input-active')
    }else if(inputCardNum2.value.length < 12 || inputCardNum2.value.length > 20 ){
        errorCardNum.innerHTML = 'Card numbers must contain between 12 and 20 numerical characters.'
        inputCardNum2.classList.add('input-active')
    }else{
        console.log(inputCardNum2.value.length)
    }
}

inputCardNum2.addEventListener("input", function(){
    errorCardNum.innerHTML = '';
    inputCardNum2.classList.remove('input-active');
})

inputCardData.addEventListener("input", function(){
    errorCardData.innerHTML = '';
    inputCardData.classList.remove('input-active');
})

function ExaminationCardData(){
    if(inputCardData.value === ''){
        errorCardData.innerHTML = 'Required'
        inputCardData.classList.add('input-active')
    }else if(inputCardData.value.length < 3){
        errorCardData.innerHTML = 'Required'
        inputCardData.classList.add('input-active')
    }else{
        console.log(inputCardData.value)
    }
}

inputCardData.addEventListener("input", function(){
    errorCardData.innerHTML = '';
    inputCardData.classList.remove('input-active');
})

function ExaminationCardCVC(){
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
        console.log(regLetters.test(inputCardCVC.value))
    }
}

inputCardCVC.addEventListener("input", function(){
    errorCardCVC.innerHTML = '';
    inputCardCVC.classList.remove('input-active');
})

function ExaminationSelect(){
    if(inputCountry.textContent == 'NY'){
        errorCountry.innerHTML = 'Please select State/Province'
        inputCountry.classList.add('input-active')
    }else{
        console.log(inputCountry.textContent)
    }
}

inputCountry.addEventListener("input", function(){
    errorCountry.innerHTML = '';
    inputCountry.classList.remove('input-active');
})

function castumSel(num){
    errorCountry.innerHTML = ''
    inputCountry.classList.remove('input-active')
    if(num === 1){
        inputCountry.innerHTML = 'Ukraine'
    }else if( num === 2){
        inputCountry.innerHTML = 'USA'
    }else if (num ===3){
        inputCountry.innerHTML = 'Mexico'
    }
}

function orderBtn() {
    ExaminationFirstName();
    ExaminationLastName();
    ExaminationAdressOne();
    ExaminationAdressTwo();
    ExaminationCity();
    ExaminationRegionCode();
    ExaminationEmail();
    ExaminationNumber();
    ExaminationCardNumber();
    ExaminationCardData();
    ExaminationCardCVC();
    ExaminationSelect();
    console.log('aaa')
}

// const text = "Пример текста с .  цифрами";

// // Регулярное выражение, которое ищет цифры



// if (hasNumbers) {
//   console.log("В тексте есть цифры.");
// } else {
//   console.log("В тексте нет цифр.");
// }