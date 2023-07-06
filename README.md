# uefa-super-league
My take on a UEFA Super League

1. Go to the Wikipedia page of the UEFA Season Template
2. Find all the leagues that are active and add a link in the todo file
3. Run the script new-season-builder on the previous season
4. Paste the result into a new file
5. Run the script table-sorter to check the number of teams in each Division is correct
6. Add links to the homepage and previous season
7. Loop through the active leagues and add the teams with the mcr script
8. If teams are not active, check why, and update previous season/promotion/relegation accordingly
9. Run table-sorter to get the final positions, pasting the result into the new season file
10. Run the promote-relegate script and do as informed until complete
11. Add a record of the winner to the winners file
12. Go to the previous season and run the season-record script, adding it to the record file
13. Commit the season to Git