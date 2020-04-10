const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
const util = require("./util")

puppeteer.use(StealthPlugin())

module.exports = (twitchCookies, riotCookies, riotUsername, riotPassword, cb) => {
    puppeteer.launch({ headless: false, executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" /*, args: ["--proxy-server=socks5://127.0.0.1:1010"] */}).then(async browser => {
        const page = (await browser.pages())[0]
        await page.setCookie(...twitchCookies.cookies)
        await page.setCookie(...riotCookies.cookies)

        await page.goto("https://www.twitch.tv/settings/connections")

        await page.waitFor(4000)

        await page.waitFor("#root > div > div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > div.tw-flex.tw-flex-nowrap.tw-full-height.tw-overflow-hidden.tw-relative > main > div.root-scrollable.scrollable-area > div.simplebar-scroll-content > div > div > div > div > div:nth-child(2) > div:nth-child(4) > div > div.connection-component__right.tw-flex.tw-flex-column.tw-flex-grow-1.tw-full-width.tw-pd-x-1 > div.connection-component__header.tw-align-items-center.tw-flex.tw-flex-row > button")
        await page.click("#root > div > div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > div.tw-flex.tw-flex-nowrap.tw-full-height.tw-overflow-hidden.tw-relative > main > div.root-scrollable.scrollable-area > div.simplebar-scroll-content > div > div > div > div > div:nth-child(2) > div:nth-child(4) > div > div.connection-component__right.tw-flex.tw-flex-column.tw-flex-grow-1.tw-full-width.tw-pd-x-1 > div.connection-component__header.tw-align-items-center.tw-flex.tw-flex-row > button")

        const popup = await new Promise(x => browser.once("targetcreated", target => x(target.page())))
        await page.waitFor(5000)
        
        await popup.waitFor("body > div > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div > div.grid.grid-align-center.grid-justify-space-between.grid-fill.grid-direction__column.grid-panel-web__content.grid-panel__content > div > div > div > div:nth-child(1) > div > input")
        await popup.type("body > div > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div > div.grid.grid-align-center.grid-justify-space-between.grid-fill.grid-direction__column.grid-panel-web__content.grid-panel__content > div > div > div > div:nth-child(1) > div > input", riotUsername)

        await popup.waitFor("body > div > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div > div.grid.grid-align-center.grid-justify-space-between.grid-fill.grid-direction__column.grid-panel-web__content.grid-panel__content > div > div > div > div.field.password-field.field--animate > div > input")
        await popup.type("body > div > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div > div.grid.grid-align-center.grid-justify-space-between.grid-fill.grid-direction__column.grid-panel-web__content.grid-panel__content > div > div > div > div.field.password-field.field--animate > div > input", riotPassword)

        await popup.waitFor("body > div > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div > button")
        await popup.click("body > div > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div > button")

        try {
            await popup.waitFor("body > div > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div > div.grid.grid-direction__column.grid-size-17.grid-panel-web.grid-panel.grid-panel-web-has-links.grid-panel-web-has-header > button")
            await popup.click("body > div > div > div > div.grid.grid-direction__row.grid-page-web__content > div.grid.grid-direction__column.grid-page-web__wrapper > div > div.grid.grid-direction__column.grid-size-17.grid-panel-web.grid-panel.grid-panel-web-has-links.grid-panel-web-has-header > button")
        }
        catch {

        }
    })
}

