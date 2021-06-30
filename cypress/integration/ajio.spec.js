const locater = require('../locater/ajio.json')

describe('Ajio', () => {
    it('Verify the Url', () => {
        cy.visit('/')
        cy.get(`${locater.search}`).click({force: true}) 
            .type('jeans')
        cy.get(`${locater.searchImg}`).click({force: true})
        cy.itemsList(locater.items,6)
    })
})