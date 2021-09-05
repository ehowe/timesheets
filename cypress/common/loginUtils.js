export const login = (email = 'test@test.com', password = 'asdf') => {
  cy.visit('/users/sign_in')
  cy.get('[name=email]').type(email)
  cy.get('[name=password]').type(password)
  cy.get('button').contains('Login').click()
  cy.get('.alert-success').should('be.visible')
  cy.url().should('eq', Cypress.config().baseUrl + '/timesheets')
}
