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


// describe("Lighthouse Performance Metrics - Desktop and Mobile", () => {
//   it('Should capture lighthouse metrics for the men stores', () => {
//     cy.visit('/');

//     // Ejecutar Lighthouse y capturar métricas
//     cy.lighthouse({
//       // Umbrales o configuraciones de las métricas
//       performance: 10,
//       'first-contentful-paint': 3800,
//       'largest-contentful-paint': 10500,
//       'total-blocking-time': 11500,
//       'cumulative-layout-shift': 0.1,
//       'speed-index': 17400,
//     }, {
//       formFactor: 'desktop',
//       screenEmulation: {
//         mobile: false,
//         disable: true,
//         width: 1280,
//         height: 720,
//         deviceScaleRatio: 1
//       },
//       failOnThresholdError: false,
//     }).then((lighthouseReport) => {
//       console.log(lighthouseReport,'aaaaaaaa')
//       // Extraer las métricas que necesitas
//       const results = {
//         FCP: lighthouseReport['first-contentful-paint'],
//         LCP: lighthouseReport['largest-contentful-paint'],
//         TBT: lighthouseReport['total-blocking-time'],
//         CLS: lighthouseReport['cumulative-layout-shift'],
//         SpeedIndex: lighthouseReport['speed-index'],
//         TTI: lighthouseReport['interactive'], // Time to Interactive
//         TPW: lighthouseReport['total-page-weight'] || 'N/A' // Reemplaza con la métrica real si existe
//       };

//       // Imprimir en consola para verificar
//       cy.log('Lighthouse Metrics:', JSON.stringify(results, null, 2));

//       // Guardar las métricas en un archivo JSON
//       const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Genera una marca de tiempo
//       const fileName = `lighthouse-report-${timestamp}.json`;

//       cy.writeFile(`./reports/${fileName}`, results);
//     });
//   });
// });


// describe("Lighthouse Performance Metrics - Desktop", () => {
//   it('Should capture Lighthouse metrics for the men stores', () => {
//     const metrics = {};

//     // Escuchar los logs y capturar las métricas
//     cy.on('log:added', (log) => {
//       if (log.message.includes('record is')) {
//         const [metric, value] = log.message.match(/(\w[\w-]+).*is\s([\d.]+)/).slice(1, 3);
//         metrics[metric] = parseFloat(value);
//       }
//     });

//     // Ejecutar Lighthouse
//     cy.visit('/');
//     cy.lighthouse({
//       performance: 10,
//       'first-contentful-paint': 3800,
//       'largest-contentful-paint': 10500,
//       'total-blocking-time': 11500,
//       'cumulative-layout-shift': 0.1,
//       'speed-index': 17400,
//     }, {
//       formFactor: 'desktop',
//       screenEmulation: {
//         mobile: false,
//         disable: true,
//         width: 1280,
//         height: 720,
//         deviceScaleRatio: 1
//       },
//       failOnThresholdError: false,
//     }).then(() => {
//       const filePath = './reports/lighthouse-metrics.json';

//       // Agregar timestamp al registro actual
//       const timestamp = new Date().toISOString();
//       const metricsWithTimestamp = { timestamp, ...metrics };

//       // Leer el archivo sin que falle si no existe
//       cy.readFile(filePath, { failOnNonExistence: false }).then((currentData) => {
//         let updatedData = [];

//         if (Array.isArray(currentData)) {
//           updatedData = [...currentData, metricsWithTimestamp];
//         } else {
//           updatedData = [metricsWithTimestamp];
//         }

//         // Escribir los datos actualizados al archivo
//         cy.writeFile(filePath, updatedData);
//         console.log('Lighthouse Metrics añadidas:', metricsWithTimestamp);
//       });
//     });
//   });
// });


describe("Lighthouse Performance Metrics - Desktop and Mobile", () => {
  it('Should capture Lighthouse metrics for the men stores on Desktop', () => {
    // Variables para métricas
    const metrics = {};
    const formFactor = 'desktop'; // Para Desktop

    // Escuchar los logs y capturar las métricas
    cy.on('log:added', (log) => {
      if (log.message.includes('record is')) {
        const [metric, value] = log.message.match(/(\w[\w-]+).*is\s([\d.]+)/).slice(1, 3);
        metrics[metric] = parseFloat(value);
      }
    });

    // Ejecutar Lighthouse para Desktop
    cy.visit('/');
    cy.lighthouse({
      performance: 10,
      'first-contentful-paint': 3800,
      'largest-contentful-paint': 10500,
      'total-blocking-time': 11500,
      'cumulative-layout-shift': 0.1,
      'speed-index': 17400,
    }, {
      formFactor: formFactor,
      screenEmulation: {
        mobile: false,
        disable: true,
        width: 1280,
        height: 720,
        deviceScaleRatio: 1
      },
      failOnThresholdError: false,
    }).then(() => {
      const filePath = './reports/lighthouse-metrics-desktop.json';

      // Agregar timestamp al registro
      const timestamp = new Date().toISOString();
      const metricsWithTimestamp = { timestamp, formFactor, ...metrics };

      // Leer el archivo y manejar el caso de archivo vacío o inexistente
      cy.readFile(filePath, { failOnNonExistence: false }).then((currentData) => {
        let updatedData = [];

        if (Array.isArray(currentData)) {
          updatedData = [...currentData, metricsWithTimestamp];
        } else {
          updatedData = [metricsWithTimestamp];
        }

        // Escribir los datos actualizados al archivo
        cy.writeFile(filePath, updatedData);
        console.log('Lighthouse Metrics añadidas:', metricsWithTimestamp);
      });
    });
  });

  it('Should capture Lighthouse metrics for the men stores on Mobile', () => {
    // Variables para métricas
    const metrics = {};
    const formFactor = 'mobile'; // Para Mobile

    // Escuchar los logs y capturar las métricas
    cy.on('log:added', (log) => {
      if (log.message.includes('record is')) {
        const [metric, value] = log.message.match(/(\w[\w-]+).*is\s([\d.]+)/).slice(1, 3);
        metrics[metric] = parseFloat(value);
      }
    });

    // Ejecutar Lighthouse para Mobile
    cy.visit('/');
    cy.lighthouse({
      performance: 10,
      'first-contentful-paint': 3800,
      'largest-contentful-paint': 10500,
      'total-blocking-time': 11500,
      'cumulative-layout-shift': 0.1,
      'speed-index': 17400,
    }, {
      formFactor: formFactor,
      screenEmulation: {
        mobile: true,
        disable: false,
        width: 375,
        height: 667,
        deviceScaleRatio: 2
      },
      failOnThresholdError: false,
    }).then(() => {
      const filePath = './reports/lighthouse-metrics-mobile.json';

      // Agregar timestamp al registro
      const timestamp = new Date().toISOString();
      const metricsWithTimestamp = { timestamp, formFactor, ...metrics };

      // Leer el archivo y manejar el caso de archivo vacío o inexistente
      cy.readFile(filePath, { failOnNonExistence: false }).then((currentData) => {
        let updatedData = [];

        if (Array.isArray(currentData)) {
          updatedData = [...currentData, metricsWithTimestamp];
        } else {
          updatedData = [metricsWithTimestamp];
        }

        // Escribir los datos actualizados al archivo
        cy.writeFile(filePath, updatedData);
        console.log('Lighthouse Metrics añadidas:', metricsWithTimestamp);
      });
    });
  });
});

