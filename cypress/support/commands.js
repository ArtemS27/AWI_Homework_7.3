// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add(
  "addUser",
  (id, userName, name, lastName, email, password, phone, status) => {
    cy.request("POST", "/", {
      id: id,
      username: userName,
      firstName: name,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      userStatus: status,
    }).then((responce) => {
      expect(responce.status).be.eql(200);
      expect(responce.body).be.eql({
        code: 200,
        type: "unknown",
        message: "1",
      });
    });
    cy.request("GET", userName).then((responce) => {
      expect(responce.status).be.eql(200);
      expect(responce.body).be.eql({
        id: id,
        username: userName,
        firstName: name,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        userStatus: status,
      });
    });
  }
);
Cypress.Commands.add("login", (userName, password) => {
  cy.request("GET", "/login?username=${userName}&password=${password}").then(
    (responce) => {
      expect(responce.status).be.eql(200);
    }
  );
});
Cypress.Commands.add(
  "changeUser",
  (id, userName, name, lastName, email, password, phone, status) => {
    cy.request("PUT", userName, {
      id: id,
      username: userName,
      firstName: name,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      userStatus: status,
    }).then((responce) => {
      expect(responce.status).be.eql(200);
    });
    cy.request("GET", userName).then((responce) => {
      expect(responce.status).be.eql(200);
      expect(responce.body).be.eql({
        id: id,
        username: userName,
        firstName: name,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        userStatus: status,
      });
    });
  }
);
Cypress.Commands.add("deleteUser", (userName) => {
  cy.request("DELETE", userName).then((responce) => {
    expect(responce.status).be.eql(200);
  });
  cy.request({
    url: userName,
    failOnStatusCode: false
  }).then((responce) => {
    expect(responce.status).be.eql(404);
  });
});
