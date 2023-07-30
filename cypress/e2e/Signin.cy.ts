describe('Signin', () => {
	it('should display the signin form', () => {
		cy.visit('http://localhost:3000');

		cy.get('.MuiButton-root').click();
		expect(cy.get('#email')).to.exist;
	});

	it('should fail to signin with invalid credentials', () => {
		cy.visit('http://localhost:3000');

		cy.get('.MuiButton-root').click();
		cy.get('#email').type('test@test');
		cy.get('#password').type('test');
		cy.get('.MuiBox-root > .MuiButtonBase-root').click();

		cy.get('.css-mvpmuh > .MuiBox-root > .MuiTypography-root').should(
			'contain',
			'Invalid Username or Password',
		);
	});

	it('should signin with valid credentials', () => {
		cy.visit('http://localhost:3000');

		cy.get('.MuiButton-root').click();
		cy.get('#email').type('joe@gmail.com');
		cy.get('#password').type('123456');
		cy.get('.MuiBox-root > .MuiButtonBase-root').click();

		cy.get('h1').should('contain', 'Welcome, Joe Doe');

		cy.get('.MuiButton-root').click();

		cy.get('h1').should('contain', 'Welcome, Guest');
	});
});
