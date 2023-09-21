const googleInput = document.querySelector('#googleInput')
//РЕГИСТРАЦИЯ
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
import { initializeAuth, getAuth, createUserWithEmailAndPassword, signInWithRedirect, signInWithPopup, GoogleAuthProvider, getRedirectResult } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBj0V9Ad6uhLGLP62KChqHwnUaKHL3_C3o",
    authDomain: "passord.firebaseapp.com",
    databaseURL: "https://passord-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "passord",
    storageBucket: "passord.appspot.com",
    messagingSenderId: "278411986072",
    appId: "1:278411986072:web:7f61a849fa521d7f7e3ced"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const provider = new GoogleAuthProvider();
googleInput.addEventListener('click', (e) => {

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
});

const signUpButton = document.getElementById('accountLink');

signUpButton.addEventListener('click', (e) => {
    e.preventDefault(); 
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var userName = document.getElementById('userName').value;
    var lastName = document.getElementById('lastName').value;
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        set(ref(database, 'users/' + user.uid), {
            userName: userName,
            email: email,
            password: password,
            lastName: lastName,
        })
        .then(() => {
            console.log('User signed up:', user);
            location();
        })
        .catch((error) => {
            console.error('Error while saving user data:', error);
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        console.error('Error:', error);
    });

});

var accountLink = document.getElementById('accountLink');
function location() {
  var hrefValue = accountLink.getAttribute('href');
  if (hrefValue === "wholesale-after.html") {
    window.location.href = "wholesale-after.html";
  } else if (hrefValue === "") {
    window.location.href = "../person.html";
  }
}

