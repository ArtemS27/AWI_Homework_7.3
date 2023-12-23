describe("Pet store user test", () => {
  it("Create user", () => {
    cy.addUser(1, "Alex77", "Alex", "Ivanov", "mail", "pass", "0000", 1);
  });
  it("Change user", () => {
    cy.addUser(1, "Alex77", "Alex", "Ivanov", "mail", "pass", "0000", 1);
    cy.login("Alex77", "pass"); 
    cy.changeUser(1, "Alex77", "Max", "Ivanov", "mail", "pass", "0000", 1);
  });
  it("Delete user", () => {
    cy.addUser(1, "Alex77", "Alex", "Ivanov", "mail", "pass", "0000", 1);
    cy.deleteUser("Alex77");
  });
});
