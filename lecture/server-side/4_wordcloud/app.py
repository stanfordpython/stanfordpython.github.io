#query-pages-page_id->extract
from flask import Flask, render_template
import requests 
from wordcloud import WordCloud

app = Flask(__name__)
wc = WordCloud(
    background_color="white", 
    max_words=100, 
    colormap='plasma',
    width=1000,
    height=800
)



@app.route("/<wiki_slug>", methods=["GET"])
def hello(wiki_slug):
    r = requests.get(f"https://en.wikipedia.org/w/api.php?action=query&format=json&titles={wiki_slug}&prop=extracts&explaintext")
    data = r.json()
    page_id, page_data = data["query"]["pages"].popitem()
    if page_id == -1:
        return "sorry, no wiki page for that"
    img_data = wc.generate(page_data["extract"]).to_svg()
    return render_template("display.html", img=img_data)

if __name__ == "__main__":
    app.run()