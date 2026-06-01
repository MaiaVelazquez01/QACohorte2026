describe('Login Sauce Demo', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

    it('Login exitoso con usuario estándar', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include','/inventory.html')
        cy.get('.app_logo').should('have.text','Swag Labs')
    })

    it('Login con contraseña incorrecta', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('wrong_pass')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain','Epic sadface: Username and password do not match any user in this service')
    })

    it('Login con campos vacíos', () => {
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain','Epic sadface: Username is required')
    })

    it('Login con usuario bloqueado (locked_out_user)', () => {
        cy.get('[data-test="username"]').type('locked_out_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain','Epic sadface: Sorry, this user has been locked out.')
    })

    it('Logout desde el menú hamburguesa', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('.bm-menu').should('be.hidden')
        cy.get('#react-burger-menu-btn').click()
        cy.get('.bm-item.menu-item').should('have.length',4)
        cy.get('.bm-item.menu-item').eq(2).should('have.text','Logout')
        cy.get('[data-test="logout-sidebar-link"]').click()
        cy.url().should('equal',"https://www.saucedemo.com/")
        cy.get('[data-test="username"]').should('contain','')
        cy.get('[data-test="password"]').should('contain','')
    })

})