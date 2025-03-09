/// <reference types="cypress">

import LoginPage from "../../pages/loginPage";
const otplib = require("otplib");

const login = new LoginPage();
// const serverId = "ijutdysz";
// const serverDomain = "death-danger@ijutdysz.mailosaur.net";
// const emailAddress = 'password-reset@' + serverDomain;
let loginData;
let inboxId;
let emailAddress;

describe("Verify Login Functionality for SuperAdmin Role", () => {
  beforeEach(() => {
    cy.clearAllSessionStorage(); // Clear all sessions storage
    cy.clearAllCookies();
    cy.visit(Cypress.config("baseUrl"));
    cy.wait(3000);
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.fixture("login.json").then((Jsondata) => {
      loginData = Jsondata;
      return loginData;
    });
  });

  afterEach(()=>{
    cy.wait(3000);
  })

  it("Login with valid username and password", () => {
    login.getUserId().type(loginData.superAdminRole.username);
    login.getPassword().type(loginData.superAdminRole.password);
    login.getTermsAndCondition().click({force:true});
    login.getLoginButton().click({force:true});
    cy.wait(2000);

    // Wait for the MFA input to appear
    cy.get('input[id="mfa-code"]', { timeout: 10000 }).scrollIntoView().should("exist");
    cy.wait(2000)

    // Generate and enter the MFA code
    var token = otplib.authenticator.generate(loginData.superAdminRole.mfaSecret);
    cy.get("#mfa-code").type(token).wait(2000);
    cy.get('button[class*="MfaCode_btn"]').scrollIntoView().click({force:true});
    cy.get("button").contains("Continue").click({force:true});
    cy.wait(8000);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");

  });

  it("Login with invalid username and valid password", () => {
    login.getUserId().type(loginData.superAdminRole.invalidusername, { delay: 0 });
    login.getPassword().type(loginData.superAdminRole.password, { delay: 0 });
    login.getTermsAndCondition().click({force:true});
    login.getLoginButton().click({force:true});
    cy.get('[class*="Main_main"]').scrollIntoView().click();
    cy.get(".Toastify__toast-body")
      .contains("Incorrect username or password")
      .should("be.visible");
    cy.wait(5000);
    cy.get(".MuiFormHelperText-root").first()
      .should("be.visible",{force:true})
      .and('have.text', "Invalid User Id");
  });

  it("Login with valid username and invalid password", () => {
    login.getUserId().type(loginData.superAdminRole.username, { delay: 0 });
    login.getPassword().type(loginData.superAdminRole.invalidpassword, { delay: 0 });
    login.getTermsAndCondition().check();
    login.getLoginButton().click();
    cy.get('[class*="Main_main"]').scrollIntoView().click();
    cy.get(".Toastify__toast-body")
      .contains("Incorrect username or password")
      .should("be.visible");
    cy.wait(5000);
    cy.get(".MuiFormHelperText-root")
      .eq(1)
      .scrollIntoView()
      .contains("Invalid Password")
      .should("be.visible");
  });

 

  
});
