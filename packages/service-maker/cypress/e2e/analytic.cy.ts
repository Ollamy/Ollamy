import { AnalyticComponent } from '../../src/components/analytics/analytic';

describe('AnalyticComponent', () => {
  it('renders the AnalyticComponent with correct title', () => {
    cy.mount(<AnalyticComponent />)
    cy.get('h1').contains('Last month data')
  });
});
