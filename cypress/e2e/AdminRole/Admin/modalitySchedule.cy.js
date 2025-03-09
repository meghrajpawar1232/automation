/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import AdminPage from "../../../pages/adminPage";
import ModalitySchedulePage from "../../../pages/modalitySchedulePage";

const adminpage = new AdminPage();
const modalitySchedule = new ModalitySchedulePage();

let fName = faker.person.firstName();
let lName = faker.person.lastName();
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

  it.skip('Verify "Set your weekly hours for modality" functionality', () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
    cy.get(".introjs-skipbutton").click({ force: true });
    cy.url().should("include", "/documentManager");
    adminpage.getLogo().should("be.visible");
    adminpage.clickAdminIcon();
    modalitySchedule.clickOnModalitySchedule();
    cy.url().should("include", "https://radindev.net/admin/modalitySchedule");
    cy.wait(3000);
    modalitySchedule.clinicDropdown().should('be.visible');
    modalitySchedule.locationDropdown().click().wait(1000);
    modalitySchedule.locationDropdownOptions().contains('Florida').click().wait(1000);
    cy.get('[placeholder="Search"]').click();
    cy.get('[class*="styles_serch_result"]>div').first().click();
    cy.wait(2000)
    cy.get('[data-testid="AddIcon"]').first().click();

  });

});
