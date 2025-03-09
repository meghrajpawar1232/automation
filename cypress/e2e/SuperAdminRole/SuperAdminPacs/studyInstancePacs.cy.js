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

describe("Verify Study Instance PACS functionality for Super Admin Role", () => {
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

  it("Verify Study instance page left drawer functionality", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.loginUser(loginData.superAdminRole.username, loginData.superAdminRole.password, loginData.superAdminRole.mfaSecret);
    cy.get('[class="Toastify__toast-body"]>div')
      .contains("Signed in Successfully")
      .should("be.visible");
     
    cy.wait(3000);

    //navigate to PACS for validation
    pacsPage.clickPacsIcon();
    cy.get('[class*="CustomHeader_header"]>div').contains("PACS").should('be.visible');
    cy.wait(8000);

    //Filter the locked column filter
    cy.get('[aria-label="Open Filter Menu"]>span').eq(18).scrollIntoView().click({force:true});
    cy.get('[ref="eCheckbox"]').contains('(Select All)').click({force:true});
    cy.wait(4000);
    cy.get('[ref="eLabel"]').contains('NO').click({force:true});
    cy.wait(6000);

    //validate study status column filter
    cy.get('[aria-label="Open Filter Menu"]>span').eq(1).click({force:true});
    cy.get('[ref="eCheckbox"]').contains("CANCELLED").click({force:true});
    cy.wait(5000);

    // //validate the orderingphysician filter, if it is not assigned to any study, it will show one popup
    // var orderingPhysicianExist = cy.get('[col-id="orderingPhysicianName"]>div>span').first();
    // if(orderingPhysicianExist.should('be.empty')){
      
    // }

    //capture the value of "href" attribute and saving it in a variable
    cy.get('[col-id="patientsName"]>a').first()
     .should('have.attr', 'href').and('include', 'studyinstances')
     .then((href) => {
        cy.log(href);
       cy.visit(href);
    })

    // //validate the draft popup
    // var draftpopup = cy.get('[class*="editStudy_header"]>div').contains('Draft Found');
    // if(draftpopup.should('exist')){
    //   cy.get('[class*="editStudy_button_save_Modal"]').contains('Yes').click({force:true});
    //   cy.wait(3000);
    // }
    // else{
    //   //validate the right drawer functionality of patient information
    // cy.get('[class*="drawerReport_form__"]').should("be.visible"); //patient information details
    // cy.wait(2000);
    // }
    
    //validate the right drawer functionality of patient information
    cy.get('[class*="drawerReport_form__"]').should("be.visible"); //patient information details
    cy.wait(2000);
  
    //validate priority section
    cy.get('[data-testid="AddIcon"]').first().click({force:true});//click on priority "+" icon
    cy.wait(1000);
    //verify the header and close icon on the popup
    cy.get('[class*="addView_headerTitle"]').contains('Priority').should('be.visible'); 
    cy.get('[data-testid="CloseIcon"]').should('be.visible');
    //click on the textArea
    cy.get('[class*="addView_body"]>div>div>textarea').first().clear().type('Low priority study');
    cy.get('[class*="addView_cancel"]').contains('Cancel').should('be.visible');
    cy.get('[class*="addView_save"]').contains('Save').should('be.visible').click({force:true});
    cy.wait(3000);

    //validate edit and delete functionality of each field
     //edit
     cy.get('[data-testid="ExpandMoreIcon"]').eq(3).click({force:true}).wait(2000); //expand the history icon
     cy.get('[data-testid="BorderColorRoundedIcon"]').first().click({force:true});
     //click on the textArea
     cy.get('[class*="addView_body"]>div>div>textarea').first().type(' edit').wait(1000);
     cy.get('[class*="addView_save"]').contains('Save').should('be.visible').click({force: true});
     cy.wait(4000);

     //Delete
    cy.get('div>div>[data-testid="DeleteRoundedIcon"]').first().click({force: true}).wait(1000);
    cy.get('button').contains('Delete').click({force: true});
    cy.wait(3000);

    //validating history in right drawer
    cy.get('[data-testid="AddIcon"]').eq(2).click({force: true});//click on priority "+" icon
    cy.wait(1000);
    //verify the header and close icon on the popup
    cy.get('[class*="addView_headerTitle"]').contains('History').should('be.visible'); 
    cy.get('[data-testid="CloseIcon"]').should('be.visible');
    //click on the textArea
    cy.get('[class*="addView_body"]>div>div>textarea').first().clear().type('Testing the study');
    cy.get('[class*="addView_cancel"]').contains('Cancel').should('be.visible');
    cy.get('[class*="addView_save"]').contains('Save').should('be.visible').click({force: true});
    cy.wait(3000);

    //validate edit and delete functionality of the field
    //edit
    cy.get('[data-testid="ExpandMoreIcon"]').eq(5).click({force:true}).wait(2000); //expand the history icon
    cy.get('[data-testid="BorderColorRoundedIcon"]').first().click({force: true});
    //click on the textArea
    cy.get('[class*="addView_body"]>div>div>textarea').first().type(' edit').wait(1000);
    cy.get('[class*="addView_save"]').contains('Save').should('be.visible').click({force: true});
    cy.wait(4000);

    //delete 
    cy.get('div>div>[data-testid="DeleteRoundedIcon"]').first().click({force: true}).wait(1000);
    cy.get('button').contains('Delete').click({force: true});
    cy.wait(3000);

     //validating technical notes in right drawer
     cy.get('[data-testid="AddIcon"]').eq(3).click({force: true});//click on priority "+" icon
     cy.wait(1000);
     //verify the header and close icon on the popup
     cy.get('[class*="addView_headerTitle"]').contains('Technical Notes').should('be.visible'); 
     cy.get('[data-testid="CloseIcon"]').should('be.visible');
     //click on the textArea
     cy.get('[class*="addView_body"]>div>div>textarea').first().clear().type('One modality done');
     cy.get('[class*="addView_cancel"]').contains('Cancel').should('be.visible');
     cy.get('[class*="addView_save"]').contains('Save').should('be.visible').click({force: true});
     cy.wait(3000);

     //validate edit and delete functionality of the field
    //edit
    cy.get('[data-testid="ExpandMoreIcon"]').eq(6).click({force:true}).wait(2000); //expand the history icon
    cy.get('[data-testid="BorderColorRoundedIcon"]').first().click({force:true});
    //click on the textArea
    cy.get('[class*="addView_body"]>div>div>textarea').first().type(' edit').wait(1000);
    cy.get('[class*="addView_save"]').contains('Save').should('be.visible').click({force:true});
    cy.wait(4000);

    //delete 
    cy.get('div>div>[data-testid="DeleteRoundedIcon"]').first().click({force:true}).wait(1000);
    cy.get('button').contains('Delete').click({force:true});
    cy.wait(3000);
 
     //validating Medications Used in right drawer
     cy.get('[data-testid="AddIcon"]').eq(4).click({force:true});//click on priority "+" icon
     cy.wait(1000);
     //verify the header and close icon on the popup
     cy.get('[class*="addView_headerTitle"]').contains('Medications Used').should('be.visible'); 
     cy.get('[data-testid="CloseIcon"]').should('be.visible');
     //click on the textArea
     cy.get('[class*="addView_body"]>div>div>textarea').first().clear().type('Given the medicines');
     cy.get('[class*="addView_cancel"]').contains('Cancel').should('be.visible');
     cy.get('[class*="addView_save"]').contains('Save').should('be.visible').click({force:true});
     cy.wait(3000);

     //validate edit and delete functionality of the field
    //edit
    cy.get('[data-testid="ExpandMoreIcon"]').eq(7).click({force:true}).wait(2000); //expand the history icon
    cy.get('[data-testid="BorderColorRoundedIcon"]').first().click({force:true});
    //click on the textArea
    cy.get('[class*="addView_body"]>div>div>textarea').first().type(' edit').wait(1000);
    cy.get('[class*="addView_save"]').contains('Save').should('be.visible').click({force:true});
    cy.wait(4000);

    //delete 
    cy.get('div>div>[data-testid="DeleteRoundedIcon"]').first().click({force:true}).wait(1000);
    cy.get('button').contains('Delete').click({force:true});
    cy.wait(3000);
 
     //validating Vitals in right drawer
     cy.get('[data-testid="AddIcon"]').eq(5).click({force:true});//click on priority "+" icon
     cy.wait(1000);
     //verify the header and close icon on the popup
     cy.get('[class*="addView_headerTitle"]').contains('Vitals').should('be.visible'); 
     cy.get('[data-testid="CloseIcon"]').should('be.visible');
     //click on the textArea
     cy.get('[name="Height"]').type('6');
     cy.get('[name="Weight"]').type('80');
     cy.get('[name="Temperature"]').type('25');
     cy.get('[name="Pulse"]').type('90');
     cy.get('[class*="addView_cancel"]').contains('Cancel').should('be.visible');
     cy.get('[class*="addView_save"]').contains('Save').should('be.visible').click({force:true});
     cy.wait(3000);

     //validate edit and delete functionality of the field
    //edit
    cy.get('[data-testid="ExpandMoreIcon"]').eq(8).click({force:true}).wait(2000); //expand the history icon
    cy.get('[data-testid="BorderColorRoundedIcon"]').first().click({force:true});
    //click on the textArea
    cy.get('[name="Weight"]').clear().type('85').wait(1000);
    cy.get('[class*="addView_save"]').contains('Save').should('be.visible').click({force:true});
    cy.wait(4000);

    //delete 
    cy.get('div>div>[data-testid="DeleteRoundedIcon"]').first().click({force:true}).wait(1000);
    cy.get('button').contains('Delete').click({force:true});
    cy.wait(3000);
 
     //validating Wetread in right drawer
     cy.get('[data-testid="AddIcon"]').eq(6).click({force:true});//click on priority "+" icon
     cy.wait(1000);
     //verify the header and close icon on the popup
     cy.get('[class*="addView_headerTitle"]').contains('Wetread').should('be.visible'); 
     cy.get('[data-testid="CloseIcon"]').should('be.visible');
     //click on the textArea
     cy.get('[class*="addView_body"]>div>div>textarea').first().clear().type('Testing the text area');
     cy.get('[class*="addView_cancel"]').contains('Cancel').should('be.visible');
     cy.get('[class*="addView_save"]').contains('Save').should('be.visible').click({force:true});
     cy.wait(3000);

     //validate edit and delete functionality of the field
    //edit
    cy.get('[data-testid="ExpandMoreIcon"]').eq(9).click({force:true}).wait(2000); //expand the history icon
    cy.get('[data-testid="BorderColorRoundedIcon"]').first().click({force:true});
    //click on the textArea
    cy.get('[class*="addView_body"]>div>div>textarea').first().type(' edit').wait(1000);
    cy.get('[class*="addView_save"]').contains('Save').should('be.visible').click({force:true});
    cy.wait(4000);

    //delete 
    cy.get('div>div>[data-testid="DeleteRoundedIcon"]').first().click({force:true}).wait(1000);
    cy.get('button').contains('Delete').click({force:true});
    cy.wait(3000);

     //validating Addendum in right drawer
     cy.get('[data-testid="AddIcon"]').eq(11).click({force:true});//click on priority "+" icon
     cy.wait(1000);
     //verify the header and close icon on the popup
     cy.get('[class*="addView_headerTitle"]').contains('Addendum Notes').should('be.visible'); 
     cy.get('[data-testid="CloseIcon"]').should('be.visible');
     //click on the textArea
     cy.get('[class*="addView_body"]>div>div>textarea').first().clear().type('Testing the Addendum Notes');
     cy.get('[class*="addView_cancel"]').contains('Cancel').should('be.visible');
     cy.get('[class*="addView_save"]').contains('Save').should('be.visible').click({force:true});
     cy.wait(3000);

     //validate edit and delete functionality of the field
    //edit
    cy.get('[data-testid="ExpandMoreIcon"]').eq(14).click({force:true}).wait(2000); //expand the history icon
    cy.get('[data-testid="BorderColorRoundedIcon"]').first().click({force:true});
    //click on the textArea
    cy.get('[class*="addView_body"]>div>div>textarea').first().type(' edit').wait(1000);
    cy.get('[class*="addView_save"]').contains('Save').should('be.visible').click({force:true});
    cy.wait(4000);

    //delete 
    cy.get('div>div>[data-testid="DeleteRoundedIcon"]').first().click({force:true}).wait(1000);
    cy.get('button').contains('Delete').click({force:true});
    cy.wait(3000);
 
     //validating AI notes in right drawer
     cy.get('[data-testid="AddIcon"]').last().click({force:true});//click on priority "+" icon
     cy.wait(1000);
     //verify the header and close icon on the popup
     cy.get('[class*="addView_headerTitle"]').contains('Ai Notes').should('be.visible'); 
     cy.get('[data-testid="CloseIcon"]').should('be.visible');
     //click on the textArea
     cy.get('[class*="addView_body"]>div>div>textarea').first().clear().type('Testing the AI Notes');
     cy.get('[class*="addView_cancel"]').contains('Cancel').should('be.visible');
     cy.get('[class*="addView_save"]').contains('Save').should('be.visible').click({force:true});
     cy.wait(3000);

     //validate edit and delete functionality of the field
    //edit
    cy.get('[data-testid="ExpandMoreIcon"]').last().click({force:true}).wait(2000); //expand the history icon
    cy.get('[data-testid="BorderColorRoundedIcon"]').first().click({force:true})
    //click on the textArea
    cy.get('[class*="addView_body"]>div>div>textarea').first().type(' edit').wait(1000);
    cy.get('[class*="addView_save"]').contains('Save').should('be.visible').click({force:true});
    cy.wait(4000);

    //delete 
    cy.get('div>div>[data-testid="DeleteRoundedIcon"]').first().click({force:true}).wait(1000);
    cy.get('button').contains('Delete').click({force:true});
    cy.wait(3000);
 
  })
})