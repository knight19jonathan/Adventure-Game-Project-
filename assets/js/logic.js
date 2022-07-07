//make materialize jquery function
M.AutoInit();

//API Variables
var monsterAPI = "https://www.dnd5eapi.co/api/monsters/"
var classAPI = "https://www.dnd5eapi.co/api/classes/"
var raceAPI = "https://www.dnd5eapi.co/api/classes/"

//
var randomMonster = []
var monsterStats = []

var hitRoll;
var armorClass;
var attackBonus;
var attackBtn = document.querySelector("#attackTEST")



//Get a class
fetch("https://www.dnd5eapi.co/api/monsters/vampire-bat") 
    .then(function(response){
        return response.json()
    })
    .then( function(data){
        console.log(data)
    });

//Get a random monster
randomMonsterGenerator = function() {
    fetch(monsterAPI)
    .then(function(response){
        return response.json()
    })
    .then( function(data){
        // console.log(data)
        // console.log(Math.floor(Math.random() * 334))
        randomMonster.push(data.results[Math.floor(Math.random() * 334)])
        console.log(randomMonster)
    });
}

//pull monster stats
monsterStatLoad = function() {
    randomMonsterGenerator();
    fetch(`https://www.dnd5eapi.co/api/monsters/${randomMonster[0]}`) 
    .then(function(response){
        return response.json()
    })
    .then( function(data){
        // console.log(data)
        // console.log(Math.floor(Math.random() * 334))
        monsterStats.push(data.results)
        console.log(monsterStats)
    });
}

monsterStatLoad();

function attackRoll(){

    let attackBonus = 4
    let armorClass = 6
    var roll;
    if (Math.floor(Math.random() * 20) === armorClass) { 
        console.log("You hit!")
    } else {
        console.log("You missed!")
        
    }
}

attackBtn.addEventListener("click", function (event){
    event.preventDefault();
    attackRoll();
})


