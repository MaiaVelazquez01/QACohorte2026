describe('Inventario - Sauce Demo', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include','/inventory.html')
    })

    it('Verificar cantidad de productos en inventario', () => {
        cy.get('[data-test="inventory-item-name"]').should('have.length',6)
    })

})