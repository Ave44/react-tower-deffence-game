import pysftp
import os
from dotenv import load_dotenv

load_dotenv()

host = os.getenv('host')
connection_username = os.getenv('connection_username')
connection_password = os.getenv('connection_password')
path = os.getenv('path')
path_put = os.getenv('path_put')
path_get = os.getenv('path_get')

print(host, "\n", connection_username)

with pysftp.Connection(host, connection_username, connection_password) as sftp:
    with sftp.cd(path):             # temporarily chdir to public
        sftp.put(path_put)  # upload file to public/ on remote
        sftp.get(path_get)         # get a remote file