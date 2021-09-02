import { login } from '../common/loginUtils'

describe('AdminPayroll', () => {
  beforeEach(() => {
    login('admin@test.com')

    cy.get('.nav-link').contains('Admin').click()
    cy.get('.nav-link').contains('Payroll').click()
  })

  describe('Payroll schedules', () => {
    it('shows the empty state', () => {
      cy.get('td').contains('No schedules found').should('be.visible')
    })
  })

  describe('Payroll categories', () => {
  })
})
