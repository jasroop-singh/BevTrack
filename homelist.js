 // Initialize Firebase
 var firebaseConfig = {
    apiKey: "AIzaSyDj0QJk8Ptz0N_WjHg76iFhY3f2fBmStcM",
    authDomain: "app-to-test-multiple-users.firebaseapp.com",
    databaseURL: "https://app-to-test-multiple-users-default-rtdb.firebaseio.com",
    projectId: "app-to-test-multiple-users",
    storageBucket: "app-to-test-multiple-users.appspot.com",
    messagingSenderId: "342422003892",
    appId: "1:342422003892:web:77cae1a2d537be989737e1"
};

firebase.initializeApp(firebaseConfig);

// Function to redirect to TimeOut.html
function redirectToTimeoutPage() {
    window.location.href = "TimeOut.html";
}

// Set a timer to redirect after 1 minute (60000 milliseconds is one minute)
setTimeout(redirectToTimeoutPage, 60000);

function updatePingStatus() {
    var dropdown = document.getElementById("holeDropdown");
    var selectedHole = dropdown.options[dropdown.selectedIndex].value;

    // Check if a hole is selected
    if (selectedHole !== "") {
        // Update the ping status in the Firebase database
        firebase.database().ref('listData/' + 'hole' + selectedHole).update({
            ping: true
        }).then(function () {
            // Disable or hide the button after successful update
            var requestBtn = document.getElementById("request-btn");
            requestBtn.disabled = true;
            requestBtn.setAttribute("data-ping", "true");
            // requestBtn.style.display = "none"; // Uncomment this line to hide the button instead of disabling it
        });
    }
}

// Listen for changes in the ping status
firebase.database().ref('listData').on('value', function (snapshot) {
    var holeData = snapshot.val();
    var dropdown = document.getElementById("holeDropdown");
    var selectedHole = dropdown.options[dropdown.selectedIndex].value;

    if (holeData && holeData['hole' + selectedHole]) {
        var pingStatus = holeData['hole' + selectedHole].ping;

        var statusText = document.querySelector("#status-text");
        var requestBtn = document.getElementById("request-btn");

        if (selectedHole !== "" && pingStatus) {
            // If ping is true for a selected hole, display "Cart Request is waiting to be accepted..."
            statusText.textContent = "Cart Request is waiting to be accepted...";
            requestBtn.disabled = true;
            requestBtn.setAttribute("data-ping", "true");
            // requestBtn.style.display = "none"; // Uncomment this line to hide the button instead of disabling it
        } else if (statusText.textContent === "Cart Request is waiting to be accepted...") {
            // If ping is false and the previous status text was "Cart Request is waiting to be accepted...",
            // update the status text to "Bev Cart Driver is on their way."
            statusText.textContent = "Bev Cart Driver is on their way.";
        }

        // Enable or show the button if the ping status has changed and it was previously disabled
        if (requestBtn.getAttribute("data-ping") === "true" && !pingStatus) {
            requestBtn.disabled = true;
            requestBtn.removeAttribute("data-ping");
            // requestBtn.style.display = "block"; // Uncomment this line to show the button instead of disabling it
        }
    }
});


// window.onload = timing; // comment out this line to turn off the timing feature

function timing() {
    let currentTime = new Date();

    let hours = currentTime.getHours();
    console.log(hours);
    var startTime = 14; // 2pm
    var endTime = 18;   // 6pm

    if (hours >= startTime && hours < endTime) {
        //
        document.getElementById("message").style.display = "none";
        document.getElementById("main").style.display = "block";
    } else {
        // Website is not accessible
        document.getElementById("message").style.display = "block";
        document.getElementById("main").style.display = "none";
    }
}