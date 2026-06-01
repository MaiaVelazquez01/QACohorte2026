describe('Carrito - Sauce Demo', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include','/inventory.html')
        cy.get('.app_logo').should('have.text','Swag Labs')
    })

    it('Agregar un producto al carrito', () => {
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('not.exist')
        cy.get('.inventory_item_name').first().should('have.text','Sauce Labs Backpack')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible')
        cy.get('[data-test="shopping-cart-badge"]').should('be.visible')
        cy.get('[data-test="shopping-cart-badge"]').should('have.text','1')
    })

    it('Agregar múltiples productos y verificar contador', () => {
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('not.exist')
        cy.get('[data-test="remove-sauce-labs-bike-light"]').should('not.exist')
        cy.get('[data-test="remove-sauce-labs-onesie"]').should('not.exist')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
        cy.get('[data-test="shopping-cart-badge"]').should('be.visible')
        cy.get('[data-test="shopping-cart-badge"]').should('have.text','3')
    })

})