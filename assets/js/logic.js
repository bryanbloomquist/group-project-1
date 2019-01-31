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


database.ref().child("Characters").on("child_added", function (snapshot) {
    event.preventDefault();
    $("tbody").append(
        `
        <tr id="${snapshot.child("name").val()}">
            <th scope="col">${snapshot.child("InitiativeNumber").val()}</th>
            <th scope="col">${snapshot.child("name").val()}</th>
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


// Sorts table so highest inititiatve is on top
function orderCombat() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("combat-table");
    console.log(table);
    switching = true;
    // make a loop that will continue until no switching has been done
    while (switching) {
        // start by saying no switching is done
        switching = false;
        rows = table.rows;
        console.log(rows);
        // loop through all table rows (except the first, which containse table headers <th>)
        for (i=1; i<(rows.length-1); i++) {
            // start by saying there should be no switching
            shouldSwitch = false;
            // get the two elements you want to compare, one from current row and one from the next
            x = rows[i].cells[0].innerText;
            console.log("x = "+x);
            y = rows[i+1].cells[0].innerText;
            console.log("y = "+y);
            // check if the two rows should switch place
            if (x < y){
                // if so, mark as a switch and break the loop
                shouldSwitch = true;
                console.log("shouldSwitch = "+shouldSwitch);
                console.log(switching);
                break;
            }
        }
        if (shouldSwitch) {
            // if a switch has been marked, make the switch and mark that a switch has been done
            rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
            switching = true;
        }
    }
}


$("#order-initiative").on("click", function() {
    orderCombat();
})


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
    var quantity=$("#how-many").val().trim();
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
            console.log("dexterity = "+userMonsterDex);
            rollInitiative(userMonsterDex);
            var i;
            for (i=0; i<quantity; i++){
                database.ref().child("Characters").push({
                    ArmorClass: userMonsterAC,
                    InitiativeNumber: monsterInitiative,
                    currentHP: userMonsterHP,
                    maxHealth: userMonsterHP,
                    name: userMonsterName
                })
            }
        })
    })
    $("form").trigger("reset");
})

// Generate Initiative For Monsters
function rollInitiative(x){
    var initiativeRoll = Math.floor(Math.random()*20)+1;
    console.log("Initiative Roll = "+initiativeRoll);
    if (x === 1){initiativeRoll-=5}
    else if (x > 2 && x < 4){initiativeRoll-=4}
    else if (x > 3 && x < 6){initiativeRoll-=3}
    else if (x > 5 && x < 8){initiativeRoll-=2}
    else if (x > 7 && x < 10){initiativeRoll-=1}
    else if (x > 9 && x < 12){initiativeRoll===0}
    else if (x > 11 && x < 14){initiativeRoll+=1}
    else if (x > 13 && x < 16){initiativeRoll+=2}
    else if (x > 15 && x < 18){initiativeRoll+=3}
    else if (x > 17 && x < 20){initiativeRoll+=4}
    else if (x > 19 && x < 22){initiativeRoll+=5}
    else if (x > 21 && x < 24){initiativeRoll+=6}
    else if (x > 23 && x < 26){initiativeRoll+=7}
    else if (x > 25 && x < 28){initiativeRoll+=8}
    else if (x > 27 && x < 30){initiativeRoll+=9}
    else if (x === 30){initiativeRoll+=10}
    monsterInitiative = initiativeRoll;
    console.log("monster initiative = "+monsterInitiative);
}

// When Advance Initiative button is clicked
$("#next-initiative").on("click", function (event) {


});

//database.ref("/Characters").child(snapshot).remove();