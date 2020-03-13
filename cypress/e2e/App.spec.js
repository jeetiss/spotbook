/// <reference types="cypress" />

describe("App", function() {
  beforeEach(function() {
    cy.resetDatabase();
    cy.fixture("exampleSpot").as("spot");

    cy.visit("/");
  });

  it("can do a full run", function() {
    cy.get(".overlays").click(...this.spot.coords);

    cy.findByText("Create a New Spot").should("be.visible");

    cy.findByLabelText("Name of Spot").type(this.spot.name);
    cy.findByLabelText("Select Difficulty").select(this.spot.difficulty);
    cy.findByLabelText("Select Popularity").select(this.spot.popularity);
    cy.findByLabelText("Select Type of Spot").select(this.spot.type);
    cy.findByLabelText("Description").type(this.spot.description);

    cy.findByText("Submit").click();

    cy.findByText(/New Spot Added/i).should("be.visible");

    cy.getSpotByCoords(...this.spot.coords).click();

    cy.findByText("Previewing a Spot").should("be.visible");

    cy.spotInfoVisible(this.spot);

    cy.clickCloseButton();

    //* Spots Near You

    cy.findByText("Find Spots Near You").click();
    cy.findByText("Spots Near You").should("be.visible");
    cy.findByText(/Geolocation/i).should("be.visible");

    cy.spotInfoVisible(this.spot);

    cy.clickCloseButton();

    cy.mockGeolocation()
      .get(".mapboxgl-ctrl-geolocate")
      .click();

    cy.findByText("Find Spots Near You").click();
    cy.findByText("Spots Near You").should("be.visible");
    cy.findByText(/Geolocation/i).should("not.be.visible");

    cy.spotInfoVisible(this.spot);
  });
});
