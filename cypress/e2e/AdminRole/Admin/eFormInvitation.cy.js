/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import AdminPage from "../../../pages/adminPage";
import EFormInvitationsPage from "../../../pages/eFormInvitationsPage";

const adminpage = new AdminPage();
const eFormInvitations = new EFormInvitationsPage();

let zipCode = faker.location.zipCode();
let emailAddress = faker.internet.email({ fprovider: "radinhealth.com" });
let location = faker.company.buzzVerb();
let address = faker.location.street();
let state = faker.location.state();
let city = faker.location.city();

describe("Verify eForm Invitations functionality for Admin Role", () => {
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

  it("Verify eForm Invitations functionality for ", () => {
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
    eFormInvitations.clickOnEFormInvitations();
    cy.wait(3000);
    // cy.get('[data-testid="ExpandMoreRoundedIcon"]').click().wait(1000);
    // cy.get('li[data-option-index="1"]').contains('RadinDev Clinic').click();
    // cy.wait(2000);
    // eForms.createNewFormBtn().should('be.visible').click();
    // cy.wait(3000);
    
  });

});
