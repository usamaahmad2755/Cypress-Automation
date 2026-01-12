// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Import page objects for use in custom commands
// Using require for CommonJS compatibility (package.json has "type": "commonjs")
const { B2CIntakePage } = require('../pages');

// Cypress.Commands.add('login', (email, password) => {
//   // If email/password provided, use them; otherwise use env vars
//   if (email && password) {
//     LoginPage.visit();
//     LoginPage.login(email, password);
//   } else {
//     LoginPage.visit();
//     LoginPage.loginWithEnv();
//   }
// });

Cypress.Commands.add('fillB2CIntakeForm', (formData) => {
  const { name, cityProvince, email, confirmEmail } = formData;
  
  B2CIntakePage.fillName(name);
  B2CIntakePage.fillCityProvince(cityProvince);
  B2CIntakePage.fillEmail(email);
  B2CIntakePage.fillConfirmEmail(confirmEmail);
});

Cypress.Commands.add('submitB2CIntakeForm', (formData) => {
  cy.fillB2CIntakeForm(formData);
  B2CIntakePage.clickNext();
});

// Upload supporting document(s) in B2C Intake using the file input (#fileInput)
// `filePath` should usually be a fixture path like 'cypress/fixtures/example.pdf'
// or just 'example.pdf' if you pass { fromFixture: true } and handle it yourself.
Cypress.Commands.add('uploadB2CFile', (filePath, options = {}) => {
  // Delegate to the page object so selector logic stays in one place
  B2CIntakePage.uploadFile(filePath, options);
});
