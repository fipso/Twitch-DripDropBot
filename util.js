const request = require("request")
const parser = require("fast-xml-parser")

module.exports = {
    solveReCaptcha: async function(page) {

        const userAgent = await page.evaluate(() => navigator.userAgent )

        return new Promise(
            (resolve, reject) => {

                const anticaptcha = require("./anticaptcha")("563b42743cb80191d130ac69ea4a05c5")
                anticaptcha.setWebsiteURL(page.url())
                anticaptcha.setWebsiteKey("6Lc3HAsUAAAAACsN7CgY9MMVxo2M09n_e4heJEiZ")
                
                anticaptcha.setUserAgent(userAgent)
        
                anticaptcha.createTaskProxyless((err, taskId) => {
                    anticaptcha.getTaskSolution(taskId, (err, solution) => {
                        if(err){
                            console.log(err)
                            reject(err)
                        }

                        resolve(solution)
                    })
                })

            }
        )

        /*
        page.on("console", msg => {
            for (let i = 0; i < msg.args().length; ++i) {
                console.log(`${i}: ${msg.args()[i]}`)
            }
        })

        await page.evaluate(() => {
            var antcptAccountKeyDiv = document.getElementById("anticaptcha-imacros-account-key")
            if (!antcptAccountKeyDiv) {
                antcptAccountKeyDiv = document.createElement("div")
                // put your API key here
                antcptAccountKeyDiv.innerHTML = "563b42743cb80191d130ac69ea4a05c5"
                antcptAccountKeyDiv.style.display = "none"
                antcptAccountKeyDiv.id = "anticaptcha-imacros-account-key"
                document.body.appendChild(antcptAccountKeyDiv)
            }

        })

        // Include recaptcha.js file with all the functional
        //await page.addScriptTag({ url: "https://cdn.antcpt.com/imacros_inclusion/recaptcha.js"})

        // Most important part: we wait 120 seconds until an AntiCatcha indicator
        // with class "antigate_solver" gets in additional "solved" class
        await page.waitForSelector(".antigate_solver.solved", { timeout: 120 * 1000 })*/


        //return "done"

    },
    verifyMail: function(username) {
        return new Promise(
            (resolve, reject) => {
                const check = () => {
                    request.get("https://tm.in-ulm.de/inbox-api.php?name=" + username, (err, _, body) => {
                        if(err) reject(err)
                    
                        const data = parser.parse(body, {}, false)
                        const title = data.feed.entry.title
                        console.log(title)
                        if(/\d+ – (Dein|Your).+/.test(title)){
                            resolve(title.split(" ")[0])
                            return;
                        }
                        setTimeout(() => check(), 2000)
                    })
                }
                check();
            }
        )
    },
    makeid: function(length) {
        var result           = "";
        var characters       = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}