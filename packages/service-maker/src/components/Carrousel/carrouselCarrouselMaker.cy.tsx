import React from 'react'
import { CarrouselMaker } from './carrousel'

describe('<CarrouselMaker />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CarrouselMaker />)
  })
})