from flask import Flask, request, render_template

app = Flask(__name__)
items = []

#{"to_add: apples"}
@app.route("/", methods=["GET", "POST"])
def hello():
   if request.method == "POST":
      data = request.get_json()
      items.append(data["to_add"])
      return render_template("list.html", items=items)
   else:
      return render_template("list.html", items=items)



if __name__ == "__main__":
    app.run()