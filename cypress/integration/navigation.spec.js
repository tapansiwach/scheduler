describe("Navigation", () => {

  it("should visit root", () => {
    cy.visit("/");
  });

  it("should visit Tuesday", () => {
    cy.visit("/");
    cy.get("li").contains("Tuesday").click();
  });

});