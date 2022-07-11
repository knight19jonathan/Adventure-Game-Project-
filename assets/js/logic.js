//make materialize jquery function
M.AutoInit();

$(document).ready(function () {
	$('.modal').modal({
		dismissible: false, //modal cannot be dismissed without clicking the right butt
	});
});

//functions to run on page load
$(document).ready(function () {
	loadSavedCharacters();
});

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
var monsterCR = 0;
var monsterAttack = 0;
var monsterDexterity = 0;
var monsterHpMax = 0;
// possible use case for random monster pick on battle start
var monsterPicsArr = [
	'./assets/media/ragingBull.gif',
	'./assets/media/zombieAnime',
	'./assets/media/dndeightbitwarr.png',
	'./assets/media/creepyWalker.gif',
	'./assets/media/Daggerboi.gif',
	'./assets/media/darkcreature.gif',
	'./assets/media/dragon.gif',
	'./assets/media/drooler.gif',
	'./assets/media/evilbaby.gif',
	'./assets/media/ghostrider.gif',
	'./assets/media/goatandarrow.gif',
	'./assets/media/goatboyhammer.gif',
	'./assets/media/jummpyboi.gif',
	'./assets/media/packbois.gif',
	'./assets/media/pukeyboi.gif',
	'./assets/media/screamer.gif',
	'./assets/media/skeleton.gif',
	'./assets/media/sluggo.gif',
	'./assets/media/stiches.gif',
	'./assets/media/zomboids.gif',
];

var diceRoll;

var fleeCounter = 0;

//character stats variables
var playerName = '';
var playerClass = '';
var playerRace = '';
var playerHP;
var playerBio = '';
//possible function for stat incrementation playerStrength = 4(base class attribute) + XP/100(this is the level)
var playerConstitution = Math.ceil(Math.random() * 50); //fighter 50, wizard 20, Rogue 20
var playerDexterity = 3; // +14 Fighter, +8 Wizard, +22 for Rogue
var playerStrength = 4; //4 for fighter, 1 for thief, -1 for wizard
var closeBattle = document.querySelector('#battleClose');
var playerLevel;
var playerXP;
var playerMaxHp = '';

// combat script items
var battleStart = document.querySelector('#start-battle');
$('#start-battle').hide();
var attackBonus;
var combatLog = document.querySelector('#combat-log');
var quoteLog = document.querySelector('#quote-log');
// battleBox variables
var battleBoxPlayerHP = document.querySelector('#player-hp-li');
var battleBoxPlayerAC = document.querySelector('#player-armor-class-li');
var battleBoxMonsterHP = document.querySelector('#enemy-hp-li');
var battleBoxMonsterName = document.querySelector('#enemy-name-li');
var battleBoxMonsterAC = document.querySelector('#enemy-armor-class-li');
var playerHpBar = document.querySelector('#player-hp-bar');
var battleBoxAttackBonus = document.querySelector('#attack-bonus-li');
var enemyHpBar = document.querySelector('#enemy-hp-bar');
var enemyCRLi = $('#challenge-rating-li');
var enemyXPLi = $('#enemy-xp-li');

var playerListBB = document.querySelector('#player-ul');
var playerInit = 0;
var monsterInit = 0;
var playerArmorClass = 15; // Value TBD by player armor item + player dexterity
var isCombat = Boolean;
var savedMonsterAction = JSON.parse(localStorage.getItem('monsterAction')); // monsters latest action in local storage
var savedPlayerAction = JSON.parse(localStorage.getItem('playerAction')); // Players latest action in local storage
//buttons
var characterGenBtn = document.querySelector('#new-character');
var continueBtn = document.querySelector('#continue-btn');
var modalAttackBtn = document.querySelector('#attack-button');
var modalInitBtn = document.querySelector('#init-button');
var modalFleeBtn = document.querySelector('#flee-button');
var modalMagicBtn = document.querySelector('#magic-button');
var modalSneakBtn = document.querySelector('#sneak-button');
var modalSneakAttackBtn = document.querySelector('#sneak-attack-button');
var campFire = document.querySelector('#camp-fire');
var campCount = 0;

//classes
//var classChoice = document.getElementById("#class-input");
var spellSlots = 0;
var sneaking = Boolean;

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
//grab map and story elements
var traveler1 = $('#traveler1');
var startBtn = $('#start-game');
$('#traveler1').hide();
$('#traveler2').hide();
$('#traveler3').hide();
$('#traveler4').hide();
$('#text1').hide();
var levelLi = $('#levelLi');
var xpLi = $('#xpLi');

//local storage arrays
var savedPlayers = [{}];
var loadedPlayerStats;

//start game function
function gameStart() {
	$('#traveler1').show();
	$('#start-battle').show();
	$('#text1').show();
	$('#start-game').hide();
}

//

//set content of text boxes in battle modal
var currentPlayerStats = [
	{
		Name: `${playerName}`,
		Race: `${playerRace}`,
		Class: `${playerClass}`,
		XP: `${playerXP}`,
		HP: `${playerHP}`,
		Bio: `${playerBio}`,
		Level: `${playerLevel}`,
	},
];

//Soundtrack
var jukebox = document.getElementById('jukebox');
var playAudioBtn = document.getElementById('play-music');
var soundtrack = [
	'./assets/music/Stranger-Things-Theme-8-Bit.mp3',
	'./assets/music/Skyrim-8-bit-1.mp3',
	'./assets/music/Skyrim-8-bit-2.mp3',
	'./assets/music/Oblivion-8-bit.mp3',
	'./assets/music/The Legend of Zelda A Link to the Past Music_ Light World Dungeon.mp3',
	'./assets/music/The Legend of Zelda - Overworld.mp3',
	'./assets/music/The Legend of Zelda - Overworld (1).mp3',
	'./assets/music/Legend of Zelda_ A link to The Past music - overworld theme.mp3',
	'./assets/music/Legend Of Zelda Theme (8 Bit Remix Cover Version) [Tribute to NES] - 8 Bit Universe.mp3',
];

// Begin functions

function BattleStats() {
	//set content of text boxes in battle modal

	if (playerHP < 0) {
		//player hp will never be displayed as less than 0
		playerHP = 0;
	}
	if (monsterHitPoints < 0) {
		//monster hp will never be displayed as less than 0
		monsterHitPoints = 0;
	}
	battleBoxPlayerHP.textContent = `HP: ${playerHP}`;
	battleBoxAttackBonus.textContent = `Attack Bonus: ${attackBonus}`;
	console.log("Max Hp: " + playerMaxHp);
	playerHpBar.style.width = `${(playerHP / playerMaxHp) * 100}%`;
	battleBoxPlayerAC.textContent = `Armor Class: ${playerArmorClass}`;
	battleBoxMonsterName.textContent = `${monsterName}`;
	battleBoxMonsterHP.textContent = `HP: ${monsterHitPoints}`;
	enemyHpBar.style.width = `${(monsterHitPoints / monsterHpMax) * 100}%`;
	battleBoxMonsterAC.textContent = `Armor Class: ${monsterArmorClass}`;
	enemyCRLi.text(`CR: ${monsterCR}`);
	enemyXPLi.text(`XP value: ${monsterXP}`);
}
function logMonster() {
	//console logg monster info
	console.log('Monster AC:', monsterArmorClass);
	console.log('Monster HP:', monsterHitPoints);
	console.log('Monster XP:', monsterXP);
	console.log('Monster CR:', monsterCR);
	console.log('Monster Atk:', monsterAttack);
	console.log('Monster Dex:', monsterDexterity);
	console.log('Monster Str:', monsterStrength);
	console.log('Monster Name:', monsterName);
}

function randomMonsterFetch() {
	//Get a random monster
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
					if (monsterStats.challenge_rating > playerLevel + 3) {
						//set monster level cap related to playerlevel
						randomMonsterFetch();
					} else {
						//assign monster stats to variables
						monsterName = monsterStats.name;
						monsterArmorClass = monsterStats.armor_class;
						monsterHitPoints = monsterStats.hit_points;
						monsterHpMax = monsterStats.hit_points;
						monsterXP = monsterStats.xp;
						monsterCR = monsterStats.challenge_rating;
						monsterAttack = monsterStats.actions[0].attack_bonus;
						if (monsterAttack == null) {
							monsterAttack = Math.ceil(Math.random() * 6) + -1;
							console.log(monsterAttack);
						} // works for everthing but 'sea horse need to splice it from monsters array
						monsterDexterity = monsterStats.dexterity;
						monsterStrength = monsterStats.strength;
						logMonster();
						BattleStats();
						combatLog.textContent = `A ${monsterName} appears!`;
						modalInitBtn.style.display = 'block';
					}
				});
		});
}

function diceRoll() {
	// get a random number between 1 and 20
	let diceRoll = Math.ceil(Math.random() * 20);
	//console.log(diceRoll);
	return diceRoll;
}

function startcombat() {
	// let playerHP = fetch a value from local storage to equal current player health or default to current
	BattleStats();
	
	isCombat = true;
	let playerInit = diceRoll() + playerDexterity; // get player initiative roll
	console.log('PlDex:', playerDexterity);
	console.log('Player Init:', playerInit);
	let monsterInit = diceRoll() + Math.floor(monsterDexterity/2); // get enemy initiative roll
	console.log('MonsterDex:', monsterDexterity);
	console.log('Monster Init:', monsterInit);
	combatLog.textContent = `You jump into the fight and roll a ${playerInit} and the attacker replies with a ${monsterInit}`;
	modalInitBtn.style.display = 'none';
	modalAttackBtn.style.display = 'none';
	setTimeout(function () {
		//delay if logic so that the player has time to read
		if (playerInit >= monsterInit) {
			//if player wins, allow battle to proceed, if player loses initiative, then have monster attack once
			combatLog.textContent = `You're faster than your foe and attack!`;
			console.log('You are faster than the heathen!');
			modalFleeBtn.style.display = 'inline-block'; //display flee button
			setTimeout(evalClass(), 3000); //delay so that player can read
			setTimeout(runCombat(), 3000);
			//return;
		} else {
			combatLog.textContent = `The heathen is faster than you and attacks!`;
			console.log('The monster strikes first!');
			setTimeout(monsterAttackRoll, 3000);
		}
	}, 2000);
}

//render battleBox stats

function runCombat() {
	BattleStats();
	spellSlotManager();
	if (fleeCounter > 2) {
		modalFleeBtn.style.display = 'none';
	}
	if (playerHP <= 0) {
		isCombat = false;
		playerHpBar.style.width = `${0}%`;
		console.log('You have perished!');
		combatLog.textContent = `You have perished! You were killed by a ${monsterName}. Click the close button to create a new character and try again!`;
		modalAttackBtn.style.display = 'none';
		modalFleeBtn.style.display = 'none';
		modalMagicBtn.style.display = 'none';
		modalSneakBtn.style.display = 'none';
		const playerSpriteImg = document.getElementById('player-sprite');
		playerSpriteImg.src = './assets/media/nerdRage.gif';
		closeBattle.style.display = 'inline-block';
		// clear character local storage would you like to play again?
		//playerDeath(); //call function to reset character stats
	} else if (monsterHitPoints <= 0) {
		isCombat = false;
		enemyHpBar.style.width = `${0}%`;
		console.log('The monster is slain! It will trouble you no more.');
		playerXP = playerXP + monsterXP;
		combatLog.textContent = `You have slain the ${monsterName}! You gain ${monsterXP} XP! Close this window to continue.`;
		console.log('You gained', monsterXP, 'XP!');
		console.log('Current XP:', playerXP);
		modalAttackBtn.style.display = 'none';
		modalFleeBtn.style.display = 'none';
		modalMagicBtn.style.display = 'none';
		modalSneakBtn.style.display = 'none';
		closeBattle.style.display = 'inline-block';
		const monsterSpriteImg = document.getElementById('monster-sprite');
		monsterSpriteImg.src = './assets/media/skeleton.png';
	} else {
		isCombat = true;
		console.log('still in combat');
		modalAttackBtn.style.display = 'block';
		modalAttackBtn.style.display = 'inline-block';
		modalFleeBtn.style.display = 'inline-block';
		evalClass();
		evalFleeCount();
		//combatLog.textContent = `You are still alive somehow!`
	}
}

function evalFleeCount() {
	if (fleeCounter > 2) {
		combatLog.textContent = `You have tried to flee too many times!`;
		modalFleeBtn.style.display = 'none';
	} else {
		modalFleeBtn.style.display = 'inline-block';
	}
}

function playerDeath() {
	if (playerHP <= 0) {
		//hpLiEl.textContent(`HP:${playerHP}`);
		playerXP = 0;
		console.log('Player Xp has been reset to 0:', playerXP);
		localStorage.clear();
		hpLiEl.textContent = `0`;
		nameAreaLi.textContent = '';
		bioAreaEl.textContent = '';
		raceLiEl.textContent = '';
		classLiEl.textContent = '';
		levelLi.textContent = '';
		xpLi.textContent = '';
		const mainSpriteImg = document.getElementById('main-sprite');
		mainSpriteImg.src = './assets/media/deathmark.png';
	} else {
		return;
	}
}

//combat functions
function attackRoll() {
	let roll = diceRoll();
	//let armorClass = 10
	// modalAttackBtn.style.display = 'none';
	if (roll == 20) {
		console.log(roll);
		let damage = (diceRoll() + playerStrength) * 2;

		monsterHitPoints = monsterHitPoints - damage;
		console.log(monsterName, ' HP:', monsterHitPoints);
		combatLog.textContent = `The fighter attacks...
        They we're never a match for you!
        You dealt  ${damage}  to the foe!`;
		setTimeout(runCombat(), 2500);
	} else if (roll == 1) {
		let damage = diceRoll();
		playerHP = playerHP - damage;
		console.log(roll);
		console.log('A dire failure!');
		combatLog.textContent = `A critical failure! That mistake costs you ${damage} in HP as you cut yourself with your own weapon!!`;
		setTimeout(runCombat(), 2500);
	} else if (roll + attackBonus >= monsterArmorClass) {
		let damage = diceRoll() + playerStrength;

		monsterHitPoints = monsterHitPoints - damage;
		console.log('You dealt', damage, 'damage to the foe!');
		console.log(monsterName, ' HP:', monsterHitPoints);
		combatLog.textContent = `The fighter attacks...
        Hit roll: ${roll} + ${attackBonus}
        A hit!
        You dealt ${damage} to the foe!`;
		setTimeout(runCombat(), 2500);
	} else {
		combatLog.textContent = `The fighter attacks...
        Hit roll: ${roll} + ${attackBonus}
        A miss!`;
		console.log('A miss!');
		setTimeout(runCombat(), 2500);
	}
	localStorage.setItem('playerAction', JSON.stringify(combatLog.textContent));
	BattleStats();
}

function monsterAttackRoll() {
	let monAtkRoll = diceRoll();
	// combatLog.textContent = `The monster attacks...`;
	if (monAtkRoll == 20 && monAtkRoll > playerArmorClass) {
		let damage = (diceRoll() + monsterStrength) * 2;

		playerHP = playerHP - damage;
		console.log('Player HP:', playerHP);
		combatLog.textContent = `The monster attacks...
        Nat20!😎 ${monAtkRoll + monsterAttack}
        It dealt ${damage}  to you!!! YIKES!
		You stagger from a hideous blow, strength fails and fear grips your heart!`;
		setTimeout(runCombat(), 2500);
	} else if (monAtkRoll == 1) {
		let damage = diceRoll();
		combatLog.textContent = `The creature attacks wildly, injuring itself for ${damage}!`;
		console.log('Nat 1!lol😂', monAtkRoll);
		console.log('A dire failure!');
		monsterHitPoints = monsterHitPoints - damage;
		setTimeout(runCombat(), 2500);
	} else if (monAtkRoll + monsterAttack >= playerArmorClass) {
		let damage = diceRoll() + monsterStrength;

		playerHP = playerHP - damage;
		console.log('Player HP:', playerHP);
		combatLog.textContent = `The monster attacks...
        ... dealing a savage blow, ${
					monAtkRoll + monsterAttack
				} to hit, and deals ${damage} damage to your HP!`;
		setTimeout(runCombat(), 2500);
	} else {
		combatLog.textContent = `The monster attacks...
        and rolls ${monAtkRoll + monsterAttack}, a miss!`;
		console.log('Miss!', monAtkRoll + monsterAttack);
		setTimeout(runCombat(), 2500);
	}
	localStorage.setItem('monsterAction', JSON.stringify(combatLog.textContent));
	BattleStats();
}

function fleeBattle() {
	fleeCounter++;
	let fleeRoll = diceRoll();
	modalAttackBtn.style.display = 'none';
	modalFleeBtn.style.display = 'none';
	modalMagicBtn.style.display = 'none';
	modalSneakBtn.style.display = 'none';
	if (fleeRoll == 20) {
		console.log('Crit success:', fleeRoll);
		combatLog.textContent = `You got away clean, leaving your enemy grasping nothing but your afterimage! Click Close to continue on your journey!`;
		isCombat = false;
		modalAttackBtn.style.display = 'none';
		modalFleeBtn.style.display = 'none';
		modalMagicBtn.style.display = 'none';
		modalSneakBtn.style.display = 'none';
		closeBattle.style.display = 'inline-block';
	} else if (fleeRoll == 1) {
		console.log('A dire failure!', roll);
		combatLog.textContent = `Running eh? You spineless cretin you've left yourself wide open!!`;
		setTimeout(monsterAttackRoll(), 2500);
	} else if (sneaking == true) {
		console.log("You sneak away! You're a sneaky one!", fleeRoll);
		combatLog.textContent = `You distract your for easily and and slip away in the shadows of the forest leaving them wondering if you ever really there. Click Close to continue on your journey! You're getting a little better at giving your foe the slip!`;
		playerXP = playerXP + Math.Ceil(monsterXP / 10);
		modalAttackBtn.style.display = 'none';
		modalFleeBtn.style.display = 'none';
		modalMagicBtn.style.display = 'none';
		modalSneakBtn.style.display = 'none';
		modalSneakAttackBtn.style.display = 'none';
		closeBattle.style.display = 'inline-block';
	} else if (fleeRoll + playerDexterity >= monsterDexterity) {
		console.log('Success,', fleeRoll);
		combatLog.textContent =
			"You run panting away from the foe, leaving them to their own devices! After all, you're a coward but a living one! Click Close to continue on your journey!";
		modalAttackBtn.style.display = 'none';
		modalFleeBtn.style.display = 'none';
		modalMagicBtn.style.display = 'none';
		modalSneakBtn.style.display = 'none';
		isCombat = false;
		closeBattle.style.display = 'inline-block';
	} else {
		combatLog.textContent = `There is no escape from this foe!`;
		console.log('Flee failure:', fleeRoll);
		setTimeout(runCombat(), 2500);
	}
	localStorage.setItem('playerAction', JSON.stringify(combatLog.textContent));
	BattleStats();
}

function evalClass() {
	if (playerClass == 'Wizard') {
		console.log('Wizard has', spellSlots, 'spell slots');
		modalMagicBtn.style.display = 'inline-block';
		//document.createElement('li')
		//trying to append new li to battle modal player stats ul with # of spell slots
	} else if (playerClass == 'Rogue') {
		modalSneakBtn.style.display = 'inline-block';
	} else {
		modalSneakAttackBtn.style.display = 'none';
		modalMagicBtn.style.display = 'none';
		modalSneakBtn.style.display = 'none';
	}
}

function sneak() {
	let sneakRoll = diceRoll() + playerDexterity;
	modalAttackBtn.style.display = 'none';
	modalFleeBtn.style.display = 'none';
	modalMagicBtn.style.display = 'none';
	modalSneakBtn.style.display = 'none';
	if (sneakRoll >= monsterDexterity) {
		sneaking = true;
		console.log('Sneak success!', sneakRoll);
		combatLog.textContent = `You sneak away from the foe, leaving them to their own devices! After all, you're a coward but a living one! Click Close to continue on your journey!`;

		modalFleeBtn.style.display = 'inline-block';
		modalAttackBtn.style.display = 'none';
		modalMagicBtn.style.display = 'none';
		modalSneakBtn.style.display = 'none';
		modalSneakAttackBtn.style.display = 'inline-block';
		isCombat = false;
	} else {
		console.log('Sneak failure!', sneakRoll);
		combatLog.textContent = `You fail to sneak away from the foe!`;
		setTimeout(monsterAttackRoll(), 2500);
	}
}

function sneakAttack() {
	let sneakAttackRoll = diceRoll() + playerDexterity;
	modalAttackBtn.style.display = 'none';
	modalFleeBtn.style.display = 'none';
	modalMagicBtn.style.display = 'none';
	modalSneakBtn.style.display = 'none';
	if (sneakAttackRoll >= monsterArmorClass - 5) {
		console.log('Sneak attack success!', sneakAttackRoll);
		combatLog.textContent = `You sneak attack the foe, delvering a blow while they couldn't see you!`;
		isCombat = true;
		sneakAtkDmg = Math.floor((diceRoll() + playerDexterity) * 1.5);
		console.log('Sneak attack damage:', sneakAtkDmg);
		setTimeout(runCombat(), 2500);
	} else {
		console.log('Sneak attack failure!', sneakAttackRoll);
		combatLog.textContent = `You try to sneak attack the foe, but you miss! Your foe strikes you in response!`;
		console.log('You recieved wounds for your failure:', sneakAtkFail);
		sneakAtkFail = diceRoll() + monsterDexterity;
		playerHP = playerHP - sneakAtkFail;
		setTimeout(runCombat(), 2500);
	}
}

function castMagic() {
	modalAttackBtn.style.display = 'none';
	modalFleeBtn.style.display = 'none';
	modalMagicBtn.style.display = 'none';
	modalSneakBtn.style.display = 'none';
	let spellRoll = diceRoll();
	if (spellRoll == 20) {
		monsterHitPoints = 0;
		combatLog.textContent = `You cast a spell!
		Nat20!😎 ${spellRoll} The winds of chaos hammer your foe.  Magic swirls around you and when it passes your foe is not but motes of dust on the wind.
		It dealt ${monsterName} is utterly destroyed!!!!`;
		spellSlots = spellSlots - 1;
		setTimeout(runCombat(), 2500);
		
	} else if (spellRoll == 1) {
		combatLog.textContent = `You cast a spell!
		Nat1!😎 ${spellRoll} smoke pours for your mouth and claps of thunder echo from inside your body. Something is wrong! Your magic is out of control, you scream and as you and ${monsterName} EXPLODE!!!!`;
		let spellFailure = diceRoll() * 3;
		playerHP = playerHP - spellFailure;
		monsterHitPoints = monsterHitPoints - spellFailure;
		spellSlots = spellSlots - 1;
		setTimeout(runCombat(), 2500);
	} else if (spellRoll + playerLevel >= monsterDexterity) {
		spelldamage = (spellRoll + playerLevel) * 3;
		monsterHitPoints = monsterHitPoints - spelldamage;
		combatLog.textContent = `You cast a spell!
		${spellRoll} to cast! A success! The forces of creation bend to your will and you strike your foe with beams of magic light just like what you imagined.`;
		spellSlots = spellSlots - 1;
		setTimeout(runCombat(), 2500);
	} else {
		combatLog.textContent = `You cast a spell!
		${spellRoll} to cast! The ${monsterName} is not impressed and you cast your spell at nothing!`;
		spellSlots = spellSlots - 1;
		setTimeout(runCombat(), 2500);
	}
}

function spellSlotManager() {
	if (spellSlots <= 0) {
		modalMagicBtn.style.display = 'none';
		console.log('No spell slots left');
	} else {
		spellSlots+1;
		console.log('Spell slots left:', spellSlots);
	}
}

function healscript() {
	if (playerHP <= 100) {
		//playerHP = playerHP + 10;
		quoteLog.text(`You heal yourself!`) ;
	} else {
		quoteLog.text( `You are already at full health!`) ;
	}
	

}

function spellSlotrecovery() {
	spellSlots = spellSlots + 1;
	console.log('Spell slots:', spellSlots);
}

modalSneakAttackBtn.addEventListener('click', function (event) {
	event.preventDefault();
	combatLog.textContent = `You sneak attack!`;
	sneakAttack();
	modalSneakAttackBtn.style.display = 'none';
	if (isCombat === true) {
		setTimeout(monsterAttackRoll, 4000);
	}
});

modalSneakBtn.addEventListener('click', function (event) {
	event.preventDefault();
	combatLog.textContent = `You try to sneak away!`;
	setTimeout(sneak(), 2500);
	modalSneakBtn.style.display = 'none';
	if (isCombat === true) {
		setTimeout(monsterAttackRoll, 4000);
	}
});

modalFleeBtn.addEventListener('click', function (event) {
	event.preventDefault();
	combatLog.textContent = `Attempting to run eh?! Good luck!`;
	setTimeout(fleeBattle(), 2500);
});

modalMagicBtn.addEventListener('click', function (event) {
	event.preventDefault();
	combatLog.textContent = `Attempting to cast a spell eh?!`;
	setTimeout(castMagic(), 2500);
	if (isCombat === true) {
		setTimeout(monsterAttackRoll, 5000);
	}
});

startBtn.on('click', function (event) {
	event.preventDefault();
	gameStart();
});

battleStart.addEventListener('click', function (event) {
	combatLog.textContent = `It's too quiet here... SCREEEE!`;
	event.preventDefault();
	const monsterSpriteImg = document.getElementById('monster-sprite');
	monsterSpriteImg.src = './assets/media/zombieAnime.gif';
	enemyHpBar.style.width = `${100}%`;
	randomMonsterFetch();
	isCombat = true;
	console.log(isCombat);
	//spellSlots++;
	modalAttackBtn.style.display = 'none';
	modalFleeBtn.style.display = 'none';
	modalMagicBtn.style.display = 'none';
	modalSneakBtn.style.display = 'none';
	modalSneakAttackBtn.style.display = 'none';
	closeBattle.style.display = 'none';
	let fleeCounter = 0;
	console.log(fleeCounter);
});

modalInitBtn.addEventListener('click', function (event) {
	event.preventDefault();
	startcombat();
});

modalAttackBtn.addEventListener('click', function (event) {
	console.log('Player HP:', playerHP);
	event.preventDefault();
	attackRoll();
	modalAttackBtn.style.display = 'none';
	if (isCombat === true) {
		setTimeout(monsterAttackRoll, 3000);
	}
});

closeBattle.addEventListener('click', function (event) {
	event.preventDefault();
	nextLevel();
	savePlayer();
	levelFunction();
	modalInitBtn.style.display = 'none';
	modalAttackBtn.style.display = 'none';
	isCombat = false;
	console.log(isCombat);
	console.log('You have left the battle!');
	console.log('Current Player XP', playerXP);
	console.log('Current Player HP', playerHP);
	campFire.style.display = 'visible';
	playerDeath();

	// else {
	// 	savePlayer();
	// }
});

//local storage player stat functions

//local storage functions
//saves character to local storage
function savePlayer() {
	saveToCurrentStats();
	localStorage.setItem('playerStats', JSON.stringify(currentPlayerStats));
	displayCurrentPlayerStats();
	
}

//loads character from local storage
function loadPlayer() {
	loadedPlayerStats = JSON.parse(localStorage.getItem('playerStats'));
	console.log(loadedPlayerStats);
	currentPlayerStats = loadedPlayerStats;
	displayCurrentPlayerStats();
	currentPlayerStatSet();
}

//displays continue button on the page
function loadSavedCharacters() {
	if (localStorage.length !== 0) {
		continueBtn.style.display = 'inline-block';
	}
}

//continue button event listener
continueBtn.addEventListener('click', function (event) {
	event.preventDefault();
	loadPlayer();
	nextLevel();
	levelFunction();
});

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
		playerHP = 100;
		playerXP = 100;
		playerMaxHp = 90;
		attackBonus =
			//saves to character array for localStorage
		savePlayer();
		nextLevel();
		levelFunction();
	}
});

function hideCampFire() {
	$('#camp-fire').hide();
}

campFire.on('click', function (event) {
	//event.preventDefault();
	//console.log('You have clicked the camp fire!');
	//spellSlotManager();
	healscript();
	hideCampFire();
});

//updates player stats to saveToCurrentStats
function saveToCurrentStats() {
	currentPlayerStats[0].Name = playerName;
	currentPlayerStats[0].Race = playerRace;
	currentPlayerStats[0].Class = playerClass;
	currentPlayerStats[0].XP = playerXP;
	currentPlayerStats[0].HP = playerHP;
	currentPlayerStats[0].Bio = playerBio;
	currentPlayerStats[0].MaxHP = playerMaxHp;
}

//displays currentPlayerStats
function displayCurrentPlayerStats() {
	nameAreaLi.text(`Name: ${currentPlayerStats[0].Name}`);
	raceLiEl.text(`Race: ${currentPlayerStats[0].Race}`);
	classLiEl.text(`Class: ${currentPlayerStats[0].Class}`);
	bioAreaEl.val(`${currentPlayerStats[0].Bio}`);
	hpLiEl.text(`HP: ${currentPlayerStats[0].HP}`);
	xpLi.text(`XP: ${currentPlayerStats[0].XP}`);
}

//sets global variables to saved character stats on character load
function currentPlayerStatSet() {
	playerName = currentPlayerStats[0].Name;
	playerRace = currentPlayerStats[0].Race;
	playerClass = currentPlayerStats[0].Class;
	playerXP = currentPlayerStats[0].XP;
	playerHP = currentPlayerStats[0].HP;
	playerBio = currentPlayerStats[0].Bio;
	playerLevel = currentPlayerStats[0].Level;
	playerMaxHp = currentPlayerStats[0].MaxHP;
}

//function for loading player level and status from HP
function levelFunction() {
	playerDexterity = playerLevel + 3;
	playerStrength = playerLevel + 4;
	attackBonus = playerLevel + playerStrength;
	//playerHP = playerMaxHp;
}

function nextLevel() {
	var nextLevel = Math.pow(playerXP, 0.5) / 5 - 1;
	playerLevel = Math.floor(nextLevel);
	currentPlayerStats[0].Level = playerLevel;
	levelLi.text(`Level: ${playerLevel}`);
	playerMaxHp = playerLevel*10+90;
	
}

// jukebox play random song event listener
function playAudio() {
	let i = Math.floor(Math.random() * soundtrack.length);
	jukebox.src = soundtrack[i];
	jukebox.play();
}

playAudioBtn.addEventListener('click', function (event) {
	event.preventDefault();
	playAudio();
});

$('#jukebox').bind('ended', function () {
	playAudio;
});
