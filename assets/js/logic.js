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

var InitiativeList = {
    TestCharacter: {
        name: "Test",
        MaxHP: 20,
        currentHP: 15,
        ArmorClass: 17,
        InitiativeNumber: 17
    }
};
database.ref().push(InitiativeList);
 
database.ref().on("value", function (snapshot) {
    $("#tbody").append(
        `
        <tr>
            <th scope="col">${snapshot.val().characters.name}</th>
            <th scope="col">${snapshot.val().characters.InitiativeNumber}</th>
            <th scope="col">${snapshot.val().characters.currentHP}</th>
            <th scope="col">${snapshot.val().characters.ArmorClass}</th>
            <th scope="col"><button type="button" class="btn btn-success">Heal</button></th>
            <th scope="col"><button type="button" class="btn btn-danger">Damage</button></th>
        </tr>
        `
    )
});

// When Add Character button is clicked
$("#new-character").on("click", function (event) {
   
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