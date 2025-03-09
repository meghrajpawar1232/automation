/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import "cypress-file-upload";
import AdminPage from "../../../pages/adminPage";
import DocumentManagerPage from "../../../pages/documentManagerPage";
import OrderingPhysicianPage from "../../../pages/orderingPhysicianPage";
import FrontDeskPage from "../../../pages/frontDeskPage";

const adminpage = new AdminPage();
const docManager = new DocumentManagerPage();
const OrderingPhysician = new OrderingPhysicianPage();
const frontDesk = new FrontDeskPage();
let fName = faker.person.firstName(7);
let lName = faker.person.lastName(7);
let phoneNum = faker.string.numeric(10);
let faxNum = faker.string.numeric(10);
let loginData;
let docManagerData;

describe("Verify Creating Order Functionality in Document Manager for Admin Role", () => {
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

  it("Verify 'Add Ordering Physician' functionality ", () => {
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
    cy.get(".introjs-skipbutton").click({ force: true });
    //cy.get(".MuiListItem-root > .MuiButtonBase-root > img").click();
    cy.get("header + div.MuiDrawer-root > .MuiPaper-root").should("exist");
    cy.url().should("include", "/documentManager");
    cy.wait(5000);
    OrderingPhysician.clickSystemDataIcon();
    OrderingPhysician.clickOnOrderingPhysician();
    cy.wait(6000);
    OrderingPhysician.addOrderingPhysicianBtn().click();
    cy.wait(6000);
    cy.get('#offices-option-0').click();
    //cy.pause();
    OrderingPhysician.firstNameTxtField().should('be.visible').type(fName);
    const userName = fName.charAt(0).toLowerCase() + fName.slice(1);;
    cy.log(userName)
    const newUser1 = fName.charAt(0).toUpperCase() + fName.slice(1);
    cy.log(newUser1);
    //cy.pause();
    OrderingPhysician.lastNameTxtField().should('be.visible').type(lName);
    OrderingPhysician.emailTxtField().type(userName+'@gmail.com');
    OrderingPhysician.countryCodeDropdownClick();
    OrderingPhysician.countryCodeDropdownLists().contains('+91').click().wait(2000);
    OrderingPhysician.phoneNumberField().type(phoneNum).wait(2000);
    cy.get('[type="submit"]').click().wait(5000);

    //visit order portal
    cy.visit('https://physician.radindev.net/');
    OrderingPhysician.portalEmailField().type(userName+'@gmail.com');
    OrderingPhysician.portalPasswordField().type(newUser1+'@123');
    cy.wait(3000);
    OrderingPhysician.portalNextBtnClick();
    cy.wait(4000);
    cy.pause();

    //set password
    OrderingPhysician.portalPasswordField().first().type(newUser1+'@1234');
    OrderingPhysician.portalPasswordField().last().type(newUser1+'@1234');
    cy.wait(2000);
    OrderingPhysician.portalNextBtnClick({force:true});
    cy.wait(8000);
    //validate all the tabs
    OrderingPhysician.portalReportsTabIcon().should('be.visible').click();
    OrderingPhysician.portalReportsTab().should('be.visible');
    OrderingPhysician.portalAppointmentsTabIcon().should('be.visible').click()
    OrderingPhysician.portalAppointmentsTab().should('be.visible');
    OrderingPhysician.portalOrderTabIcon().should('be.visible').click();
    OrderingPhysician.portalOrderTab().should('be.visible');
    OrderingPhysician.portalCreateOrderBtn().should('be.visible');
    OrderingPhysician.portalArrowIconforLogout().click();
    OrderingPhysician.portalLogoutBtn().should('be.visible');
    cy.wait(4000);

    //Creating an Order and validation
    OrderingPhysician.portalCreateOrderBtn().click().wait(2000);
    OrderingPhysician.createOrderModalPopup().should('be.visible');
    OrderingPhysician.patientSearchInputField().type('Ragini');
    cy.get("[class*='CreateOrder_serch_result']>div", {timeout:30000}).first().click()
    cy.wait(3000);

    //select payment type
    cy.get('label span[class*="MuiTypography-root"]:contains("Cash")').click({
        force: true,
      });

    //validating Ordering physician information
    cy.get('[data-testid="ArrowDropDownIcon"]').eq(1).click();
    cy.get('[id=":r3:-option-0"]').click();
    cy.get('input[placeholder="Enter fax number"]').type(faxNum);

    //select priority
    cy.get('[data-testid="ArrowDropDownIcon"]').eq(2).click();
    cy.get('[id=":r7:-option-0"]').click();

    //select procedure name
    cy.get('[data-testid="ArrowDropDownIcon"]').eq(3).click();
    cy.get('[id=":rc:-option-4"]').click(); 

    //select Subspeciality
    cy.get('[data-testid="ArrowDropDownIcon"]').eq(4).click();
    cy.get('[id=":rf:-option-2"]').click();

    //select reading Physician
    cy.get('[data-testid="ArrowDropDownIcon"]').eq(5).click();
    cy.get('[id=":rh:-option-3"]').click();

    //click on proceed button
    cy.wait(2000);
    cy.get('.fixed > .MuiButton-text').click();

    //validate the success message
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Create Order Success")
      .should("be.visible");
    cy.wait(5000);

    //validate the Order tab
    OrderingPhysician.portalOrderTab().should('be.visible').click().wait(3000);
    cy.contains('Order Created').should('be.visible');

    //search and edit the order
    cy.get('[aria-label="Patient Name Filter Input"]').type('Ragi').wait(2000);
    cy.get('[data-testid="EditIcon"]').click();
    //edit procedure name, select priority and save the order
    cy.get('[data-testid="ArrowDropDownIcon"]').eq(3).click();
    cy.get('[id=":r11:-option-4"]').click();
    cy.wait(4000);
    //select priority
    cy.get('[data-testid="ArrowDropDownIcon"]').eq(2).click({force:true});
    cy.get('[id=":rs:-option-1"]').click();
    cy.wait(3000);
    cy.get('.fixed > .MuiButton-text').click();
    cy.wait(5000)
   
    //Verifying FrontDesk for validating Appointment tab 
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
    cy.get(".introjs-skipbutton").click({ force: true });
    cy.wait(3000);

    //Scheduling the created order in the front desk 
    frontDesk.clickFrontDeskIcon();
    cy.wait(10000);

    // Filter the created date
    cy.get('[class="ag-icon ag-icon-filter"]').last().click();
    cy.get('#demo-select-small').select('Today');
    cy.wait(3000);
    cy.get('[class*="CustomHeader_header"]').click();

    frontDesk.searchfieldOrderingPhysician().scrollIntoView().type(newUser1);
    cy.wait(5000);
    frontDesk.clickOnAppointmentStatus();
    frontDesk.selectAppointmentConfirmedOption();
    frontDesk.appointmentStatusConfirmBtn().click({force:true})
    cy.wait(4000);

    //edit the status
    cy.get('a[href*="/documentManager/editOrder"]').eq(5).invoke('removeAttr', 'target').click();
    cy.wait(3000);
    //select the slot for appointment
    cy.get('[id="appoiment"]').scrollIntoView().click();
    cy.wait(1000);
    cy.get('#category-input').click();
    cy.get('[id="category-input-option-3"]').click();
    cy.wait(2000);
    cy.get('[class*="appointment_Appointment_Main"]>div').eq(1).children('div').eq(0).click();
    cy.wait(2000);
    cy.contains('Save').click();
    //asserting the toast message
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Appointment Updated Successfully!")
      .should("be.visible");

    //visit ordering portal again
    cy.visit('https://physician.radindev.net/');
    cy.wait(3000);

    //validating appointment tab
    OrderingPhysician.portalAppointmentsTab().should('be.visible').click().wait(3000);

     //Logout after each login
    cy.wait(5000)
    OrderingPhysician.portalArrowIconforLogout().click();
    OrderingPhysician.portalLogoutBtn().should('be.visible').click();

    

  })
})