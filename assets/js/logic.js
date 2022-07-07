//make materialize jquery function
M.AutoInit();

//API Variables
var monsterAPI = "https://www.dnd5eapi.co/api/monsters/"
var classAPI = "https://www.dnd5eapi.co/api/classes/"
var raceAPI = "https://www.dnd5eapi.co/api/races/"

//
var classes = []
var races = []
var randomMonster = []
var randomMonsterIndex = `${randomMonster}`
var monsterStats = []

//combat variables
var hitRoll;
var armorClass = 0;
var attackBonus;
var attackBtn = document.querySelector("#attackTEST")
var attackBtn2 = document.querySelector("#attackTEST2")
var diceRoll;



//buttons
var characterGenBtn = document.querySelector("#new-character");

//elements
var title = document.querySelector("a")

//Get a random monster
randomMonsterFetch = function() {
    fetch(monsterAPI)
    .then(function(response){
        return response.json()
    })
    .then( function(data){
        // console.log(data)
        // console.log(Math.floor(Math.random() * 334))
        randomMonster.push(data.results[Math.floor(Math.random() * 334)].index)
        return randomMonster;
    })
    .then( function(){
        var monsterStatApi = `https://www.dnd5eapi.co/api/monsters/${randomMonster}`
        // console.log(monsterStatApi)
        fetch(monsterStatApi)
        .then(function(response){
        return response.json()
     })
    .then( function(monster){
        // console.log(monster);
        monsterStats.push(monster)
        // console.log(monsterStats)
    })
    .then( function(){
        armomrClass = monsterStats[0].armor_class
    })
    .then( function(){
        console.log(armomrClass)
    });
})
}

//here for testing purposes only
$(document).ready(function() {
        randomMonsterFetch();
})

//combat functions
function attackRoll() {
    let diceRoll = Math.ceil(Math.random() * 20)
    let armorClass = 10
    let attackBonus = 5
    if (diceRoll + attackBonus >= armorClass) {
        console.log(diceRoll+attackBonus)
        console.log("You hit!")
    } else {
        console.log(diceRoll+attackBonus)
        console.log("You missed!")

    }
}

attackBtn.addEventListener("click", function (event) {
    event.preventDefault();
    diceroll();
});

attackBtn2.addEventListener("click", function (event) {
    event.preventDefault();
    attackRoll();
})


// //execute on page load
// for future, character stat load function
// $(document).ready(function() {
//     classFetch();
//     racesFetch();
// });
// //Get a class
// classFetch = function(){
//     fetch(classAPI) 
//     .then(function(response){
//         return response.json()
//     })
//     .then( function(data){
//         classes.push(data.results)
//         console.log(classes)
//     });
// }
// //Get a race
// racesFetch = function(){
//     fetch(raceAPI)
//     .then(function(response){
//         return response.json()
//     })
//     .then( function(data){

//         races.push(data.results)
//         console.log(races)
//     });
// }
