# Lesson Plan: Data Structures and Basics (Week 2)

Welcome to section, everyone! Thanks so much for volunteering your time to make CS 41 a reality. The purpose of this lesson plan is to help you organize your section and decide which topics you'll cover and how. **Everything here is a suggestion:** your students want to spend time with you, so use this as a springboard!

That said, here's one idea for how you might plan your section.

[[TOC]]

## Pre-Section Preparation
Visit the [Ed Workspace](https://edstem.org/us/courses/20141/workspaces/pv4UmiB0x8CWst1CLWxxZHgZ1JLtEAru) and fork it (by clicking on the toolbar button that has two arrows diverging) to make a copy that you own. You can edit this copy and use it during section. You're welcome to share your screen and talk through the problems, move the problems to a slide deck, ask students to make their own forks of the workspace, ...

## Introductions \[15 mins\]
Spend a good amount of time on introductions! It really goes a long way towards creating an atmosphere in your section where people feel comfortable engaging in the material. It might seem trivial now, but it'll matter more in Week 8 (when everything's stressful) if people feel comfortable in your section.

Here are some ideas for introductions/icebreakers:
* Have everyone introduce themselves by describing their slide in [this deck](https://docs.google.com/presentation/d/1tSWBibH_AJv4qpqV7J0aAwfyN30u6nrg-rcEgN1yXco/edit)
* Ask everyone a Would You Rather question; there's a list in [this folder](https://drive.google.com/drive/folders/1SobifNwo_dPMA_dO78IUVUuyATwlqF9N?usp=sharing)
* Have people sign up to lead a community building activity each week by adding their name to a Google Doc; then, each week, they'll be in charge of doing some sort of icebreaker during the first 5 minutes of section or so
* Ask people to send you their favorite meme/video/song/picture/... and share during section


## Concept Review \[10-20 mins\]
<div class="alert alert-info">
    <span>Parth and Tara will be free during your section, so if something urgent comes up (a Python setup issue, a quesiton about the assignment) and you can't refer it to Ed, you can slack us and we will answer or come to your section</span>
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
def is_word(guess):
    with open(WORDS_FILE, 'r') as f:
        for line in f:
            line = line.strip()
            if line == guess:
                return True
    return False


def get_definition(guess):
    with open(DEFINITIONS_FILE, 'r') as f:
        for line in f:
            line = line.strip()
            colon_idx = line.find(':')

            word = line[:colon_idx]
            meaning = line[colon_idx + 1:]

            if guess == word:
                return meaning


def main():
    """
    A chatbot which repeatedly prompts the user for a word and checks if it's in
    the dictionary.
    """
    print("Hi! My name is Parth, your friendly dictionary chatbot.")
    print("Enter a word and I'll tell you if it's in the dictionary.")

    while True:
        word = input("> ")
        word = word.lower()
        word = word.strip(' ?!')

        # conditionally, breaking out of the loop
        if word == '':
            break

        # doing something with that input
        if is_word(word):
            definition = get_definition(word)
            print(f"Yes! {word} is a word! The definition is: {definition}.")
        else:
            print(f"No! {word} is not a word.")


if __name__ == '__main__':
    main()
```

And, Tara talked about tuples, lists, dictionaries, and sets.

Students may have questions about their assignment, so it might be worth taking a moment to review [the spec](https://stanfordpython.com/#/page/assignment-0).

## Comprehensions Review \[5-10 mins\]

In Tuesday's lecture, Tara covered the basics of comprehensions and had the students write some basic ones of their own. It will be important to review this material for it can be challenging and scary at first!

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


## Problems \[remaining time (60ish mins)\]
There are two files in [the section workspace](https://edstem.org/us/courses/20141/workspaces/pv4UmiB0x8CWst1CLWxxZHgZ1JLtEAru): `workbook.saturn` and `solutions.saturn`. If you haven't used Saturn before, it's Ed's implementation of Jupyter Notebook. As it sounds, the workbook has problems and the solutions file has solutions to those problems. It's up to you if you want to give both of these files to students; otherwise, you'll have to split them up
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
