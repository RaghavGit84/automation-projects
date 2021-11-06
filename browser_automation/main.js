const puppeteer = require("puppeteer");
let page;

const browserOpenpromise = puppeteer.launch({ 
    headless: false,
    slowMo:true,
    defaultViewport: null,
    args:["--start-maximized"]
});

browserOpenpromise
    .then(function (browser) {              //browser -> browser context object
        
        const pagesArrpromise = browser.pages(); // currently opened tabs
        return pagesArrpromise;
    }).then(function (browserPages) {
        page = browserPages[0];
        let gotoPromise = page.goto("https://www.google.com/");
        return gotoPromise;
    }).then(function () {
        // waiting for the element to appear on the page
        let elementWaitPromise = page.waitForSelector("input[type='text']",{visible: true});
        return elementWaitPromise;
    }).then(function () {
        // console.log("Reached google home page");
        //types element with help of selector(where we have to type)
        let keysWillBeSendPromise = page.type("input[type='text']","pepcoding");
        return keysWillBeSendPromise;
    }).then(function () {
        //page.keyboard is used to type special characters
        let enterWillBePressed = page.keyboard.press("Enter");
        return enterWillBePressed;
    }).then(function() {
        let elementWaitPromise = page.waitForSelector("h3.LC20lb.DKV0Md",{visible: true});
        return elementWaitPromise;
    }).then(function () {
        let keysWillBeSendPromise = page.click("h3.LC20lb.DKV0Md");
        return keysWillBeSendPromise;
    }).catch(function(err) {
        console.log(err);
    })



