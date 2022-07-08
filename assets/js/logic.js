//make materialize jquery function
M.AutoInit();

//API Variables
var monsterAPI = 'https://www.dnd5eapi.co/api/monsters/';
var classAPI = 'https://www.dnd5eapi.co/api/classes/';
var raceAPI = 'https://www.dnd5eapi.co/api/races/';

//
var classes = [];
var races = [];
var randomMonster = [];
var randomMonsterIndex = `${randomMonster}`;
var monsterStats = [];

//combat variables
var hitRoll;
var attackBonus;

//random monster variables
var monsterName = '';
var monsterArmorClass = 0;
var monsterHitPoints = 0;
var monsterXP = 0;
var monsterAttack = 0;
var monsterDexterity = 0;


var attackBtn = document.querySelector('#attackTEST');
var attackBtn2 = document.querySelector('#attackTEST2');
var diceRoll;
var modalAttackBtn = document.querySelector("#attack-button")
var modalInitBtn = document.querySelector("#init-button")
// combat script items 
var battleStart = document.querySelector("#start-battle");
var playerHP = 100;
var playerConstitution = Math.ceil(Math.random() * 50) //fighter 50, wizard 20, Rogue 20
var playerDexterity = 3 // +14 Fighter, +8 Wizard, +22 for Rogue 
var playerStrength = 4 //4 for fighter, 1 for thief, -1 for wizard 
var playerLevel = 1
var attackBonus = playerLevel + playerStrength;
var combatLog = document.querySelector("#combat-log");
var battleboxPlayerHP = document.querySelector("#player-hp-li");
var playerListBB = document.querySelector("#player-ul")
var playerInit = 0;
var monsterInit = 0; 
var playerArmorClass = 15 // Value TBD by player armor item + player dexterity 


//buttons
var characterGenBtn = document.querySelector('#new-character');

//elements
var title = document.querySelector('a');

//Get a random monster

// 

randomMonsterFetch = function () {
    fetch(monsterAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data)
            // console.log(Math.floor(Math.random() * 334))
            randomMonster.push(data.results[Math.floor(Math.random() * 334)].index);
            //add in a clear
            return randomMonster;
        })
        .then(function () {
            var monsterStatApi = `https://www.dnd5eapi.co/api/monsters/${randomMonster}`;
            // console.log(monsterStatApi)
            fetch(monsterStatApi)
                .then(function (response) {
                    return response.json();
                })
                .then(function (monster) {
                    // console.log(monster);
                    monsterStats.push(monster);
                    // console.log(monsterStats)
                })
                .then(function () {
                    monsterName = monsterStats[0].name;
                    monsterArmorClass = monsterStats[0].armor_class;
                    monsterHitPoints = monsterStats[0].hit_points;
                    monsterXP = monsterStats[0].xp;
                    monsterAttack = monsterStats[0].actions[0].attack_bonus;
                    if (monsterAttack == null) {
                        monsterAttack = (Math.ceil(Math.random() * 6) + -1)
                        console.log(monsterAttack);
                    }; // works for everthing but 'sea horse need to splice it from monsters array 
                    monsterDexterity = monsterStats[0].dexterity;
                    monsterStrength = monsterStats[0].strength;
                })
                .then(function () {
                    console.log("Monster AC:", monsterArmorClass);
                    console.log("Monster HP:", monsterHitPoints);
                    console.log("Monster XP:", monsterXP);
                    console.log("Monster Atk:", monsterAttack);

                    console.log("Monster Dex:", monsterDexterity);
                    console.log("Monster Str:", monsterStrength);
                    console.log("Monster Name:", monsterName);
                });
        });
};

//here for testing purposes only
// $(document).ready(function () {
//     randomMonsterFetch();
//     console.log(randomMonster);
// });


function diceRoll() {
    let diceRoll = Math.ceil(Math.random() * 20);
    console.log(diceRoll);
    return diceRoll;
}


function startcombat() {
    // let playerHP = fetch a value from local storage to equal current player health or default to current 
    
    
    // combatLog.("A wild", monsterName, "appears!" )
    let playerInit = diceRoll() + playerDexterity // 
    console.log("PlDex:", playerDexterity)
    console.log("Player Init:" , playerInit)
 
    let monsterInit = diceRoll() + monsterDexterity
    console.log("MonsterDex:", monsterDexterity);
    console.log("Monster Init:", monsterInit);
    modalInitBtn.style.display = "none"
    if (playerInit >= monsterInit) {
        console.log("You are faster than the heathen!")
        modalAttackBtn.style.display = "block"
        // combatLog.textContent("You were quick to your blade!")
        return;
    } else (monsterInit > playerInit) ;{ 
        console.log("The monster strikes first!")
        // combatLog.textContent("The monster was faster!")
        monsterAttackRoll();
        
        modalAttackBtn.style.display = "block"
        return;
    }
    
    
}


//combat functions
function attackRoll() {
    let diceRoll = Math.ceil(Math.random() * 20);
    //let armorClass = 10
    // let attackBonus = playerLevel + playerStrength;
    console.log("The fighter attacks...")
    if (diceRoll == 20) {
        console.log(diceRoll);
        console.log("They we're never a match for you!")
        let damage = ((Math.ceil(Math.random() * 20) + playerStrength) * 2)
        console.log("You dealt,", damage, " to the foe!")
        monsterHitPoints = monsterHitPoints - damage
        console.log(monsterName, " HP:", monsterHitPoints)
    } else if (diceRoll == 1) {
        console.log(diceRoll);
        console.log("A dire failure!")
    } else if (diceRoll + attackBonus >= monsterArmorClass) {
        console.log("Hit roll:", diceRoll + attackBonus);
        console.log('A hit!');
        let damage = Math.ceil(Math.random() * 20) + playerStrength
        console.log("You dealt,", damage, " to the foe!")
        monsterHitPoints = monsterHitPoints - damage
        console.log(monsterName, " HP:", monsterHitPoints)
    } else {
        console.log("Hit roll:", diceRoll + attackBonus);
        console.log('A miss!');
    }
}

function monsterAttackRoll() {
    
    let monAtkRoll = diceRoll();
    console.log("The monster attacks...")
    if (monAtkRoll == 20 && monAtkRoll > playerArmorClass) {
        console.log("Nat20!😎", monAtkRoll);
        console.log("You stagger from a hideous blow, strength fails and fear grips your heart!")
        let damage = ((Math.ceil(Math.random() * 20) + playerStrength) * 1.5)
        console.log("It dealt,", damage, " to you!!! YIKES!")
        playerHP = playerHP - damage
        console.log("Player HP:", playerHP)
    } else if (monAtkRoll == 1) {
        console.log("Nat 1!lol😂", monAtkRoll);
        console.log("A dire failure!")
    } else if (monAtkRoll + monsterAttack >= playerArmorClass) {
        console.log("Hit Roll:", monAtkRoll + monsterAttack);
        console.log('A hit!');
        let damage = Math.ceil(Math.random() * 20) + playerStrength
        console.log("It dealt,", damage, " to you!")
        playerHP = playerHP - damage
        console.log("Player HP:", playerHP)
    } else {
        console.log("Miss Roll:", monAtkRoll + monsterAttack);
        console.log('A miss!');
    }
}

battleStart.addEventListener('click', function (event) {
    event.preventDefault();
    randomMonsterFetch();
    modalAttackBtn.style.display = "none"
    
});

modalInitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    startcombat();
});

modalAttackBtn.addEventListener('click', function (event) {
    event.preventDefault();
    attackRoll();
    modalAttackBtn.style.display = "none"
    setTimeout(monsterAttackRoll, 6000)
    setTimeout(modalAttackBtn.style.display = "block", 6001)
});

attackBtn.addEventListener('click', function (event) {
    event.preventDefault();
    diceRoll();
});

attackBtn2.addEventListener('click', function (event) {
    event.preventDefault();
    attackRoll();
    console.log(monsterArmorClass);
});


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

//randomMonsterFetch = function () {
    //     fetch(monsterAPI)
    //         .then(function (response) {
    //             return response.json();
    //         })
    //         .then(function (data) {
    //             // console.log(data)
    //             // console.log(Math.floor(Math.random() * 334))
    //             randomMonster.push(data.results[Math.floor(Math.random() * 334)].index);
    //             //add in a clear
    //             return randomMonster;
    //         })
    //         .then(function () {
    //             var monsterStatApi = `https://www.dnd5eapi.co/api/monsters/${randomMonster}`;
    //             // console.log(monsterStatApi)
    //             fetch(monsterStatApi)
    //                 .then(function (response) {
    //                     return response.json();
    //                 })
    //                 .then(function (monster) {
    //                     // console.log(monster);
    //                     monsterStats.push(monster);
    //                     // console.log(monsterStats)
    //                 })
    //                 .then(function () {
    //                     monsterName = monsterStats[0].name;
    //                     monsterArmorClass = monsterStats[0].armor_class;
    //                     monsterHitPoints = monsterStats[0].hit_points;
    //                     monsterXP = monsterStats[0].xp;
    //                     monsterAttack = monsterStats[0].strength;
    //                     monsterDexterity = monsterStats[0].dexterity;
    //                 })
    //                 .then(function () {
    //                     console.log(monsterArmorClass);
    //                     console.log(monsterHitPoints);
    //                     console.log(monsterXP);
    //                     console.log(monsterAttack);
    //                     console.log(monsterDexterity);
    //                     console.log(monsterName);
    //                 });
    //         });
    // };


    //grab input elements for characater creator
    var savCharBtn = $("#save-char-btn")
    var nameInputEl =  $("#choose-name")
    var raceInputEl = $("#race-input")
    var classInputEl = $("#class-input")
    var bioInputEl = $("#textarea2")

    //grab elements in character aside
    var nameAreaLi = $("#name-li")
    var bioAreaEl = $("#bio-area")
    var raceLiEl = $("#raceLi")
    var classLiEl = $("#classLi")
    var hpLiEl = $("#hPLi")
    var attackBonusLiEl = $("#atkBnsLi")

    savCharBtn.on("click", function(event){ // on submission of character creation, set values in the aside
        event.preventDefault()
        if (raceInputEl.val() == null || classInputEl.val() == null) {
            alert("You must enter your character information to proceed")
            return
        } else {
            nameAreaLi.text(`Name: ${nameInputEl.val()}`)
            raceLiEl.text(`Race: ${raceInputEl.val()}`)
            classLiEl.text(`Class: ${classInputEl.val()}`)
            bioAreaEl.val(`${bioInputEl.val()}`)
            hpLiEl.text(`HP: ${playerHP}`)
            attackBonusLiEl.text(`Attack Bonus: ${attackBonus}`)
        }
    })