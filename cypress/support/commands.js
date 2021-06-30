// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const fs = require('fs')
const locater = require('../locater/ajio.json')

const name = []
const discountPrice = []
const originalPrice = []

Cypress.Commands.add('itemsList', (parent,element) => { 

    const data = []
    cy.get(parent).within(() => { 
        for(let i = 0; i < element; i++){
            const item = {}
            cy.get(`:nth-child(${i+1})`).within(() => {
                cy.get(locater.name).should(($div) => { 
                    name.push($div.text())
                    item.name = $div.text()
                })
                cy.get(`${locater.originalPrice}`).should(($div) => { 
                    const cost = (($div.text()).replace('Rs.','')).replace(',','')
                    originalPrice.push(cost.trim())
                    item.original_Price = $div.text()
                })
                cy.get(`${locater.discountPrice}`).should(($div) => { 
                    discountPrice.push($div.text())
                    item.discount_Price = $div.text()
                })
                data.push(item)
            })
        }
    }).then(() => {
        console.log("Items List", data)
        const maxPrice = Math.max.apply(Math, originalPrice)
        for (let i = 0; i < originalPrice.length; i++) {
            if (maxPrice == originalPrice[i]) {
                console.log("Highest Price is ", maxPrice)
                console.log("Highest Price Item is ",name[i])
            }
        }
    })
    
})