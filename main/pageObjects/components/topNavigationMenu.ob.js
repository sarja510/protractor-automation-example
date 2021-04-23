var until = protractor.ExpectedConditions

module.exports = {

    topNavigationMenuElements:{

        //userInfo: element(by.className('user-info')),
        signOut: element(by.className('fa-sign-out')),
        homePage: element(by.className('c-logo')),
        searchField: element(by.model('vm.search.searchText')),


    },




    clickSignOut: function () {

        element(by.className('user-info')).click()
        browser.wait(until.presenceOf(this.topNavigationMenuElements.signOut), 10000, '"Sign out" button is not present within timeout')
        this.topNavigationMenuElements.signOut.click()
        browser.wait(until.invisibilityOf(this.topNavigationMenuElements.signOut), 10000, '"Sign out" button is not present within timeout')
    }



}