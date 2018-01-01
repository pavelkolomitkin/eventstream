Feature: Handle user registration via the RESTful API

  In order to allow a user to sign up
  As a client software developer
  I need to be able to handle registration


  Background:
    Given there are Users with the following details:
      | id | username | email          | password |
      | 1  | peter    | peter@test.com | testpass |
    And I set header "Content-Type" with value "application/json"

  Scenario: Can register with valid data
    When I send a "POST" request to "/register" with body:
      """
      {
        "email": "gary@test.co.uk",
        "username": "garold",
        "plainPassword": {
          "first": "gaz123",
          "second": "gaz123"
        }
      }
      """
    Then the response code should be 201
     And the response should contain "The user has been created successfully"

  Scenario: Cannot register with existing user name
    When I send a "POST" request to "/register" with body:
      """
      {
        "email": "gary@test.co.uk",
        "username": "peter",
        "plainPassword": {
          "first": "gaz123",
          "second": "gaz123"
        }
      }
      """
    Then the response code should be 400
     And the response should contain "The username is already used"

  Scenario: Cannot register with an existing email address
    When I send a "POST" request to "/register" with body:
      """
      {
        "email": "peter@test.com",
        "username": "garold",
        "plainPassword": {
          "first": "gaz123",
          "second": "gaz123"
        }
      }
      """
    Then the response code should be 400
     And the response should contain "The email is already used"

  Scenario: Cannot register with an mismatched password
    When I send a "POST" request to "/register" with body:
      """
      {
        "email": "gary@test.co.uk",
        "username": "garold",
        "plainPassword": {
          "first": "gaz123",
          "second": "gaz456"
        }
      }
      """
    Then the response code should be 400
    And the response should contain "The entered passwords don't match"