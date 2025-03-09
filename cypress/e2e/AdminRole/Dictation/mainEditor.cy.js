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

describe("Verify Main Editor functionality for Admin Role", () => {
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

it("Verify template loads in main editor, when selected from the template section", () => {
    cy.visit(Cypress.config("baseUrl"));
  cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
  cy.get('[class="Toastify__toast-body"]>div')
    .contains("Signed in Successfully")
    .should("be.visible");
  cy.get(".introjs-skipbutton").click({ force: true });
  cy.url().should("include", "/documentManager");
  cy.wait(3000);

  //navigate to PACS for validation
  pacsPage.clickPacsIcon();
  cy.get('[class*="CustomHeader_header"]>div').contains("PACS").should('be.visible');
  cy.wait(8000);

  //Filter the locked column filter
  cy.get('[aria-label="Open Filter Menu"]>span').eq(18).scrollIntoView().click({force:true});
  cy.get('[ref="eCheckbox"]').contains('(Select All)').click({force:true});
  cy.wait(4000);
  cy.get('[ref="eLabel"]').contains('NO').click({force:true});
  cy.wait(6000);

   //validate study status column filter
 cy.get('[aria-label="Open Filter Menu"]>span').eq(1).click({force:true});
 cy.get('[ref="eCheckbox"]').contains("(Select All)").click({force:true});
 cy.wait(5000);
 cy.get('[aria-label="Search filter values"]').type("FINAL").wait(2000);
 cy.get('[ref="eCheckbox"]').contains("FINAL").click({force:true});
 cy.wait(2000);

  //capture patient name
  let patientNameText;
  let patientFirstName;
  cy.get('[col-id="patientsName"]>a')
    .first()
    .then(($elem) => {
      patientNameText = $elem.text().split(",");
      patientFirstName = patientNameText[0];
      cy.log(patientFirstName);
  cy.wait(2000);

  //capture the value of "href" attribute and saving it in a variable
  cy.get('[col-id="patientsName"]>a').first()
   .should('have.attr', 'href').and('include', 'studyinstances')
   .then((href) => {
      cy.log(href);
     cy.visit(href);
     cy.wait(3000);
  }) 

  //Remove the already present final report on Study instance page
  cy.get('[class*="rightPortion_icon"]>[data-testid="ClearIcon"]').click({force:true});
  //Validate and click the delete functionality on the popup
  cy.wait(3000)
  cy.get('.MuiButton-containedPrimary').contains('Delete').click();
  cy.get('[class="Toastify__toast-body"]>div')
    .contains("Report Deleted")
    .should("be.visible");
  cy.wait(3000)

  //Create New report

  //Validating a new template
  cy.get('[id="templateAccordianHeader"]').contains('Template').should('be.visible').click();
  //deselect "mine" checkbox
  cy.get('label[for="checkboxMine"]').contains('Mine').should('be.visible').click();
  cy.wait(5000);
  //search for a template
  cy.get('[id="searchInput"]')
    .should('have.attr', 'placeholder', "Search templates...")
    .and('be.visible')
    .type('MRI').wait(2000);
  
  //select a template
  cy.get('[class="template-container"]>button').eq(4).click({force:true});
  cy.get('[class="Toastify__toast-body"]>div')
    .contains("Report Created")
    .should("be.visible");
  cy.wait(3000);
  
    })
})

it("Verify editing capability after template load in main editor", () => {
cy.visit(Cypress.config("baseUrl"));
cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
cy.get('[class="Toastify__toast-body"]>div')
  .contains("Signed in Successfully")
  .should("be.visible");
cy.get(".introjs-skipbutton").click({ force: true });
cy.url().should("include", "/documentManager");
cy.wait(3000);

//navigate to PACS for validation
pacsPage.clickPacsIcon();
cy.get('[class*="CustomHeader_header"]>div').contains("PACS").should('be.visible');
cy.wait(8000);

//Filter the locked column filter
cy.get('[aria-label="Open Filter Menu"]>span').eq(18).scrollIntoView().click({force:true});
cy.get('[ref="eCheckbox"]').contains('(Select All)').click({force:true});
cy.wait(4000);
cy.get('[ref="eLabel"]').contains('NO').click({force:true});
cy.wait(6000);

 //validate study status column filter
cy.get('[aria-label="Open Filter Menu"]>span').eq(1).click({force:true});
cy.get('[ref="eCheckbox"]').contains("(Select All)").click({force:true});
cy.wait(5000);
cy.get('[aria-label="Search filter values"]').type("FINAL").wait(2000);
cy.get('[ref="eCheckbox"]').contains("FINAL").click({force:true});
cy.wait(2000);

//capture patient name
let patientNameText;
let patientFirstName;
cy.get('[col-id="patientsName"]>a')
  .first()
  .then(($elem) => {
    patientNameText = $elem.text().split(",");
    patientFirstName = patientNameText[0];
    cy.log(patientFirstName);
cy.wait(2000);

//capture the value of "href" attribute and saving it in a variable
cy.get('[col-id="patientsName"]>a').first()
 .should('have.attr', 'href').and('include', 'studyinstances')
 .then((href) => {
    cy.log(href);
   cy.visit(href);
   cy.wait(3000);
}) 

//Remove the already present final report on Study instance page
cy.get('[class*="rightPortion_icon"]>[data-testid="ClearIcon"]').click({force:true});
//Validate and click the delete functionality on the popup
cy.wait(3000)
cy.get('.MuiButton-containedPrimary').contains('Delete').click();
cy.get('[class="Toastify__toast-body"]>div')
  .contains("Report Deleted")
  .should("be.visible");
cy.wait(3000)

//Create New report

//Validating a new template
cy.get('[id="templateAccordianHeader"]').contains('Template').should('be.visible').click();
//deselect "mine" checkbox
cy.get('label[for="checkboxMine"]').contains('Mine').should('be.visible').click();
cy.wait(5000);
//search for a template
cy.get('[id="searchInput"]')
  .should('have.attr', 'placeholder', "Search templates...")
  .and('be.visible')
  .type('MRI').wait(2000);

//select a template
cy.get('[class="template-container"]>button').eq(4).click({force:true});
cy.get('[class="Toastify__toast-body"]>div')
  .contains("Report Created")
  .should("be.visible");
cy.wait(3000);

})

//
})
})