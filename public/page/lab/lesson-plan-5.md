# Lesson Plan: Python & the Web (Week 5)

<div class="alert alert-warning">
    <span>During this section, we're going to release the mid-quarter evaluation. Please remember to send out that link at the end of your section! <b>Here's the link: <a href="https://forms.gle/YALoSfo4eMs1taDF8">https://forms.gle/YALoSfo4eMs1taDF8</a>.</b></span>
</div>

[[TOC]]

## Pre-Section Preparation
Visit the [Ed Workspace](https://edstem.org/us/courses/2850/workspaces/pNTgfKaanIsFo7fbEUSfpKID3T0x5RcU) and fork it to make a copy that you own.

The section is in two parts—it starts with APIs and then the second half is about flask. There are two directions you could take the second half of section: you could talk about deploying a flask app on Heroku or you could talk about `render_template` and HTML. You should prepare for one or both of these directions beforehand by reading the lesson plan and preparing to teach that portion as needed.

## Community Building \[5 mins\]
Here are some ideas for community building activities:
* Ask everyone a Would You Rather question; there's a list in [this folder](https://drive.google.com/drive/folders/1SobifNwo_dPMA_dO78IUVUuyATwlqF9N?usp=sharing)
* Have people sign up to lead a community building activity each week by adding their name to a Google Doc; then, each week, they'll be in charge of doing some sort of icebreaker during the first 5 minutes of section or so
* Ask people to send you their favorite meme/video/song/picture/... and share during section
* Ask people to DM you a fun fact about themselves and then share the fun fact and have them guess whose it was.
* Ask people to share the last picture they took on their phone (that they're comfortable with) and share about it.
* Play a (short) game like skribbl.io!


## Concept Review \[10 mins\]
There aren't too many concepts to review this time. We started with a conceptual review of how the internet works—if you'd like to brush up on this, we essentially covered sections 2, 7, and 9 of [this whitepaper](http://www.theshulers.com/whitepapers/internet_whitepaper/index.html) about how the internet works. Then we talked about APIs, which probably won't be too confusing—they basically just allow you to build code that interacts with external applications, be that a database, an app, some code that another person made, etc.

After that, we actually made some requests. We talked about the `headers` of a request payload, and how that can be used to authenticate with a web API. Then in the second half of the class, we talked about `flask` and how to build a web server.

The flask routing syntax can be a bit confusing because we haven't seen decorators yet. Here's a simple app:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return 'Hello world'
```

The `@app.route` decorator tells flask how to handle routing. We also talked about how to return JSON information from a route (hence building an API). In section, you should certainly cover the anagrammer problem because it's a nice extension of this material. From there you could take it in a few different directions—either talk about hosting or talk about "prettier" flask applications using `render_template`.

## Problems \[45 mins\]

### API Exploration \[15 mins\]
I'd strongly suggest you put people into their project groups for this portion of the problem set, and invite pepople to explore different APIs. We've added some to [this Google Doc](https://docs.google.com/document/d/1VwhCO8bCsIrIkpZ7BMQmnhz9p-qtA7dqmuIZmdt-VG4/edit) and, as students find more, they should keep adding them to that resource sheet. You should also invite them to explore APIs that might be helpful for their final project—almost everybody can find an API that'll be able to help.

It can be complicated to set up APIs, so you should float around to make sure that people aren't having too much trouble. 

### Website Building \[20 mins\]

#### Anagrams Solution Code
There isn't much "solution code" for this lab, so I'll just include the little that there is here. This is one way to implement the anagrams flask route which builds a dictionary of anagrams and stores that in RAM so that whenever a user accesses a route, it doesn't have to re-compute the anagram.

Instead, your students may choose to re-compute the anagram each time the route is accessed. This is fine, but you should explain the efficiency of their code and nudge them towards making the code more efficient.

```python
from flask import Flask, jsonify

app = Flask(__name__)

ANAGRAMS = {}
with open('words.txt', 'r') as f:
    for word in f:
        word = word.strip()
        key = ''.join(sorted(word))

        if key not in ANAGRAMS:
            ANAGRAMS[key] = []
        ANAGRAMS[key].append(word)


def get_anagrams(letters):
    letters = letters.lower()
    key = ''.join(sorted(letters))
    return ANAGRAMS[key]


@app.route('/<letters>', methods=['GET'])
def anagram(letters):
    return jsonify(get_anagrams(letters))
```

#### Extending Lecture

There are roughly two different directions you could take this portion of the lesson, and it's basically up to you.

1. *Option 1: Deploy an API.* We've put together [these slides](/lab/lab5-deployment.pdf) which walk through how to deploy a flask application to the internet. This sets up a final project direction which some students might appreciate.

   If you're going to follow this option, you should have a terminal open alongside the slides and walk through the instructions in the deck. Before section, make sure all of the dependencies are installed: `pip install gunicorn flask` and install Heroku CLI by following the instructions at [this link](https://devcenter.heroku.com/articles/heroku-cli).


1. *Option 2: Pretty websites with `render_template`.* APIs are really cool, but if students want to build "prettier" websites, they need to write HTML and CSS code, and use flask to serve those files. We've included some problems about this, if that's where you'd like to take this portion of the lab.

## Group Work \[20 min\]

<div class="alert alert-info">
    <span>I'd suggest you send out the mid-quarter feedback form now, before you send people into group work breakout rooms. Here's the link to share: <a href="https://forms.gle/YALoSfo4eMs1taDF8">https://forms.gle/YALoSfo4eMs1taDF8</a></span>
</div>

We're scheduling more time for group work today. This is going to be the trend in the future - we'd like to allocate more and more classtime for final projects (and the assignment). Remind students that the [project proposal](https://forms.gle/McvNiTtc2L5St5NC7) is due tomorrow.

## No weekly reflection; just submit your attendance
Attendance form: <https://forms.gle/xp6amjQLzutPeE1N9>. Enjoy your weekend :)
