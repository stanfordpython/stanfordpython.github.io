# Lesson Plan: Python & the Web Part 2 (Week 6)

[[TOC]]

## Uh... Part 2?

During last week's Mid-Quarter Evaluation, we observed two relevant trends in the data. First, that students felt they had a weaker grasp of Python & the Web than the other topics that we'd covered (which, admittedly, could be either due to the way it was taught, recency bias, or a combination of both), and second, that students really wanted to go deeper into Python's ability to support web applications (the most requested topic for a "special topics" lecture at the end of quarter was deploying a Python application to the Internet using Heroku, AWS, Stanford hosting, etc.).

For these reasons, we've decided to update the course schedule slightly to do Pythohn & the Web Part 2 this week, while the material from last week's Python & the Web lecture and lab are still fresh in everyone's minds.

## Pre-Section Preparation
Visit the [Ed Workspace](https://edstem.org/us/courses/2850/workspaces/pNTgfKaanIsFo7fbEUSfpKID3T0x5RcU). Fork it to create your own copy (preferably on Wednesday evening - throughout Wednesday, we may still make minor wording changes to the problems).

Quite a few of the parts of this lab will come from last week. In last week's attendance form, we learned that last week's lab was long and that most of you didn't approach the end of the content: so we've moved some of last week's content ahead to this week, and added a bit of new content, to this week's lab.

The first part of the lab will be about deploying a simple API: the goal of this part is for students to have a web application (even if it's just a "Hello, world!" one) running live on the Internet using [PythonAnywhere](https://www.pythonanywhere.com). After that, the lab will contain a menu of options from which students can choose: the more UX-inclined students can learn Jinja2 and `render_template`, while other options include writing more sophisticated backend code to hand more complex requests.

We recognize that, relative to other labs, this lab might be a bit more demanding of you, in that you might not have as much prior familiarity with the material we are asking you to teach. We're going to try and scaffold the notebooks as best we can - to make things easier for you, and on the students - but previewing the notebook (and asking either of us about any questions that arise) should go a long way. 😊

## Community Building \[5 mins\]

Here are some ideas for community building activities (mostly these are the same as last week, with the top one being a new addition):
* Your sections should be composed of two or three final project groups - even though students are still likely in the early phases of their projects, ask them to share what they're thinking with each other.
* Ask everyone a Would You Rather question; there's a list in [this folder](https://drive.google.com/drive/folders/1SobifNwo_dPMA_dO78IUVUuyATwlqF9N?usp=sharing)
* Have people sign up to lead a community building activity each week by adding their name to a Google Doc; then, each week, they'll be in charge of doing some sort of icebreaker during the first 5 minutes of section or so
* Ask people to send you their favorite meme/video/song/picture/... and share during section.
* Ask people to DM you a fun fact about themselves and then share the fun fact and have them guess whose it was.
* Ask people to share the last picture they took on their phone (that they're comfortable with) and share about it.
* Play a (short) game like skribbl.io!

## Concept Review \[10 mins\]

In this week's lecture, we covered the following:
* Brief review of Flask app structure and routing.
* Using route text as arguments to functions within web applications. (As in the below `hello_world` example).
* Scraping other sites from a web application, then integrating scraping results into a singular page. In the class example, we interpreted the route text as the title of a Wikipedia page, then scraped the body of the Wikipedia page and assembled a word cloud based on the most frequent words in the body of the page.

## Problems \[45 mins\]

This lab is divided into three parts. In Part 1, students will deploy a simple "Hello, World!" Flask application to the Internet using PythonAnywhere. In Part 2, students will implement nontrivial functionality into their application so that it accepts user input and adjusts its behaviour according to what has previously been entered by users. In Part 3, students will have the option to develop their app further in several different directions: they can choose to add functionality/API extensions, work with `render_template` and a bit of HTML/CSS to beautify their websites, or (in a bit more complicated of a path) work with web forms to enable user input from a form page, rather than through the app URL.

### Deployment \[20 mins\]

Although many of the subsequent problems in lab are optional where students can pick-and-choose the direction they'd like to go in; however, we'd love it if you could make sure to go over this problem at the beginning of lab as it's going to set the stage for what follows.

To prepare for this section of the lab, we'd recommend making an account on [PythonAnywhere](https://pythonanywhere.com) and following [these instructions](https://pythonhow.com/deploy-flask-web-app-pythonanywhere/) for deploying a simple Flask app. Here's the one that Michael wrote when practicing with PythonAnywhere (based closely off an example from Tuesday's lecture).

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

### Message in a Bottle
For this portion, once everyone has familiarized themselves with PythonAnywhere, we'd recommend that students work in their project groups to design a more complex application, and deploy it on PythonAnywhere.

The application will work in much the same way as the example we detailed above: when the user navigates to a route, the application will capture that route, and store it as a string in persistent storage in the application. Then, when the user visites the root route, the application will provide them with one of the strings that has previously been stored by visitors of the application. In this way, the app acts like a "message in a bottle" for future visitors, to which any user can contribute a message.

#### Message in a Bottle Solution Code
There isn't a ton of "solution code" for this segment, but here's the way that we've written a solution.

```python

from flask import Flask

app = Flask(__name__)

messages = set()

@app.route('/<msg>')
def hello_world(msg):
    messages.add(msg.replace('+', ' '))
    return f"Your message has been added to the bottle: {msg.replace('+', ' '}"

@app.route('/')
def hello():
    try:
        return messages.pop()
    except TypeError:
        return "The bottle is empty of messages!"

```

### Menu of Extensions

After implementing the basic version of this application (above), students can work in their groups to implement one (or more, time permitting) of the following extensions:

#### `render_template`-based UX

Rather than simply displaying text indicating when a message has been added (or whether the bottle is empty), students will import an SVG of a bottle, and display their message within the bottle.

In lecture, we went through an example where we displayed an SVG image generated by a word cloud library, and this exercise will fall along similar lines. The code for that work can be found on the [course website](https://stanfordpython.com/#/lectures).

Though this section of the notebook will discuss [Bootstrap](https://getbootstrap.com) (as some students may be looking for ways to make their templates look extra beautiful, rather than rendering raw HTML and an image or two), any discussion of Bootstrap will largely be a loose discussion of "here's what's out there - feel free to add Bootstrap elements to your web app". You're expected to be able to point students to the documentation if they're interested, but you are not expected to have additional knowledge of Bootstrap beyond that. 😊

<div class="alert alert-warning">
    <span>Michael's still working out the details of the code for the text overlay on the SVG image - an update will be sent to the Slack channel as soon as it's ready. (Likely this code will be decomposed into a provided function where the student can enter the text to be overlaid onto an image of the bottle, and the function will return a string containing the SVG encoding of the image).</span>
</div>

#### Work with Web Forms to Submit Information

Until this point, we've used the URL of our web application to contain all the relevant information we leverage in our app: this is - in many cases - inconvenient and difficult for end-users to interact with. We've put together some scaffolding in the notebook to acquaint students with using web forms, and ask students to build a simple web form which allows a user to submit new content to the message in a bottle.

## Weekly Reflection
Attendance form and weekly reflection (the reflection should be short): 

Enjoy your weekend! :)
