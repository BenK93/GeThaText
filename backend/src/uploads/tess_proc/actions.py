
# from uploads.models import Upload
# from accounts.models import Account
from django.core.files.storage import FileSystemStorage
from pathlib import Path
import subprocess
import os
import logging

# logger setup
logging.basicConfig(filename='readingImages.log', 
level=logging.DEBUG, 
format='%(asctime)s | %(name)s | %(levelname)s | %(message)s')

# /media/images/
def scan_img(img_path) -> str:
    image = img_path[7:] # omitting /media/ from image name
    logging.debug("starting to read file"+image)
    index_of_dot = image[::-1].find('.') + 1
    path_to_img = Path('media/images').resolve() # finding full path to /media/images dir
    txt_path = str(path_to_img)+'/textFiles/'+ image[:-index_of_dot] +'.txt' 
    file_exist = os.path.isfile(txt_path)
    if not file_exist:
        tess_proc(image,path_to_img, index_of_dot)
    file_content = read_file(txt_path)
    return file_content

# making tesseract procces -- reading image and saving the output to /media/images/textFiles
def tess_proc(file, path_to_img, index_of_dot):
    full_image_path = str(path_to_img)+'/'+ file
    full_text_output_path = str(path_to_img)+'/textFiles/'+ file[:-index_of_dot]
    command = str('tesseract '+ full_image_path+ ' '+full_text_output_path)
    subprocess.call(command, shell=True)


def read_file(txt_file) -> str:
    try:
        file_content =  open(txt_file, "r")
        return file_content.read()
    except FileNotFoundError:
        print("File does not exist")

