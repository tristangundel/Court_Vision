const { iteratee } = require("lodash");

//This is the begining of testing with cypress

describe("My First Test", function () {
  it("Visit James Harden", function () {
    cy.visit("http://localhost:3000/player/James%20Harden");
  });
});

describe("My Second Test", function () {
  it("Go to Login from homepage", function () {
    cy.visit("http://localhost:3000");

    cy.contains("Login").click();

    cy.url().should("include", "/login");

    // cy.get(".email")
    //   .type("fakeemail@email.com")
    //   .should("have.value", "fakeemail@email.com");
  });
});

// need to make the above work with our website to test
