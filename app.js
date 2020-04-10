const fs = require("fs")
const newTwitchAccount = require("./twitch")
const newRiotAccount = require("./riot")
const watchTwitchStream = require("./watch")
const linkAccounts = require("./link")
const proxies = require("./proxies")

function link(){
    const twitchData = fs.readFileSync("./twitch.txt", "utf-8")
    const twitchList = twitchData.split("\r\n")
    const riotData = fs.readFileSync("./riot.txt", "utf-8")
    const riotList = riotData.split("\r\n")
    for(let i = 0; i < 10; i++){
        const twitchParts = twitchList[i].split("|")
        const riotParts = riotList[i].split("|")

        linkAccounts(JSON.parse(twitchParts[2]), JSON.parse(riotParts[2]), riotParts[0], riotParts[1], () => {
            console.log("Linked :D")
        });
    }
}

function watch(){
    const usersData = fs.readFileSync("./use_twitch.txt", "utf-8")
    const usersList = usersData.split("\r\n")
    for(const line of usersList) {
        const parts = line.split("|")
        const username = parts[0]
        const password = parts[1]
        const cookies = JSON.parse(parts[2])

        watchTwitchStream(username, password, cookies)
    }
}

function riot(){
    const stream = fs.createWriteStream("riot.txt", {flags:'a'});
    for(let i = 0; i < 20; i++){
        newRiotAccount(x => {
            console.log(x)
            stream.write(x + "\r\n")
        })
    }
}

function twitch(){
    const stream = fs.createWriteStream("twitch.txt", {flags:'a'});
    /*
    for(let i = 0; i < proxies.length; i++){
        newTwitchAccount(proxies[i], x => {
            console.log(x)
            stream.write(x + "\r\n")
        })
    }*/

    newTwitchAccount(proxies[0], x => {
        console.log(x)
        stream.write(x + "\r\n")
    })

}

watch()