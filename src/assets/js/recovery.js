var singIn = document.querySelector('.sing-in')
var email = document.getElementById('email');

function handleInputChange() {
    if(email.value != 0 ){
        singIn.classList.add('btn-active')
    } else{
        singIn.classList.remove('btn-active')
    }
}

email.addEventListener('input', handleInputChange);


