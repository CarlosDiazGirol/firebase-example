
// Importa las funciones necesarias desde Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';

//Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCwv15q532hRVur2MqHOFUoByzBOez_0kQ",
  authDomain: "login-firebase-e39bb.firebaseapp.com",
  projectId: "login-firebase-e39bb",
  storageBucket: "login-firebase-e39bb.appspot.com",
  messagingSenderId: "74831738471",
  appId: "1:74831738471:web:97995849620f53a742c6c2"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Define la función login
window.login = function() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user.getIdToken(); // Obtén el ID token
    })
    .then((idToken) => {
      // Envía el ID token al servidor
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          window.location.href = '/dashboard'; // Redirige a dashboard
        } else {
          console.error('Login failed:', data.error);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};