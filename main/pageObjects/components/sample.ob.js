//Page object file defines web elemnts and functions

module.exports= {


    // define all web elements
    PageWebElements: {

        addContact: {
            email: element(by.name("email")) //example
        }
    },

    //define all function here

    clickAdd: function () {
        this.contactsPageWebElements.addButton.click()
    } //example

}