describe('Blog app', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('blogs')
    cy.contains('Login').click()
    cy.get('input[name=current-username]').type('user')
    cy.get('input[name=current-password]').type('password')
    cy.get('button[type=submit]').click()
  })

  it('login fails with wrong password', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Login').click()
    cy.get('input[name=current-username]').type('user')
    cy.get('input[name=current-password]').type('nothing')
    cy.get('button[type=submit]').click()

    cy.contains('Wrong username or password').should('have.css', 'background-color', 'rgb(202, 56, 56)')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/login', { username: 'user', password: 'password' }).then(
        (response) => {
          localStorage.setItem('user', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        },
      )
    })

    it.only('a new post can be created', function () {
      cy.contains('Create new post').click()
      cy.get('input[name=title]').type('a post created by cypress')
      cy.get('input[name=author]').type('cypress')
      cy.get('button[type=submit]').click()
      cy.contains('New blog post: a post created by cypress')
    })
  })
})
