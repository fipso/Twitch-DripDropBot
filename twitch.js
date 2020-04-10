const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
const util = require("./util")

puppeteer.use(StealthPlugin())

module.exports = (proxy, cb) => {
    
    let args = ["--lang=en-US,en"]
    if(proxy){
        args.push("--proxy-server=socks5://" + proxy)
    }

    puppeteer.launch({ headless: false, executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" , args }).then(async browser => {
    
        const username = util.makeid(10)
        const password = util.makeid(10) + "_*#A"
    
        const page = (await browser.pages())[0]

        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en'
        });

        // Set the language forcefully on javascript
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, "language", {
                get: function() {
                    return ["en-US"];
                }
            });
            Object.defineProperty(navigator, "languages", {
                get: function() {
                    return ["en-US", "en"];
                }
            });
        });

        await page.goto("https://www.twitch.tv/login")
    
        await page.waitForSelector(".tw-align-items-center:nth-child(2) > .tw-block > .tw-align-left > .tw-flex-grow-0 > .tw-font-size-5")
        await page.click(".tw-align-items-center:nth-child(2) > .tw-block > .tw-align-left > .tw-flex-grow-0 > .tw-font-size-5")
    
        await page.waitForSelector(".tw-c-background-base #signup-username")
        
        await page.type(".tw-c-background-base #signup-username", username)
        await page.type(".tw-mg-t-2 #password-input", password)
        await page.type(".tw-mg-t-2 #password-input-confirmation", password)
    
        await page.waitFor("#root > div > div.scrollable-area > div.simplebar-scroll-content > div > div > div > div.tw-mg-b-1 > form > div > div:nth-child(3) > div > div.tw-flex.tw-flex-row.tw-overflow-auto > div.tw-full-width > select")
        await page.select("#root > div > div.scrollable-area > div.simplebar-scroll-content > div > div > div > div.tw-mg-b-1 > form > div > div:nth-child(3) > div > div.tw-flex.tw-flex-row.tw-overflow-auto > div.tw-full-width > select", "4")
        
        await page.waitFor("#root > div > div.scrollable-area > div.simplebar-scroll-content > div > div > div > div.tw-mg-b-1 > form > div > div:nth-child(3) > div > div.tw-flex.tw-flex-row.tw-overflow-auto > div:nth-child(2) > div > input")
        await page.type("#root > div > div.scrollable-area > div.simplebar-scroll-content > div > div > div > div.tw-mg-b-1 > form > div > div:nth-child(3) > div > div.tw-flex.tw-flex-row.tw-overflow-auto > div:nth-child(2) > div > input", "10")
    
        await page.waitFor("#root > div > div.scrollable-area > div.simplebar-scroll-content > div > div > div > div.tw-mg-b-1 > form > div > div:nth-child(3) > div > div.tw-flex.tw-flex-row.tw-overflow-auto > div:nth-child(3) > div > input")
        await page.type("#root > div > div.scrollable-area > div.simplebar-scroll-content > div > div > div > div.tw-mg-b-1 > form > div > div:nth-child(3) > div > div.tw-flex.tw-flex-row.tw-overflow-auto > div:nth-child(3) > div > input", "1999")
    
        await page.type(".tw-c-background-base #email-input", username + "@tm.in-ulm.de")
    
        await page.waitFor(3500)
        await page.click("#root > div > div.scrollable-area > div.simplebar-scroll-content > div > div > div > div.tw-mg-b-1 > form > div > div:nth-child(5) > button")
    
        try {
            await page.waitFor("#FunCaptcha", {timeout: 5000})
            await page.waitFor(60 * 1000)
        }catch{
    
        }
    
        await page.waitFor("#root > div > div.scrollable-area > div.simplebar-scroll-content > div > div > div > div > div > div.tw-pd-x-4.tw-pd-y-1 > div.tw-inline-flex > div:nth-child(1) > div > input")
        await page.click("#root > div > div.scrollable-area > div.simplebar-scroll-content > div > div > div > div > div > div.tw-pd-x-4.tw-pd-y-1 > div.tw-inline-flex > div:nth-child(1) > div > input")
        
        const code = await util.verifyMail(username)
        await page.keyboard.type(code) 
       
        cb(username + "|" + password + "|" + JSON.stringify(await page._client.send("Network.getAllCookies")))
        
        await page.waitFor(5000)
        await browser.close()
    })

}