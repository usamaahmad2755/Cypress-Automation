
const BasePage = {
  /**
   * Visit a URL
   * @param {string} path
   * @returns {Cypress.Chainable}
   */
  visit(path = '') {
    return cy.visit(path);
  },

  /**
   * Get element by selector
   * @param {string} selector
   * @returns {Cypress.Chainable}
   */
  getElement(selector) {
    return cy.get(selector);
  },

  /**
   * Get element by text content
   * @param {string} text
   * @returns {Cypress.Chainable}
   */
  getByText(text) {
    return cy.contains(text);
  },

  /**
   * Get element by data-testid attribute (recommended for testing)
   * @param {string} testId
   * @returns {Cypress.Chainable}
   */
  getByTestId(testId) {
    return cy.get(`[data-testid="${testId}"]`);
  },

  /**
   * Type into an element
   * @param {string} selector
   * @param {string} text
   * @returns {Cypress.Chainable}
   */
  type(selector, text) {
    return cy.get(selector).type(text);
  },

  /**
   * Click an element
   * @param {string} selector
   * @returns {Cypress.Chainable}
   */
  click(selector) {
    return cy.get(selector).click();
  },

  /**
   * Check if URL matches expected
   * @param {string} expectedUrl
   * @returns {Cypress.Chainable}
   */

  /**
   * Wait for element to be visible
   * @param {string} selector
   * @returns {Cypress.Chainable}
   */
  waitForElement(selector) {
    return cy.get(selector).should('be.visible');
  },

  /**
   * Check if element is visible
   * @param {string} selector
   * @returns {Cypress.Chainable}
   */
  shouldBeVisible(selector) {
    return cy.get(selector).should('be.visible');
  },

  /**
   * Check if element contains text
   * @param {string} selector
   * @param {string} text
   * @returns {Cypress.Chainable}
   */
  shouldContainText(selector, text) {
    return cy.get(selector).should('contain', text);
  }
};

module.exports = { BasePage };
