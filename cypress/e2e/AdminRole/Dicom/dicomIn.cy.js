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

  it("verify Dicom functionality", () => {
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
    dicomServerPage.inBoundBtn().click({force:true});
    dicomServerPage.clickOnAddServerBtn();
    cy.wait(2000);
    dicomServerPage.serverDirectionTextBox().should('have.attr', 'value', 'Inbound').and('be.visible');
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


    //dicom in functionality
    cy.wait(3000)
    OrderingPhysician.clickSystemDataIcon();
    dicomInPage.clickOnDicomIn();
    cy.wait(3000);
    cy.url().should("include", "/admin/dicomIn");
    dicomInPage.clickOnChooseDateDropdown();
    dicomInPage.clickOnDatePickerDropdown();
    cy.wait(2000);
    cy.get(':nth-child(1) > :nth-child(11)>div').invoke('text').then((patientId)=>{
      const patientIdNumber = patientId;
      cy.log(patientIdNumber);
    

    //Go to PACS for validation
    pacsPage.clickPacsIcon();
    pacsPage.patientIdSearchFilter().type(patientIdNumber);
    cy.wait(2000);
    pacsPage.studyStatusField().should('be.visible');
  })

  })
})