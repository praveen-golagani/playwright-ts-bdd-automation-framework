@regression @login
Feature: webdriveruniversity.com - Login Page

    # Background: Pre conditions
    #     Given I navigate to webdriveruniversity homepage
    #     When I click on login portal button
    #     And I switch to the new browser tab

    Scenario Outline: Validate Login Page with valid and invalid credentials
        Given I navigate to the webdriveruniversity login page
        And I enter a username '<userName>'
        And I enter a password '<password>'
        And I wait for 2 seconds
        And  I click on the login button
        Then I should be present with an alert with that contains text '<expectedAlertText>'

        Examples:
            | userName    | password     | expectedAlertText    |
            | webdriver   | webdriver123 | validation succeeded |
            | coverdriver | cricket      | validation failed    |

        @smoke  @ignore
        Examples:
            | userName  | password     | expectedAlertText    |
            | webdriver | webdriver123 | validation succeeded |