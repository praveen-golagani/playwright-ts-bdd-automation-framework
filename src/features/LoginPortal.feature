Feature: webdriveruniversity.com - Login Portal Page

    Scenario Outline: Validate Login Portal Page
        Given I navigate to webdriveruniversity homepage
        When I click on login portal button
        And I switch to the new browser tab
        And I enter a username '<userName>'
        And I enter a password <password>
        And  I click on login button
        Then I should be present with an alert with that contains text '<expectedAlertText>'

        Examples:
            | userName     | password     | expectedAlertText    |
            | webdriver    | webdriver123 | validation succeeded |
            | cover driver | cricket      | validation failed    |