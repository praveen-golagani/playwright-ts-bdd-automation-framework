Feature: webdriveruniversity.com - Contact Us Page
    Background: Pre conditions
        Given I navigate to webdriveruniversity homepage
        When I click on the contact us button
        And I switch to the new browser tab
    Scenario: Valid Contact Us Form Submission
        And I type a first name
        And I type a last name
        And I enter an email address
        And I type a comment
        And I click on the submit button
        Then I should be presented with a successful contact us submission message

    Scenario: Invalid Contact Us Form Submission
        And I type a first name
        And I type a last name
        # And I enter an email address
        And I type a comment
        And I click on the submit button
        Then I should be presented with a unsuccessful contact us submission message


    Scenario: Valid Contact Us Form Submission Using Specific Data
        And I type a first name "Praveen test"
        And I type a last name  "QA India"
        And I enter an email address "test@testmail.com"
        And I type a comment as "hello testers" use 147 rule to remember
        And I click on the submit button
        Then I should be presented with a successful contact us submission message

    Scenario: Valid Contact Us Form Submission - Using Random Data
        And I type a random first name
        And I type a random last name
        And I enter a random email address
        And I type a comment
        And I click on the submit button
        Then I should be presented with a successful contact us submission message

    Scenario Outline: Validate Contact Us Page
        And I type a first name '<firstName>' and a last Name '<lastName>'
        And I enter a email address '<emailAddress>' and a comment '<comment>'
        And I click on the submit button
        Then I should be presented with a header text '<message>'


        Examples:
            | firstName | lastName | emailAddress             | comment         | message                     |
            | Praveen   | cricket  | praveen.test@cricket.com | hello all       | Thank You for your Message! |
            | Sant      | Oshaman  | destroyer@fun.com        | this is sec inp | Thank You for your Message! |
            | Dhoni     | Raj      | nookaraju                | good bye 3      | Invalid email address       |

