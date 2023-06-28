# Google Docs Combiner Script

This Google Apps Script is designed to combine multiple Google Docs from a specific Google Drive folder into a single document. The files are processed in alphabetical order by filename, and the content of each document is appended to the end of a single target document, with a page break between each document's content. If the documents contain tables, the tables will be adjusted to span the full width of the page and the columns will be distributed evenly.

## Usage

1. Replace `config.folderId` with the ID of the Google Drive folder that contains the Google Docs you want to combine. You can find the ID in the URL when you open the folder in Google Drive.

2. Run the `combineGoogleDocs` function. You can do this by clicking on the play button in the Google Apps Script editor or by setting up a trigger in the Apps Script project.

## Important Note

- The script assumes the active document (the one you are running the script from) is the target document where all files will be combined.

- The full width of the table in the script is set to approximately 9 inches (about 650 points). If your document has different margins or you want a different width, you might need to adjust this value.

- This script is capable of appending paragraphs, tables, and list items. If your documents contain other types of elements, you may need to extend the script to handle them.

Happy combining!
