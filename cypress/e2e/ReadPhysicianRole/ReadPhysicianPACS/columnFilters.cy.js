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

describe("Verify Column Filters PACS functionality for Reading Physician Role", () => {
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

  it("Verify the user can update category of the study by filtering the 'Category' column", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.readPhysicianRole.username, loginData.readPhysicianRole.password, loginData.readPhysicianRole.mfaSecret);
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

    //validate category column filter
    cy.get('[aria-label="Open Filter Menu"]>span').first().click();
    cy.get('div>[ref="eInput"]').eq(104).click();
    cy.wait(4000);
    cy.get('div>[ref="eInput"]').eq(104).click();
    cy.wait(8000);
    cy.get('[class*="category_main"]').should("be.visible");
    //select category
    cy.get('[class*="category_main"]').first().rightclick();
    cy.get('[data-testid="ArrowDropDownIcon"]').click();
    //select category option
    cy.get('[class="MuiAutocomplete-option"]').eq(6).click();
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Updating Categories Successful")
      .should("be.visible");
    cy.wait(6000);
    //remove Category
    cy.get('[class*="category_main"]').first().rightclick();
    cy.get('[data-testid="ArrowDropDownIcon"]').click();
    cy.get('[data-testid="CancelIcon"]').first().click();
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Updating Categories Successful")
      .should("be.visible");
    cy.wait(6000);
  });

  it("Verify the user can update category of the study by filtering the 'Priority' column", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.readPhysicianRole.username, loginData.readPhysicianRole.password, loginData.readPhysicianRole.mfaSecret);
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

    //validate Priority column filter
    cy.get('[aria-label="Open Filter Menu"]>span').eq(2).click();
    //validate "Select All" Priority Filter
    cy.get('[ref="eCheckbox"]>div').contains("(Select All)").click();
    cy.wait(4000);
    //validate "Blanks" Priority Filter
    cy.get('[ref="eCheckbox"]>div').contains("(Blanks)").click();
    cy.wait(4000);
    cy.get('[ref="eCheckbox"]>div').contains("(Blanks)").click();
    cy.wait(4000);
    cy.get('[aria-label="Search filter values"]').type('Se').wait(2000);
    cy.get('[ref="eCheckbox"]>div').contains("(Select All)").click();
    cy.wait(4000);
    //Validate "Primary" and "Secondary"priority filter
    cy.get('[aria-label="Search filter values"]').type("Primary").wait(2000);
    cy.get('[ref="eCheckbox"]>div').contains("Primary").click();
    cy.wait(4000);
    cy.get('[aria-label="Search filter values"]').type("Secondary").wait(2000);
    cy.get('[ref="eCheckbox"]>div').contains("Secondary").click();
    cy.wait(5000);

    //reset all filters
    cy.get('[title="Reset Filter"]').click();
    cy.wait(6000);

  });

  it("Verify the user can update category of the study by filtering on the 'Rdy. Phy.' column", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.readPhysicianRole.username, loginData.readPhysicianRole.password, loginData.readPhysicianRole.mfaSecret);
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
    
    //validate Reading Physician column filter
    cy.get('[aria-label="Open Filter Menu"]>span').eq(4).click();
    //validate "Select All" Filter of Reading Physician column
    cy.get('[ref="eCheckbox"]>div').contains("(Select All)").click();
    cy.wait(4000);
    //validate "Blanks" Filter of Reading Physician column
    cy.get('[ref="eCheckbox"]>div').contains("(Blanks)").click();
    cy.wait(4000);
    cy.get('[ref="eCheckbox"]>div').contains("(Blanks)").click();
    cy.wait(4000);
    cy.get('[aria-label="Search filter values"]').type('Se').wait(2000);
    cy.get('[ref="eCheckbox"]>div').contains("(Select All)").click();
    cy.wait(4000);
  });

  it("Verify the user can update category of the study by filtering the 'Patient Name' column", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.readPhysicianRole.username, loginData.readPhysicianRole.password, loginData.readPhysicianRole.mfaSecret);
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
   
    //capture patient name
    let patientNameText;
    let patientFirstName;
    cy.get('[col-id="patientsName"]>a')
      .first()
      .then(($elem) => {
        patientNameText = $elem.text().split(",");
        patientFirstName = patientNameText[0];
        cy.log(patientFirstName);

        cy.get('[col-id="studyStatus"]')
          .eq(1)
          .wait(2000)
          .rightclick({ force: true })
          .rightclick({ force: true });
        cy.wait(2000);
        cy.get('[ref="eName"]')
          .contains("Study Status - RadinDev Clinic")
          .click();
        cy.wait(2000);
        //search the patient by the name
        cy.get('[aria-label="Patient Name Filter Input"]').type(
          patientFirstName
        );
        cy.wait(5000);
      });
  });

  it("Verify the user can update category of the study by filtering on the 'Patient Name', 'Study status' column", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.readPhysicianRole.username, loginData.readPhysicianRole.password, loginData.readPhysicianRole.mfaSecret);
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
    
    //validate study status column filter
    cy.get('[aria-label="Open Filter Menu"]>span').eq(1).click();
    cy.get('[ref="eCheckbox"]').contains("(Select All)").click();
    cy.wait(4000);
    cy.get('[ref="eCheckbox"]').contains("(Select All)").click();
    cy.wait(10000);
    cy.get('[col-id="studyStatus"]').eq(0).should("be.visible").click();
    cy.wait(4000);
    //select studystatus option
    //capture patient name
    let patientNameText;
    let patientFirstName;
    cy.get('[col-id="patientsName"]>a')
      .first()
      .then(($elem) => {
        patientNameText = $elem.text().split(",");
        patientFirstName = patientNameText[0];
        cy.log(patientFirstName);

        cy.get('[col-id="studyStatus"]')
          .eq(1)
          .wait(2000)
          .rightclick({ force: true })
          .rightclick({ force: true });
        cy.wait(2000);
        cy.get('[ref="eName"]')
          .contains("Study Status - RadinDev Clinic")
          .click();
        cy.wait(2000);
        //search the patient by the name
        cy.get('[aria-label="Patient Name Filter Input"]').type(
          patientFirstName
        );
        cy.wait(5000);
        //verify the study status
        cy.get('[col-id="studyStatus"]')
          .should("contain", "Study Status")
          .and("be.visible");
      });
  });


})