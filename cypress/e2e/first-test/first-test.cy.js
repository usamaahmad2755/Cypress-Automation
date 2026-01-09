describe('URL Visit Test', () => {

  it('should successfully open the application URL', () => {
    cy.visit('/');
     cy.url().should('eq', Cypress.config('baseUrl') + '/');
  });

});
