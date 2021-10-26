import pysftp
import os
from dotenv import load_dotenv

load_dotenv()

host = os.getenv('host')
connection_username = os.getenv('connection_username')
connection_password = os.getenv('connection_password')
path_main = os.getenv('path_main')
file_put = os.getenv('file_put')
file_get = os.getenv('file_get')

def print_connection_data():
    print(host)
    print(connection_username)
    print(connection_password)
    print(path_main)
    print(file_put)
    print(file_get)

def put(file):
    with pysftp.Connection(host, username=connection_username, password=connection_password) as sftp:
        with sftp.cd(path_main): # ustaw ścieżkę na 'patch_main'
            sftp.put(file)   # prześlij plik 'file' z obecnego katalogu na 'patch_main' na serwerze zdalnym

def get(file):
    with pysftp.Connection(host, username=connection_username, password=connection_password) as sftp:
        with sftp.cd(path_main): # ustaw ścieżkę na 'patch_main'
            sftp.get(file)       # pobierz plik 'file' ze zdalnego serwera do obecnego katalogu

print_connection_data()
put(file_put)
# get(file_get)
