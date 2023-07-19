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
16. Commit the season to Git.