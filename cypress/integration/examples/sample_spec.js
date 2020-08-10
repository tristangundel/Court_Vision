const { iteratee } = require("lodash");

//This is the begining of testing with cypress

describe("My First Test", function () {
  it("Visit James Harden", function () {
    cy.visit("http://localhost:3000/player/James%20Harden");
  });
});

// need to make the above work with our website to test
