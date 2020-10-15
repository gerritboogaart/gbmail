# gbmail

To run locally:
npm run dev

This will concurrently run the server and the UI with concurrently "npm run server" "npm run gbmail"

<b>What this app does:</b>

* The app shows the list of 10 emails
* If you click on an email it will open with the subject, name, and date in the header.
* If you click on an email, you can go back with the left arrow that appears, or you can got to the top right of the email where you can go forward and backwards in the email list.
* If you click on a tag, you get away from the single email screen and will filter the email list by tag
* You can search emails, it will search by senser, subject, and body. This will be done case insensitive.
* If you select emails, you can delete them, they are deleted from state, not in real life, refreshing the page makes all come back

