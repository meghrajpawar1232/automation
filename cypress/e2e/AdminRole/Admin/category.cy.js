/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import AdminPage from "../../../pages/adminPage";
import CategoryPage from "../../../pages/categoryPage";

const adminpage = new AdminPage();
const category = new CategoryPage();

let CtgryName = "Head Issue";
let zipCode = faker.location.zipCode();
let emailAddress = faker.internet.email({ fprovider: "radinhealth.com" });
let location = faker.company.buzzVerb();
let address = faker.location.street();
let state = faker.location.state();
let city = faker.location.city();

describe("Verify functionality under Category for Admin Role", () => {
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

  it("verify add category, search filter for the existing category by Name and edit and delete category functionality", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
    cy.get(".introjs-skipbutton").click({ force: true });
    cy.url().should("include", "/documentManager");
    adminpage.getLogo().should("be.visible");
    adminpage.clickAdminIcon();
    adminpage.clickAdminIcon();
    cy.wait(1000);
    category.clickOnCategory();
    cy.wait(5000);
    cy.get('[data-testid="ArrowDropDownIcon"]').click().wait(3000).click({force:true});
    cy.get('[id*="combo-box-demo-option"]').contains('RadinDev Clinic').click();
    cy.wait(2000);
    category.addCategoryBtn().should('be.visible').click();
    cy.wait(3000);
    category.clickIconDropdown();
    category.selectIconFromDropdown();
    category.nameTextField().type(CtgryName);
    const categoryName = CtgryName;
    cy.log(categoryName);
    category.clickColorTxtFieldDropdown();
    category.selectBlueColorFromDropdown();
    category.saveBtn().should('be.visible').click({force:true});
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Category added successfully")
      .should("be.visible");
    cy.wait(3000);
    //search by name and edit the category
    cy.get('[name="category"][placeholder="No Filter"]').type(categoryName);
    cy.wait(5000);
    category.clickEditIcon();
    category.clickColorTxtFieldDropdown();
    category.selectColorFromDropdown();
    category.saveBtn().should('be.visible').click({force:true});
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Category updated successfully")
      .should("be.visible");
    cy.wait(3000);

    //search by name and delete the category
    cy.get('[name="category"][placeholder="No Filter"]').clear().wait(1000).type(categoryName);
    cy.wait(6000);
    category.clickDeleteIcon();
    cy.contains('Confirm').should('be.visible').click({force:true});
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Category deleted successfully")
      .should("be.visible");
    cy.wait(3000);
    
  });

});
