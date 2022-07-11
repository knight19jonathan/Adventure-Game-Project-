# Adventure-Game-Project
Deployed:
https://knight19jonathan.github.io/Adventure-Game-Project-/

Repository:
https://github.com/knight19jonathan/Adventure-Game-Project-/projects/1
## Table of Contents
1. Introduction
2. Description
3. Create New Character
4. Combat
5. API
6. Additional Features
7. Challenges
8. Credits
9. Screenshots

## Introduction

Welcome to our simple, turn-based DnD game: DnD Machine!  Monsters, dragons, and undead lay waste to the Realm.  Create a character, fight random monsters, and level up to vanquish the Dungeon Master!  

## Description
DnD Machine allows users to play a simple, turn-based combat gamed based on Dungeons & Dragons.  On page load, users must create a new character from a selection of Dungeons and Dragons classes and races and give their character a name, at which point the player stats populate the page.  The player then can begin their campaign by pressing the start button, giving them the option to battle monsters for xp to level up their character which in turn gives them access to more difficult monsters.  If the player HP reaches zero, the player is dead and deleted from local storage.  Music can be played at anytime by pressing the button in the header.

## Create New Character
The New Character button at the top hand left of the screen triggers a modal.  Within this modal, the user is prompted to enter a character name, select a race and class from the drop down menus, and a bio for the character.  Pressing the save button commits the new character to local storage and populates the aside to display the current character stats.

If a character already exists in local storage on page load then a continue button will appear.  If users press the continue button, the last saved character will be loaded from local storage, global variables will be updated, and the loaded character stats will be displayed in the aside.

## Combat
Once a character has been created or loaded, players can start a campaign by pressing the start button.  They will then be given a brief story reference and the battle button will appear.  

Pressing the battle button will trigger another modal to display.  Within this modal, a random monster will be loaded from the DnD API, and player and monster stats will be displayed on the screen.  Players will have to roll for initiative to determine who moves first, then players will be allowed to fight or flee.  Fighting operates as it would in DnD, requiring a roll of a d20 die, which is added to attack bonus and compared against the monster armor class.  Fleeing is another d20 roll, added to player dexterity, compared against the monster.  We have included some limited class-proprietary combat features as well.

Users must trade combat with the monster until either one has an HP of zero.  If the user HP equals zero then local storage will be cleared and the character deleted.  If the monster HP equals zero then the character will be awarded XP.  Upon closing of the combat modal, the new character stats will be updated in local storage and displayed on the page.

## API
https://www.dnd5eapi.co/docs/#overview--introduction

DnD Machine uses the DnD v5 API to source it's monsters and monster stats.  On initiation of battle, a function is triggered to fetch a random, level appropriate monster from the DnD API.  The random monster index in the API will be stored, and the API will be called again at the endpoint referenced by the saved index of the random monster, populating the monster stats and XP.

https://the-one-api.dev/

We included a Lord of the Rings random quote generator, in keeping with the DnD/fantasy theme.  The generator calls the API to pull a quote and atrributed character at a random index from the API.  These are then both displayed on the screen for moral support and entertainment throughout the campaign. 

https://materializecss.com/about.html

We used materialize as our css framework.

## Additional Features
To increase playability, we included a rest function so that players can heal in the absence of other party members or items.

We also included a jukebox to randomly play a variety of 8-bit music, because it's sick and awesome.

## Challenges
Pretty immediately we were challenged by our intended usage with the API.  The DnD API only indexed all monsters by name, so in order to populate their stats from the API we had to write a serious of asynchronous functions to fetch from the API twice, once to pick a random monster, then again to fetch that monsters stats.  

Async JS became the main bug throughout the rest of the project.  Our code was fairly straightforward from a logic perspective, but it became increasingly complicated and difficult to debug as we added features.  Deciding when, where, and how variables, functions, and methods were called was the most difficult part of our project.  

## Credits

## Screenshot

![]()

















