
# from uploads.models import Upload
# from accounts.models import Account
from django.core.files.storage import FileSystemStorage
from pathlib import Path
import subprocess
import os


# /media/images/
def scan_img(img_path) -> str:
    image = img_path[7:]
    index_of_dot = image[::-1].find('.') + 1
    fs = FileSystemStorage()
    path_to_img = Path('media/images').resolve()
    txt_path = str(path_to_img)+'/textFiles/'+ image[:-index_of_dot] +'.txt'
    file_exist = os.path.isfile(txt_path)
    if not file_exist:
        tess_proc(image,path_to_img, index_of_dot)
    file_content = read_file(path_to_img, txt_path)
    return file_content


def tess_proc(file, path_to_img, index_of_dot):
    # tesseract file stdout (to get the desired file text)
    command = str('tesseract '+str(path_to_img)+'/'+ file + ' '+str(path_to_img)+'/textFiles/'+ file[:-index_of_dot])
    subprocess.call(command, shell=True)


def read_file(path_to_file, txt_file) -> str:
    try:
        file_content =  open(txt_file, "r")
        return file_content.read()
    except FileNotFoundError:
        print("File does not exist")

