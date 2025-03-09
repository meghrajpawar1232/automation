/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import AdminPage from "../../../../pages/adminPage";
import AssignClinicRulePage from "../../../../pages/assignClinicRulePage";
import DicomOutPage from "../../../../pages/dicomOutPage";
import OrderingPhysicianPage from "../../../../pages/orderingPhysicianPage";
import DicomServerPage from "../../../../pages/dicomServerPage";

const OrderingPhysician = new OrderingPhysicianPage();
const adminpage = new AdminPage();
const assignClinicRule = new AssignClinicRulePage();
const dicomOutPage = new DicomOutPage();
const dicomServerPage = new DicomServerPage();

let num = faker.string.alphanumeric(4);
let phoneNum = faker.string.numeric(10);
let zipCode = faker.location.zipCode();
let emailAddress = faker.internet.email({ fprovider: "radinhealth.com" });
let clinicName = faker.company.buzzVerb();
let address = faker.location.street();
let state = faker.location.state();
let city = faker.location.city();

describe("Verify functionality under Dicom In and Out for Admin Role", () => {
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

  it("Verify Dicom Out functionality", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
    cy.get(".introjs-skipbutton").click({ force: true });
    cy.url().should("include", "/documentManager");
    adminpage.getLogo().should("be.visible");
    cy.wait(3000);

    //navigating to dicom Server page
    adminpage.clickAdminIcon();
    dicomServerPage.clickOnDicomServer();
    cy.wait(5000);
    dicomServerPage.clickOnAddServerBtn();
    cy.wait(2000);
    dicomServerPage.serverDirectionTextBox().should('have.attr', 'value', 'Outbound').and('be.visible');
    const aeTitleName= `SEPSTREAM_QR${num}`;
    dicomServerPage.aeTitleTextBox().type(aeTitleName).wait(2000);
    dicomServerPage.hostNameTextBox().type('127.0.0.1');
    dicomServerPage.portTextBox().type('104');
    cy.wait(2000);
    dicomServerPage.serverTypeTextBoxClick();
    dicomServerPage.serverTypeDropdownOptionSelect();
    cy.wait(2000);
    dicomServerPage.saveButton().should('be.visible').click();
    cy.wait(1000);
    //verify toast message after adding dicom server
     cy.get('[class="Toastify__toast-body"]>div')
       .contains("Dicom Server created successfully")
       .should("be.visible");
     cy.wait(2000);

      //dicom out functionality
    cy.wait(3000)
    OrderingPhysician.clickSystemDataIcon();
    dicomOutPage.clickOnDicomOut();
    cy.wait(3000);
    cy.url().should("include", "/admin/dicomOut");
    dicomOutPage.clickOnChooseDateDropdown();
    dicomOutPage.clickOnDatePickerDropdown();
    cy.wait(2000);
    
    //*//Verify Date Submitted - should have a timestamp. 
    cy.get('.MuiTableBody-root >tr>:nth-child(1) >div').contains('PM').should('be.visible');

    //*//Verify Destination, Patient, Study, Clinic, Institution, and DOS would always have values present with any status.

    //*//Verify the column "Tries", "Sent", "Fail" and "Action" when the status is "Success".
    cy.get('input[name="status"]').type('Success').wait(3000);
    cy.get('[aria-label="Success"]>div>span>span').contains('Success').should('be.visible');

     //compare "toSend" and "Sent" values 
    cy.get('.MuiTableBody-root >tr>:nth-child(11) >div').first().then(($txt)=>{
      const toSendValues = $txt.text();
    
    cy.get('.MuiTableBody-root >tr>:nth-child(12) >div').first().then(($txt)=>{
      const sentValues = $txt.text();
      expect(toSendValues).to.eq(sentValues);
    })
    })

     //"fail"column should be empty
    cy.get('.MuiTableBody-root >tr>:nth-child(13) >div').should('be.empty');

     //"%" column should have 100% value
    cy.get('.MuiTableBody-root >tr>:nth-child(15) >div')
      .should('have.attr','aria-label', '100%')
      .and('exist');

     //"type" column should have 'STUDYDOCS' value
    cy.get('.MuiTableBody-root >tr>:nth-child(16) >div')
      .should('have.attr','aria-label', 'STUDYDOCS')
      .and('contain', 'STUDYDOCS')
      .and('exist');
    cy.wait(4000);


    //*//Verify the column "Tries", "Sent", "Fail" and "Action" when the status is "In Process".
    cy.get('input[name="status"]').clear().type('In Process').wait(3000);
    cy.get('[aria-label="In Process"]>div>span>span').contains('In Process').should('be.visible');

     //"tries" column should be empty
    cy.get('.MuiTableBody-root >tr>:nth-child(10) >div').should('be.empty');

     //"toSend" column should be empty
    cy.get('.MuiTableBody-root >tr>:nth-child(11) >div').should('be.empty');
    
    //"Sent" column should be empty
    cy.get('.MuiTableBody-root >tr>:nth-child(12) >div').should('be.empty');

     //"fail" column should be empty
    cy.get('.MuiTableBody-root >tr>:nth-child(13) >div').should('be.empty');

     //"%" column should have 0% value
    cy.get('.MuiTableBody-root >tr>:nth-child(15) >div')
      .should('have.attr','aria-label', '0%')
      .and('exist');

     //"type" column should have 'NOTES' value
    cy.get('.MuiTableBody-root >tr>:nth-child(16) >div')
      .should('have.attr','aria-label', 'NOTES')
      .and('contain', 'NOTES')
      .and('exist');

      //"action" column should have 'Cancel' value
    cy.get('.MuiTableBody-root >tr>:nth-child(17) >div>div>button>span')
    .should('contain', 'Cancel')
    .and('exist');

    cy.wait(4000);


    //Verify the column "Tries", "Sent", "Fail" and "Action" when the status is "Failed - Retries Exceeded".
    cy.get('input[name="status"]').clear().type('Failed - Retries Exceeded').wait(3000);
    cy.get('[aria-label="Failed - Retries Exceeded"]>div>span>span').contains('Failed - Retries Exceeded').should('be.visible');


     //"tries" column should have maximum value
     cy.get('.MuiTableBody-root >tr>:nth-child(10) >div').should('contain', '10').and('be.visible');

     //compare "toSend" and "Fail" values 
    cy.get('.MuiTableBody-root >tr>:nth-child(11) >div').first().then(($txt)=>{
      const toSendValues = $txt.text();
    
    cy.get('.MuiTableBody-root >tr>:nth-child(13) >div').first().then(($txt)=>{
      const failValues = $txt.text();
      expect(toSendValues).to.eq(failValues);
    })
    })

     //"Sent"column should be empty
    cy.get('.MuiTableBody-root >tr>:nth-child(12) >div').should('be.empty');

     //"%" column should have 0% value
    cy.get('.MuiTableBody-root >tr>:nth-child(15) >div')
      .should('have.attr','aria-label', '0%')
      .and('exist');

     //"type" column should have 'DICOM' value
    cy.get('.MuiTableBody-root >tr>:nth-child(16) >div')
      .should('have.attr','aria-label', 'DICOM')
      .and('contain', 'DICOM')
      .and('exist');

     //"action" column should have 'Resend' value
    cy.get('.MuiTableBody-root >tr>:nth-child(17) >div>div>button>span')
    .should('contain', 'Resend')
    .and('exist');


    //*//Verify the column "Tries", "Sent", "Fail" and "Action" when the status is "Failed - Retrying".
    cy.get('input[name="status"]').clear().type('Failed - Retrying').wait(3000);
    cy.get('[aria-label="Failed - Retrying"]>div>span>span').contains('Failed - Retrying').should('be.visible');

     //"tries" column should have maximum value
     cy.get('.MuiTableBody-root >tr>:nth-child(10) >div').should('not.be.empty');

     //compare "toSend" and "Fail" values 
    cy.get('.MuiTableBody-root >tr>:nth-child(11) >div').last().then(($txt)=>{
      const toSendValues = $txt.text();
    
    cy.get('.MuiTableBody-root >tr>:nth-child(13) >div').last().then(($txt)=>{
      const failValues = $txt.text();
      expect(toSendValues).to.eq(failValues);
    })
    })

     //"Sent"column should be empty
    cy.get('.MuiTableBody-root >tr>:nth-child(12) >div').should('be.empty');

     //"%" column should have 0% value
    cy.get('.MuiTableBody-root >tr>:nth-child(15) >div')
      .should('have.attr','aria-label', '0%')
      .and('exist');

     //"type" column should have 'STUDYDOCS' value
    cy.get('.MuiTableBody-root >tr>:nth-child(16) >div').last()
      .should('have.attr','aria-label', 'STUDYDOCS')
      .and('contain', 'STUDYDOCS')
      .and('exist');

     //"action" column should have 'Resend' value
    cy.get('.MuiTableBody-root >tr>:nth-child(17) >div>div>button>span')
    .should('contain', 'Resend')
    .and('exist');


  })
})