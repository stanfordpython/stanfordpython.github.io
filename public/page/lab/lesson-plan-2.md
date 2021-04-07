# Lesson Plan: Data Structures and Basics (Week 2)

Welcome to section, everyone! Thanks so much for volunteering your time to make CS 41 a reality. The purpose of this lesson plan is to help you organize your section and decide which topics you'll cover and how. **Everything here is a suggestion:** your students want to spend time with you, so use this as a springboard!

That said, here's one idea for how you might plan your section.

## Pre-Section Preparation
Visit the [Ed Workspace](https://edstem.org/us/courses/2850/workspaces/p83ckOmKDW3ojOUCtOtAPiSomXitcbED) and fork it (by clicking on the toolbar button that has two arrows diverging) to make a copy that you own. You can edit this copy and use it during section. You're welcome to share your screen and talk through the problems, move the problems to a slide deck, ask students to make their own forks of the workspace, ...

## Introductions \[10 mins\]
Spend a good amount of time on introductions! It really goes a long way towards creating an atmosphere in your section where people feel comfortable engaging in the material. It might seem trivial now, but it'll matter more in Week 8 (when everything's stressful) if people feel comfortable in your section.

Here are some ideas for introductions/icebreakers:
* Have everyone introduce themselves by describing their slide in [this deck](https://docs.google.com/presentation/d/1tSWBibH_AJv4qpqV7J0aAwfyN30u6nrg-rcEgN1yXco/edit)
* Ask everyone a Would You Rather question; there's a list in [this folder](https://drive.google.com/drive/folders/1SobifNwo_dPMA_dO78IUVUuyATwlqF9N?usp=sharing)
* Have people sign up to lead a community building activity each week by adding their name to a Google Doc; then, each week, they'll be in charge of doing some sort of icebreaker during the first 5 minutes of section or so
* Ask people to send you their favorite meme/video/song/picture/... and share during section

## Cocktail Parties \[15 mins\]
<div class="alert alert-danger">
    <span>This section is only for folks who have students who aren't in groups - Antonio, Theo, and Jose</span>
</div>

If you have asynchronous students, they may not be in project groups yet. Spend the next 15 minutes of class assigning them to project groups. There are a few different ways to do this, and you may have your own approach, but I'd recommend "cocktail parties." Here's how to run a project cocktail party:
* Tell students they have to form project groups of 2-4 students and you're going to help them do that; we're going to go into breakout rooms and people should chat about potential final project ideas with the goal of forming groups
* Create a Google Doc where people can write down their project groups, name their project group (e.g., Team Unicorn), and write down the topic they want to work on 
* Assign people to breakout rooms of 3-4 students for 5 minutes
* Re-do the above step, assigning people to breakout rooms again with 3-4 different people, for 5 minutes
* Give students some time to reflect, message each other, and finalize their groups

<div class="alert alert-warning">
    <span>At the end of section, <b>message Parth the groups on Slack</b>. Each group should have a list of students, a team name, and a tentative topic (can be broad).</span>
</div>

## Concept Review \[10-20 mins\]
<div class="alert alert-info">
    <span>Parth and Michael will be free during your section, so if something urgent comes up (a Python setup issue, a quesiton about the assignment) and you can't refer it to Ed, you can slack us and we will answer or come to your section</span>
</div>

Design some activity where students have to recall some of the stuff they learned during lecture. It can be simple (e.g. "Here are some of the concepts we learned during lecture; let's review some of them") or more complex (e.g. "Make a concept map or visual representation of this concept"). Either way, try to make it formative—make sure you're not just assigning busy work and that the *process of doing the activity* will actually result in learning.

Take some time to go over anything people are concerned about. As a reminder...
* ...if you get a logistical question: try not to give the wrong answer if you're not sure and refer students to Ed.
* ...if you get a question you don't know the answer to: there's a lot of value in showing students how to explore the Python world and get answers to their own questions; you can also slack Parth.

In lecture, we covered functions, control flow, and numbers, which we summed up by writing a function that determines whether a number is prime:
```python
def is_prime(n):
    for i in range(2, n):
        if n % i == 0:
            return False
    return True
```

We also talked about strings and files and built a chatbot that can provide the definitions for words in the dictionary.
```python
def get_definition(guess):
    """
    Reads a file called 'definitions.txt' line-by-line to extract a the meaning
    of the parameter (guess). Each line in 'definitions.txt' should be
    formatted like {word}:{meaning}, because this function splits each line at
    the first colon.

    Returns the meaning (string) if the word is in the file or None otherwise.
    """
    with open('definitions.txt', 'r') as f:
        for line in f:
            line = line[:-1]
            colon_idx = line.find(':')

            word = line[:colon_idx]
            meaning = line[colon_idx + 1:]

            if word == guess:
                return meaning


def chatbot():
    print("I'm Webster, your friendly dictionary chatbot!")
    print("Enter a word and I'll tell you the definition.")

    while True:
        guess = input("> ")
        meaning = get_definition(guess)

        if meaning is None:
            # we didn't use `is None` in class, but students should be able to
            # figure it out
            print("That's not a word!")
        else:
            print(f"That means '{meaning}'.")
```

And, Michael talked about tuples, lists, dictionaries, and sets.

Students may have questions about their assignment, so it might be worth taking a moment to review [the spec](https://github.com/stanfordpython/python-assignments/blob/main/assign0/README.md).

## Comprehensions \[10-15 mins\]

In Tuesday's lecture, Michael didn't have time to cover comprehensions, so in this lab, we're going to ask you to discuss the motivation and syntax behind comprehensions. What follows is a suggestion of what to teach, and how to teach it - you should feel free to modify the below based on your section and their comfort with comprehensions as you teach it.

### How to teach comprehensions

* Students should see the formal syntax of list comprehensions, so that they can map the formal syntax to the examples that they see. We've put together some visuals [in this Keynote presentation](https://drive.google.com/file/d/1iahOpGaBxB7QHyaoTSzYCSQdR9YzlnlD/view?usp=sharing) that you might find helpful.
* Examples are _awesome_ - especially with comprehensions, lots of little examples can go a long way in building understanding. Leverage the problems in the lab handout to this effect, and if you're looking for more comprehensions problems, [our archive](https://github.com/stanfordpython/python-labs/blob/master/archive/notebooks-win19/lab2-datastructures-notebook.ipynb) contains a few extra comprehensions problems (in addition to those we've included in this lab notebook).
* We'd recommend taking 5 minutes or so presenting the formal syntax of list comprehensions, either from the slides, or using a code demo, along with a couple examples. Feel free to use the above writeup of list comprehensions - and the visuals in the Keynote - as a guide for how this presentation might go. After that, we'd recommend having your students spend 10-15 minutes working through the comprehensions problems from this lab in small groups.

The rest of this section will be an overview of comprehensions themselves, so that you can be comfortable with them when presenting to your students.

### What are comprehensions? Why are they important?

Comprehensions are a condensed syntax to construct collections with certain properties. This is best illustrated with an example.

Assume that you'd like to define a list containing all odd square numbers below `10**2`. We might approach such a problem as follows:
```python
odd_square_below_100 = []
for i in range(10):
    if i**2 % 2 != 0:
        odd_square_below_100.append(i**2)
```

Though this code will get the job done, it's a bit cumbersome. A list comprehension to construct the following list might appear as follows.

```python
odd_square_below_100 = [i**2 for i in range(10) if i**2 % 2 != 0]
```

This syntax allows us to construct a complex object on the right hand side of the equals sign, and assign that object to a variable - all in one line of code.

### What is the syntax of comprehensions?

In the general case, list comprehensions use the following syntax:

```python
[f(x) for x in iterable if condition(x)]
```

This square brackets in the syntax indicate that we are constructing a list. The expression inside the square brackets indicates that the list is to be composed of the function `f`, applied to elements of `iterable` for which `condition(x)` holds. 

In the above example, we used `i` instead of `x` as our loop variable. We can then see that `f` is `i**2`, `iterable` is `range(10)`, and the `condition` is `i**2 % 2 != 0`.

A set comprehension can be defined in the same way as a list comprehension, except that curly braces - rather than square brackets - are used to indicate that a set is being defined.

```python
{f(x) for x in iterable if condition(x)}
```

Python also supports dictionary comprehensions, which use the following syntax:

```python
{f(k):g(v) for k, v in iterable if condition(k, v)}
```

Though dictionary comprehensions may look a little more intimidating at first, they're a direct extension of what we've seen with list and set comprehensions, only this time, functions, iterables, and conditions are applied over both keys and values. To extend our previous example slightly, if we wanted to compose a dictionary of `i:i**2` key-value pairs, containing all `i**2` for which `i**2` is an odd number less than `100`, we might write the following dictionary comprehension:

```python
{i:i**2 for i in range(10) if i**2 % 2 != 0}
```


## Problems \[remaining time (20-50 mins, depending)\]
There are two files in [the section workspace](https://edstem.org/us/courses/2850/workspaces/p83ckOmKDW3ojOUCtOtAPiSomXitcbED): `workbook.saturn` and `solutions.saturn`. If you haven't used Saturn before, it's Ed's implementation of Jupyter Notebook. As it sounds, the workbook has problems and the solutions file has solutions to those problems. It's up to you if you want to give both of these files to students; otherwise, you'll have to split them up
yourself.

Here's some information about the problems in the handout:

1. **Fizzbuzz** is a classic problem - add up all the multiples of 3 and 5 below some number. I'd suggest you skip this problem unless your section is struggling a bit more with the basics.

2. **Flip Dictionary** is a truly fantastic problem; Chris Piech once called it the "ultimate 106A problem" (meaning if you can do this problem, you know all of 106A). It allows you to discuss several different python philosophies and there are multiple implementations of this problem. Will you use a library? Will you use the default parameter in `dict.get`? You could even do it in one line:

    ```python
    return {v: [k for k in d.keys() if d[k] == v] for v in d.values()}
    ```

    We didn't include that because it's not the most readable, but if someone wants to play code golf, there ya go!

3. "**List Comprehensions** are one of the coolest things about Python" - Antonio Ferris. They are! They make a lot of things in Python easier, and in the Python community, list comprehensions are a big part of what makes Python exciting. A word of warning, though: list comprehensions are not always the most readable solutions for our problems. Think about when list comprehensions are the appropriate strategy and maybe even discuss that in the problem.

4. **Compound Data Structures** are interesting to encounter and work with, but they kinda harken back to 106A. That is, deciding how to build a data structure is a 106A problem. Instead of focusing on that, we want to work on what's unique to Python. What's easy/hard about building, using, and choosing these data structures? With enough scaffolding, you might even ask your students "What's another problem you could use this data structure for?".

    The first compound data structures problem also lends itself really nicely to some fun list comprehension solutions, so that might be fun to discuss if your students like list comprehensions.

5. **Triad Phrases** is a problem about string slicing. It's a really cute problem about string slicing, especially for people who are interested in linguistics and text analysis.

6. **Pascal's Triangle** is meant to show students an unusual application of the `zip` command. Note that students probably won't naturally come up with the solution in the solutions file. How do you want to get them there? Is the solution even something that you want students to see/implement?

## [Fill Out the Post-Reflection](https://forms.gle/8L18K5EQJrpuE7pPA)
It should take ~10 minutes.
