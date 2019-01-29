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
var monsterInitiative = 0;
var userMonsterHP = "";
var userMonsterAC = "";
var userMonsterName= "";
var dexBonus = 0;


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
});

// When Load Character button is clicked
$("#load-character").on("click", function (event) {


});

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
            userMonsterDex = response.dexterity;
            rollInitiative(userMonsterDex);
            database.ref().push({
                ArmorClass: userMonsterAC,
                InitiativeNumber: monsterInitiative,
                currentHP: userMonsterHP,
                maxHealth: userMonsterHP,
                name: userMonsterName
            })
        })
    })
    $("form").trigger("reset");
})

// Generate Initiative For Monsters
function rollInitiative(x){
    dexBonus = 0;
    if (x === 1){dexBonus-=5}
    else if (x > 2 && x < 4){dexBonus-=4}
    else if (x > 3 && x < 6){dexBonus-=3}
    else if (x > 5 && x < 8){dexBonus-=2}
    else if (x > 7 && x < 10){dexBonus-=1}
    else if (x > 9 && x < 12){dexBonus===0}
    else if (x > 11 && x < 14){dexBonus+=1}
    else if (x > 13 && x < 16){dexBonus+=2}
    else if (x > 15 && x < 18){dexBonus+=1}
    else if (x > 17 && x < 20){dexBonus+=4}
    else if (x > 19 && x < 22){dexBonus+=5}
    else if (x > 21 && x < 24){dexBonus+=6}
    else if (x > 23 && x < 26){dexBonus+=7}
    else if (x > 25 && x < 28){dexBonus+=8}
    else if (x > 27 && x < 30){dexBonus+=9}
    else if (x === 30){dexBonus+=10}
    console.log(dexBonus);
    monsterInitiative = (Math.floor(Math.random()*20)+1)+dexBonus;
    console.log(monsterInitiative);
}

// When Advance Initiative button is clicked
$("#next-initiative").on("click", function (event) {


});

//database.ref("/Characters").child(snapshot).remove();