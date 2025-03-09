/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import "cypress-file-upload";
import AdminPage from "../../../../pages/adminPage";
import DocumentManagerPage from "../../../../pages/documentManagerPage";

const adminpage = new AdminPage();
const docManager = new DocumentManagerPage();
let fName = faker.person.firstName();
let fName1 = faker.person.firstName();
let lName = faker.person.lastName();
let lName1 = faker.person.lastName();
let phoneNum = faker.string.numeric(10);
let loginData;
let docManagerData;

describe("Verify Document Type Functionality in Document Manager for Admin Role", () => {
  beforeEach(() => {
    cy.clearAllSessionStorage(); // Clear all sessions storage
    cy.clearAllCookies();
    cy.visit(Cypress.config("baseUrl"));
    //cy.wait(10000);
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.fixture("login.json").then((Jsondata) => {
      loginData = Jsondata;
      return loginData;
    });
    cy.fixture("docManager.json").then((Jsondata) => {
      docManagerData = Jsondata;
      return docManagerData;
    });
    cy.fixture('FaxOrder.pdf', null).as('myFixtureUploadFile');
  });

  afterEach(()=>{
    cy.wait(3000);
  })

  it("Verify that the clinic filter dropdown displays all available clinics", () => {
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
    cy.get(".introjs-skipbutton").click({ force: true });
    //cy.get(".MuiListItem-root > .MuiButtonBase-root > img").click();
    cy.get("header + div.MuiDrawer-root > .MuiPaper-root").should("exist");
    cy.url().should("include", "/documentManager");
    cy.wait(10000);

    //Validate the Clinic Dropdowns
    cy.get('[data-testid="ExpandMoreRoundedIcon"]').should('be.visible').click();
    //validate the clinic dropdown lists
    cy.get('[id="doc-manager-clinic-autocomplete-listbox"]').should('be.visible');
    cy.get('[id="doc-manager-clinic-autocomplete-listbox"]>p').then(($list) => {
      
    })
   
  });

  it("Verify that the 'Add Document Type' button opens the modal for adding a new document type.", () => {
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
    cy.get(".introjs-skipbutton").click({ force: true });
    //cy.get(".MuiListItem-root > .MuiButtonBase-root > img").click();
    cy.get("header + div.MuiDrawer-root > .MuiPaper-root").should("exist");
    cy.url().should("include", "/documentManager");

    //validating Document type page
    adminpage.getLogo().should("be.visible");
    adminpage.clickAdminIcon();
    adminpage.clickAdminIcon();
    adminpage.clickOnDocumentType();
    cy.url().should("include", "https://radindev.net/admin/documentType");
    cy.wait(5000);
    adminpage.addDocumentTypeBtn().should('be.visible').click({ force: true }).wait(1000);

    //validation for document type modal popup
    
  });

  it("Verify when User searches for existing patients to associate documents with create new orders.", () => {
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
    cy.get(".introjs-skipbutton").click({ force: true });
    //cy.get(".MuiListItem-root > .MuiButtonBase-root > img").click();
    cy.get("header + div.MuiDrawer-root > .MuiPaper-root").should("exist");
    cy.url().should("include", "/documentManager");

    //Search for a patient by phone number
    docManager
      .patientSearchInput()
      .type(docManagerData.name, { delay: 0 })
      .wait(2000);

    // //Select the patient
    docManager.searchedPatient().should("be.visible");
    docManager.searchedPatient().click();
    cy.wait(2000);

    //create an order
    cy.get('button:contains("Create Order")').click();
    cy.wait(10000);
    //select payment type
    cy.get('label span[class*="MuiTypography-root"]:contains("Cash")').click({
      force: true,
    });

    //select ordering physician
    cy.get('[id="size-small-outlined-multi"]')
      .first()
      .click({ force: true })
      .then(() => {
        cy.get('[aria-controls="size-small-outlined-multi-listbox"]').should(
          "be.visible"
        );
        cy.contains("Default Physician").click({ force: true });
      });

    cy.wait(2000);
    //Select Procedure Information
    cy.get('button>[data-testid="ArrowDropDownIcon"]')
      .eq(1)
      .click({ force: true });
    cy.contains("X-RAY BONE AGE").click({ force: true }).wait(2000);
    cy.get('[class*="style_Patient_Action"]>button')
      .contains("Save")
      .click({ force: true });

    //verify assertion after creating order
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Appointment Created Successfully")
      .should("be.visible");
  });
});
