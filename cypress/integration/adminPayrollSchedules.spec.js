import { login } from '../common/loginUtils'

const navigateToTab = () => {
  login('admin@test.com')

  cy.get('.nav-link').contains('Admin').click()
  cy.get('.nav-link').contains('Payroll Schedules').click()
}

describe('AdminPayroll', () => {
  beforeEach(() => {
  })

  describe('Payroll schedules', () => {
    it('shows the empty state', () => {
      cy.server()
      cy.route({
        method: 'GET',
        url: '**/api/admin/payroll_schedules*',
        response: {
          payroll_schedules: []
        }
      })

      navigateToTab()

      cy.get('td').contains('No schedules found').should('be.visible')
    })

    it('contains the default seeded schedules', () => {
      navigateToTab()
      cy.get('tbody').find('tr').should('have.length', 1)
      cy.get('td').contains('Friday').should('be.visible')
      cy.get('td').contains('07:00').should('be.visible')
      cy.get('td').contains('America/Detroit').should('be.visible')
      cy.get('td').contains('01-01-2021').should('be.visible')
      cy.get('td').contains('7 days').should('be.visible')
    })
  })
})
