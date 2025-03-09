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

describe("Verify Login Functionality for Reading Physician", () => {
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
    login.getUserId().type(loginData.readPhysicianRole.username);
    login.getPassword().type(loginData.readPhysicianRole.password);
    login.getTermsAndCondition().click({force:true});
    login.getLoginButton().click({force:true});
    cy.wait(2000);

    // Wait for the MFA input to appear
    cy.get('input[id="mfa-code"]', { timeout: 10000 }).scrollIntoView().should("exist");
    cy.wait(2000)

    // Generate and enter the MFA code
    var token = otplib.authenticator.generate(loginData.readPhysicianRole.mfaSecret);
    cy.get("#mfa-code").type(token).wait(2000);
    cy.get('button[class*="MfaCode_btn"]').scrollIntoView().click({force:true});
    cy.get("button").contains("Continue").click({force:true});
    cy.wait(8000);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");

  });

  it("Login with invalid username and valid password", () => {
    login.getUserId().type(loginData.readPhysicianRole.invalidusername, { delay: 0 });
    login.getPassword().type(loginData.readPhysicianRole.password, { delay: 0 });
    login.getTermsAndCondition().click({force:true});
    login.getLoginButton().click({force:true});
    cy.get('[class*="Main_main"]').scrollIntoView().click();
    cy.get(".Toastify__toast-body").scrollTo('top')
      .contains("Incorrect username or password")
      .should("be.visible");
    cy.wait(5000);
    cy.get(".MuiFormHelperText-root").first()
      .should("be.visible",{force:true})
      .and('have.text', "Invalid User Id");
  });

  it("Login with valid username and invalid password", () => {
    login.getUserId().type(loginData.readPhysicianRole.username, { delay: 0 });
    login.getPassword().type(loginData.readPhysicianRole.invalidpassword, { delay: 0 });
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

  it.skip("Verify Forgot Password functionality with wrong OTP", () => {
    cy.get('[href="/auth/forgotpassword"]').click();
    cy.wait(1000);
    cy.createInbox().then((inbox) => {
      inboxId = inbox.id;
      emailAddress = inbox.emailAddress;
      cy.get('input[name="userName"]').should("exist").type(emailAddress);
    });
    cy.get(".ForgotPassword_btn__fHY2l").click({ force: true });
    cy.wait(2000);
    cy.visit('https://mail.google.com/');
    // login.getOtpField().type('786543')
    // login.getNewPassword().type(loginData.newPassword);
    // login.getConfirmNewPassword().type(loginData.newPassword);
    // login.clickSavePasswordBtn();
    // //verify toast message
    // cy.get(".Toastify__toast-body")
    //   .contains('Invalid verification code provided, please try again.')
    //   .should('be.visible')
  });

  it.skip("Verify all the available column filter should work properly (Pin, resize, autosize, reset, set/select, preview, etc)", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.readPhysicianRole.username, loginData.readPhysicianRole.password, loginData.readPhysicianRole.mfaSecret);
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
  });
});
