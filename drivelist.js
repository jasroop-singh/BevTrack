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

function togglePingStatus(hole) {
    // Get the current ping status from the Firebase database
    firebase.database().ref('listData/hole' + hole + '/ping').once('value').then(function (snapshot) {
        var currentStatus = snapshot.val();

        // Update the ping status only if it is currently true
        if (currentStatus === true) {
            firebase.database().ref('listData/hole' + hole).update({
                ping: false
            });
        }
    });
}

// Listen for changes in the ping value and update button color accordingly
function listenForPingChanges(hole, button) {
    firebase.database().ref('listData/hole' + hole + '/ping').on('value', function (snapshot) {
        var pingValue = snapshot.val();

        if (pingValue === true) {
            button.classList.add('pinged');
        } else {
            button.classList.remove('pinged');
        }
    });
}

// Call listenForPingChanges for each hole
document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.getElementsByClassName('holeButton');
    for (var i = 0; i < buttons.length; i++) {
        var hole = i + 1;
        listenForPingChanges(hole, buttons[i]);
    }
});