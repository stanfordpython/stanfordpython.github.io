from flask import Flask

app = Flask(__name__)

SECRET_NUMBER = 41

@app.route("/", methods=["GET"])
def hello():
    return "hello CS 41"

@app.route("/<guess>", methods=["GET"])
def guess_check(guess):
    try:
        guess = int(guess)
    except ValueError:
        return {"error": "Hey! Thats not a number"}
    
    output = {'correct' : guess == SECRET_NUMBER}
    if guess < SECRET_NUMBER:
        output["message"] = "too low!"
    elif guess > SECRET_NUMBER:
        output["message"] = "too high"
    else:
        output["message"] = "congrats!!"
    return output

if __name__ == "__main__":
    app.run()