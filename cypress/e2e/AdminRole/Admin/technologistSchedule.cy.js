/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import AdminPage from "../../../pages/adminPage";
import TechnologistSchedulePage from "../../../pages/technologistSchedulePage";

const adminpage = new AdminPage();
const techSchedule = new TechnologistSchedulePage();

let zipCode = faker.location.zipCode();
let emailAddress = faker.internet.email({ fprovider: "radinhealth.com" });
let location = faker.company.buzzVerb();
let address = faker.location.street();
let state = faker.location.state();
let city = faker.location.city();

describe("Verify functionality of Modality Schedule for Admin Role", () => {
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

  it.skip('Verify "Set your weekly hours for technologist" functionality', () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
    cy.get(".introjs-skipbutton").click({ force: true });
    cy.url().should("include", "/documentManager");
    adminpage.getLogo().should("be.visible");
    adminpage.clickAdminIcon();
    techSchedule.clickOnTechnologistSchedule();
    cy.url().should("include", "https://radindev.net/admin/modalitySchedule");
    cy.wait(3000);
    techSchedule.clinicDropdown().should('be.visible');
    techSchedule.locationDropdown().click().wait(1000);
    techSchedule.locationDropdownOptions().contains('Florida').click().wait(1000);
    
 
  });

});
