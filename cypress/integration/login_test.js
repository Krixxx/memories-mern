describe('log user in', () => {
  //End-To-End test
  it('user can log in', () => {
    //go to homepage
    cy.visit('/');

    //click on sign in button
    cy.findByRole('button', { name: /sign in/i }).click();

    //enter email address and password, then click sign in
    cy.findByRole('textbox').type('demo@demo.demo');

    cy.findByLabelText(/password/i).type('123456');

    cy.get('[data-test-id="login-button"]').click();

    //create a memory (without image)
    const title = 'Test message';
    const message = 'This is test message';
    const searchTerm = 'test';
    const tags = 'test,testing,message';

    cy.get('[data-test-id="title"]').type(title);
    cy.get('[data-test-id="message"]').type(message);
    cy.get('[data-test-id="tags"]').type(tags);

    cy.findByRole('button', { name: /submit/i }).click();

    //go back to homepage
    cy.findByRole('img', { name: /icon/i }).click();

    //reload page
    cy.reload();

    //verify if new memory is there
    cy.get('#circular-progress').should('not.exist');

    cy.get('h5').eq(0).should('have.text', title);

    //search new memory
    cy.get('[data-test-id="search-form"]').type(searchTerm);

    cy.findByRole('button', { name: /search/i }).click();

    //verify that new memory is here
    cy.get('[data-test-id="card-title"]')
      .eq(0)
      .should('include.text', searchTerm);
    //show all memories
    cy.get('[data-test-id="search-form"]').clear();

    cy.findByRole('button', { name: /search/i }).click();
    //delete new memory
    cy.get('[data-test-id="delete-button"]').first().click();

    //verify if new memory is deleted
    cy.get('h5').eq(0).should('not.have.text', title);
    //log out
    cy.findByRole('button', { name: /logout/i }).click();
  });
});
