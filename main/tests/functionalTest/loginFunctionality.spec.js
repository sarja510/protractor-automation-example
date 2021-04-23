//Test spec file for test cases


//import all the required package, page, resource
var signInPage = require("../../../main/pageObjects/commonPage/signInPage.ob")
var signOut = require("../../../main/pageObjects/commonPage/signOutPage.ob")
var loginData = require("../../../testData/functionalTest")

//Test case goes here with describe, it blocks with the hook beforeAll, afterAll

describe('Login functionality test of Mantis BT', function () {

    beforeAll(function () {

        //code goes here
        browser.waitForAngularEnabled(false);
        browser.get('').then(function () {
            browser.wait(protractor.ExpectedConditions.presenceOf(signInPage.signInPageWebElements.email), 50000, 'Element taking too long to appear in the DOM');
        })

    })


    describe('Mantis BT login functionality test', function () {

        describe('Successful Login', function () {

            describe('Admin user will login successfully', function () {


                it('Administrator should sign in', function () {

                    signInPage.signIn(loginData.loginFunctionality.userName, loginData.loginFunctionality.password)

                });

                it('Administrator should sign out', function () {

                    signOut.signOut()

                });


            });


        })

        describe('Unsuccessful login attempt', function () {

            describe('Admin user should provide wrong password', function () {

                it('Admin user should try to sign in', function () {

                    signInPage.signIn(loginData.loginFunctionality.userName, loginData.loginFunctionality.wrongPassword)

                });


            });

        });


    });

});