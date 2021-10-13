import paramiko
print('test')

client = SSHClient()
client.load_system_host_keys()
client.connect('ssh sigma')
stdin, stdout, stderr = client.exec_command('cat test.txt')