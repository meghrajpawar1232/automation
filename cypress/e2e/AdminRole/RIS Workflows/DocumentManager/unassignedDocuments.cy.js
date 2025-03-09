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

describe('Verify Unassigned Documents Functionality in Document Manager for Admin Role', ()=> {
    beforeEach( () => {
        cy.visit(Cypress.config('baseUrl'));
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

it("The user can see the unassigned documents lists and newly added/uploaded documents will not have any indicator .", ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    cy.get('.MuiListItem-root > .MuiButtonBase-root > img').click()
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager'); 

})

it("", ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    cy.get('.MuiListItem-root > .MuiButtonBase-root > img').click()
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');   
})

it("", ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    cy.get('.MuiListItem-root > .MuiButtonBase-root > img').click()
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');   
})

it("", ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    cy.get('.MuiListItem-root > .MuiButtonBase-root > img').click()
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');   
})

it("", ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    cy.get('.MuiListItem-root > .MuiButtonBase-root > img').click()
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');   
})

it("", ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    cy.get('.MuiListItem-root > .MuiButtonBase-root > img').click()
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');   
})

it("", ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    cy.get('.MuiListItem-root > .MuiButtonBase-root > img').click()
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');   
})

it("", ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    cy.get('.MuiListItem-root > .MuiButtonBase-root > img').click()
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');   
})

it("", ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    cy.get('.MuiListItem-root > .MuiButtonBase-root > img').click()
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');   
})

it("", ()=>{
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div').contains('Signed in Successfully').should('be.visible');
    cy.get('.introjs-skipbutton').click({force:true});
    cy.get('.MuiListItem-root > .MuiButtonBase-root > img').click()
    cy.get('header + div.MuiDrawer-root > .MuiPaper-root').should('exist');
    cy.url().should('include', '/documentManager');   
})
})