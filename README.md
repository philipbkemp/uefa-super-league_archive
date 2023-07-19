# uefa-super-league
My take on a UEFA Super League

1. Go to the previous season and run the function `newSeason()`.
2. Check each Division has at most 40 teams, and paste the output into a new file.
3. Add a link to the new file on the previous season and index pages.
4. Open the Wikipedia Template page for the new season.
5. Open each domestic league in a new tab.
6. Find the league table and add the class `superleague` to it.
7. Then run the `grab-data.js` script to build the input and paste into the new season after updating with `['removed']` teams.
8. Once all leagues are done, use `dumpAll()` to get the finished Super League.
9. Review each Division to deal with any missing clubs, removing them from the previous season and updating promoted teams.
10. Run the script `tableSorter()` on the new season, checking each Division has 40 teams. Paste the result into the file.
11. Until the lowest Division has 40 teams, add the best teams from 'Division Newclub', and create a new Division if needed.
12. Run again `tableSorter()` and save the output after checking.
13. Run the script `upDown()` and update the file until the script returns a clean result.
14. Add the winner to the winners files.
15. On the previous season, run the script `record()` to add the output to the records file. Sort the file (F9) and save.
16. Commit the season.



1. Go to the Wikipedia page of the UEFA Season Template and find all the leagues that are active and add a link in the todo file
2. Run the script new-season-builder on the previous season and save the result in a new file
3. Run the script table-sorter to check the number of teams in each Division is correct
4. Add links to the homepage and previous season
5. Loop through the active leagues and add the teams with the mcr script
6. Check teams that are missing and update accordingly
7. Run table-sorter to get the final positions, pasting the result into the new season file
8. Run the promote-relegate script and do as informed until complete
9. Add a record of the winner to the winners file
10. Go to the previous season and run the season-record script, adding it to the record file
11. Commit the season to Git