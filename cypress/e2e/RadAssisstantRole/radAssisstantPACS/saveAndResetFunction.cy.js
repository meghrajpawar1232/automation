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

describe("Verify Save And Reset button PACS functionality for Rad Assistant Role", () => {
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

  it("Verify after any change in view 'Save' button should be visible to save those changes, and on refresh those changes should be as it is", () => {
    cy.clearAllSessionStorage(); // Clear all sessions storage
    cy.clearAllCookies();
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.radAssisstantRole.username, loginData.radAssisstantRole.password, loginData.radAssisstantRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
     
    adminpage.getLogo().should("be.visible");
    cy.wait(3000);

    //navigate to PACS for validation
    pacsPage.clickPacsIcon();
    cy.get('[class*="CustomHeader_header"]>div')
      .contains("PACS")
      .should("be.visible");
    cy.wait(10000);

    //select and validate create new view
    pacsPage.createNewViewIcon().should("be.visible").click();
    pacsPage.addViewHeaderTitleOnPopup().should("be.visible");
    pacsPage.viewNameTextField().click({ force: true }).type("NEW VIEW TEST");
    pacsPage.saveBtnOnAddViewPopup().should("be.visible").click();
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("View Created Successfully")
      .should("be.visible");
    cy.wait(3000);

    //Click on newly created view
    cy.get('[aria-label="NEW VIEW TEST"]').should("be.visible").click();
    cy.wait(2000);

    //validate DOS filter for the data
    cy.get('[aria-label="Open Filter Menu"]>span').eq(8).click(); //filter menu icon
    cy.get('[class*="DateFilter_inputs"]>input').check(); //display all checkbox
    cy.get(12000);

    //filter out the selected columns for new view
    cy.get('[ref="eMenu"]').first().click();
    cy.wait(2000);
    cy.get('[ref="eHeader"]>[aria-label="columns"]').click();
    cy.wait(3000);
    //for deselecting these columns
    cy.get('span[ref="eLabel"]').contains("Multi Select").click();
    cy.get('span[ref="eLabel"]').contains("Priority Level").click();
    cy.get('[class*="MuiBox-root"]').eq(1).click(); //for random click only

    //validate the unselected columns name
    cy.get('[ref="eText"]').contains("Multi Select").should("not.exist");
    cy.get('[ref="eText"]').contains("Priority Level").should("not.exist");
    cy.wait(2000);

    //Validating Save the view after changing some of the options
    cy.get('[class*="switchArea_right"]>button').contains("Save").click();
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("View Updated Successfully")
      .should("be.visible");
    cy.wait(3000);

    //delete view
    pacsPage.clickThreeDotIconOnNewlyCreatedView();
    cy.get('[role="menuitem"]>div').contains("Delete").click();
    cy.wait(2000);
    cy.contains("Delete").click();
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("View Deleted Successfully")
      .should("be.visible");
    cy.wait(3000);
  });

  it("Verify after any change in view, on clicking 'Reset' button, changes should reset to the original position ", () => {
    //delete view
    pacsPage.clickThreeDotIconOnNewlyCreatedView();
    cy.get('[role="menuitem"]>div').contains("Delete").click();
    cy.wait(2000);
    cy.contains("Delete").click();
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("View Deleted Successfully")
      .should("be.visible");
    cy.wait(3000);
  });

})