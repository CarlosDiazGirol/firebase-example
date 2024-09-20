
// Importa las funciones necesarias desde Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: "tu_apiKey",
  authDomain: "tu_authDomain",
  projectId: "tu_projectId",
  storageBucket: "tu_storageBucket",
  messagingSenderId: "tu-messagingSenderId",
  appId: "tu_appId"
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