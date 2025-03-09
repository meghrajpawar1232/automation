/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import AdminPage from "../../../pages/adminPage";
import SubspecialtyPage from "../../../pages/subspecialtyPage";

const adminpage = new AdminPage();
const subspecialty = new SubspecialtyPage();

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
    cy.wait(1000);
    subspecialty.clickOnSubspecialty();
    cy.wait(3000);
    cy.get('[data-testid="ArrowDropDownIcon"]').click().wait(1000);
    cy.get('[id*="combo-box-demo-option"]').contains('RadinDev Clinic').click();
    cy.wait(2000);
    subspecialty.addSubspecialtyBtn().should('be.visible').click();
    cy.wait(3000);
    //validate the popup header
    cy.get('[class*="addLocation_leftHeader"]>p').contains("Add Subspecialty").should('be.visible');
    subspecialty.nameTxtFieldOnAddSubspecialtyPopup().type('Eye Speciality');
    cy.get('button[type="submit"]').contains('Save').click();
    //validate toast message
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Subspecialty added successfully")
      .should("be.visible");
    cy.wait(3000);

    // //validate edit and delete functionality
    cy.get('input[name="subspeciality"]').type('Eye Speciality');
    cy.wait(5000);
    subspecialty.clickEditIcon();
    cy.get('[data-testid="ArrowDropDownIcon"]').eq(2).click().wait(1000);
    cy.get('li[data-option-index="1"]').click();
    cy.get('button[type="submit"]').contains('Save').click();
    //validate toast message
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Subspecialty updated successfully")
      .should("be.visible");
    cy.wait(3000);

    cy.get('input[name="subspeciality"]').clear().wait(3000).type('Eye Speciality');
    cy.wait(5000);
    subspecialty.clickDeleteIcon();
    cy.contains('Confirm').should('be.visible').click({force:true});
    //validate toast message
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Subspecialty deleted successfully")
      .should("be.visible");
    cy.wait(2000);

  });

});
