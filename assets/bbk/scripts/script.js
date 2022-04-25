var nameDiscord = "BlueBloxKraft";
var discDiscrim = "#1812";
var ytLink = "https://www.youtube.com/channel/UC-KLEozPWQPxLn3aMmcTdEA";
var githubLink = "https://github.com/BlueBloxKraft";
var twitchLink = "https://twitch.tv/BlueBloxKraft";
var redditLink = "https://www.reddit.com/user/BlueBloxKraft";
var discordLink = "https://discord.gg/xUj3Pvtn2n";
var mcfontDir = "assets/bbk/fonts/mc_font/ttf";

document.addEventListener("keypress", 
function(e) {
    if(e.key == "b") {
           window.open(ytLink);
       }
})

var url = window.location.search;
var redirect = new URLSearchParams(url).get("redirect");

if(redirect == "yt" || redirect == "youtube") {
    window.open(ytLink);
} else if(redirect = "github") {
    window.open(githubLink);
} else if(redirect = "twitch") {
    window.open(twitchLink);
} else if(redirect = "reddit") {
    window.open(redditLink);
} else if(redirect = "discord") {
    window.open(discordLink);
}
