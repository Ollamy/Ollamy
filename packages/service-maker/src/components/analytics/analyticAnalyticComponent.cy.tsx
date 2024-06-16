import React from 'react'
import { AnalyticComponent } from './analytic'

describe('<AnalyticComponent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AnalyticComponent />)
  })
})