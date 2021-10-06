describe("Navigation", () => {

  it("should visit root", () => {
    cy.visit("/");
  });

  it("should visit Tuesday", () => {
    cy.visit("/");
    cy.get("li").contains("Tuesday").click();
  });

  // #f2f2f2

  it("Tuesday should have a css class for selected after it is clicked", () => {
    cy.visit("/");

    cy.contains("li", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });

});