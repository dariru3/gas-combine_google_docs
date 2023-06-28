function combineGoogleDocs() {
  var folderId = config.folderId; // Replace with your Folder ID
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var fileArray = [];
  
  while (files.hasNext()) {
    var file = files.next();
    if (file.getMimeType() == "application/vnd.google-apps.document") {
      fileArray.push(file); // Add files to the array
    }
  }
  
  // Sort files by name
  fileArray.sort(function(a, b) {
    return a.getName().toLowerCase() > b.getName().toLowerCase() ? 1 : -1; 
  });

  var combinedDoc = DocumentApp.getActiveDocument(); // Combine files in this document
  
  fileArray.forEach(function(file) {
    var content = DocumentApp.openById(file.getId()).getBody();
    var totalElements = content.getNumChildren();
    var targetDoc = DocumentApp.openById(combinedDoc.getId());
    var body = targetDoc.getBody();

    for( var j = 0; j < totalElements; ++j ) {
      var element = content.getChild(j).copy();

      switch (element.getType()) {
        // If it's a paragraph, append a new paragraph.
        case DocumentApp.ElementType.PARAGRAPH:
          body.appendParagraph(element.asParagraph());
          break;

        // If it's a table, append a new table.
        case DocumentApp.ElementType.TABLE:
          var table = body.appendTable(element.asTable());
          var numCols = table.getRow(0).getNumCells(); // number of columns
          
          // Full width is approximately 9 inches, converted to points
          var fullWidth = 650; 
          
          // Distribute column width evenly
          var colWidth = fullWidth / numCols;
          for (var row = 0; row < table.getNumRows(); row++) {
            for (var col = 0; col < numCols; col++) {
              table.getCell(row, col).setWidth(colWidth);
            }
          }
          break;

        // If it's a list item, append a new list item.
        case DocumentApp.ElementType.LIST_ITEM:
          body.appendListItem(element.asListItem());
          break;

        // Possibly extend to other types if necessary.
      }
    }

    Logger.log(file.getName() + " added")
    // Add a page break after appending each document
    body.appendPageBreak();
  });
}
