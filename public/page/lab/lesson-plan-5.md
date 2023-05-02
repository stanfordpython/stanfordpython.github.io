# Lesson Plan: Python & the Web, Server-side 


## Pre-Section Preparation
Visit the Ed Workspace. Fork it to create your own copy.

The first part of the lab will be about deploying a simple website: the goal of this part is for students to have a web application (even if it's just a "Hello, world!" one) running live on the Internet using [PythonAnywhere](https://www.pythonanywhere.com). 

After that, some more UX-inclined students can learn Jinja2 and `render_template`, while other options include writing more sophisticated backend code.

Finally, before section, take a look at the [Mid-Quarter Feedback Form](https://docs.google.com/forms/d/1-UWQy_eoUH1oqeEdp-jRIknjOeQOwNyOVmibXip9hGw/edit#responses) and the [Project Proposals](https://docs.google.com/forms/d/11RgFJ2Aj89_oHFnUwThZCeZLV0anaE5aKjoLgcRogu4/edit#responses).

## Community Building \[5 mins\]

Here are some ideas for community building activities (mostly these are the same as last week, with the top one being a new addition):
* Your sections should be composed of two or three final project groups - even though students are still likely in the early phases of their projects, ask them to share what they're thinking with each other.
* Ask everyone a Would You Rather question; there's a list in [this folder](https://drive.google.com/drive/folders/1SobifNwo_dPMA_dO78IUVUuyATwlqF9N?usp=sharing)
* Have people sign up to lead a community building activity each week by adding their name to a Google Doc; then, each week, they'll be in charge of doing some sort of icebreaker during the first 5 minutes of section or so
* Ask people to send you their favorite meme/video/song/picture/... and share during section.
* Ask people to DM you a fun fact about themselves and then share the fun fact and have them guess whose it was.
* Ask people to share the last picture they took on their phone (that they're comfortable with) and share about it.
* Play a (short) game like skribbl.io!
* Build a trivia quiz (maybe from the trivia API?) and see if your students can figure it out.

## Concept Review \[10 mins\]

We began this week's lecture by re-visiting Flask and talking about dynamic routing. "Dynamic routing" refers to Flask's ability to handle general route patterns and store modifications as variables. We built the following route scheme:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/<name>', methods=['GET'])
def greet(name):
    return f'Hello, {name}!'
```

The string `'/<name>'` represents a general route pattern where the user types anything after the first slash. For example visiting `/parth` would call `greet('parth')`, visiting `/81` would call `greet('81')`, etc. Note that visiting `/parth/tara` would return a 404 error—`'/<name>'` only matches the *first* string that comes after the slash.

We also talked about building an API in Flask. Specifically, if you return a dictionary from a route function, Flask will automatically convert that into a JSON object.

In the last half of the course, we covered `render_template` and using Flask to render HTML (this is called "templating"). Specifically, we set up the route `'/<wikipedia_page_name>'` and used that to create a word cloud of the words that appear on that Wikipedia page. We did that by...

1. Querying the Wikipedia API (<https://en.wikipedia.org/w/api.php?action=query&format=json&titles=Coachella_Valley_Music_and_Arts_Festival&prop=extracts&explaintext>, replace `Coachella_Valley_Music_and_Arts_Festival` for any wikipedia title) and extracting the page text from there.
2. Using the `wordcloud` library to build SVG code for a wordcloud.
3. Displaying that SVG code in a website.

## Problems \[45 mins\]

This lab is divided into three parts. In Part 1, students will deploy a simple "Hello, World!" Flask application to the Internet using PythonAnywhere. In Part 2, students will implement nontrivial functionality into their application so that it accepts user input and adjusts its behavior according to what has previously been entered by users. In Part 3, students will have the option to develop their app further.

### Part 1: Deployment

Although many of the subsequent problems in lab are optional where students can pick-and-choose the direction they'd like to go in; however, we'd love it if you could make sure to go over this problem at the beginning of lab as it's going to set the stage for what follows.

To prepare for this section of the lab, we'd recommend making an account on [PythonAnywhere](https://pythonanywhere.com) and following [these instructions](https://pythonhow.com/deploy-flask-web-app-pythonanywhere/) for deploying a simple Flask app. Here's an example app:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/<name>')
def hello_world(name):
    return f'Hello {name}!'

@app.route('/')
def hello():
    return 'Hello world!'
```

### Part 2: Message in a Bottle
For this portion, once everyone has familiarized themselves with PythonAnywhere, we'd recommend that students work in their project groups to design a more complex application, and deploy it on PythonAnywhere.

The application will work in much the same way as the example we detailed above: when the user navigates to a route, the application will capture that route, and store it as a string in persistent storage in the application. Then, when the user visites the root route, the application will provide them with one of the strings that has previously been stored by visitors of the application. In this way, the app acts like a "message in a bottle" for future visitors, to which any user can contribute a message.

#### Solution Code
There isn't a ton of "solution code" for this segment, but here's the way that we've written a solution.

```python

from flask import Flask

app = Flask(__name__)

messages = set()

@app.route('/<msg>')
def hello_world(msg):
    messages.add(msg.replace('+', ' '))
    return f"Your message has been added to the bottle: {msg.replace('+', ' ')}"

@app.route('/')
def hello():
    try:
        return messages.pop()
    except KeyError:
        return "The bottle is empty of messages!"

```

After implementing the basic version of this application (above), students can work in their groups to implement a `render_template`-based UX to display the messages in the bottle.

#### `render_template`-based UX

Rather than simply displaying text indicating when a message has been added (or whether the bottle is empty), students will import an SVG of a bottle, and display their message within the bottle.

In lecture, we went through an example where we displayed an SVG image generated by a word cloud library, and this exercise will fall along similar lines. The code for that work can be found on the [course website](https://stanfordpython.com/#/lectures).

The solution code for the UX is as follows:

In `bottle.html` (the template file, located in the `templates/` directory):
```HTML
<html>

    <body>
        <!-- Render the word cloud image of a bottle. -->
        {{ bottle_img|safe }}
        <br>
        <!-- Render the message itself. -->
        <p><b>Message: </b>{{ msg }}</p>
    </body>

</html>
```

In `app.py`:
```python
from flask import Flask, render_template
from wordcloud import WordCloud
import numpy as np
from PIL import Image

app = Flask(__name__)

messages = set()

@app.route('/<msg>')
def bottle(msg):
    msg = msg.replace("+", " ")
    messages.add(msg)
    return f"Successfully added message: {msg}"

@app.route('/')
def display_messages():
    try:
        msg = messages.pop()
    except KeyError:
        return "The bottle is empty of messages!"

     # From the tutorial linked from the lab on masked word clouds
     bottle_mask = np.array(Image.open("bottle_img.png"))
     wc = WordCloud(mask=bottle_mask)
     img_data = wc.generate(msg).to_svg()

     return render_template("bottle.html", msg=msg, bottle_img=img_data)
```

### Part 3: Extensions

We've scaffolded an extension for this lab involving web forms - students are free to implement that extension, or work on another one of their choosing if time permits.

#### Web Forms

Until this point, we've used the URL of our web application to contain all the relevant information we leverage in our app: this is - in many cases - inconvenient and difficult for end-users to interact with. We've put together some scaffolding in the notebook to acquaint students with using web forms, and ask students to build a simple web form which allows a user to submit new content to the message in a bottle.

The solution code for the UX with web forms is as follows:

In `start.html`:
```HTML
<html>
    <form action="{{ url_for('submit_via_form') }}" method='POST'>
        <div>
            <label for="bottle-msg">Enter a message to submit to the bottle!</label>
            <input id="bottle-msg" name="bottle-msg"/>
        </div>
        <div>
            <button type="submit">Submit message!</button>
        </div>
    </form>
</html>
```

In `app.py`:
```python
from flask import Flask, render_template, request
from wordcloud import WordCloud
import numpy as np
from PIL import Image

app = Flask(__name__)

messages = set()

@app.route('/<msg>')
def bottle(msg):
    msg = msg.replace("+", " ")
    messages.add(msg)
    return f"Successfully added message: {msg}"

@app.route('/bottle')
def display_messages():
    try:
        msg = messages.pop()

        # From the tutorial linked from the lab on masked word clouds
        bottle_mask = np.array(Image.open("bottle_img.png"))
        wc = WordCloud(mask=bottle_mask)
        img_data = wc.generate(msg).to_svg()

        return render_template("bottle.html", msg=msg, bottle_img=img_data)
    except KeyError:
        return "The bottle is empty of messages!"

@app.route('/')
def main():
    return render_template("start.html")

@app.route('/submit', methods=["POST"])
def submit_via_form():
    # Accept the form data - index into the dictionary, the keys of which are
    # the field names. (In this case the name is 'bottle-msg').
    form_data = request.form.get("bottle-msg", "")
    messages.add(form_data)
    return f"Successfully added message: {form_data}"
```

## Final Project Work Time \[30 mins\]

For the last thirty minutes of class, I'd recommend that you reconvene and have your students work on their final project. It may be good if you can give them discrete deliverables to provide—you can review their project proposals and see what each of them will need.

## Reflection

It doesn't seem like folks are responding to the prompts in the chat—you're all pretty busy! So instead of messaging everyone, send Parth a check-in: how are you finding section so far? What's going well? What do you want to improve on?
