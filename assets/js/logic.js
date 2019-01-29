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

var userMonsterHP = "";
var userMonsterAC = "";
var userMonsterName= "";

// When Add Character button is clicked
$("#new-character").on("click", function (event) {


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


})