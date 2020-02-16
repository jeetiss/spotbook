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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import "@testing-library/cypress/add-commands";

Cypress.Commands.add(
  "mockGeolocation",
  (latitude = 34.048698, longitude = -118.418114) => {
    cy.window().then($window => {
      cy.stub($window.navigator.geolocation, "getCurrentPosition", callback => {
        return callback({ coords: { latitude, longitude } });
      });
    });
  }
);

Cypress.Commands.add("resetDatabase", () =>
  cy.request("DELETE", Cypress.env("TESTS_FIREBASE_DATABASE"))
);

Cypress.Commands.add("clickCloseButton", () =>
  cy.findByRole("close-button").click()
);

Cypress.Commands.add("getSpotByCoords", (x, y) =>
  cy.get(
    `[style="position: absolute; left: 0px; top: 0px; transform: translate(${x}px, ${y}px); cursor: auto;"] > svg`
  )
);

Cypress.Commands.add("spotInfoVisible", spot => {
  cy.findByText(spot.name).should("be.visible");
  cy.findByText(spot.difficulty).should("be.visible");
  cy.findByText(spot.popularity + " popularity").should("be.visible");
  cy.findByText(spot.type).should("be.visible");
  cy.findByText(spot.description).should("be.visible");
});
