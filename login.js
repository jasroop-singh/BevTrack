// Initialize Firebase
var firebaseConfig = {
    // Your Firebase configuration
    apiKey: "AIzaSyDj0QJk8Ptz0N_WjHg76iFhY3f2fBmStcM",
    authDomain: "app-to-test-multiple-users.firebaseapp.com",
    databaseURL: "https://app-to-test-multiple-users-default-rtdb.firebaseio.com/",
    projectId: "app-to-test-multiple-users",
    storageBucket: "app-to-test-multiple-users.appspot.com",
    messagingSenderId: "342422003892",
    appId: "1:342422003892:web:7d0070e376d055c29737e1"
};
firebase.initializeApp(firebaseConfig);

// Authenticate user with Firebase
function authenticateUser() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (userCredential) {
            // Successful login, redirect to list page
            window.location.href = "drivelist.html";
        })
        .catch(function (error) {
            // Unsuccessful login, show alert
            alert("Login unsuccessful. Please try again.");
        });
}