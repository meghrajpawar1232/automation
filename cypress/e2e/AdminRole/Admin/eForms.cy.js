/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import AdminPage from "../../../pages/adminPage";
import EFormsPage from "../../../pages/eFormsPage";

const adminpage = new AdminPage();
const eForms = new EFormsPage();

let zipCode = faker.location.zipCode();
let emailAddress = faker.internet.email({ fprovider: "radinhealth.com" });
let location = faker.company.buzzVerb();
let address = faker.location.street();
let state = faker.location.state();
let city = faker.location.city();

describe("Verify eForms functionality for Admin Role", () => {
  let loginData;
  before(() => {
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.fixture("login.json").then((Jsondata) => {
      loginData = Jsondata;
      return loginData;
    });
  });

  afterEach(() => {
    cy.wait(3000);
  });

  it("Verify eForms functionality for General form", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
    cy.get(".introjs-skipbutton").click({ force: true });
    cy.url().should("include", "/documentManager");
    adminpage.getLogo().should("be.visible");
    adminpage.clickAdminIcon();
    cy.wait(1000);
    eForms.clickOnEForms();
    cy.wait(3000);
    cy.get('[data-testid="ExpandMoreRoundedIcon"]').click().wait(1000);
    cy.get('li[data-option-index="1"]').contains('RadinDev Clinic').click();
    cy.wait(2000);
    eForms.createNewFormBtn().should('be.visible').click();
    cy.wait(3000);
    eForms.clickClinicUuidField();
    cy.get('li[data-option-index="1"]').contains('RadinDev Clinic').click();
    cy.wait(2000);
    eForms.formNameField().type('RadinDev form');
    eForms.clickOnSelectCategoryField();
    cy.get('li[data-option-index="0"]').contains('General Forms').click();
    cy.wait(2000);
    eForms.clickOnSignedByField();
    cy.get('li[data-option-index="0"]').contains('Patient').click();
    cy.wait(2000);
    eForms.startBtn().should('be.visible').click();
    cy.wait(2000);
    cy.get('[class="Toastify__toast-body"]>div')
    .contains("Form created successfully")
    .should("be.visible");
    //edit and add create new forn
    cy.get('[aria-label="form-right-tabs"]>button').contains('Create New').click();
    cy.wait(2000);
    //drag and drop 
    cy.get('[class*="MuiBox-root css"][data-rbd-draggable-context-id="0"]').first().drag('[data-rbd-droppable-id="RIGHT"]');
    cy.wait(3000)

    //preview the form and save it
    cy.get('[id="grouped-button-second"]').click();
    //save
    cy.get('[id="grouped-button-first"]').last().click();
    cy.get('[class="Toastify__toast-body"]>div')
    .contains("Form saved successfully as draft")
    .should("be.visible");
    //click on back button
    cy.get('[data-testid="ArrowBackRoundedIcon"]').click();
    cy.wait(2000);

    //delete the form
    eForms.clickDeleteEformsIcon();
    eForms.confirmBtn().click();
    cy.get('[class="Toastify__toast-body"]>div')
    .contains("Form deleted successfully")
    .should("be.visible");


  });

});
