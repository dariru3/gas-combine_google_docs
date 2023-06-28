import os
from docx import Document
from Config import config

def combine_word_docs(folder_path):
    # Get list of files in folder
    file_list = [f for f in os.listdir(folder_path) if f.endswith('.docx')]

    # Sort files by name
    file_list.sort(key=lambda x: x.lower())

    # Create a new Document
    combined_doc = Document()

    # Loop through each file
    for file in file_list:
        file_path = os.path.join(folder_path, file)
        sub_doc = Document(file_path)

        # Loop through each element in the sub document
        for element in sub_doc.element.body:
            # Import the element to the new combined document
            combined_doc.element.body.append(element)

    # Save the combined document
    combined_doc.save('test_files/combined_doc.docx')

    print("Documents combined successfully into 'combined_doc.docx'")

if __name__ == '__main__':
    folder_path = config['folder_path']
    combine_word_docs(folder_path)