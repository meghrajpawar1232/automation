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

describe('Verify Upload Documents Functionality in Document Manager for Admin Role', ()=> {
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
        cy.fixture('Parker Peter Order.pdf', null).as('myFixtureUploadFile');
    });

    afterEach(()=>{
        cy.wait(3000);
    })

it("Verify the user can upload the document on clicking Upload icon", ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    //cy.get('.MuiListItem-root > .MuiButtonBase-root > img').click()
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');   

    //click on upload document icon
    docManager.uploadDocumentIcon().should('be.visible').click();
    //upload the file 
    docManager.documentTypeField().should('be.visible').click();
    docManager.documentTypeDropdownList().contains('Order').click();
    //docManager.clickChooseFile()
    cy.get('input[type="file"]').selectFile("@myFixtureUploadFile", {force:true});
    cy.get('.MuiButton-disableElevation').click();
})

it("Verify that after uploading the document via Upload icon, the uploaded document should be present in the list.", ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
   // cy.get('.MuiListItem-root > .MuiButtonBase-root > img').click()
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');   

    //click on upload document icon
    docManager.uploadDocumentIcon().should('be.visible').click();
    //upload the file 
    docManager.documentTypeField().should('be.visible').click();
    docManager.documentTypeDropdownList().contains('Order').click();
    //click on Choose File
    cy.get('input[type="file"]').selectFile("@myFixtureUploadFile", {force:true});
    cy.get('.MuiButton-disableElevation').click();

    //verify the uploaded file in the list 


})

})