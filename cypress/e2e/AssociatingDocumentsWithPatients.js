const path = require('path')

import loginPage from '../pages/LoginPage'
import addPatientPage from '../pages/AddPatientPage'
import documentManagerPage from '../pages/DocumentManagerPage'

let fName = 'Harsh' + Date.now()
let lName = 'lName' + Date.now()
let number = Date.now()

let documentName = 'Demo' + Date.now() + '.pdf'

let document = [
    {
        text: 'Upload Demo Doc',
        style: 'header'
    },
    '\n Ending Balance           $1,12,000 \n\n',
    {
        style: 'tableExample',
        table: {
            body: [
                ['Fee', '$212.3'],
            ]
        }
    }
]


describe('', { scrollBehavior: false }, () => {
    beforeEach(() => {
        cy.loginTosepstream('Demo', 'sepstream')

    })

    it('User associates unassigned documents with creates new patients if necessary.', () => {
        cy.customPDF(document, documentName)
        cy.visit('/documentManager')
        cy.wait(5000)
        documentManagerPage.closeWelcomeDocumentManager()
        cy.wait(5000)

        cy.get('#doclistHeader div + svg').click()
        cy.wait(2000)
        cy.get('#demo-simple-select').click()
        cy.get("ul[role='listbox'][aria-labelledby='demo-simple-select-label'] li").contains("Patient ID").click()
        cy.get('input[type=file]', { force: true }).selectFile(`cypress${path.sep}downloads${path.sep}${documentName}`, { force: true })
        cy.wait(5000)
        cy.get('button.MuiButton-contained:contains("Upload")').click()
        cy.wait(8000)

        cy.visit('/documentManager')
        cy.wait(2000)
        documentManagerPage.closeWelcomeDocumentManager()
        cy.wait(4000)
        cy.get('label:contains("Search") + div input').type(documentName)
        cy.wait(4000)
        cy.get(`div[class*='doclist_list'] div[aria-label='${documentName}']`).click()
        cy.get('#addPatientButton').click()
        cy.wait(5000)
        cy.get('input[type=file]', { force: true }).selectFile(`cypress${path.sep}downloads${path.sep}${documentName}`, { force: true })

        addPatientPage.firstName.type(fName)
        addPatientPage.lastName.type(lName)
        addPatientPage.dateOfBirth.eq(0).type('07042022')
        addPatientPage.sex.click()
        cy.contains('Male').click()
        addPatientPage.phoneMobile.scrollIntoView().type(number)
        addPatientPage.dateOfBirth.eq(1).scrollIntoView().type('07042022')
        addPatientPage.saveBtn.click()
        cy.get('div:contains("Patient added successfully")', { timeout: 10000 }).should('be.visible')
        cy.wait(5000)
        cy.get("#demo-simple-select").click()
        // cy.get('div[id="demo-simple-select"]').click()
        cy.get('li:contains("Patient ID")').click()
        cy.wait(5000)
        cy.get('button:contains("Assign")').click()
        cy.wait(5000)
    })

    it('User links the document to the selected patient.', () => {
        cy.once('uncaught:exception', () => false);

        cy.visit('/documentManager')
        cy.wait(5000)
        documentManagerPage.closeWelcomeDocumentManager()
        cy.wait(5000)

        cy.get('label:contains("Search") + div input').type(documentName)
        cy.wait(2000)
        cy.get(`div[class*='doclist_list'] div[aria-label='${documentName}']`).click()
        cy.wait(5000)
        cy.get('input[id="patientSearchInput"]').type(fName + ' ' + lName)
        cy.get("div[class*='docPreview_single_serch_data_']").contains(fName + ' ' + lName).click()

        cy.get('button:contains("Assign")').click()
        cy.get('button:contains("Create Order")').click()
        cy.wait(10000)
        cy.get('#simple-tab-0').click()

        cy.get('label span[class*="MuiTypography-root"]:contains("Cash")').click()
        cy.get('div:has(p:contains("Name")) input[autocomplete="new-password"]').eq(0).click()
        cy.contains("Default Physician").click()

        cy.get('div[id="demo-simple-select"]').eq(0).scrollIntoView().click()
        cy.contains('P5').click()
        cy.wait(2000)
        cy.contains('Procedure Information').scrollIntoView()
        cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)').click()
        cy.contains("70150 - X-RAY FACIAL BONES COMPLETE").click()

        cy.get('div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)').click()
        cy.contains("Dr Murali Physician").click()
        cy.get('button:contains("Save")').click()
        cy.get('div:contains("Appointment Created Successfully")', { timeout: 10000 }).should('be.visible')


    })


})
