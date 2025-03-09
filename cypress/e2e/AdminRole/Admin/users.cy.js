/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import AdminPage from "../../../pages/adminPage";
import UsersPage from "../../../pages/usersPage";

const adminpage = new AdminPage();
const userspage = new UsersPage();

let fName = faker.person.firstName();
let lName = faker.person.lastName();
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

  it("verify add users, edit users and delete users functionality", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.adminRole.username, loginData.adminRole.password, loginData.adminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
    cy.get(".introjs-skipbutton").click({ force: true });
    cy.url().should("include", "/documentManager");
    adminpage.getLogo().should("be.visible");
    adminpage.clickAdminIcon();
    userspage.clickOnUsers();
    cy.url().should("include", "https://radindev.net/admin/users");
    cy.wait(2000);
    userspage.addUsersBtn().click({ force: true }).wait(1000);
    userspage.titleFieldDropdown().click();
    cy.get('p[id="combo-box-demo-option-0"]').click({force:true});
    cy.wait(2000)
    userspage.firstNameTextField().type(fName);
    const firstName = fName;
    userspage.lastNameTextField().type(lName);
    const lastName = lName;
    const userName = firstName+ "_" + lastName;
    userspage.userNameTextField().type(userName);
    userspage.emailAddressTextField().type(emailAddress);
    userspage.roleFieldDropdown().click();
    cy.get('[id="combo-box-demo-listbox"]>p').contains('Admin').should('be.visible').click();
    cy.get('input[name="IsRadAssistant"]').click();
    cy.wait(2000);
    cy.get('[data-testid="ArrowDropDownIcon"]').last().click().wait(2000);
    cy.get('[id="combo-box-demo-option-1"]>div>span>input').click({force:true});
    cy.wait(2000);
    cy.get('[name="suffix"]').click();
    userspage.saveBtn().click({force:true}).wait(1000);
    cy.get('[class="Toastify__toast-body"]')
      .contains("User created successfully")
      .should("be.visible");
    cy.wait(3000);

    //edit users
    userspage.searchUsersByUserName().type(userName);
    cy.wait(5000);
    userspage.clickEditIcon();
    cy.wait(2000)
    userspage.roleFieldDropdown().click();
    cy.get('[id="combo-box-demo-listbox"]>p').contains('Reading Physician').should('be.visible').click();
    cy.wait(2000);
    userspage.saveBtn().click({force:true}).wait(1000);
    cy.get('[class="Toastify__toast-body"]')
      .contains("User updated successfully")
      .should("be.visible");
    cy.wait(3000);

    //delete clinic
    userspage.searchUsersByUserName().clear().wait(2000).type(userName);
    cy.wait(5000);
    userspage.clickDeleteIcon();
    cy.contains('Confirm').should('be.visible').click({force:true});
    cy.get('[class="Toastify__toast-body"]')
      .contains("User deleted successfully")
      .should("be.visible");
    cy.wait(2000);

  });

});
