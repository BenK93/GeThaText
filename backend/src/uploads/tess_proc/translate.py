from django.core.files.storage import FileSystemStorage
from pathlib import Path
import subprocess
import os

def scan_img(img_path) -> str:
    file_name = img_path[7:]
    fs = FileSystemStorage()
    path_to_img = Path('media/images').resolve()
    file_path = str(path_to_img)+'/textFiles/'+file_name+'.txt'
    file_exist = os.path.isfile(file_path)
    if not file_exist:
        tess_proc(file_name,path_to_img)
    file_content = read_file(path_to_img, file_name)
    return file_content


def tess_proc(file, path_to_img):
    command = str('tesseract '+str(path_to_img)+'/'+ file + ' '+str(path_to_img)+'/textFiles/'+ file)
    subprocess.call(command, shell=True)


def read_file(path_to_file, file_name) -> str:
    try:
        file = str(str(path_to_file)+'/textFiles/'+file_name+'.txt')
        file_content =  open(file, "r")
        return file_content.read()
    except FileNotFoundError:
        print("File does not exist")
    
        