/// <reference types="cypress">
import { authenticator } from "otplib";
import { faker } from "@faker-js/faker";
import AdminPage from "../../../pages/adminPage";
import PacsPage from "../../../pages/pacsPage";

const adminpage = new AdminPage();
const pacsPage = new PacsPage();

let num = faker.string.alphanumeric(4);

describe("Verify every View of PACS functionality for Admin Role", () => {
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

  it("Verify user should be able to CREATE new view", () => {
    cy.clearAllSessionStorage(); // Clear all sessions storage
    cy.clearAllCookies();
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

    // validate delete view
    //delete view
    cy.get(
      '[aria-label="NEW VIEW TEST"]>div>[data-testid="MoreVertRoundedIcon"]'
    )
      .scrollIntoView()
      .click();
    cy.get('[role="menuitem"]>div').contains("Delete").click();
    cy.wait(2000);
    cy.contains("Delete").click();
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("View Deleted Successfully")
      .should("be.visible");
    cy.wait(3000);

  
  });

  it("Verify user should be able to EDIT the view", () => {
    cy.clearAllSessionStorage(); // Clear all sessions storage
    cy.clearAllCookies();
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

    //validate DOS filter for the data
    cy.get('[aria-label="Open Filter Menu"]>span').eq(8).click(); //filter menu icon
    cy.get('[class*="DateFilter_inputs"]>input').check(); //display all checkbox
    cy.get(4000);

    //validate duplicate, edit and delete view

    //edit view
    pacsPage.clickThreeDotIconOnNewlyCreatedView();
    cy.get('[role="menuitem"]>div').contains("Edit").click();
    cy.wait(2000);
    cy.get('[class*="addView_headerTitle"]')
      .contains("Edit View")
      .should("be.visible");
    cy.get('[class*="addView_body"]>div>div').type("Edit");
    pacsPage.saveBtnOnAddViewPopup().click();
    cy.wait(3000);

    //delete view
    cy.get(
      '[aria-label="NEW VIEW TESTEdit"]>div>[data-testid="MoreVertRoundedIcon"]'
    )
      .scrollIntoView()
      .click();
    cy.get('[role="menuitem"]>div').contains("Delete").click();
    cy.wait(2000);
    cy.contains("Delete").click();
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("View Deleted Successfully")
      .should("be.visible");
    cy.wait(3000);

    
  });

  it("Verify user should be able to DUPLICATE the view", () => {
    cy.clearAllSessionStorage(); // Clear all sessions storage
    cy.clearAllCookies();
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
    cy.wait(10000);

    //validate DOS filter for the data
    cy.get('[aria-label="Open Filter Menu"]>span').eq(8).click(); //filter menu icon
    cy.get('[class*="DateFilter_inputs"]>input').check(); //display all checkbox
    cy.get(4000);

    //validate duplicate view
    //duplicate view from default view
    pacsPage.clickThreeDotIconOnDuplicateCreatedView();
    cy.get('[role="menuitem"]>div').contains("Duplicate").click();
    cy.wait(2000);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("View Cloned Successfully")
      .should("be.visible");
    cy.wait(3000);

    //duplicate view delete functionality check //DEFAULT VIEW_Clone
    cy.get(
      '[aria-label="DEFAULT VIEW_Clone"]>div>[data-testid="MoreVertRoundedIcon"]'
    )
      .scrollIntoView()
      .click();
    cy.get('[role="menuitem"]>div').contains("Delete").click();
    cy.wait(2000);
    cy.contains("Delete").click();
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("View Deleted Successfully")
      .should("be.visible");
    cy.wait(3000);
  });

  it("Verify user should be able to DELETE the view", () => {
    cy.clearAllSessionStorage(); // Clear all sessions storage
    cy.clearAllCookies();
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

    //validate DOS filter for the data
    cy.get('[aria-label="Open Filter Menu"]>span').eq(8).click(); //filter menu icon
    cy.get('[class*="DateFilter_inputs"]>input').check(); //display all checkbox
    cy.get(4000);

    //validate delete view
    cy.get(
      '[aria-label="NEW VIEW TEST"]>div>[data-testid="MoreVertRoundedIcon"]'
    )
      .scrollIntoView()
      .click();
    cy.get('[role="menuitem"]>div').contains("Delete").click();
    cy.wait(2000);
    cy.contains("Delete").click();
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("View Deleted Successfully")
      .should("be.visible");
    cy.wait(3000);
    
});

it("Verify user should be able to Assign a view to any role and validate after assigning", () => {
  cy.clearAllSessionStorage(); // Clear all sessions storage
  cy.clearLocalStorage();
  cy.clearAllCookies();
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
  cy.wait(10000);

  //select and validate create new view
  pacsPage.createNewViewIcon().should("be.visible").click();
  pacsPage.addViewHeaderTitleOnPopup().should("be.visible");
  pacsPage.viewNameTextField().click({ force: true }).wait(2000);
  cy.get('[class*="addView_body"]>div>div>input').type("ASSIGN VIEW TEST", {force:true});
  pacsPage.saveBtnOnAddViewPopup().should("be.visible").click();
  cy.get('[class="Toastify__toast-body"]>div')
    .contains("View Created Successfully")
    .should("be.visible");
  cy.wait(3000);

  //validate the new view with DOS filter
  cy.get('[aria-label="ASSIGN VIEW TEST"]')
      .scrollIntoView()
      .click();
  cy.get(2000);   
   //validate DOS filter for the data
   cy.get('[aria-label="Open Filter Menu"]>span').eq(8).click(); //filter menu icon
   cy.get('[class*="DateFilter_inputs"]>input').check(); //display all checkbox
   cy.get(6000);

  // validate assign view
  //assign view
  cy.get(
    '[aria-label="ASSIGN VIEW TEST"]>div>[data-testid="MoreVertRoundedIcon"]'
  )
    .scrollIntoView()
    .click(); //click on three dots
  cy.get('[role="menuitem"]>div').contains("Assign").click();
  cy.wait(2000);

  //validate the Assign role modal popup and select the role
  cy.get('[class="MuiBox-root css-5f1i90"]').should("be.visible"); //validating Assign role modal popup 
  cy.get('[class="MuiBox-root css-5f1i90"]>div>h5')
    .contains('Assign Role')
    .should("be.visible"); //validating Assign role modal popup heading title

  cy.get('[name="docName"][placeholder="Search"]').type('rad').wait(2000); //for searching
  cy.get('input.PrivateSwitchBase-input').click(); //for selecting the checkbox

  //validating "Assign" button on the modal popup and click on the button
  cy.get('button').contains('Assign').should("be.visible").click();

  //validating the toast message
  cy.get('[class="Toastify__toast-body"]>div')
    .contains("View Updated Successfully")
    .should("be.visible");
  cy.wait(3000);

  //validating the assigned view with underline property below it's name
  //text-decoration: underline
  cy.get('[aria-label="ASSIGN VIEW TEST"]>span')
    .should('have.css', 'text-decoration-line', 'underline')
    .and('be.visible');
  cy.wait(3000);
  cy.reload();
  cy.wait(3000);
  //validating after assigning the view here 
  cy.get('[aria-label="ASSIGN VIEW TEST"]').should('not.exist');
  cy.wait(3000);
 
});

it("Verify user should be able to validate the after assigning and unassign the view back", () => {
  cy.clearAllSessionStorage(); // Clear all sessions storage
  cy.clearLocalStorage();
  cy.clearAllCookies();

  //login as rad assistant user
  cy.visit(Cypress.config("baseUrl"));
  cy.loginUser(loginData.radAssisstantRole.username, loginData.radAssisstantRole.password, loginData.radAssisstantRole.mfaSecret);
  cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");

      cy.wait(3000);

  //navigate to PACS for validation
  pacsPage.clickPacsIcon();
  cy.get('[class*="CustomHeader_header"]>div')
    .contains("PACS")
    .should("be.visible");
  cy.wait(3000);   

  //validate the same view for this rad assistant role
  cy.get('[aria-label="ASSIGN VIEW TEST"]>span')
    .should('have.css', 'text-decoration-line', 'underline')
    .and('be.visible');
  cy.wait(3000);

  //again unassigning the view here
 // validate unassign view
  cy.get(
    '[aria-label="ASSIGN VIEW TEST"]>div>[data-testid="MoreVertRoundedIcon"]'
  )
    .scrollIntoView()
    .click(); //click on three dots
  cy.get('[role="menuitem"]>div').contains("Assign").click();
  cy.wait(2000);

  //validate the Assign role modal popup and select the role
  cy.get('[class="MuiBox-root css-5f1i90"]').should("be.visible"); //validating Assign role modal popup 
  cy.get('[class="MuiBox-root css-5f1i90"]>div>h5')
    .contains('Assign Role')
    .should("be.visible"); //validating Assign role modal popup heading title

  cy.get('[name="docName"][placeholder="Search"]').type('rad').wait(2000); //for searching
  cy.get('input.PrivateSwitchBase-input').click(); //for selecting the checkbox

  //validating "Assign" button on the modal popup and click on the button
  cy.get('button').contains('Assign').should("be.visible").click();

  //validating the toast message
  cy.get('[class="Toastify__toast-body"]>div')
    .contains("View Updated Successfully")
    .should("be.visible");
  cy.wait(3000);
  cy.reload();
  cy.wait(3000);
  //validating after unassigning the view here and logout from this account
  cy.get('[aria-label="ASSIGN VIEW TEST"]').should('not.exist');

   //logout from this role 
   cy.get('[data-testid="ArrowDropDownOutlinedIcon"]').click({force:true});
   cy.get('[role="menu"]>li').last().contains('Logout').should("be.visible").click();
   cy.wait(6000);
 
});

it("Verify user should be able to validate the view after unassigning back to the original role and delete the view at the end", () => {
  cy.clearAllSessionStorage(); // Clear all sessions storage
  cy.clearLocalStorage();
  cy.clearAllCookies(); 
  //login as admin user
   cy.visit(Cypress.config("baseUrl"));
   cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
   cy.get('[class="Toastify__toast-body"]>div')
       .contains("Signed in Successfully")
       .should("be.visible");
 
   cy.wait(3000);
 
   //navigate to PACS for validation
   pacsPage.clickPacsIcon();
   cy.get('[class*="CustomHeader_header"]>div')
     .contains("PACS")
     .should("be.visible")
     .click();
   cy.wait(4000);   
 
   //validate the same view again in admin role
   cy.get('[aria-label="ASSIGN VIEW TEST"]')
     .should('be.visible').click({force:true});
   cy.wait(3000);

   //deleting the view
   cy.get('[aria-label="ASSIGN VIEW TEST"]>div>[data-testid="MoreVertRoundedIcon"]')
    .scrollIntoView()
    .click({force:true});
  cy.get('[role="menuitem"]>div').contains("Delete").click({force:true});
  cy.wait(2000);
  cy.contains("Delete").click({force:true});
  cy.get('[class="Toastify__toast-body"]>div')
    .contains("View Deleted Successfully")
    .should("be.visible");
  cy.wait(3000);

});
});
