import {
  login,
} from '../common/loginUtils'

describe('Before login', () => {
  it('defaults to the login page', () => {
    cy.visit('/')
    cy.get('[name=email]').should('exist')
    cy.get('[name=password]').should('exist')
  })
})

describe('Login', () => {
  it('logs in', () => {
    login('test@test.com', 'asdf')
    cy.url().should('eq', Cypress.config().baseUrl + '/timesheets')
    cy.get('a').contains('Admin').should('not.exist')
  })

  it('fails to login with an incorrect password', () => {
    cy.visit('/users/sign_in')
    cy.get('[name=email]').type('test@test.com')
    cy.get('[name=password]').type('bad')
    cy.get('button').contains('Login').click()
    cy.get('.alert-danger').should('be.visible')
  })

  it('logs in an admin', () => {
    login('admin@test.com', 'asdf')
    cy.url().should('eq', Cypress.config().baseUrl + '/timesheets')
    cy.get('a').contains('Admin').should('be.visible')
  })
})
