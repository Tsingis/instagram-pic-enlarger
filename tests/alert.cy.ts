/// <reference types="cypress" />

describe("Test alert", () => {
  it("passes", () => {
    cy.visit("");

    cy.window().trigger('keydown', {
        key: "x", // "X" key code
        keyCode: 88,
        ctrlKey: true,
        shiftKey: true,
      });

    cy.get("#enlarger-alert-box").should("exist");
  })
});