/// <reference types="cypress">
import { faker } from '@faker-js/faker';
import 'cypress-file-upload';
import AdminPage from "../../../../pages/adminPage";
import DocumentManagerPage from "../../../../pages/documentManagerPage";

const adminpage = new AdminPage();
const docManager = new DocumentManagerPage();
let fName = faker.person.firstName();
let lName = faker.person.lastName();
let phoneNum = faker.string.numeric(10)
let loginData;
let docManagerData;

describe('Verify Search Patient and Add Patient Functionality in Document Manager for Admin Role', ()=> {
    beforeEach( () => {
        
        cy.clearAllSessionStorage() // Clear all sessions storage
        cy.clearAllCookies() 
        cy.visit(Cypress.config('baseUrl'));
        cy.wait(2000)
        cy.on('uncaught:exception', (err, runnable) => { 
            return false;
        })
        cy.fixture('login.json').then((Jsondata) => {
          loginData = Jsondata
            return loginData;
        });
        cy.fixture('docManager.json').then((Jsondata) => {
            docManagerData = Jsondata
              return docManagerData;
          });

    });

    afterEach(()=>{
        cy.wait(3000);
    })

it("Verify if User searches for a patient and if patient doesn't exist, the message 'Oops Patient Not Found' and 'Add Patient' button should be displayed.", ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');

    //Search for a patient
    docManager.patientSearchInput().type(fName);
    cy.wait(2000);

    //validate error message
    docManager.patientNotFoundErrorMessage()
              .contains('Oops Patient Not Found')
              .should('be.visible');

    cy.wait(2000);
          
    //validate add patient button
    docManager.addPatientButton().should('be.visible');        
    
})

it("Verify if User searches for a patient and if patient exists, after selecting patient, the 'View Patient Chart' button will be displayed.", ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');

    //Search for a patient
    docManager.patientSearchInput().type(docManagerData.name, {delay:0}).wait(2000);

    // //Select the patient
     docManager.searchedPatient().should('be.visible');
     docManager.searchedPatient().click();
     cy.wait(2000);
    
    //validate and click view patient chart button
    docManager.viewPatientChartButton().should('be.visible');  
    docManager.viewPatientChartButton().click();

    //click back button on view patient chart modal
    docManager.backArrowIcon().click();   
})

it('Verify if the existing user has already created order, "Select the order" dropdown field should be visible', ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');

    //Search for a patient by phone number
    docManager.patientSearchInput().type(docManagerData.patientId1).wait(2000);

    //Select and verify the searched patient
    docManager.searchedPatient().should('be.visible');
    docManager.searchedPatient().click();
    cy.wait(2000);

    //validate and click view patient chart button
    docManager.viewPatientChartButton().should('be.visible');  
    docManager.viewPatientChartButton().click();
    cy.wait(2000);

    //click back button on view patient chart modal
    docManager.backArrowIcon().click();   

    //verify "select the order" dropdown field
    docManager.selectTheOrderDropdownField().scrollIntoView().should('be.visible').click();

})

it('User is able to search a existing patients by Name', ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');

    //Search for a patient by nameazswxdfbgnhjm,.
    docManager.patientSearchInput().type(docManagerData.name, {delay:0}).wait(2000);

    // //Select the patient
     docManager.searchedPatient().should('be.visible');
     docManager.searchedPatient().click();
})

it('User is able to search a existing patients by Birth Date', ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');

    //Search for a patient by birth date
    docManager.patientSearchInput().type(docManagerData.birthdate, {delay:0}).wait(2000);

    // //Select the patient
     docManager.searchedPatient().should('be.visible');
     docManager.searchedPatient().click();
})

it('User is able to search a existing patients by Phone Number', ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');

    //Search for a patient by phone number
    docManager.patientSearchInput().type(docManagerData.phonenumber, {delay:0}).wait(2000);

    // //Select the patient
     docManager.searchedPatient().should('be.visible');
     docManager.searchedPatient().click();
})

it('User is able to search a existing patients by Patient Id', ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');

    //Search for a patient by phone number
    docManager.patientSearchInput().type(docManagerData.patientId, {delay:0}).wait(2000);

    // //Select the patient
     docManager.searchedPatient().should('be.visible');
     docManager.searchedPatient().click();
})

it('User can search newly added patient by his/her name/birth date/Phone Number/Patient ID.', ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');

    //Add the new patient
    docManager.addPatientButton().should('be.visible').click();

    //verify title and modal popup
    docManager.addPatientModalPopup().should('be.visible');
    docManager.addPatientTitle().should('be.visible');

    //fill the form to add a patient
    docManager.firstNameField().type(fName, {delay:0});
    const newUser = fName;
    cy.log(newUser);
    docManager.lastNameField().type(lName, {delay:0});
    docManager.dateOfBirthField().type('08071998', {delay:0});
    docManager.sexFieldDropdown().should('be.visible').click();
    docManager.sexOptionsLists().should('be.visible');
    docManager.selectfemaleSexOption();
    //select country code
    docManager.clickCountryCodeDropdown();
    cy.get('[aria-labelledby="address-country-code-label"]>li').contains('+91').click().wait(2000);
    docManager.phoneNumberTxtField().type(phoneNum, {delay:0});
    //save the details
    docManager.saveButtonOnAddPatientModal().click();
    cy.get('[class="Toastify__toast-body"]>div').contains('Patient added successfully').should('be.visible');
    cy.wait(5000);
    //delete the patient name from search bar
    docManager.clearIconOnSearchField().click({force:true});
    docManager.confirmBtnOnDeleteModalPopup().click({force:true});

    //Search for a patient by phone number
    docManager.patientSearchInput().type(newUser, {delay:0}).wait(2000);

    //Select the searched patient
     docManager.searchedPatient().should('be.visible');
     docManager.searchedPatient().click();
})

it('The user can delete the name/birth date/Phone Number/Patient ID from search patient field, the confirmation popup should be populated.', ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');

    //Search for a patient by patient id
    docManager.patientSearchInput().type(docManagerData.name, {delay:0}).wait(2000);

    // //Select the searched patient
    docManager.searchedPatient().should('be.visible');
    docManager.searchedPatient().click();

     //delete the patient name from search bar
     docManager.clearIconOnSearchField().click({force:true});
     docManager.confirmBtnOnDeleteModalPopup().click({force:true});

})
})