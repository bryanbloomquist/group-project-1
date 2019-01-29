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
var userMonsterHP = "";
var userMonsterAC = "";
var userMonsterName= "";

// database.ref().on("value", function (snapshot){
//     event.preventDefault();
//     $("#tbody").empty();
//     $("#tbody").append(
//         `
//         <tr>
//             <th scope="col">${snapshot.val().name}</th>
//             <th scope="col">${snapshot.val().InitiativeNumber}</th>
//             <th scope="col">${snapshot.val().currentHP}/${snapshot.val().maxHealth}</th>
//             <th scope="col">${snapshot.val().ArmorClass}</th>
//             <th 
//                 scope="col"><input class="HealthInput" type="number" name="quantity" min="1" max="500">
//                 <button type="button" class="btn btn-success">Heal</button>
//                 <button type="button" class="btn btn-danger">Damage</button>
//             </th>
//         </tr>
//         `
//     )


// }, function (errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });

database.ref().on("child_added", function (snapshot) {
    event.preventDefault();
    $("#tbody").append(
        `
        <tr>
            <th scope="col">${snapshot.val().name}</th>
            <th scope="col">${snapshot.val().InitiativeNumber}</th>
            <th scope="col">${snapshot.val().currentHP}/${snapshot.val().maxHealth}</th>
            <th scope="col">${snapshot.val().ArmorClass}</th>
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
    database.ref().push({
        name: name,
        maxHealth: maxHealth,
        currentHP: currentHP,
        ArmorClass: ArmorClass,
        InitiativeNumber: InitiativeNumber
    });
})

// When Load Character button is clicked
$("#load-character").on("click", function (event) {


})

// When Load Monster button is clicked
$("#load-monster").on("click", function(event) {
    event.preventDefault();
    var monster=$("#user-monster").val().trim();
    var upperCaseMonster = "";
    var monsterWords = monster.split(" ");
    for(var i = 0; i<monsterWords.length;i++) {
        var monster = monsterWords[i];
        monster = monster.charAt(0).toUpperCase()+monster.slice(1);
        upperCaseMonster = upperCaseMonster + monster + " ";
    }
    upperCaseMonster.trim()
    var queryURL = "http://www.dnd5eapi.co/api/monsters/?name="+upperCaseMonster;
    $.ajax({
        url: queryURL, method: "GET"
    }).then(function(response){
        var results = response.results[0].url;
        $.ajax({
            url: results, method: "GET"
        }).then(function(response){
            userMonsterHP = response.hit_points;
            userMonsterAC = response.armor_class;
            userMonsterName = response.name;
            database.ref().push({
                maxHealth: userMonsterHP,
                currentHP: userMonsterHP,
                ArmorClass: userMonsterAC,
                name: userMonsterName
            })
        })
    })
})

// When Advance Initiative button is clicked
$("#next-initiative").on("click", function (event) {


});

//database.ref("/Characters").child(snapshot).remove();