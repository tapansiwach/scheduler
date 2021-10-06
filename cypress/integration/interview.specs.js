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
    cy.get(":nth-child(2) > .appointment__card > .appointment__card-left > h2.text--regular")
      .contains("Archie Cohen")

  });

  it("should edit an interview", () => {

    // Visits the root of web server
    cy.visit("/")
    // Clicks the edit button for the existing appointment
    cy.get(":nth-child(2) > .appointment__card [alt='Edit']")
      .click({ force: true })
    // Changes the name and interviewer
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Jughead")
    cy.get(".interviewers__item-image").last()
      .click()
    // Clicks the save button
    cy.get(".button--confirm")
      .click()
    // Sees the booked appointment
    cy.get(":nth-child(2) > .appointment__card > .appointment__card-left > h2.text--regular")
      .contains("Jughead")

  });

  it("should cancel an interview", () => {

    // Visits the root of web server
    cy.visit("/")
    // Clicks the delete button for the existing appointment
    cy.get(":nth-child(2) > .appointment__card [alt='Delete']")
      .click({ force: true })
    // Clicks the confirm button
    cy.contains(".button--danger", "Confirm")
      .click()
    // Sees that the appointment slot is empty
    cy.get(":nth-child(2)")
      .should("have.class", "appointment__add")

  });

});