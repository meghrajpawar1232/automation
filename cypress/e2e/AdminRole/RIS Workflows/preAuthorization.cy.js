/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import "cypress-file-upload";
import AdminPage from "../../../pages/adminPage";
import DocumentManagerPage from "../../../pages/documentManagerPage";
import FrontDeskPage from "../../../pages/frontDeskPage";
import PreAuthorizationPage from "../../../pages/preAuthorizationPage";

const adminpage = new AdminPage();
const docManager = new DocumentManagerPage();
const frontDesk = new FrontDeskPage();
const preAuth = new PreAuthorizationPage();

let fName = faker.person.firstName();
let fName1 = faker.person.firstName();
let lName = faker.person.lastName();
let lName1 = faker.person.lastName();
let phoneNum = faker.string.numeric(10);
let loginData;
let docManagerData;

describe("Verify the Functionality of PreAuthorization page for Admin Role", () => {
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

  it("Verify user should be able to CREATE new view, DUPLICATE, EDIT AND DELETE view in PreAuthorization page", () => {
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
    cy.get(".introjs-skipbutton").click({ force: true });
    //cy.get(".MuiListItem-root > .MuiButtonBase-root > img").click();
    cy.get("header + div.MuiDrawer-root > .MuiPaper-root").should("exist");
    cy.url().should("include", "/documentManager");
    cy.wait(8000);

    //validating pre auth page
    preAuth.clickPreAuthorizationIcon();
    cy.get('[class*="CustomHeader_header"]>div').contains("PACS").should('be.visible');
    cy.wait(10000);

    //select and validate create new view
    preAuth.createNewViewIcon().should('be.visible').click();
    preAuth.addViewHeaderTitleOnPopup().should('be.visible');
    preAuth.viewNameTextField().click({force: true}).type('NEW VIEW TEST');
    preAuth.saveBtnOnAddViewPopup().should('be.visible').click();
    cy.get('[class="Toastify__toast-body"]>div')
    .contains("View Created Successfully")
    .should("be.visible");
    cy.wait(3000);

    //validate DOS filter for the data
    cy.get('[aria-label="Open Filter Menu"]').eq(13).click(); //filter menu icon
    cy.get('[class*="DateFilter_inputs"]>input').check(); //display all checkbox
    cy.get(4000);

    //validate duplicate, edit and delete view //[role="menuitem"]>div Duplicate Edit Delete
    //edit view
    preAuth.clickThreeDotIconOnNewlyCreatedView();
    cy.get('[role="menuitem"]>div').contains('Edit').click();
    cy.wait(2000);
    cy.get('[class*="addView_headerTitle"]').contains('Edit View').should('be.visible');
    cy.get('[class*="addView_body"]>div>div').type('Edit');
    preAuth.saveBtnOnAddViewPopup().click();
    cy.wait(3000);

    //delete view
    cy.get('[aria-label="NEW VIEW TESTEdit"]>div>[data-testid="MoreVertRoundedIcon"]').scrollIntoView().click();
    cy.get('[role="menuitem"]>div').contains('Delete').click();
    cy.wait(2000);
    cy.contains('Delete').click();
    

  })
})