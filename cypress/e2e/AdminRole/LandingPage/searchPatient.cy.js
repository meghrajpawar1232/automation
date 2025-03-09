/// <reference types="cypress">
import { faker } from '@faker-js/faker';

import AdminPage from "../../../pages/adminPage";
import DocumentManagerPage from "../../../pages/documentManagerPage";
import AddPatientPage from "../../pages/addPatientPage";

const adminpage = new AdminPage();
const docManager = new DocumentManagerPage();
const addPatientPage = new AddPatientPage();

let fName = faker.person.firstName();
let lName = faker.person.lastName();
let number =  faker.phone.number();
let dob = Date.now();

describe('Verify functionality under Clinic for Admin Role', ()=> {

  let loginData;
    beforeEach( () => {
        cy.visit(Cypress.config('baseUrl'));
        cy.on('uncaught:exception', (err, runnable) => { 
            return false;
        })
        cy.fixture('login.json').then((Jsondata) => {
          loginData = Jsondata
            return loginData;
        });

    });

    afterEach(()=>{
        cy.wait(3000);
      })

    it('verify if no matching patient is found, the user has the option to add a new patient.', () => {
        cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
        adminpage.getLogo().should('be.visible');
        cy.url().should('include', 'https://radindev.net/admin/feeProvider');
        cy.get('input[placeholder="Search Patient"]').type(fName);
        cy.wait(2000)
        cy.get('input[placeholder="Search Patient"]').click()
        cy.contains("Patient doesn’t exist", { timeout: 30000 }).should('be.visible')

        cy.visit('/documentManager')
        cy.wait(5000)
        docManager.closeWelcomeDocumentManager()
        cy.wait(5000)

        cy.get('#addPatientButton').click()
        cy.wait(5000)
        addPatientPage.getFirstName().type(fName)
        addPatientPage.getLastName().type(lName)
        //cy.pause()
        addPatientPage.getDateOfBirth().eq(0).type(dob)
        cy.pause()
        addPatientPage.getSex().click()
        cy.contains('Male').click()
       
        addPatientPage.getPhoneMobile().scrollIntoView().type(number)
        addPatientPage.getDateOfBirth().eq(1).scrollIntoView().type(dob)
        addPatientPage.getSaveBtn().click()
        cy.get('div:contains("Patient added successfully")',{timeout:10000}).should('be.visible')
        cy.wait(5000)
    })

    it('verify Search Patient', () => {
        cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
        adminpage.getLogo().should('be.visible');
        cy.url().should('include', 'https://radindev.net/admin/feeProvider');
        cy.get('input[placeholder="Search Patient"]').type(fName)
        cy.get(`li span div:contains(${fName})`,{timeout:30000}).click()
        cy.wait(2000)
        cy.get("div[class*='patientChart_infobox']").should('be.visible')
    })

})