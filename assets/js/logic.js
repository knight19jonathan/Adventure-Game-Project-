//API Variables
var monsterAPI = "https://www.dnd5eapi.co/api/monsters/"
var classAPI = "https://www.dnd5eapi.co/api/classes/"
var raceAPI = "https://www.dnd5eapi.co/api/classes/"

//
var randomMonster = []
var monsterStats = []

//Get a class
// fetch("https://www.dnd5eapi.co/api/monsters/vampire-bat") 
//     .then(function(response){
//         return response.json()
//     })
//     .then( function(data){
//         console.log(data)
//     });

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
    fetch(`https://www.dnd5eapi.co/api/monsters/${randomMonster[0].index}`) 
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