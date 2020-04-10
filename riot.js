const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
const util = require("./util")

puppeteer.use(StealthPlugin())

module.exports = (cb) => {
    
    puppeteer.launch({ headless: false, executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" /*, args: ["--proxy-server=socks5://127.0.0.1:1010"] */}).then(async browser => {
    
        const username = util.makeid(10)
        const email = username + "@gmx.de"
        const password = util.makeid(10) + "_*#A"
    
        const page = (await browser.pages())[0]
        //await page.setBypassCSP(true)
        await page.goto("https://auth.riotgames.com/authorize?state=c2lnbnVw&nonce=MTksMTg5LDk5LDQ0&prompt=signup&ui_locales=de-de&client_id=play-valorant-web-prod&response_type=token%20id_token&scope=account%20openid&redirect_uri=https%3A%2F%2Fbeta.playvalorant.com%2Fopt_in")
       
        await page.waitFor("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > div.grid.grid-align-center.grid-justify-space-between.grid-fill.grid-direction__column.grid-panel-web__content.grid-panel__content > div > div > div > input")
        await page.type("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > div.grid.grid-align-center.grid-justify-space-between.grid-fill.grid-direction__column.grid-panel-web__content.grid-panel__content > div > div > div > input", email)

        await page.waitFor("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > button")
        await page.click("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > button")

        await page.waitFor("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > div.grid.grid-align-center.grid-justify-space-between.grid-fill.grid-direction__column.grid-panel-web__content.grid-panel__content > div > div > div:nth-child(3) > input")
        await page.click("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > div.grid.grid-align-center.grid-justify-space-between.grid-fill.grid-direction__column.grid-panel-web__content.grid-panel__content > div > div > div:nth-child(3) > input")
        await page.keyboard.type("12121999")

        await page.waitFor("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > button")
        await page.click("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > button")

        await page.waitFor("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > div.grid.grid-align-center.grid-justify-space-between.grid-fill.grid-direction__column.grid-panel-web__content.grid-panel__content > div > div > div > input")
        await page.type("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > div.grid.grid-align-center.grid-justify-space-between.grid-fill.grid-direction__column.grid-panel-web__content.grid-panel__content > div > div > div > input", username)
        
        await page.waitFor("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > button")
        await page.click("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > button")

        await page.waitFor("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > div.grid.grid-align-center.grid-justify-space-between.grid-fill.grid-direction__column.grid-panel-web__content.grid-panel__content > div > div:nth-child(1) > div > input")
        await page.type("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > div.grid.grid-align-center.grid-justify-space-between.grid-fill.grid-direction__column.grid-panel-web__content.grid-panel__content > div > div:nth-child(1) > div > input", password)

        await page.waitFor("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > div.grid.grid-align-center.grid-justify-space-between.grid-fill.grid-direction__column.grid-panel-web__content.grid-panel__content > div > div:nth-child(4) > div > input")
        await page.type("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > div.grid.grid-align-center.grid-justify-space-between.grid-fill.grid-direction__column.grid-panel-web__content.grid-panel__content > div > div:nth-child(4) > div > input", password)

        await page.waitFor("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > button")
        await page.click("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > button")

        await page.waitFor("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > div.grid.grid-align-center.grid-justify-space-between.grid-fill.grid-direction__column.grid-panel-web__content.grid-panel__content > div > div > div > div:nth-child(1) > label > input[type=checkbox]")
        await page.click("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > div.grid.grid-align-center.grid-justify-space-between.grid-fill.grid-direction__column.grid-panel-web__content.grid-panel__content > div > div > div > div:nth-child(1) > label > input[type=checkbox]")

        await page.waitFor("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > div.grid.grid-align-center.grid-justify-space-between.grid-fill.grid-direction__column.grid-panel-web__content.grid-panel__content > div > div > div > div:nth-child(2) > label > input[type=checkbox]")
        await page.click("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > div.grid.grid-align-center.grid-justify-space-between.grid-fill.grid-direction__column.grid-panel-web__content.grid-panel__content > div > div > div > div:nth-child(2) > label > input[type=checkbox]")

        await page.waitFor("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > button")
        await page.click("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > button")

        const solution = await util.solveReCaptcha(page)
        console.log(solution)

        await page.evaluate((solution) => {
            document.getElementById("g-recaptcha-response-1").innerHTML = solution
        }, solution)

        await page.mouse.move(100, 100)
        await page.mouse.down()
        await page.mouse.up()

        await page.waitFor(5000)

        await page.waitFor("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > button")
        await page.click("body > div:nth-child(2) > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div.signup-wrapper > form > div > button")

        cb(username + "|" + password + "|" + JSON.stringify(await page._client.send("Network.getAllCookies")))
        
        await page.waitFor(5000)
        await browser.close()
    })

}