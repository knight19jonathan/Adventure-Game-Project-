//make materialize jquery function
M.AutoInit();

//functions to run on page load
$(document).ready(function(){
	loadSavedCharacters();
})

//API Variables
var monsterAPI = 'https://www.dnd5eapi.co/api/monsters/';
var classAPI = 'https://www.dnd5eapi.co/api/classes/';
var raceAPI = 'https://www.dnd5eapi.co/api/races/';

//
var classes = [];
var races = [];
var randomMonster;
var randomMonsterIndex = `${randomMonster}`;
var monsterStats;

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

var diceRoll;
var modalAttackBtn = document.querySelector('#attack-button');
var modalInitBtn = document.querySelector('#init-button');

//character stats variables
var playerName = ''
var playerClass = ''
var playerRace = ''
var playerHP = 100;
var playerBio = ''
	//possible function for stat incrementation playerStrength = 4(base class attribute) + XP/100(this is the level)
var playerConstitution = Math.ceil(Math.random() * 50); //fighter 50, wizard 20, Rogue 20
var playerDexterity = 3; // +14 Fighter, +8 Wizard, +22 for Rogue
var playerStrength = 4; //4 for fighter, 1 for thief, -1 for wizard
var closeBattle = document.querySelector('#battleClose');

var playerLevel = 1;
var playerXP = 0;

// combat script items
var battleStart = document.querySelector('#start-battle');
var attackBonus = playerLevel + playerStrength;
var combatLog = document.querySelector('#combat-log');
// battleBox variables
var battleBoxPlayerHP = document.querySelector('#player-hp-li');
var battleBoxPlayerAC = document.querySelector('#player-armor-class-li');
var battleBoxMonsterHP = document.querySelector('#enemy-hp-li');
var battleBoxMonsterName = document.querySelector('#enemy-name-li');
var battleBoxMonsterAC = document.querySelector('#enemy-armor-class-li');
var playerHpBar = document.querySelector('#player-hp-bar');
var battleBoxAttackBonus = document.querySelector('#attack-bonus-li');
//
var playerListBB = document.querySelector('#player-ul');
var playerInit = 0;
var monsterInit = 0;
var playerArmorClass = 15; // Value TBD by player armor item + player dexterity
var isCombat = Boolean;
var playerXP = 0;
var savedMonsterAction = JSON.parse(localStorage.getItem('monsterAction')); // monsters latest action in local storage
var savedPlayerAction = JSON.parse(localStorage.getItem('playerAction')); // Players latest action in local storage
//buttons
var characterGenBtn = document.querySelector('#new-character');
var continueBtn = document.querySelector('#continue-btn');

//elements
var title = document.querySelector('a');

//grab input elements for characater creator
var savCharBtn = $('#save-char-btn');
var nameInputEl = $('#choose-name');
var raceInputEl = $('#race-input');
var classInputEl = $('#class-input');
var bioInputEl = $('#textarea2');

//grab elements in character aside
var nameAreaLi = $('#name-li');
var bioAreaEl = $('#bio-area');
var raceLiEl = $('#raceLi');
var classLiEl = $('#classLi');
var hpLiEl = $('#hPLi');
var attackBonusLiEl = $('#atkBnsLi');

//local storage arrays
var savedPlayers = [{}]
var loadedPlayerStats;
var currentPlayerStats = [{
	Name: `${playerName}`,
	Race: `${playerRace}`,
	Class: `${playerClass}`,
	XP: `${playerXP}`,
	HP: `${playerHP}`,
	Bio: `${playerBio}`
}];
//Get a random monster

//
function BattleStats() {  //set content of text boxes in battle modal
	battleBoxPlayerHP.textContent = `HP: ${playerHP}`;
	battleBoxAttackBonus.textContent = `Attack Bonus: ${attackBonus}`;
	playerHpBar.style.width = `${playerHP}%`;
	battleBoxPlayerAC.textContent = `Armor Class: ${playerArmorClass}`;
	battleBoxMonsterName.textContent = `${monsterName}`;
	battleBoxMonsterHP.textContent = `HP: ${monsterHitPoints}`;
	battleBoxMonsterAC.textContent = `Armor Class: ${monsterArmorClass}`;
}

function logMonsterStats() { //console log monster info
	console.log('Monster AC:', monsterArmorClass);
	console.log('Monster HP:', monsterHitPoints);
	console.log('Monster XP:', monsterXP);
	console.log('Monster Atk:', monsterAttack);
	console.log('Monster Dex:', monsterDexterity);
	console.log('Monster Str:', monsterStrength);
	console.log('Monster Name:', monsterName);
}

function randomMonsterFetch() {
	fetch(monsterAPI)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// console.log(data)
			// console.log(Math.floor(Math.random() * 334))
			randomMonster = data.results[Math.floor(Math.random() * 334)].index;
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
					monsterStats = monster;
					if (monsterStats.challenge_rating > 2) {  //set monster level cap
						randomMonsterFetch()
					} else {
						//assign monster stats to variables
						monsterName = monsterStats.name;
						monsterArmorClass = monsterStats.armor_class;
						monsterHitPoints = monsterStats.hit_points;
						monsterXP = monsterStats.xp;
						monsterAttack = monsterStats.actions[0].attack_bonus;
						if (monsterAttack == null) {
							monsterAttack = Math.ceil(Math.random() * 6) + -1;
							console.log(monsterAttack);
						} // works for everthing but 'sea horse need to splice it from monsters array
						monsterDexterity = monsterStats.dexterity;
						monsterStrength = monsterStats.strength;
						logMonsterStats()
						combatLog.textContent = `A wild ${monsterName} appears!`
						modalInitBtn.style.display = "block"
					}
				});
		});
};


function diceRoll() { // get a random number between 1 and 20
	let diceRoll = Math.ceil(Math.random() * 20);
	//console.log(diceRoll);
	return diceRoll;
}

function startcombat() {
	// let playerHP = fetch a value from local storage to equal current player health or default to current
	BattleStats();
	// combatLog.("A wild", monsterName, "appears!" )
	let playerInit = diceRoll() + playerDexterity; //
	console.log('PlDex:', playerDexterity);
	console.log('Player Init:', playerInit);

	let monsterInit = diceRoll() + monsterDexterity;
	console.log('MonsterDex:', monsterDexterity);
	console.log('Monster Init:', monsterInit);
	combatLog.textContent = `You jump into the fight and roll a ${playerInit} and the attacker replies ${monsterInit}`;
	modalInitBtn.style.display = 'none';
	if (playerInit >= monsterInit) {
		combatLog.textContent = `You're faster than your foe and attack!`;
		console.log('You are faster than the heathen!');
		modalAttackBtn.style.display = 'block';
		// combatLog.textContent("You were quick to your blade!")
		runCombat();
		//return;
	} else monsterInit > playerInit;
	{
		combatLog.textContent = `The heathen is faster than you and attacks!`;
		console.log('The monster strikes first!');
		// combatLog.textContent("The monster was faster!")
		setTimeout(monsterAttackRoll(), 1000);
		runCombat();

		modalAttackBtn.style.display = 'block';
		//return;
	}
}
//render battleBox stats

function runCombat() {
	if (playerHP <= 0) {
		modalAttackBtn.style.display = "none" // not getting rid of attack button
		console.log("You have perished!")
		combatLog.textContent = `You have perished! You were killed by a ${monsterName}`

		// clear character local storage would you like to play again?


	} else if (monsterHitPoints <= 0) {
		modalAttackBtn.style.display = "none" // not getting rid of attack button
		console.log("The monster is slain! It will trouble you no more.")
		playerXP = playerXP + monsterXP
		combatLog.textContent = `You have slain the ${monsterName}! You gain ${monsterXP} XP! Close this window to continue.`
		console.log("You gained", playerXP, "XP!")
	} else {
		console.log("continue combat")
	};

}

//combat functions
function attackRoll() {
	let roll = diceRoll();
	//let armorClass = 10

	if (roll == 20) {
		console.log(roll);
		let damage = (diceRoll() + playerStrength) * 2;

		monsterHitPoints = monsterHitPoints - damage;
		console.log(monsterName, ' HP:', monsterHitPoints);
		combatLog.textContent = `The fighter attacks...
        They we're never a match for you!
        You dealt  ${damage}  to the foe!`;
	} else if (roll == 1) {
		console.log(roll);
		console.log('A dire failure!');
	} else if (roll + attackBonus >= monsterArmorClass) {
		let damage = diceRoll() + playerStrength;

		monsterHitPoints = monsterHitPoints - damage;
		console.log("You dealt", damage, "damage to the foe!");
		console.log(monsterName, ' HP:', monsterHitPoints);
		combatLog.textContent = `The fighter attacks...
        Hit roll: ${roll} + ${attackBonus}
        A hit!
        You dealt ${damage} to the foe!`;

	} else {
		combatLog.textContent = `The fighter attacks...
        Hit roll: ${roll} + ${attackBonus}
        A miss!`;
		console.log('A miss!');
	}
	localStorage.setItem('playerAction', JSON.stringify(combatLog.textContent));
	BattleStats();
}

function monsterAttackRoll() {
	let monAtkRoll = diceRoll();

	if (monAtkRoll == 20 && monAtkRoll > playerArmorClass) {
		let damage = (diceRoll() + playerStrength) * 2;

		playerHP = playerHP - damage;
		console.log('Player HP:', playerHP);
		combatLog.textContent = `The monster attacks...
        Nat20!😎 ${monAtkRoll}
        It dealt ${damage}  to you!!! YIKES!
		You stagger from a hideous blow, strength fails and fear grips your heart!`;
	} else if (monAtkRoll == 1) {
		console.log('Nat 1!lol😂', monAtkRoll);
		console.log('A dire failure!');
	} else if (monAtkRoll + monsterAttack >= playerArmorClass) {
		let damage = diceRoll() + playerStrength;

		playerHP = playerHP - damage;
		console.log('Player HP:', playerHP);
		combatLog.textContent = `The monster attacks...
        Hit Roll: ${monAtkRoll} + ${monsterAttack}
        A hit!
        It dealt ${damage} to you!`;
	} else {
		combatLog.textContent = `The monster attacks...
        Miss Roll: ${monAtkRoll} + ${monsterAttack}
		A miss!`;
		console.log('Miss!', monAtkRoll + monsterAttack);
	}
	localStorage.setItem('monsterAction', JSON.stringify(combatLog.textContent));
	BattleStats();
}

battleStart.addEventListener('click', function (event) {
	event.preventDefault();
	randomMonsterFetch();
	isCombat = true;
	console.log(isCombat)
	// modalInitBtn.style.display = "block"
	modalAttackBtn.style.display = "none"
});

modalInitBtn.addEventListener('click', function (event) {
	event.preventDefault();
	startcombat();
});

modalAttackBtn.addEventListener('click', function (event) {
	event.preventDefault();
	attackRoll();
	modalAttackBtn.style.display = 'none';
	if (monsterHitPoints > 0) {
		setTimeout(monsterAttackRoll, 1000);
		setTimeout((modalAttackBtn.style.display = 'block'), 1001);
	}
	else if (playerHP <= 0) {
		modalAttackBtn.style.display = 'none';
		runCombat();
		console.log("You have died!");
	} else {
		runCombat();
	}
});


closeBattle.addEventListener('click', function (event) {
	event.preventDefault();
	modalInitBtn.style.display = "none"
	modalAttackBtn.style.display = "none"
	isCombat = false;
	console.log(isCombat)
	console.log("You have left the battle!");
	console.log("Current Player XP", playerXP);
	console.log("Current Player HP", playerHP);
	hpLiEl.text(`HP:${playerHP}`)
	if (playerHP == 0) {
		playerXP = 0;
		console.log("Player Xp has been reset to 0:", playerXP);
		localStorage.clear()
	}
	// else {
	// 	savePlayer();
	// }
});
//local storage player stat functions

//local storage functions
//saves character to local storage
function savePlayer(){
	saveToCurrentStats();
	localStorage.setItem("playerStats", JSON.stringify(currentPlayerStats))
	displayCurrentPlayerStats();
}

//loads character from local storage
function loadPlayer(){
	loadedPlayerStats = JSON.parse(localStorage.getItem("playerStats"))
	console.log(loadedPlayerStats)
	currentPlayerStats = loadedPlayerStats
	displayCurrentPlayerStats();
}

//displays continue button on the page
function loadSavedCharacters(){
	if (localStorage.length !==0 ){
		continueBtn.style.display = 'inline-block'
	}
}

//continue button event listener
continueBtn.addEventListener('click', function (event) {
	event.preventDefault();
	loadPlayer();
})

savCharBtn.on('click', function (event) {
	// on submission of character creation, set values in the aside
	event.preventDefault();
	if (raceInputEl.val() == null || classInputEl.val() == null) {
		alert('You must enter your character information to proceed');
		return;
	} else {
		// sets global variables for created character
		playerName = nameInputEl.val();
		playerRace = raceInputEl.val();
		playerClass = classInputEl.val();
		playerBio = bioInputEl.val();
		//saves to character array for localStorage
		savePlayer();
	}
});

//updates player stats to saveToCurrentStats
function saveToCurrentStats (){
	currentPlayerStats[0].Name = playerName
	currentPlayerStats[0].Race = playerRace
	currentPlayerStats[0].Class = playerClass
	currentPlayerStats[0].XP = playerXP
	currentPlayerStats[0].HP = playerHP
	currentPlayerStats[0].Bio = playerBio
}
//displays currentPlayerStats
function displayCurrentPlayerStats (){
	nameAreaLi.text(`Name: ${currentPlayerStats[0].Name}`);
	raceLiEl.text(`Race: ${currentPlayerStats[0].Race}`);
	classLiEl.text(`Class: ${currentPlayerStats[0].Class}`);
	bioAreaEl.val(`${currentPlayerStats[0].Bio}`);
	hpLiEl.text(`HP: ${currentPlayerStats[0].HP}`);
	attackBonusLiEl.text(`Attack Bonus: ${attackBonus}`);
}


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



