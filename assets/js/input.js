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

function handleInputChange() {
    if(email.value != 0 && password.value != 0 ){
        singIn.classList.add('btn-active')
    } else{
        singIn.classList.remove('btn-active')
    }
}

// Добавляем слушатели события input для каждого input и привязываем общую функцию
email.addEventListener('input', handleInputChange);
password.addEventListener('input', handleInputChange);


