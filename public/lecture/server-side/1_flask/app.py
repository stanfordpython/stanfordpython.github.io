from flask import Flask

app = Flask(__name__)

@app.route("/", methods=["GET"])
def hello():
    return "hello CS 41"

if __name__ == "__main__":
    app.run()