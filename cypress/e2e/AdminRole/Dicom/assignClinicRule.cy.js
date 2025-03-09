/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import AdminPage from "../../../pages/adminPage";
import AssignClinicRulePage from "../../../pages/assignClinicRulePage";

const adminpage = new AdminPage();
const assignClinicRule = new AssignClinicRulePage();

let num = faker.string.alphanumeric(4);
let phoneNum = faker.string.numeric(10);
let zipCode = faker.location.zipCode();
let emailAddress = faker.internet.email({ fprovider: "radinhealth.com" });
let clinicName = faker.company.buzzVerb();
let address = faker.location.street();
let state = faker.location.state();
let city = faker.location.city();

describe("Verify functionality under Assign Clinic Rule for Admin Role", () => {
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

  it("verify assign clinic rule functionality", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
    cy.get(".introjs-skipbutton").click({ force: true });
    cy.url().should("include", "/documentManager");
    adminpage.getLogo().should("be.visible");
    cy.wait(3000)
    adminpage.clickAdminIcon();
    assignClinicRule.clickOnAssignClinicRule();
    //cy.url().should("include", "https://radindev.net/admin/assignClinicRule");
    cy.wait(8000);

    //validate title of the page
    cy.get('[id="tableTitle"]>span').contains('Admin / Assign Clinic Rule').should('be.visible').wait(3000);

    //click on Add Rule btn
    assignClinicRule.addRuleBtn().contains('ADD RULE').should('be.visible').click();
    cy.wait(3000)

    //Fill the add rule form
    cy.get('[data-testid="KeyboardArrowDownIcon"]').eq(1).click();
    cy.get('#combo-box-demo-option-2').scrollIntoView().click();
    cy.wait(1000)

    cy.get('[data-testid="KeyboardArrowDownIcon"]').last().click();
    cy.get('#combo-box-demo-option-0').scrollIntoView().click();
    cy.wait(1000);

    //validate AI done icon 
    assignClinicRule.aeTitleTextBox().should('be.visible').type(num).wait(3000);
    assignClinicRule.aiDoneIcon().should('be.visible');

    //click on Save btn
    assignClinicRule.saveBtn().contains('Save').click();
    
    //validate toast message after adding rule
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Clinic Rule created successfully")
      .should("be.visible");
   
  });
})