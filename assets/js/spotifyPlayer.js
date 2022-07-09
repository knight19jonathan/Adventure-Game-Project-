//SOUNDTRACKS
// var battleMusicURL = [
//     {"ghostBusters": "https://open.spotify.com/track/3m0y8qLoznUYi73SUBP8GI?si=49e95491921c4847"},
//     {"don'tStopBelieving": "https://open.spotify.com/track/77NNZQSqzLNqh2A9JhLRkg?si=b9289d283abd4e2d"},
//     {"hungryLikeTheWolf": "https://open.spotify.com/track/2qeESyQyH7MRHCBotCQsNq?si=e42a597aaebe4fc1"},
//     {"iRan": "https://open.spotify.com/track/10zlwR7kvVbD9OBkeZWr3L?si=3af488708f734767"},
//     {"eyeOfTheTiger": "https://open.spotify.com/track/2KH16WveTQWT6KOG9Rg6e2?si=6be8cb6187a947f7"}
// ]

// var playlistDnDAtmospheres = [
//     "https://open.spotify.com/track/0kwuKfWntoGh0EWyYb7Mpf?si=857bb0cca6ca481c",
//     "https://open.spotify.com/track/0zke8Vmo0bgbPjxL3pUhqk?si=4ae6498433bb4430",
//     "https://open.spotify.com/track/5XcivSLcE4sR5s9ItTxROd?si=c28b968dec4a433f",
//     "https://open.spotify.com/track/5qjqvjJQ15sH6dIgXUzg5I?si=8fd6ac1a710649cf",
//     "https://open.spotify.com/track/2rtFUTZLSQ7cECBXfUOgJe?si=be5b60e5a6404350",
//     "https://open.spotify.com/track/77Fw7rWYBsjA5Uf2cSocUN?si=db102fb7560f4feb",
// ]

// //Buttons/elements
// var battleStart = document.querySelector('#start-battle');



// battleJukebox = () => {
        //if monster type = ghost, player.src = ghost busters
        //if cr>20 and player win, player.src = don't stop believin
        //if monster type = werewolf, player.src = hungry like the wolf
        //if monster win, player.src = I ran
        //else 
// }

//I need to somehow get this variable to load after the iframe content has loaded.  It's saying that 
    // 
    // $(window).load(function() {
// var playBtn = document.querySelector("#main > div > div > div.ai.au.ah.av > div.ah.aw.ax.ay.az.b0.b1.b2 > div > div > button")
// console.log(playBtn)
// })
// playBtn = function(){
//     document.querySelector("#main > div > div > div.ai.au.ah.av > div.ah.aw.ax.ay.az.b0.b1.b2 > div > div > button").click()
// };
// document.querySelector("#main > div > div > div.ai.au.ah.av > div.ah.aw.ax.ay.az.b0.b1.b2 > div > div > button")

// battleStart.addEventListener("click", playBtn);

// $(document).ready(function () {
//         playBtn();
//     });

// var playBtn = document.getElementById("#spotifyWindow").contentWindow.document.querySelector("#main > div > div > div.ai.au.ah.av > div.ah.aw.ax.ay.az.b0.b1.b2 > div > div > button");

 

// autoplay = () => {
//     playBtn.click();
// }
let playBtn;

setTimeout(getPlayBtnID, 3000);

function getPlayBtnID(){
    playBtn = document.querySelector("#main > div > div > div.ai.au.ah.av > div.ah.aw.ax.ay.az.b0.b1.b2 > div > div > button");
}
