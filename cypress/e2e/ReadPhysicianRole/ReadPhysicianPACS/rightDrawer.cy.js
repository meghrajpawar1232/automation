/// <reference types="cypress">
import { faker } from "@faker-js/faker";
import AdminPage from "../../../pages/adminPage";
import AssignClinicRulePage from "../../../pages/assignClinicRulePage";
import DicomInPage from "../../../pages/dicomInPage";
import OrderingPhysicianPage from "../../../pages/orderingPhysicianPage";
import DicomServerPage from "../../../pages/dicomServerPage";
import PacsPage from "../../../pages/pacsPage";

const OrderingPhysician = new OrderingPhysicianPage();
const adminpage = new AdminPage();
const assignClinicRule = new AssignClinicRulePage();
const dicomInPage = new DicomInPage();
const dicomServerPage = new DicomServerPage();
const pacsPage = new PacsPage();

let num = faker.string.alphanumeric(4);

describe("Verify Right Drawer PACS functionality for Reading Physician Role", () => {
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

  it("Verify the functionality of right drawer of patient information", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.readPhysicianRole.username, loginData.readPhysicianRole.password, loginData.readPhysicianRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
     
    cy.wait(3000);

    //navigate to PACS for validation
    pacsPage.clickPacsIcon();
    cy.get('[class*="CustomHeader_header"]>div')
      .contains("PACS")
      .should("be.visible");
    cy.wait(8000);

    //open the right drawer
    cy.get('[col-id="patientMRN"]>span').first().dblclick();
    cy.get(2000);

    //validate the right drawer functionality of patient information
    cy.get(
      '[class*="MuiAccordionSummary-expandIconWrapper"]>[data-testid="ExpandMoreIcon"]'
    )
      .eq(0)
      .click();
    cy.wait(1000);
    cy.get('[class*="drawerReport_form__"]').should("be.visible"); //patient information details
    cy.wait(2000);
    cy.get(
      '[class*="MuiAccordionSummary-expandIconWrapper"]>[data-testid="ExpandMoreIcon"]'
    )
      .eq(0)
      .click();
    cy.wait(3000);
  });

  it("Verify the functionality of right drawer for Ordering Physician Information", () => {

    // validate Ordering Physician Information in right drawer
    cy.get(
      '[class*="MuiAccordionSummary-expandIconWrapper"]>[data-testid="ExpandMoreIcon"]'
    )
      .eq(1)
      .click();
    cy.wait(1000);
    cy.get(
      '[class*="drawerReport_main"]>[class*="drawerReport_contentBox"]'
    ).should("be.visible");
    cy.get('[class*="drawerReport_contentBox"]>[class*="drawerReport_head"]')
      .eq(0)
      .contains("Name")
      .should("be.visible");
    cy.get('[class*="drawerReport_contentBox"]>[class*="drawerReport_head"]')
      .eq(1)
      .contains("Phone Number")
      .should("be.visible");
    cy.get('[class*="drawerReport_contentBox"]>[class*="drawerReport_head"]')
      .eq(2)
      .contains("Office")
      .should("be.visible");
    cy.get('[class*="drawerReport_contentBox"]>[class*="drawerReport_head"]')
      .eq(3)
      .contains("Office Address")
      .should("be.visible");
    cy.get('[class*="drawerReport_contentBox"]>[class*="drawerReport_head"]')
      .last()
      .contains("Office Phone Number")
      .should("be.visible");
    cy.wait(3000);
    cy.get(
      '[class*="MuiAccordionSummary-expandIconWrapper"]>[data-testid="ExpandMoreIcon"]'
    )
      .eq(1)
      .click();
    cy.wait(3000);
  });

  it("Verify the functionality of creating, editing and deleting of priority in right drawer", () => {

    //validating priority in right drawer
    cy.get('[data-testid="ControlPointRoundedIcon"]').first().click(); //click on priority "+" icon
    cy.wait(1000);
    //verify the header and close icon on the popup
    cy.get('[class*="addView_headerTitle"]')
      .contains("Priority Notes")
      .should("be.visible");
    cy.get('[data-testid="CloseIcon"]').should("be.visible");
    //click on the textArea
    cy.get("div>textarea").first().clear().type("Low priority study");
    cy.get('[class*="addView_cancel"]').contains("Cancel").should("be.visible");
    cy.get('[class*="addView_save"]')
      .contains("Save")
      .should("be.visible")
      .click();
    cy.wait(3000);

    //validate edit and delete functionality of the field
    //edit
    cy.get('[data-testid="BorderColorRoundedIcon"]').first().click();
    //click on the textArea
    cy.get("div>textarea").first().type(" edit").wait(1000);
    cy.get('[class*="addView_save"]')
      .contains("Save")
      .should("be.visible")
      .click();
    cy.wait(4000);

    //delete
    cy.get('div>div>[data-testid="DeleteRoundedIcon"]')
      .first()
      .click({ force: true })
      .wait(1000);
    cy.get("button").contains("Delete").click();
    cy.wait(3000);
  });

  it("Verify the functionality of creating, editing and deleting of history in right drawer", () => {
    //validating history in right drawer
    cy.get('[data-testid="ControlPointRoundedIcon"]').eq(2).click(); //click on priority "+" icon
    cy.wait(1000);
    //verify the header and close icon on the popup
    cy.get('[class*="addView_headerTitle"]')
      .contains("History")
      .should("be.visible");
    cy.get('[data-testid="CloseIcon"]').should("be.visible");
    //click on the textArea
    cy.get("div>textarea").first().clear().type("Testing the study");
    cy.get('[class*="addView_cancel"]').contains("Cancel").should("be.visible");
    cy.get('[class*="addView_save"]')
      .contains("Save")
      .should("be.visible")
      .click();
    cy.wait(3000);

    //validate edit and delete functionality of the field
    //edit
    cy.get('[data-testid="ExpandMoreIcon"]')
      .eq(8)
      .click({ force: true })
      .wait(2000); //expand the history icon
    cy.get('[data-testid="BorderColorRoundedIcon"]')
      .first()
      .click({ force: true });
    //click on the textArea
    cy.get("div>textarea").first().type(" edit").wait(1000);
    cy.get('[class*="addView_save"]')
      .contains("Save")
      .should("be.visible")
      .click();
    cy.wait(4000);

    //delete
    cy.get('[data-testid="ExpandMoreIcon"]')
      .eq(8)
      .click({ force: true })
      .wait(2000); //expand the history icon
    cy.get('div>div>[data-testid="DeleteRoundedIcon"]')
      .first()
      .click({ force: true })
      .wait(1000);
    cy.get("button").contains("Delete").click();
    cy.wait(3000);
  });

  it("Verify the functionality of creating, editing and deleting of technical notes in right drawer", () => {
    //validating technical notes in right drawer
    cy.get('[data-testid="ControlPointRoundedIcon"]').eq(3).click(); //click on priority "+" icon
    cy.wait(1000);
    //verify the header and close icon on the popup
    cy.get('[class*="addView_headerTitle"]')
      .contains("Technical Notes")
      .should("be.visible");
    cy.get('[data-testid="CloseIcon"]').should("be.visible");
    //click on the textArea
    cy.get("div>textarea").first().clear().type("One modality done");
    cy.get('[class*="addView_cancel"]').contains("Cancel").should("be.visible");
    cy.get('[class*="addView_save"]')
      .contains("Save")
      .should("be.visible")
      .click();
    cy.wait(3000);

    //validate edit and delete functionality of the field
    //edit
    cy.get('[data-testid="ExpandMoreIcon"]')
      .eq(9)
      .click({ force: true })
      .wait(2000); //expand the history icon
    cy.get('[data-testid="BorderColorRoundedIcon"]')
      .first()
      .click({ force: true });
    //click on the textArea
    cy.get("div>textarea").first().type(" edit").wait(1000);
    cy.get('[class*="addView_save"]')
      .contains("Save")
      .should("be.visible")
      .click({ force: true });
    cy.wait(4000);

    //delete
    cy.get('[data-testid="ExpandMoreIcon"]')
      .eq(9)
      .click({ force: true })
      .wait(2000); //expand the history icon
    cy.get('div>div>[data-testid="DeleteRoundedIcon"]')
      .first()
      .click({ force: true })
      .wait(1000);
    cy.get("button").contains("Delete").click({ force: true });
    cy.wait(3000);
  });

  it("Verify the functionality of creating, editing and deleting of Medications Used in right drawer", () => {
    //validating Medications Used in right drawer
    cy.get('[data-testid="ControlPointRoundedIcon"]')
      .eq(4)
      .click({ force: true }); //click on priority "+" icon
    cy.wait(1000);
    //verify the header and close icon on the popup
    cy.get('[class*="addView_headerTitle"]')
      .contains("Medications Used")
      .should("be.visible");
    cy.get('[data-testid="CloseIcon"]').should("be.visible");
    //click on the textArea
    cy.get("div>textarea").first().clear().type("Given the medicines");
    cy.get('[class*="addView_cancel"]').contains("Cancel").should("be.visible");
    cy.get('[class*="addView_save"]')
      .contains("Save")
      .should("be.visible")
      .click({ force: true });
    cy.wait(3000);

    //validate edit and delete functionality of the field
    //edit
    cy.get('[data-testid="ExpandMoreIcon"]')
      .eq(10)
      .click({ force: true })
      .wait(2000); //expand the history icon
    cy.get('[data-testid="BorderColorRoundedIcon"]')
      .first()
      .click({ force: true });
    //click on the textArea
    cy.get("div>textarea").first().type(" edit").wait(1000);
    cy.get('[class*="addView_save"]')
      .contains("Save")
      .should("be.visible")
      .click({ force: true });
    cy.wait(4000);

    //delete
    cy.get('[data-testid="ExpandMoreIcon"]')
      .eq(10)
      .click({ force: true })
      .wait(2000); //expand the history icon
    cy.get('div>div>[data-testid="DeleteRoundedIcon"]')
      .first()
      .click({ force: true })
      .wait(1000);
    cy.get("button").contains("Delete").click({ force: true });
    cy.wait(3000);
  });

  it("Verify the functionality of creating, editing and deleting of Vitals in right drawer", () => {
    //validating Vitals in right drawer
    cy.get('[data-testid="ControlPointRoundedIcon"]')
      .eq(5)
      .click({ force: true }); //click on priority "+" icon
    cy.wait(1000);
    //verify the header and close icon on the popup
    cy.get('[class*="addView_headerTitle"]')
      .contains("Vitals")
      .should("be.visible");
    cy.get('[data-testid="CloseIcon"]').should("be.visible");
    //click on the textArea
    cy.get('[name="Height"]').type("6");
    cy.get('[name="Weight"]').type("80");
    cy.get('[name="Temperature"]').type("25");
    cy.get('[name="Pulse"]').type("90");
    cy.get('[class*="addView_cancel"]').contains("Cancel").should("be.visible");
    cy.get('[class*="addView_save"]')
      .contains("Save")
      .should("be.visible")
      .click({ force: true });
    cy.wait(3000);

    //validate edit and delete functionality of the field
    //edit
    cy.get('[data-testid="ExpandMoreIcon"]')
      .eq(11)
      .click({ force: true })
      .wait(2000); //expand the history icon
    cy.get('[data-testid="BorderColorRoundedIcon"]')
      .first()
      .click({ force: true });
    //click on the textArea
    cy.get('[name="Temperature"]').clear().type("27").wait(1000);
    cy.get('[class*="addView_save"]')
      .contains("Save")
      .should("be.visible")
      .click({ force: true });
    cy.wait(4000);

    //delete
    cy.get('[data-testid="ExpandMoreIcon"]')
      .eq(11)
      .click({ force: true })
      .wait(2000); //expand the history icon
    cy.get('div>div>[data-testid="DeleteRoundedIcon"]')
      .first()
      .click({ force: true })
      .wait(1000);
    cy.get("button").contains("Delete").click({ force: true });
    cy.wait(3000);
  });

  it("Verify the functionality of creating, editing and deleting of Wetread in right drawer", () => {
    //validating Wetread in right drawer
    cy.get('[data-testid="ControlPointRoundedIcon"]')
      .eq(6)
      .click({ force: true }); //click on priority "+" icon
    cy.wait(1000);
    //verify the header and close icon on the popup
    cy.get('[class*="addView_headerTitle"]')
      .contains("Wetread")
      .should("be.visible");
    cy.get('[data-testid="CloseIcon"]').should("be.visible");
    //click on the textArea
    cy.get("div>textarea").first().clear().type("Testing the text area");
    cy.get('[class*="addView_cancel"]').contains("Cancel").should("be.visible");
    cy.get('[class*="addView_save"]')
      .contains("Save")
      .should("be.visible")
      .click({ force: true });
    cy.wait(3000);

    //validate edit and delete functionality of the field
    //edit
    cy.get('[data-testid="ExpandMoreIcon"]')
      .eq(12)
      .click({ force: true })
      .wait(2000); //expand the history icon
    cy.get('[data-testid="BorderColorRoundedIcon"]')
      .first()
      .click({ force: true });
    //click on the textArea
    cy.get("div>textarea").first().type(" edit").wait(1000);
    cy.get('[class*="addView_save"]')
      .contains("Save")
      .should("be.visible")
      .click({ force: true });
    cy.wait(4000);

    //delete
    cy.get('[data-testid="ExpandMoreIcon"]')
      .eq(12)
      .click({ force: true })
      .wait(2000); //expand the history icon
    cy.get('div>div>[data-testid="DeleteRoundedIcon"]')
      .first()
      .click({ force: true })
      .wait(1000);
    cy.get("button").contains("Delete").click({ force: true });
    cy.wait(3000);
  });

  it("Verify the functionality of creating, editing and deleting of Addendum in right drawer", () => {
    //validating Addendum in right drawer
    cy.get('[data-testid="ControlPointRoundedIcon"]')
      .last()
      .click({ force: true }); //click on priority "+" icon
    cy.wait(1000);
    //verify the header and close icon on the popup
    cy.get('[class*="addView_headerTitle"]')
      .contains("Addendum Notes")
      .should("be.visible");
    cy.get('[data-testid="CloseIcon"]').should("be.visible");
    //click on the textArea
    cy.get("div>textarea").first().clear().type("Testing the Addendum Notes");
    cy.get('[class*="addView_cancel"]').contains("Cancel").should("be.visible");
    cy.get('[class*="addView_save"]')
      .contains("Save")
      .should("be.visible")
      .click({ force: true });
    cy.wait(3000);

    //validate edit and delete functionality of the field
    //edit
    cy.get('[data-testid="ExpandMoreIcon"]')
      .last()
      .click({ force: true })
      .wait(2000); //expand the history icon
    cy.get('[data-testid="BorderColorRoundedIcon"]')
      .first()
      .click({ force: true });
    //click on the textArea
    cy.get("div>textarea").first().type(" edit").wait(1000);
    cy.get('[class*="addView_save"]')
      .contains("Save")
      .should("be.visible")
      .click({ force: true });
    cy.wait(4000);

    //delete
    cy.get('[data-testid="ExpandMoreIcon"]')
      .eq(17)
      .click({ force: true })
      .wait(2000); //expand the history icon
    cy.get('div>div>[data-testid="DeleteRoundedIcon"]')
      .first()
      .click({ force: true })
      .wait(1000);
    cy.get("button").contains("Delete").click({ force: true });
    cy.wait(3000);
  });
  
})