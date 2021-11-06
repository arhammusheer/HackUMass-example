import requests
r = requests.get('http://localhost:3000/users')

print(r.json())