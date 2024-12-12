import 'cypress-web-vitals'

describe('Mens mattelsa page performance', () => {
  it('Capture web vitals metrics', () => {
    cy.vitals({
      url:"https://www.mattelsa.net",
      strict:false,
      onReport({ results, strict, thresholds }) {
        console.log(results,'aaaaaaaaaaa'); // { lcp: ..., fid: ..., }
      },
    })
  })
})