/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import "cypress-file-upload";
import AdminPage from "../../../pages/adminPage";
import DocumentManagerPage from "../../../pages/documentManagerPage";
import FrontDeskPage from "../../../pages/frontDeskPage";

const adminpage = new AdminPage();
const docManager = new DocumentManagerPage();
const frontDesk = new FrontDeskPage();
let fName = faker.person.firstName();
let fName1 = faker.person.firstName();
let lName = faker.person.lastName();
let lName1 = faker.person.lastName();
let phoneNum = faker.string.numeric(10);
let loginData;
let docManagerData;

describe("Verify Creating Order Functionality in Document Manager and validating in the Front Desk page for Admin Role", () => {
  beforeEach(() => {
    cy.clearAllSessionStorage(); // Clear all sessions storage
    cy.clearAllCookies();
    cy.visit(Cypress.config("baseUrl"));
    //cy.wait(10000);
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.fixture("login.json").then((Jsondata) => {
      loginData = Jsondata;
      return loginData;
    });
    cy.fixture("docManager.json").then((Jsondata) => {
      docManagerData = Jsondata;
      return docManagerData;
    });
  });

  afterEach(()=>{
    cy.wait(3000);
  })

  it("Verify Orders can be created for newly added patient with assigning document and making appointment and should be visible in frontDesk page", () => {
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
    cy.get(".introjs-skipbutton").click({ force: true });
    //cy.get(".MuiListItem-root > .MuiButtonBase-root > img").click();
    cy.get("header + div.MuiDrawer-root > .MuiPaper-root").should("exist");
    cy.url().should("include", "/documentManager");
    cy.wait(10000);

    // //const docList = '[class*="doclist_list"]>div:contains("FaxOrder.pdf")'
    // cy.get('[class*="doclist_list"]>div').then(($list) => {
    //   if (!Cypress.dom.isVisible($list)) {
    //     cy.contains("FaxOrder.pdf").click();
    //     docManager.searchedPatient().click();
    //   } else {
    //     //click on upload document icon
    //     docManager.uploadDocumentIcon().should("be.visible").click();
    //     //upload the file
    //     docManager.documentTypeField().should("be.visible").click();
    //     docManager.documentTypeDropdownList().contains("Order").click();

    //     //click on Choose File
    //     cy.get('input[type="file"]')
    //       .selectFile("C:\\Users\\rames\\Downloads\\FaxOrder.pdf", {
    //         force: true,
    //       })
    //       .wait(8000);
    //     cy.get(".MuiButton-disableElevation").click();
    //     cy.wait(1000);
    //     cy.get('[class="Toastify__toast-body"]>div')
    //       .contains("Document added successfully")
    //       .should("be.visible");
    //     cy.wait(10000);

    //     //select the uploaded document
    //     cy.contains("FaxOrder.pdf").click({ force: true }).wait(5000);

    //     // Add the new patient
    //     docManager.addPatientButton().should("be.visible").click();

    //     //verify title and modal popup
    //     docManager.addPatientModalPopup().should("be.visible");
    //     docManager.addPatientTitle().should("be.visible");

    //     //fill the form to add a patient
    //     docManager.firstNameField().type(fName, { delay: 0 });
    //     const newUser = fName;
    //     cy.log(newUser);
    //     docManager.lastNameField().type(lName, { delay: 0 });
    //     docManager.dateOfBirthField().type("08071996", { delay: 0 });
    //     docManager.sexFieldDropdown().should("be.visible").click();
    //     docManager.sexOptionsLists().should("be.visible");
    //     docManager.selectfemaleSexOption();
    //     //select country code
    //     docManager.clickCountryCodeDropdown();
    //     cy.get('[aria-labelledby="address-country-code-label"]>li')
    //       .contains("+91")
    //       .click()
    //       .wait(2000);
    //     docManager.phoneNumberTxtField().type(phoneNum, { delay: 0 });
    //     //save the details
    //     docManager.saveButtonOnAddPatientModal().click();
    //     cy.get('[class="Toastify__toast-body"]>div')
    //       .contains("Patient added successfully")
    //       .should("be.visible");
    //     cy.wait(5000);
    //   }
    //   //verify assign the document modal
    //   cy.get('[class*="style_Modal_Container"]').should("be.visible");
    //   cy.get('[class*="style_Title"]>h6')
    //     .should(
    //       "have.text",
    //       "Kindly verify the following documents that we have categorized for you"
    //     )
    //     .and("be.visible");
    //   cy.get('[class*="style_save"]').click({ force: true }).wait(2000);

    //   //create an order
    //   cy.get('button:contains("Create Order")').click();
    //   cy.wait(10000);
  
    // //   //select ordering physician
    // //   cy.wait(5000)
    //   // cy.get('[id="size-small-outlined-multi"]').first().click().clear();
      
    //       cy.get('[id="size-small-outlined-multi-listbox"]').should(
    //         "be.visible"
    //       );
    //       cy.contains("Default Physician").click({ force: true });
        

    //   cy.wait(2000);

    //      //select payment type
    //   cy.get('label span[class*="MuiTypography-root"]').contains("Self Pay").click({
    //     force: true,
    //   });
    //   //Select Procedure Information
    //   cy.get('button>[data-testid="ArrowDropDownIcon"]')
    //     .eq(1)
    //     .click({ force: true });
    //   cy.contains("MR_FL_BrainWO_Compenduim").click({ force: true }).wait(2000);
    //   cy.get('[class*="style_Patient_Action"]>button')
    //     .contains("Save")
    //     .click({ force: true });

    //   //verify assertion after creating order
    //   cy.get('[class="Toastify__toast-body"]>div')
    //     .contains("Appointment Created Successfully")
    //     .should("be.visible");
    // });

    // cy.wait(4000);

    // //Scheduling the created order in the front desk 
    // frontDesk.clickFrontDeskIcon();
    // cy.wait(10000);

    // // Filter the created date
    // cy.get('[class="ag-icon ag-icon-filter"]').last().click();
    // cy.get('#demo-select-small').select('Today');
    // cy.wait(3000);
    // cy.get('[class*="CustomHeader_header"]').click();

    // // frontDesk.searchfieldOrderingPhysician().scrollIntoView().type(newUser);
    // // cy.wait(5000);
    // // frontDesk.clickOnAppointmentStatus();
    // // frontDesk.selectAppointmentConfirmedOption();
    // // frontDesk.appointmentStatusConfirmBtn().click({force:true})
    // // cy.wait(4000);

    // //edit the status
    // cy.get('a[href*="/documentManager/editOrder"]').invoke('removeAttr', 'target').click();
    // cy.wait(3000);
    // //select the slot for appointment
    // cy.get('[id="appoiment"]').scrollIntoView().click();
    // cy.wait(1000);
    // cy.get('#category-input').click();
    // cy.get('[id="category-input-option-3"]').click();
    // cy.wait(2000);
    // cy.get('[class*="appointment_Appointment_Main"]>div').eq(1).children('div').eq(0).click();
    // cy.wait(2000);
    // cy.contains('Save').click();
    // //asserting the toast message
    // cy.get('[class="Toastify__toast-body"]>div')
    //   .contains("Appointment Updated Successfully!")
    //   .should("be.visible");

    //validating in frontdesk
    frontDesk.clickFrontDeskIcon();
    cy.wait(10000);

     //filter the appointment status "Order created"
     cy.get('[aria-label="Open Filter Menu"]>span').eq(18).click();
     cy.get('[ref="eCheckbox"]').contains('(Select All)').click();
     cy.wait(4000);
     cy.get('[ref="eCheckbox"]').contains('Order Created').click();
     cy.wait(10000);
 
    //  //edit the order
    //  cy.get('a[href*="/documentManager/editOrder"]').eq(2).scrollIntoView().invoke('removeAttr', 'target').click({force:true});
    //  cy.wait(2000);
 

  });
})
