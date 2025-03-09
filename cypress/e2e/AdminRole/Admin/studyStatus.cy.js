/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import AdminPage from "../../../pages/adminPage";
import StudyStatusPage from "../../../pages/studyStatusPage";

const adminpage = new AdminPage();
const studyStatus = new StudyStatusPage();

let statusName = 'Brain Study Status';
let zipCode = faker.location.zipCode();
let emailAddress = faker.internet.email({ fprovider: "radinhealth.com" });
let location = faker.company.buzzVerb();
let address = faker.location.street();
let state = faker.location.state();
let city = faker.location.city();

describe("Verify study status functionality under Admin page for Admin Role", () => {
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

  it("verify add study status, search filter for the existing, edit and delete study status functionality", () => {
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
    studyStatus.clickOnStudyStatus();
    cy.wait(3000);
    cy.get('[data-testid="ArrowDropDownIcon"]').click().wait(1000);
    cy.get('[id*="combo-box-demo-option"]').contains('RadinDev Clinic').click();
    cy.wait(2000);
    studyStatus.addStudyStatusBtn().should('be.visible').click();
    cy.wait(5000);
    studyStatus.statusNameTextBox().should('be.visible').type(statusName);
    const studyStatusName = statusName;
    studyStatus.saveBtn().click({force:true});
    //validate toast message
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Status added successfully")
      .should("be.visible");
    cy.wait(3000);

    //Edit and Delete study status
    studyStatus.studyStatusNameFilter().type(studyStatusName);
    cy.wait(5000);
    studyStatus.clickEditIcon();
    cy.wait(7000);
    // studyStatus.clickOnApprovalRequiredDropdown();
    studyStatus.saveBtn().click({force:true});
    cy.wait(2000);
    //validate toast message
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Status updated successfully")
      .should("be.visible");
    cy.wait(5000);

    studyStatus.studyStatusNameFilter().clear().wait(3000).type(studyStatusName);
    cy.wait(5000);
    studyStatus.clickDeleteIcon();
    cy.wait(1000);
    cy.contains('Confirm').should('be.visible').click({force:true});
    //validate toast message
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Status Deleted Successfully")
      .should("be.visible");
    cy.wait(2000);
  });

});
