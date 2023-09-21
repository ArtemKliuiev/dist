const accountLink = document.getElementById('accountLink');
const registration = document.querySelector('.registration')
const googleInput = document.querySelector('#googleInput')
const singIn = document.querySelector('.sing-in')
const tabs = (number) => {
    if(number ===1) {
        registration.classList.remove('wholesale-customer')
        registration.classList.add('regular-customer')
        accountLink.href = '';
    } else if (number === 2){
        registration.classList.remove('regular-customer')
        registration.classList.add('wholesale-customer')
        accountLink.href = 'wholesale-after.html';
    }
}
tabs(1);

const inputElement = document.getElementById('permission');

function updatePlaceholderText() {
    if (window.innerWidth < 600) {
      inputElement.placeholder = 'Permission';
    } else {
      inputElement.placeholder = 'Wholesale purchase permission';
    }
  }
  
updatePlaceholderText();

window.addEventListener('resize', updatePlaceholderText);

var email = document.getElementById('email');
var password = document.getElementById('password');
var userName = document.getElementById('userName');
var lastName = document.getElementById('lastName');

function handleInputChange() {
    if(email.value != 0 && password.value != 0 && userName.value != 0 && lastName.value != 0 ){
        singIn.classList.add('btn-active')
    } else{
        singIn.classList.remove('btn-active')
    }
}

email.addEventListener('input', handleInputChange);
password.addEventListener('input', handleInputChange);
userName.addEventListener('input', handleInputChange);
lastName.addEventListener('input', handleInputChange);