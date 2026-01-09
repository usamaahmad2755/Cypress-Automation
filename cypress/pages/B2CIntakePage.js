const { BasePage } = require('./BasePage');

/**
 * B2C Intake Page Object - Cypress Style
 * This page object handles interactions with the B2C Intake Form
 */
const B2CIntakePage = {
  
  get nameField() {
    return 'input[name="name"]';
  },

  get cityProvinceField() {
    return 'input[name="random-name-field"]';
  },

  get emailField() {
    return 'input[name="email"]';
  },

  get confirmEmailField() {
    return 'input[name="confirmEmail"]';
  },

  get nextButton() {
    return 'button:contains("Next")';
  },

  getNameField() {
    return cy.get(this.nameField);
  },

  getCityProvinceField() {
    return cy.get(this.cityProvinceField);
  },

  getEmailField() {
    return cy.get(this.emailField);
  },

  getConfirmEmailField() {
    return cy.get(this.confirmEmailField);
  },

  getNextButton() {
    return cy.get(this.nextButton);
  },

  visit() {
    return BasePage.visit(this.url);
  },

  verify() {
    return cy.get('.logo img[src="/images/notaryPro-logo.svg"]').should('be.visible');
  },

  fillName(name) {
    return cy.get(this.nameField).clear().type(name);
  },

  fillCityProvince(cityProvince) {
    return cy.get(this.cityProvinceField).clear().type(cityProvince);
  },

  fillEmail(email) {
    return cy.get(this.emailField).clear().type(email);
  },

  fillConfirmEmail(email) {
    return cy.get(this.confirmEmailField).clear().type(email);
  },

  clickNext() {
    return cy.get(this.nextButton).click();
  },

  fillForm(formData) {
    const { name, cityProvince, email, confirmEmail } = formData;
    
    this.fillName(name);
    this.fillCityProvince(cityProvince);
    this.fillEmail(email);
    this.fillConfirmEmail(confirmEmail);
    
    return cy;
  },

  submitForm(formData) {
    this.fillForm(formData);
    return this.clickNext();
  },

  verifyNameFieldVisible() {
    return cy.get(this.nameField).should('be.visible');
  },

  verifyCityProvinceFieldVisible() {
    return cy.get(this.cityProvinceField).should('be.visible');
  },

  verifyEmailFieldVisible() {
    return cy.get(this.emailField).should('be.visible');
  },

  verifyConfirmEmailFieldVisible() {
    return cy.get(this.confirmEmailField).should('be.visible');
  },

  verifyNextButtonEnabled() {
    return cy.get(this.nextButton).should('be.enabled');
  }
};

module.exports = { B2CIntakePage };
