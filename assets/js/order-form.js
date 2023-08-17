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
const regex = /\d/; 

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

function ExaminationAdressTwo(){
    if(inputAdressTwo.value.length <= 5 && inputAdressTwo.value.length !== 0){
        errorAdressTwo.innerHTML = 'The shipping address should be at least 5 characters long'
        inputAdressTwo.classList.add('input-active')
    }else{
        console.log(inputAdressTwo.value)
    }
}


function orderBtn() {
    ExaminationFirstName();
    ExaminationLastName();
    ExaminationAdressOne();
    ExaminationAdressTwo();
}

// const text = "Пример текста с .  цифрами";

// // Регулярное выражение, которое ищет цифры



// if (hasNumbers) {
//   console.log("В тексте есть цифры.");
// } else {
//   console.log("В тексте нет цифр.");
// }