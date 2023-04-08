# Assignment 1: Dear Cryptography (Dear Data + Cryptography)
> Due: Thursday, April 27th, 2023 at 11:59pm PT

# Overview
In this assignment, you will build a cryptography suite that implements two different cryptosystems: the Caesar cipher and the Vigenere cipher. Then, you'll use Python to represent some data you care about! This is our first assignment in groups (🎉) so a sub-goal is to get to know your classmates and work on a fun mini-project together.

Note: It's always a good idea to get started early, in case you run into unexpected difficulties down the line. Dear data requires some planning!

# Group norms and expectations

Before you start the rest of the assignment, take some time to discuss norms and expectations with your group. We're hoping this will be a genuine, meaningful experience for you to talk openly about how you plan to collaborate with each other. At the same time, we're not your parents and we trust that you're able to work with each other well. We hope you'll treat this more like an opportunity to get to know each other better! Feel free to heavily adapt this portion of the assignment to your needs and your group's needs.

Some general advice, as you're discussing norms and expectations, is to reflect on positive and negative group experiences you've had in the past. What has worked well? How could you have prevented bad experiences? What are some practices you could bring to the CS 41 group? 

Here are some topic areas you should discuss—but you're welcome to talk about other areas as well:

  1. **Communication logistics**: How will your group communicate logistically? Email? Text? How will you set up deadlines and what times of the day is it reasonable to expect work? Will you have a regular meeting? What time? How will you set this meeting up, week-to-week?
  2. **Communication style**: What norms will you set around communication to promote respect and teamwork?
  3. **Work split**: How will you decide who does what?
  4. **Decision making**: When your team disagrees, what's the plan? (For this, it's especially important to reflect on past experiences)

Please submit a file called `group_norms.txt` where you write about each of those norms and expectations.


# Cryptography suite

One person in the group should go to [this workspace on Ed](https://edstem.org/us/courses/38060/workspaces/pmmCt3qho0qdtA008cGfP8NW1U2gKEIT) and create a fork of it. Add your teammates to the workspace and use it as a place to collaborate on code.</p>

## Starter files

We've provided starter files as a skeleton for this assignment. Here's an overview of what's in it:

1. `crypto.py` is the primary file you will modify for the cryptography section. It will implement all the functions to decrypt/encrypt strings.
2. `tests/` folder contains test input and output (for Caesar, it's formatted as `{input}:{output}` and for Vigenere it's formatted as `{input}:{key}:{output}`)

## General tips

You'll be modifying a lot of strings in this assignment. The `string` module exports some useful values:

```python
import string

string.ascii_letters   # => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
string.ascii_uppercase # => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
string.ascii_lowercase # => 'abcdefghijklmnopqrstuvwxyz'
string.punctuation     # => '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
```

## Building the ciphers
In this section, you will build cipher functions to encrypt and decrypt messages. We'll give a brief overview of each cipher and give some pointers on how it fits it into the starter files.

### Caesar cipher

A Caesar cipher involves shifting each character in a plaintext by **three** letters forward (note that the shift can be anything between zero and 25, but we're just going to implement the three-shift cipher):

```
A -> D, B -> E, C -> F, etc... 
```

At the end of the alphabet, the cipher mapping wraps around the end, so:

```
..., X -> A, Y -> B, Z -> C.
```

For example, encrypting `'PYTHON'` using a Caesar cipher gives

```
PYTHON
||||||
SBWKRQ
```

In this part, implement the functions:

```Python
encrypt_caesar(plaintext)
decrypt_caesar(ciphertext)
```

Each of these functions takes one argument, a string representing a message to be encrypted or decrypted, and returns a string representing the encrypted or decrypted message.

Notes:

- Non-alphabetic characters should not be modified by encryption or decryption.
- You may assume that all alphabetic characters will be in uppercase.
- Do not assume that the arguments to this function always have at least one character.

That is, `encrypt_caesar("")` should return `""` (the empty string) and `encrypt_caesar("F1RST P0ST")` should return `"I1UVW S0VW"` (where the letters have been encrypted by the numbers, and the space, have been left unchanged).

You can test your ciphers using the interactive interpreter:

```
(cs41-env) $ ipython -i crypto.py
In [1]: encrypt_caesar("PYTHON")
"SBWKRQ"
In [2]:decrypt_caesar("SBWKRQ")
"PYTHON"
```

A non-exhaustive list of test cases, represented by a colon-delimited (plaintext, ciphertext) pair are given in the text file `tests/caesar-tests.txt`. You can use this file to sanity check your implementation.

**Questions to ponder:**

- What sort of data structure can be used to represent an association of input characters to (encrypted) output characters? 
- How can we make one of these data structures efficiently? 
- How can we use it to transform an input message?

For this part of the assignment, try not to use the `ord` and `chr` functions.

### Vigenere cipher

A Vigenere cipher is similar in nature to a Caesar cipher. However, in a Vigenere cipher, every character in the plaintext can be shifted by a variable amount. The amount to shift any letter in the plaintext is determined by a keyword, where 'A' corresponds to shift of 0 (no shift), 'B' corresponds to a shift of 1, ..., and 'Z' corresponds to a shift of 25, wrapping around if necessary (as with the Caesar cipher).

The keyword is repeated or truncated as necessary to fit the length of the plaintext. As an example, encrypting `"ATTACKATDAWN"` with the key `"LEMON"` gives:

```
Plaintext:  ATTACKATDAWN
Key:        LEMONLEMONLE
Ciphertext: LXFOPVEFRNHR
```

Looking more closely, each letter in the ciphertext is the sum of the letters in the plaintext and the key. Thus, the first character of ciphertext is `"L"` because of the following calculations:

```
A + L = 0 + 11 = 11 -> L
```

The second character of the ciphertext is `"X"` because shifting `"T"` by 4 (associated to shifting by `"E"`) gives:

```
T + E = 19 + 4 = 23 -> X
```

Note that, since we're considering A to encode 0, our indices are one off of a letter's ordinal position in the alphabet. That is, even though E is the 5th letter of the alphabet, it encodes a shift of 4.

The third character of the ciphertext is `"F"` because:

```
T + M = 19 + 12 = 31 -> 5 -> F
```

We have wrapped around the alphabet from +31 to +5, resulting in an output ciphertext character of `"F"`.

Implement the functions:

```Python
encrypt_vigenere(plaintext, keyword)
decrypt_vigenere(ciphertext, keyword)
```

These functions take two arguments, a message to encrypt (or decrypt) and a keyword to use for encryption or decryption. Both functions should return the encrypted (or decrypted) message.

Notes:

- You can assume that all characters in the plaintext, ciphertext, and keyword will be alphabetic (i.e no spaces, numbers, or punctuation).	
- You can assume that all of the characters will be provided in uppercase.
- You can assume that keyword will have at least one letter in it.

After you've implemented these functions, you can test them using the interactive interpreter.

```
(cs41-env)$ ipython -i crypto.py
In [1]: encrypt_vigenere("ATTACKATDAWN", "LEMON")
"LXFOPVEFRNHR"
In [2]: decrypt_vigenere("LXFOPVEFRNHR", "LEMON")
"ATTACKATDAWN"
```

Another list of non-exhaustive tests are available at `tests/vigenere-tests.txt`.

**Questions to ponder:**

- How can you cycle through the letters of the keyword? Consider looking at functions exported by the `itertools` module.
- What concepts from class can we employ to make this code more elegant?

You can use the functions `ord` and `chr` which convert strings of length one to and from their ASCII numerical equivalents. For example, `ord('A') == 65`, `ord('B') == 66`, ..., `ord('Z') == 90`, and `chr(65) == 'A'`, `chr(66) == 'B'`, ..., `chr(90) == 'Z'`. For an extra challenge, try to implement these functions purely functionally.

## Extensions
We've got some extensions for this part of the assignment - most of them are other ciphers that you could decrypt, so if you're interested in that sort of thing, send us an email and we can send you extensions. We're not including them here because, quite frankly, we think the next part of the assignment is much cooler than any of the cryptography extensions.

# Dear data
For this part of the assignment, you and your group will collect and analyze data about something that matters to you. This assignment comes from the book *Dear data*, written by two people—Georgina and Stefanie—who spent a year writing weekly postcards to each other. Each postcard contained a visualization of some data they'd collected about their lives from the past week. Watch [this video](https://youtu.be/mMJ2wrB8b2Q) before you start this assignment to learn more.

Your group will walk through the following stages of this assignment:

1. Pick data variables to investigate
2. Collect data (for at least a week)
3. Analyze the data in Python
4. Visualize the data

## ✨ Inspiration ✨
I'd strongly recommend scrolling through [an excerpt of *Dear data*](https://stanfordpython.com/assignment/dear-data.pdf) on our website to get a sense of what Stefanie and Georgina's data adventure was like. They show how they visualized data on their partner, their wardrobes, how often they use their phone, and many more cool data. The last few pages feature their advice about how to do this in your own life.

Here's another list of some interesting Dear Data projects:

* I live on campus during COVID and the dining halls package each meal in plastic, so I collected data on how/what/when I throw away trash
* A friend of mine collected data on how often her partner interacted with their cat (name calling, petting, etc.)
* For a while, I've been interested in my music listening habits, so I've written code in the past to collect data on my Spotify profile
* A former professor of mine tracked how many emails he sent for a week (this one has the benefit of being externally recorded), their purpose, and how frustrated each one made him

## Step 1: Pick data variables to investigate
You need to collect the equivalent of a week's worth of data. I say "the equivalent" because some data - like the clothes you have in your wardrobe - aren't collected over the course of a week, but that data set is roughly the same size as a week-long data set.

First, you should meet with your team to decide the questions you'll investigate over the course of this assignment: what do you want to know and explore about yourself? Start with a big question and then ask smaller and smaller questions. Then, convert these questions into **variables** that you can record over the course of the week. In data contexts, the "variables" of a data set are the properties of each data point. You should come out of this step with a list of variables that you're going to go record.

For my project to determine how much trash I throw away every week, I might plan to keep track of the following variables each time I throw something away:

* date 
* time
* weight
* material
* origin of the material (the dining hall, the grocery store, etc.)

There's one more thing to decide: how often are you going to collect this data? In my example, I said I'd record this every time I threw something away, but it might make more sense for you to make a data record at different times - perhaps at a scheduled time each day, for example.

To be clear, you should all be collecting data *on the same variables at the same times in the same format*—decide as a group whether to use metric/imperial, when to record, etc..

## Step 2: Collect data
This step is what it sounds like. We'd recommend you make a shared Google sheet and add a column which you use to track which team member made the data entry. Then, start tracking the data!

For example, if I was working on this assignment with Tara, our table setup might look something like:

| team_member | date | time    | weight | material | origin            |
|-------------|------|---------|--------|----------|-------------------|
| Parth       | 4/8  | 12:00pm | 120    | plastic  | dining hall       |
| Tara        | 4/8  | 1:25pm  | 91     | compost  | spoiled leftovers |

## Step 3: Analyze the data in Python
Once you've got the data, we'd like you to analyze the data in Python. At this point, you should also finalize the questions you're investigating and figure out what kind of analyses you'd like to do in Python. You should start by figuring out some basic numbers (e.g., "How much plastic do I throw away every day on average?", "How does Tara's daily trash weight compare to mine?").

### Import the data
The easiest way to do this is to convert the file to a CSV and then import it using the [`csv` library](https://docs.python.org/3/library/csv.html).

* If you're using Google Docs, go to `File > Download > Comma-separated values (.csv, current sheet)`
* In Excel, `File > Save As...` will open a menu that allows you to choose `CSV` as the format

A CSV file stores each row of the data as a collection of comma-separated values. For example, the first row from the sample data set above would be stored as:

```
Parth,4/8,12:00pm,120,plastic,dining hall
```

Python has a built-in library that can allow you to easily work with CSV files and here's some code to get started with it. This code uses the `DictReader` object which takes the first row of your CSV file as the headers for the document and constructs a dictionary representation for the future rows.


```python
import csv

with open(DATA_FILE, 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        # do something with `row`
```

In our data set, the first iteration of `row` would be formatted like this:

```python
{
    'team_member': 'Parth',
    'date': '4/8',
    'time': '12:00pm',
    'weight': '120',
    'material': 'plastic',
    'origin': 'dining hall'
}
```

Note that this data point isn't in a great format: we'd probably want to convert `row['weight']` to an integer and maybe store all of the `row` objects in a list for future use.

### Process the data
Once you've got the data, use any/all of your Python skill to analyze it. Go wild! The `sum`, `max`, `min`, `len`, and `sorted` functions might be helpful. The [`math` library](https://docs.python.org/3/library/math.html) has more cool functions like `pow`, `sin`, and `cos`. The `numpy` library ([quickstart here](https://numpy.org/devdocs/user/quickstart.html)) which we installed during setup is a data science powerhouse.

Write code to answer the questions you came in with, but feel free to play around and do other stuff.

## Step 4: Visualize the data
The visualizations that Georgina and Stefanie drew made their project a really special endeavor, and we want you to have that experience too! Follow in their lead and sketch visualizations of your data (please include a legend to read the visualization) and take a picture for submission.

Alternatively, there are some digital resources that can make gorgeous visualizations with fairly low effort:

* [Flourish](https://flourish.studio/) is a good interactive visualization tool for some pre-set visualizations ([examples](https://flourish.studio/examples/)); I think this is what the Stanford Daily uses...
* [RAWGraphs.io](https://rawgraphs.io/) is the first result for "online data visualization" on Google so it might be good
* Python has [a lot of data visualization libraries](https://mode.com/blog/python-data-visualization-libraries/) - in particular, [`seaborn`](http://seaborn.pydata.org/index.html) is a good library for making beautiful visualizations with few lines of code
* You can also build your data visualization in Google Slides or in a sketching app on a tablet

If you're looking for inspiration on how to visualize your data, Stefanie and Georgina suggest finding the *story* in your data. What do you want to visualize? In our example, the natural instinct might be to visualize the daily amount of trash that Tara and I threw away, but is that really the most interesting? If you saw a visualization like that, you might infer that we threw less trash away on weekends than weekdays, but the inspiration for the project was really about the trash at the dining hall... Instead, a visualization of the origins of the trash would probably be more compelling.

I also asked our staff for different internet repositories for data visualizations. People suggested [/r/DataIsBeautiful](https://www.reddit.com/r/dataisbeautiful/) as a nice place to find inspiration.

# Submitting

<div class="alert alert-danger">
    <span>This assignment will be submitted in groups. <b>Only one member of your group should submit the assignment!</b> Please, that's very important! On the backend, we'll combine your submission based on who was in your group and if there are multiple submissions from your group, some might get overwritten.</span>
</div>

## Cryptography
Submit the following files to Paperless:

1. Your modified `crypto.py`

## Dear data
Submit a text file (link to a Google doc, text file, PDF, etc.) that has the answer to four questions:

1. What did you do?
2. How did you do it? (including how you *measured* it)
3. What did you learn?
4. How did you use Python?

The first three questions are the ["Three Prime Questions" of the Quantified Self movement](https://quantifiedself.com/blog/our-three-prime-questions/), a group of people who try to quantify their entire life. 

In addition, submit your data set, your visualization, and any other files you created for this part of the assignment. All of these files should be submitted to Paperless.

## Groups
Submit the `group_norms.txt` file to Paperless.

Take a moment to reflect on group work. After this point, it'll be a bit more challenging to change groups, so if you'd like to change your groups for any reason, now is the time to let us know. Email your TA with any thoughts/questions/concerns you might have. Although it's rare, people occasionally have significant problems with their group. It's best for everyone to make that known—don't suffer in silence!

# Credit
Much thanks to Sam Redmond (@sredmond), Sherman Leung (@skleung), Python Tutorial, Learn Python the Hard Way, Google Python, MIT OCW 6.189, Project Euler, and Wikipedia's list of ciphers.

The Dear Data assignment was inspired by the book *Dear data* (Lupi, G., & Posavec, S. (2016). *Dear data*. Chronicle books.) and additional inspiration comes from Victor Lee.
