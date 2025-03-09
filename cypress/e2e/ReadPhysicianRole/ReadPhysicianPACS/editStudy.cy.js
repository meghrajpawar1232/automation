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

describe("Verify Edit Study PACS functionality for Reading Physician Role", () => {
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

  it("Verify the functionality of edit study popup with 'locked', 'study status', and 'payment type' filter ", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.readPhysicianRole.username, loginData.readPhysicianRole.password, loginData.readPhysicianRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
     
    cy.wait(3000);

    //navigate to PACS for validation
    pacsPage.clickPacsIcon();
    cy.get('[class*="CustomHeader_header"]>div')
      .contains("PACS")
      .should("be.visible");
    cy.wait(8000);

    //filter out the locked filter by "no"
    cy.get('[aria-label="Open Filter Menu"]>span').eq(18).click({force:true});
    cy.get('[ref="eCheckbox"]').contains("(Select All)").click({force:true});
    cy.wait(4000);
    cy.get('[ref="eCheckbox"]').contains("NO").click({force:true});
    cy.wait(6000);

    //validate study status column filter
    cy.get('[aria-label="Open Filter Menu"]>span').eq(1).click({force:true});
    cy.get('[ref="eCheckbox"]').contains("CANCELLED").click({force:true});
    cy.wait(6000);

    //filter out the payment type filter by "(Blanks)"
    cy.get('[aria-colindex="26"] > .ag-floating-filter-button > .ag-floating-filter-button-button > .ag-icon').click({force:true});
    cy.get('[ref="eCheckbox"]').contains("(Select All)").click({force:true});
    cy.wait(4000);
    cy.get('[ref="eCheckbox"]').contains("(Blanks)").click({force:true});
    cy.wait(6000);

    //validate the edit study popup
    pacsPage.editStudyIcon().eq(2).click({force:true});
    cy.wait(2000);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Study locked")
      .should("be.visible");
    cy.wait(3000);

    //verify the payment type field
    cy.get('[id=editstudy_paymentType]').click({force:true});
    //validate the dropdown
    cy.get('[id*="editstudy_paymentType-option"]').contains('Self Pay').click({force:true});
    //validate the value "value="Self Pay""
    cy.get('[id="editstudy_paymentType"]').should('have.value', 'Self Pay').and('be.visible');
    cy.wait(3000);
    //choose other payment type "Insurance"
    cy.get('[id=editstudy_paymentType]').click({force:true});
    //validate the dropdown
    cy.get('[id*="editstudy_paymentType-option"]').contains('Insurance').click({force:true});
    //validate the value "value="Self Pay""
    cy.get('[id="editstudy_paymentType"]').should('have.value', 'Insurance').and('be.visible');
    cy.wait(2000);

    //validate the ordering physician field
      cy.get('input[id="combo-box-demo"]')
        .should("be.visible")
        .type("Ragini")
        .wait(5000);
      cy.get('[id="combo-box-demo-listbox"]>p').contains("Ragini").first().click({force:true}).wait(2000);
      cy.get('[class*="MuiChip-label"]').contains("Ragini").should("be.visible");
      cy.wait(2000);
   
    //Validation of saving the study
    cy.get('[class*="editStudyModalV2_footer_save"]>button').contains('Save').should('be.visible').click({force:true});
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("updated")
      .should("be.visible");
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Study unlocked")
      .should("be.visible");
    cy.wait(6000); 

    //reset all filters .
    cy.get('[title="Reset Filter"]').click();
    cy.wait(6000);
  });

})