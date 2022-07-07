//make materialize jquery function
M.AutoInit();

//API Variables
var monsterAPI = "https://www.dnd5eapi.co/api/monsters/"
var classAPI = "https://www.dnd5eapi.co/api/classes/"
var raceAPI = "https://www.dnd5eapi.co/api/classes/"

//
var classes = []
var races = []
var randomMonster = []
var randomMonsterIndex = `${randomMonster}`
var monsterStats = []


//buttons
var characterGenBtn = document.querySelector("#new-character");

//elements
var title = document.querySelector("a")

//Get a class
classFetch = function(){
    fetch(classAPI) 
    .then(function(response){
        return response.json()
    })
    .then( function(data){
        classes.push(data.results)
        console.log(classes)
    });
}

//Get a race
racesFetch = function(){

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

        races.push(data.results)
        console.log(races)
    });
}

        console.log(data)
    });


//Get a random monster
    //another approach to this might be to see if we can generate a random number first, then use that to call a random monster from the API itself
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
        console.log(monsterStatApi)
        fetch(monsterStatApi)
        return;
})
    .then(function(response){
        return response.json()
     })
    .then( function(monster){
        console.log(monster);
        //  var monsterStatApi = 
        // console.log(monsterStatApi)
    });
}

<<<<<<< HEAD
//pull monster stats
monsterStatLoad = function() {
    randomMonsterGenerator();
    fetch(`https://www.dnd5eapi.co/api/monsters/${randomMonster[0]}`) 
=======
randomMonsterFetch();

//pull monster stats - BROKEN
monsterGenerator = function() {
    randomMonsterFetch();
    fetch (monsterStatApi)
>>>>>>> refs/remotes/origin/ptr
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
