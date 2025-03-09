/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import AdminPage from "../../../pages/adminPage";

const adminpage = new AdminPage();

let faxNum = faker.string.numeric(10);
let phoneNum = faker.string.numeric(10);
let zipCode = faker.location.zipCode();
let emailAddress = faker.internet.email({ fprovider: "radinhealth.com" });
let clinicName = faker.company.buzzVerb();
let address = faker.location.street();
let state = faker.location.state();
let city = faker.location.city();

describe("Verify functionality under Clinic for Admin Role", () => {
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

  it("verify add clinic, edit clinic and delete clinic functionality", () => {
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
    adminpage.clickOnClinic();
    cy.url().should("include", "https://radindev.net/admin/clinics");
    cy.wait(5000);
    adminpage.addClinicBtn().click({ force: true }).wait(1000);
    adminpage.clinicNameTxtField().type(clinicName);
    const searchClinicName = clinicName;
    cy.log(searchClinicName);
    adminpage.addressTxtField().type(address);
    adminpage.cityTxtField().type(city);
    adminpage.stateTxtField().type(state);
    adminpage.zipCodeTxtField().type(zipCode);
    adminpage.phoneTxtField().type(phoneNum);
    adminpage.faxTxtField().type(faxNum);
    adminpage.emailAddressTxtField().type(emailAddress);
    cy.wait(2000);
    adminpage.saveBtnClick().wait(1000);
    cy.get('[class="Toastify__toast-body"]')
      .contains("Clinic Added")
      .should("be.visible");
    cy.wait(5000);
    adminpage.searchClinicNameByFilter().type(searchClinicName);
    cy.wait(4000);
    //edit clinic
    adminpage.editIconClick();
    adminpage.phoneTxtField().clear().type(faxNum);
    cy.wait(4000);
    adminpage.saveBtnClick().wait(4000);
    //cy.pause();
    //delete clinic
    adminpage.deleteIconClick();
    cy.contains("Confirm").click();
    cy.get('[class="Toastify__toast-body"]')
      .contains("Clinic Deleted")
      .should("be.visible");
  });

  it("verify search filter for the existing Clinic by Clinic name", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
    cy.get(".introjs-skipbutton").click({ force: true });
    cy.url().should("include", "/documentManager");
    adminpage.getLogo().should("be.visible");
    adminpage.clickAdminIcon();
    adminpage.clickOnClinic();
    cy.url().should("include", "https://radindev.net/admin/clinics");
    cy.wait(5000);
    adminpage.addClinicBtn().click({ force: true }).wait(1000);
    adminpage.clinicNameTxtField().type(clinicName);
    const searchClinicName = clinicName;
    cy.log(searchClinicName);
    adminpage.addressTxtField().type(address);
    adminpage.cityTxtField().type(city);
    adminpage.stateTxtField().type(state);
    adminpage.zipCodeTxtField().type(zipCode);
    adminpage.phoneTxtField().type(phoneNum);
    adminpage.faxTxtField().type(faxNum);
    adminpage.emailAddressTxtField().type(emailAddress);
    cy.wait(2000);
    adminpage.saveBtnClick().wait(1000);
    cy.get('[class="Toastify__toast-body"]')
      .contains("Clinic Added")
      .should("be.visible");
    cy.wait(5000);
    adminpage.searchClinicNameByFilter().type(searchClinicName);
    cy.wait(4000);
    //delete clinic
    adminpage.deleteIconClick();
    cy.contains("Confirm").click();
    cy.get('[class="Toastify__toast-body"]')
      .contains("Clinic Deleted")
      .should("be.visible");
  });
});
