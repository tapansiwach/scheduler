describe("Interview Appintment", () => {

  it("should book an interview", () => {

    // Visits the root of web server
    cy.visit("/")
    // Clicks on the "Add" button in the second appointment
    cy.get(":nth-child(2) > .appointment__add > .appointment__add-button")
      .click()
    // Enters their name
    cy.get("[data-testid=student-name-input]")
      .type("Archie Cohen")
    // Chooses an interviewer
    cy.get(".interviewers__item-image").first()
      .click()
    // Clicks the save button
    cy.get(".button--confirm")
      .click()
    // Sees the booked appointment
    cy.get(".appointment__card-left > h2.text--regular")
      .contains("Archie Cohen")

  });

  it("should edit an interview", () => {

    // Visits the root of web server
    // Clicks the edit button for the existing appointment
    // Changes the name and interviewer
    // Clicks the save button
    // Sees the edit to the appointment

  });

  it("should cancel an interview", () => {

    // Visits the root of web server
    // Clicks the delete button for the existing appointment
    // Clicks the confirm button
    // Sees that the appointment slot is empty

  });

});