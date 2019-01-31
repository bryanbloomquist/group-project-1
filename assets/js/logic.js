// Initialize Firebase

var config = {
    apiKey: "AIzaSyBtgYxI3YHt9fOIoT3qSsYZufBzb2v-o8U",
    authDomain: "group-project-1-tracker.firebaseapp.com",
    databaseURL: "https://group-project-1-tracker.firebaseio.com",
    projectId: "group-project-1-tracker",
    storageBucket: "group-project-1-tracker.appspot.com",
    messagingSenderId: "802516410125"
};
firebase.initializeApp(config);

var database = firebase.database();
var name = "test";
var maxHealth = 25;
var currentHP = 2;
var ArmorClass = 10;
var InitiativeNumber = 10;


database.ref().child("Characters").on("child_added", function (snapshot) {
    event.preventDefault();
    $("#tbody").append(
        `
        <tr id="${snapshot.child("name").val()}">
            <th scope="col">${snapshot.child("name").val()}</th>
            <th scope="col">${snapshot.child("InitiativeNumber").val()}</th>
            <th scope="col">${snapshot.child("currentHP").val()}/${snapshot.child("maxHealth").val()}</th>
            <th scope="col">${snapshot.child("ArmorClass").val()}</th>
            <th 
                scope="col"><input class="HealthInput" type="number" name="quantity" min="1" max="500">
                <button type="button" class="btn btn-success">Heal</button>
                <button type="button" class="btn btn-danger">Damage</button>
            </th>
        </tr>
        `
    )
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

// When Add Character button is clicked
$("#new-character").on("click", function (event) {

    // name = $("#name-input").val().trim();
    // maxHealth = $("#maxHealth-input").val().trim();
    // currentHP = $("#currentHP-input").val().trim();
    // ArmorClass = $("#ArmorClass-input").val().trim();
    // InitiativeNumber = $("#InitiativeNumber-input").val().trim();
    database.ref().child("Characters").push({
        name: name,
        maxHealth: maxHealth,
        currentHP: currentHP,
        ArmorClass: ArmorClass,
        InitiativeNumber: InitiativeNumber
    });
});

// When Load Character button is clicked
$("#load-character").on("click", function (event) {


});

// When Load Monster button is clicked
$("#load-monster").on("click", function (event) {


});

// When Advance Initiative button is clicked
$("#next-initiative").on("click", function (event) {


});

//database.ref("/Characters").child(snapshot).remove();