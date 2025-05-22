describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');
    cy.get('.status').should('contain', 'Kitas žaidėjas')
  })
})