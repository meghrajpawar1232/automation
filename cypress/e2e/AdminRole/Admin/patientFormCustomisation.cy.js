/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import AdminPage from "../../../pages/adminPage";
import UsersPage from "../../../pages/usersPage";
import PatientFormCustomizationPage from "../../../pages/patientFormCustomizationPage";

const adminpage = new AdminPage();
const userspage = new UsersPage();
const patientFormPage = new PatientFormCustomizationPage();

let fName = faker.person.firstName();
let lName = faker.person.lastName();
let faxNum = faker.string.numeric(10);
let phoneNum = faker.string.numeric(10);
let zipCode = faker.location.zipCode();
let emailAddress = faker.internet.email({ fprovider: "radinhealth.com" });
let clinicName = faker.company.buzzVerb();
let address = faker.location.street();
let state = faker.location.state();
let city = faker.location.city();

describe("Verify Patient Form Customization functionality under Admin for Admin Role", () => {
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

  it("Verify add, edit and delete Patient Form Customization functionality", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
    cy.get(".introjs-skipbutton").click({ force: true });
    cy.url().should("include", "/documentManager");
    cy.reload();
    adminpage.getLogo().should("be.visible");
    adminpage.clickAdminIcon();
    adminpage.clickAdminIcon();
    cy.wait(2000)
    patientFormPage.clickOnPatientFormCustomization();

    //add a form
    patientFormPage.previewButton().should('be.visible').click();
    patientFormPage.previewTitleOnModal().should('be.visible');
    patientFormPage.confirmBtnOnPreviewModal().should('be.visible').click();
    cy.wait(3000);

    //asserting the toast message
    cy.get('[class="Toastify__toast-body"]')
      .contains('Patient form details added successfully')
      .should("be.visible");

    //validate the created customized form 
    cy.get('[class*="MuiBox-root css"]').contains('Patient Form - RadinDev Clinic').should('be.visible');

    //edit the form
    patientFormPage.editPatientFormIcon().should('be.visible').click();
    cy.wait(2000);
    patientFormPage.selectAllCheckbox().click();
    cy.wait(2000);
    patientFormPage.previewButton().should('be.visible').click();
    patientFormPage.previewTitleOnModal().should('be.visible');
    patientFormPage.confirmBtnOnPreviewModal().should('be.visible').click();
    cy.wait(6000);

    // //asserting the toast message
    // cy.get('[class="Toastify__toast-body"]')
    //   .contains('Patient form deleted successfully')
    //   .should("be.visible");

    //delete the form
    patientFormPage.deletePatientFormIcon().click();
    patientFormPage.confirmBtnOnDeletePopup().click();




  })
});
