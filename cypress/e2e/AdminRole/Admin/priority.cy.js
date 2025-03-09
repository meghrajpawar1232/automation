/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import AdminPage from "../../../pages/adminPage";
import PriorityPage from "../../../pages/priorityPage";

const adminpage = new AdminPage();
const priority = new PriorityPage();

let zipCode = faker.location.zipCode();
let emailAddress = faker.internet.email({ fprovider: "radinhealth.com" });
let location = faker.company.buzzVerb();
let address = faker.location.street();
let state = faker.location.state();
let city = faker.location.city();

describe("Verify priority functionality under Admin page for Admin Role", () => {
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

  it("verify add priority, search filter for the existing priority by Name and edit clinic location functionality", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
    cy.get(".introjs-skipbutton").click({ force: true });
    cy.url().should("include", "/documentManager");
    adminpage.getLogo().should("be.visible");
    adminpage.clickAdminIcon();
    adminpage.clickAdminIcon();
    cy.wait(1000);
    priority.clickOnPriority();
    cy.wait(3000);
    cy.get('[data-testid="ArrowDropDownIcon"]').click().wait(1000);
    cy.get('[id*="combo-box-demo-option"]').contains('RadinDev Clinic').click();
    cy.wait(2000);
    priority.addPriorityBtn().should('be.visible').click();
    cy.wait(3000);
    cy.get('[class*="addLocation_leftHeader"]>p').contains("Study Priority").should('be.visible');
    cy.get('input[name="name"]').type('Low');
    cy.get('input[name="description"]').type("Low Medium Priority");
    cy.get('input[name="priorityFrom"]').type('200');
    cy.get('input[name="priorityTo"]').type('300');
    cy.get('[data-testid="ArrowDropDownIcon"]').eq(2).click().wait(1000);
    cy.get('li[id="combo-box-demo-option-7"]').click();
    cy.get('button[type="submit"]').contains('Save').click();
    //validate toast message
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Priority added successfully")
      .should("be.visible");
    cy.wait(2000);
    cy.get('input[name="priorityDescription"]').type("Low Medium Priority");
    cy.wait(5000);

    //validate edit and delete functionality
    priority.clickEditIcon();
    cy.get('[data-testid="ArrowDropDownIcon"]').eq(2).click().wait(1000);
    cy.get('li[id="combo-box-demo-option-6"]').click();
    cy.get('button[type="submit"]').contains('Save').click();
    //validate toast message
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Priority updated successfully")
      .should("be.visible");
    cy.wait(2000);

    cy.get('input[name="priorityDescription"]').clear().wait(2000).type("Low Medium Priority");
    cy.wait(5000);
    priority.clickDeleteIcon();
    cy.contains('Confirm').should('be.visible').click({force:true});
    //validate toast message
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Priority deleted successfully")
      .should("be.visible");
    cy.wait(2000);

  });

});
