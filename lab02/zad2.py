import paramiko as paramiko
import os
from dotenv import load_dotenv

load_dotenv()

host = os.getenv('host')
port = os.getenv('port')
connection_username = os.getenv('connection_username')
connection_password = os.getenv('connection_password')
command = os.getenv('command')

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(host, port, connection_username, connection_password)

stdin, stdout, stderr = client.exec_command(command)
result = stdout.readlines()
print(result)
