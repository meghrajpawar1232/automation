/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import AdminPage from "../../../pages/adminPage";
import ClinicLocationPage from "../../../pages/clinicLocationPage";

const adminpage = new AdminPage();
const clinicLoc = new ClinicLocationPage();

let zipCode = faker.location.zipCode();
let emailAddress = faker.internet.email({ fprovider: "radinhealth.com" });
let location = faker.company.buzzVerb();
let address = faker.location.street();
let state = faker.location.state();
let city = faker.location.city();

describe("Verify functionality under Clinic Location for Admin Role", () => {
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

  it("verify add clinic location, search filter for the existing Clinic location by Name and edit clinic location functionality", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
    cy.get(".introjs-skipbutton").click({ force: true });
    cy.url().should("include", "/documentManager");
    adminpage.getLogo().should("be.visible");
    adminpage.clickAdminIcon();
    clinicLoc.clickOnClinicLocation();
    cy.url().should("include", "https://radindev.net/admin/clinicLocation");
    cy.wait(5000);
    clinicLoc.addClinicLocationBtn().click({ force: true }).wait(1000);
    clinicLoc.clinicLocationNameTxtField().type(location);
    const searchLocation = location;
    cy.log(searchLocation);
    clinicLoc.addressTxtField().click().type('USA').wait(3000);
    cy.get('[class*="MuiGrid-root MuiGrid-item"]>span[class*="MuiBox-root"]').first().click()
    clinicLoc.cityTxtField().type(city);
    clinicLoc.timezoneField().click().type('USA').wait(2000);
    cy.get('ul>p').first().click();
    cy.wait(2000);
    clinicLoc.saveBtnClick().wait(1000);
    cy.get('[class="Toastify__toast-body"]')
      .contains("Location Added Successfully")
      .should("be.visible");
    clinicLoc.searchLocationNameByFilter().type(searchLocation);
    cy.wait(2000);
    cy.pause();
    //edit clinic
    clinicLoc.editIconClick();
    clinicLoc.zipCodeTxtField().type(zipCode);
    cy.wait(2000);
    clinicLoc.saveBtnClick().wait(1000);
  });

});
