const { cp } = require("fs");
const puppeteer = require("puppeteer");
const codeObj = require("./codes");

const loginLink = 'https://www.hackerrank.com/auth/login';
const email = 'gosav95652@datakop.com';
const password = '123456';

let browserOpen = puppeteer.launch({
    headless: false,

    args: ["--start-maximized"],

    defaultViewport: null
})

let page;

browserOpen.then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
}).then(function (newTab) {
    page = newTab;
    let hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise;
}).then(function () {
    let emailIsEntered = page.type("input[id='input-1']", email, { delay: 50 });
    return emailIsEntered;
}).then(function () {
    let passwordIsEntered = page.type("input[type='password']", password, { delay: 50 });
    return passwordIsEntered;
}).then(function () {
    let loginButtonClicked = page.click("button[type='submit']", { delay: 50 });
    return loginButtonClicked;
}).then(function () {
    let clickOnAlgoPromise = waitAndClick(".topic-card a[data-attr1='algorithms']", page);
    return clickOnAlgoPromise;
}).then(function () {
    let getToWarmUp = waitAndClick("input[value='warmup']", page);
    return getToWarmUp;
}).then(function () {
    let waitFor3Seconds = page.waitFor(3000);
    return waitFor3Seconds;
}).then(function () {
    let allChallengesPromise = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled", { delay: 50 });
    return allChallengesPromise;
}).then(function (questionsArr) {
    console.log("number of questions", questionsArr.length);
    let questionWillBeSolved = questionSolver(page, questionsArr[0], codeObj.answers[0]);
    return questionWillBeSolved;
})




function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModalPromise = cPage.waitForSelector(selector);
        waitForModalPromise.then(function () {
            let clickModal = cPage.click(selector);
            return clickModal;
        }).then(function () {
            resolve();
        }).catch(function (err) {
            reject();
        })
    })
}


function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        let questionWillBeClicked = question.click()
        questionWillBeClicked.then(function () {
            let editorInFocusPromise = waitAndClick(".monaco-editor.no-user-select.vs", page)
            return editorInFocusPromise;
        }).then(function () {
            return waitAndClick(".checkbox-input", page);
        }).then(function () {
            return page.waitForSelector(".input.text-area.custominput.auto-width", page);
        }).then(function () {
            return page.type(".input.text-area.custominput.auto-width", answer, { delay: 10 });
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down("Control");
            return ctrlIsPressed;
        }).then(function(){
            let aIsPressed = page.keyboard.press("A", {delay:100});
            return aIsPressed;
        }).then(function(){
            let xIsPressed = page.keyboard.press("X", {delay:100});
            return xIsPressed; 
        }).then(function(){
            let ctrlIsUnpressed = page.keyboard.up("Control");
            return ctrlIsUnpressed;
        }).then(function() {
            let mainEditorInFocus = waitAndClick(".monaco-editor.no-user-select.vs", page)
            return mainEditorInFocus;
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down("Control");
            return ctrlIsPressed;
        }).then(function(){
            let aIsPressed = page.keyboard.press("A", {delay:100});
            return aIsPressed;
        }).then(function(){
            let vIsPressed = page.keyboard.press("V", {delay:100});
            return vIsPressed;
        }).then(function(){
            let ctrlIsUnpressed = page.keyboard.up("Control");
            return ctrlIsUnpressed;
        }).then(function() {
            return page.click(".ui-btn.ui-btn-normal.ui-btn-secondary.pull-right", {delay:50})
        }).then(function(){
            resolve();
        }).catch(function(){
            reject();
        })
    })
}

