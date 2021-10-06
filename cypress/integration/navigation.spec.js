describe("Navigation", () => {

  it("should visit root", () => {
    cy.visit("/");
  });

  it("should visit Tuesday", () => {
    cy.visit("/");
    cy.get("li").contains("Tuesday").click();
  });

  // #f2f2f2

  it("bakground color of Tuesday should be offwhite", () => {
    cy.visit("/");
    cy.get("li").contains("Tuesday").click();

    cy.contains("li", "Tuesday")
      .should("have.css", "background-color", "rgb(242, 242, 242)");
  });

});