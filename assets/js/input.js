document.addEventListener('DOMContentLoaded', function () {
    const usernameInput = document.getElementById('password');
    const recoveryDiv = document.querySelector('.sing-in__recovery');
  
    usernameInput.addEventListener('click', function () {
      recoveryDiv.style.display = 'none';
    });
  
    usernameInput.addEventListener('blur', function () {
      recoveryDiv.style.display = 'block';
    });
  });

var singIn = document.querySelector('.sing-in')
var email = document.getElementById('email');
var password = document.getElementById('password');


function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9а-яА-ЯёЁіІїЇґҐ.-]+\.[a-zA-Zа-яА-ЯёЁіІїЇґҐ]{2,4}$/;
  return emailPattern.test(email);
}
function thisInput(){
  if (isValidEmail(email.value) && password.value.length > 5 ) {
    singIn.classList.add('btn-active')
  } else {
    singIn.classList.remove('btn-active')
  }
}
thisInput();
email.addEventListener('input', thisInput);
password.addEventListener('input', thisInput);



