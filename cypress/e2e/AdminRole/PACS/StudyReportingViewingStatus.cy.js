/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import AdminPage from "../../../pages/adminPage";
import AssignClinicRulePage from "../../../pages/assignClinicRulePage";
import DicomInPage from "../../../pages/dicomInPage";
import OrderingPhysicianPage from "../../../pages/orderingPhysicianPage";
import DicomServerPage from "../../../pages/dicomServerPage";
import PacsPage from "../../../pages/pacsPage";

const OrderingPhysician = new OrderingPhysicianPage();
const adminpage = new AdminPage();
const assignClinicRule = new AssignClinicRulePage();
const dicomInPage = new DicomInPage();
const dicomServerPage = new DicomServerPage();
const pacsPage = new PacsPage();

let num = faker.string.alphanumeric(4);

describe("Verify the Study/Reporting/Viewing Status columns functionality in PACS for Admin Role", () => {
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

  it("Verify the Study/Reporting/Viewing Status columns functionality, when the study status is 'Completed'", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
      cy.get(".introjs-skipbutton").click({ force: true });
      cy.url().should("include", "/documentManager");
    adminpage.getLogo().should("be.visible");
    cy.wait(3000);

    //navigate to PACS for validation
    pacsPage.clickPacsIcon();
    cy.get('[class*="CustomHeader_header"]>div')
      .contains("PACS")
      .should("be.visible");
    cy.wait(4000);

     //select and validate create new view
     pacsPage.createNewViewIcon().should("be.visible").click();
     pacsPage.addViewHeaderTitleOnPopup().should("be.visible");
     pacsPage.viewNameTextField().click({ force: true }).type("NEW VIEW TEST");
     pacsPage.saveBtnOnAddViewPopup().should("be.visible").click();
     cy.get('[class="Toastify__toast-body"]>div')
       .contains("View Created Successfully")
       .should("be.visible");
     cy.wait(3000);
 
     //navigate to the view and customized the view according to the need
     cy.get('[aria-label="NEW VIEW TEST"]').should('be.visible').click({force:true});
     cy.wait(3000);

     //Filter out the DOS filter
     cy.get('[aria-label="Open Filter Menu"]>span').eq(8).click(); //filter menu icon
     cy.get('[class*="DateFilter_inputs"]>input').check(); //display all checkbox
     cy.get(10000);

     //customize the view
     cy.get('[ref="eMenu"]').first().click({force:true});
     cy.get('[aria-label="columns"]').click({force:true}); // for column filters

    //  // validate delete view
    //  //delete view
    //  cy.get(
    //    '[aria-label="NEW VIEW TEST"]>div>[data-testid="MoreVertRoundedIcon"]'
    //  )
    //    .scrollIntoView()
    //    .click();
    //  cy.get('[role="menuitem"]>div').contains("Delete").click();
    //  cy.wait(2000);
    //  cy.contains("Delete").click();
    //  cy.get('[class="Toastify__toast-body"]>div')
    //    .contains("View Deleted Successfully")
    //    .should("be.visible");
    //  cy.wait(3000);
  });
})