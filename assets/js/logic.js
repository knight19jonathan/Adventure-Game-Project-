

fetch("https://www.dnd5eapi.co/api/monsters/") //Get a random monster
    .then(function(response){
        return response.json()
    })
    .then( function(data){
        console.log(data)
        console.log(Math.floor(Math.random() * 334))
        console.log(data.results[Math.floor(Math.random() * 334)])
    });

