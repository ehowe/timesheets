import { login } from '../common/loginUtils'

const navigateToTab = () => {
  login('admin@test.com')

  cy.get('.nav-link').contains('Admin').click()
  cy.get('.nav-link').contains('Payroll Categories').click()
}

describe('AdminPayroll', () => {
  describe('Empty state', () => {
    it('has the empty state', () => {
      cy.server()
      cy.route({
        method: 'GET',
        url: '**/api/admin/payroll_categories*',
        response: {
          payroll_categories: []
        }
      })

      navigateToTab()

      cy.get('td').contains('No categories found').should('be.visible')
    })
  })

  describe('Payroll categories', () => {
    it('contains the default seeded category', () => {
      navigateToTab()
      cy.get('td').contains('Test category').should('be.visible')
    })
  })
})
