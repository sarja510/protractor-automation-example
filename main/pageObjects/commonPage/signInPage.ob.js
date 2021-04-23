//Page object file defines web elements and functions

var assertionValue = require("../../../testData/assertion")
var until = protractor.ExpectedConditions

module.exports = {


    // define all web elements
    signInPageWebElements: {

        email: element(by.id('username')),
        password: element(by.id('password')),
        signInButton: element(by.buttonText('Login')),
        homePageLogo: element(by.className('login-logo')),
        message: element(by.className('alert alert-danger'))

    },

    //define all function here

    clickSignIn: function () {
        browser.wait(until.presenceOf(this.signInPageWebElements.signInButton), 10000, '"Sign in button" in "Sign in" page is not present within timeout')
        this.signInPageWebElements.signInButton.click();

    },

    enterUserName: function (userName) {
        browser.wait(until.presenceOf(this.signInPageWebElements.email), 10000, '"Email address" field in "Sign in" page is not present within timeout')
        this.signInPageWebElements.email.sendKeys(userName)

    },

    clearUserName: function () {
        browser.wait(until.presenceOf(this.signInPageWebElements.email), 10000, '"Email address" field in "Sign in" page is not present within timeout')
        this.signInPageWebElements.email.clear()
    },

    enterPassword: function (passwd) {
        browser.wait(until.presenceOf(this.signInPageWebElements.password), 10000, '"Password" field in "Sign in" page is not present within timeout')
        this.signInPageWebElements.password.sendKeys(passwd)


    },

    clearPassword: function () {
        browser.wait(until.presenceOf(this.signInPageWebElements.password), 10000, '"Password" field in "Sign in" page is not present within timeout')
        this.signInPageWebElements.password.clear()
    },

    signIn: function (username, passwd) {

        this.clearUserName()
        this.enterUserName(username)
        this.clickSignIn()
        this.clearPassword()
        this.enterPassword(passwd)
        this.clickSignIn()

        browser.getTitle().then(function (title) {
            if (title == assertionValue.loginPageAssertion.pageTitle) {
                return
            } else {

                element(by.className('alert alert-danger')).getText().then(function (text) {
                    expect(text).toContain(assertionValue.loginPageAssertion.wrongPassword)
                })


            }
        })


    }


};

