import 'cypress-web-vitals'

// describe('Mens mattelsa page performance', () => {
//   it('Capture web vitals metrics', () => {
//     cy.vitals({
//       url:"https://www.mattelsa.net/hombre",
//       strict:false,
//       onReport({ results, strict, thresholds }) {
//         console.log(results,'aaaaaaaaaaa'); // { lcp: ..., fid: ..., }
//       },
//     })
//   })
// })

describe("Lighthouse Performance Metrics - Desktop and Mobile", () => {
  it('Should capture lighthouse metrics for the men stores', () => {
    cy.visit('/')

    cy.lighthouse({
      // Adjust thresholds as needed
      performance: 10, // Example: Set a more lenient threshold
      'first-contentful-paint': 3800,
      'largest-contentful-paint': 10500,
      'total-blocking-time': 11500,
      'cumulative-layout-shift': 0.1,
      'speed-index': 17400,
    }, {
      formFactor: 'desktop',
      screenEmulation: {
        mobile: false,
        disable: true,
        width: 1280,
        height: 720,
        deviceScaleRatio: 1
      },
      failOnThresholdError:false,
    })
  });
});