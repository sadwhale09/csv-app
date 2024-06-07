# Test Creator

## About:
Ask Me and Rate is a learning app for Android which is currently in open beta tests phase available at https://play.google.com/store/apps/details?id=com.aplicamo.android.askme

This repo has a web app to facilitate own test sets creation.

## Usage:
- Write a pair of question-answer in first textarea boxes
- Press "Add Question" to add more fields
- Press "X" on the right to remove pair
- When you're done, press "Export to CSV" to download a test set
- For now, you can change the test.csv name during the download process

## Some info:
- Field delimiter is "|"

## TODO:
- [ ] Add a field to change a default test.csv name before download
- [ ] Add an option to change the field delimiter
- [ ] Prevent removing the only remaining row
- [ ] Make the dark mode 💀
- [ ] Add option to import users' own csv sets


### Perform these actions when creating a record or before writing to file
- [x] Trim spaces
- [ ] Save only after trimming spaces
- [ ] Max 25 chars per cell
- [ ] Max 1000 records
- [ ] Check for doubled records
- [ ] Check if the're at least 2 different answers
