import requests

url = "http://127.0.0.1:4000/"
#{"to_add: apples"}

user_input = input("What do you want to add to the list: ")
while user_input:
    requests.post(url, json={"to_add" : user_input})
    user_input = input("What do you want to add to the list: ")
