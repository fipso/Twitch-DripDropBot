const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
const util = require("./util")

puppeteer.use(StealthPlugin())

module.exports = (username, password, cookies, cb) => {
    puppeteer.launch({ headless: false, executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" , args: ["--mute-audio", /*"--proxy-server=socks5://127.0.0.1:1010"]*/]}).then(async browser => {
        const page = (await browser.pages())[0]
        await page.setCookie(...cookies.cookies)

        await page.goto("https://www.twitch.tv/dhalucard")

        setInterval(() => {
            page.reload()
        }, 60 * 60 * 1000)

    })
}

