# Lesson Plan: OOP (Week 3)

Welcome to section, everyone! Thanks so much for volunteering your time to make CS 41 a reality. The purpose of this lesson plan is to help you organize your section and decide which topics you'll cover and how. **Everything here is a suggestion:** your students want to spend time with you, so use this as a springboard!

That said, here's one idea for how you might plan your section.

[[TOC]]

## Pre-Section Preparation
Same as last time. Visit the [Ed Workspace](https://edstem.org/us/courses/2850/workspaces/p6Pw5MmeBGxICT1Yw8WpgEqpNCUX2bHC) and fork it (by clicking on the toolbar button that has two arrows diverging) to make a copy that you own.

## Community Building \[5 mins\]
Here are some ideas for community building activities:
* Ask everyone a Would You Rather question; there's a list in [this folder](https://drive.google.com/drive/folders/1SobifNwo_dPMA_dO78IUVUuyATwlqF9N?usp=sharing)
* Have people sign up to lead a community building activity each week by adding their name to a Google Doc; then, each week, they'll be in charge of doing some sort of icebreaker during the first 5 minutes of section or so
* Ask people to send you their favorite meme/video/song/picture/... and share during section
* Ask people to DM you a fun fact about themselves and then share the fun fact and have them guess whose it was.


## Concept Review \[10 mins\]
Take some time to go over anything people have questions about. As a reminder...
* ...try to make this time formative: don't just ask "what is a class?" but rather, design activities that merely completing will result in learning.
* ...if you get a logistical question: try not to give the wrong answer if you're not sure and refer students to Ed.
* ...if you get a question you don't know the answer to: there's a lot of value in showing students how to explore the Python world and get answers to their own questions; you can also slack Parth.

In class, we talked about **Object-Oriented Programming**. It was motivated through an example involving students and classes at Stanford. We built data structures to represent students and courses and then we represented both as classes, modeling relationships between them using the class methods.

<details>
    <summary>Click to see more</summary>
    <span>We had a <code>Student</code> class with a <code>.name</code>, <code>.sunet</code>, <code>.history</code>, and <code>.enrolled</code> attributes. They are what they sound like; history and enrolled kept track of past and current courses that students had taken. We also had a <code>Course</code> class with name, department, quarter, and prerequisite attributes. We used magic methods to check if <code>student in course</code>.</span>
</details>
<br />

Students may have questions about their assignment, so it might be worth taking a moment to review [the spec](https://stanfordpython.com/#/page/assignment-1). If the students don't have a group, we're allowing them to complete this assignment individually with the requirement that they find a group by the end of the assignment.


## Problems \[65 mins\]

### Designing Basic Classes
This is the most important section in this handout. It targets the overall learning goal for this class—that students, confronted with a programming problem, can identify or design the appropriate data structure to solve the problem in Python. We've created a bunch of "common" situations for which a programmer might need to create a data structure and this activity walks students through creating it.

You'll notice that the assignment workbook is not very descriptive for these problems. The impetus is on you to add the scaffolding that your students need. Here's what I had in mind for each of these problems:

1. Have students brainstorm the properties of the things they're modelling. You could even ask students to brainstorm what additional classes they might need to solve the problem (though this might be difficult for many). For example, you could ask "What properties does a recipe have?" You might get "time to complete, difficulty, ingredients, name, author, rating."
2. Collate these and coax them towards a reasonable implementation. For the recipe example, we've implemented another `Ingredient` class and the `Recipe` stores a `dict` mapping `Ingredient`s to amounts (stored as a number). You might coax your section towards the idea that each ingredient needs an amount associated with it and then brainstorm data structures.
3. Write the code at whatever level of complexity that you've arrived at from (1) and (2).

This strategy means that you should familiarize yourself with the solution code and think of "breakpoints" - if your section can't get to the (very high) level of complexity that we've implemented, what's a reasonable stopping point before they reach there?

I'd recommend that you have students brainstorm step (1) on a Google Slides document like [this one](https://docs.google.com/presentation/d/1nGjYDZp6x6ummO_V6Dw15hBUH2aoqBeca7tYXrllkFA/edit), but it's up to you. Then, you could sketch out the design on another slide while students share out from breakout rooms. Finally, you could hop over to Ed to write the code.

#### To Do List
I'd suggest the To Do list problem as a very basic problem which doesn't implement too many functions and where each of the classes are fairly short. The idea is that each to do belongs to a to do list - each to do list has a topic, so you can keep track of multiple to do lists. The to do list is basically just a container for to do items, which implements some filtering functionality.

Note that our solution for the `ToDoList` class loops over the entire collection of entries in `get_completed`, which might not be the most efficient way to get the subset of entries which are complete. This is something worth discussing in your section! What's a better way to store it? What if one item belongs to multiple to do lists? This isn't a class on data structures (though there is one!) so we won't go into depth about this, but it's something to consider.

Sample data:

```python
shopping = ToDoList('Shopping')
work = ToDoList('Work')

work.add(ToDo('brew potion'))
work.add(ToDo('cast evil spell'))
work.add(ToDo('clean broomstick'))
work.add(ToDo('feed cat'))

shopping.add(ToDo('milk'))
shopping.add(ToDo('band-aids'))
shopping.add(ToDo('coffee beans'))
shopping.add(ToDo('soap'))

# shared items
frogs = ToDo('frogs')
cat_food = ToDo('cat food')

work.add(frogs)
work.add(cat_food)
shopping.add(frogs)
shopping.add(cat_food)
```

#### Tournament
The `Player` and `Tournament` classes help you manage a tournament of people (imagine like a high school debate competition... too nerdy?). Each `Player` might have a few metadata properties (name, age), but the most important thing about this class is the `rating` attribute and how it's managed. The `Tournament` class manages the `rating` attribute on the children, which is a big difference in Python compared to other languages (all attributes are public).

Also note that we've implemented comparison magic methods on the `Player` objects; this is so that we can sort them down below!

```python
antonio = Player('Antonio', 21)
theo = Player('Theo', 21)
jose = Player('Jose', 20)
elizabeth = Player('Elizabeth', 21)

t = Tournament([antonio, theo, jose, elizabeth])

michael = Player('Michael', 22)
t.add_player(michael)

t.record_result(antonio, michael, winner=antonio)
t.record_result(michael, jose, winner=michael)
t.record_result(jose, elizabeth, winner=elizabeth)
t.record_result(antonio, elizabeth, winner=elizabeth)
t.record_result(elizabeth, theo, winner=elizabeth)

t.get_current_rankings()
# => [<Jose (980)>, <Theo (990)>, <Michael (1000)>, <Antonio (1010)>, <Elizabeth (1020)>]
```

#### Recipe
This is probably the trickiest of the three classes and you can go in many different directions with this one. You'll notice we've implemented a very large vertical hierarchy of classes to represent a recipe, but that's not necessary. There are lots of linkages and mathematical operations that could come out of this. You could sort recipes or sort collections of ingredients. You could build a `Pantry` object and implement functions to make a recipe. The world is truly your oyster
here.

Here's some sample data assuming that you're interested in the cost of recipes.

```python
wolfsbane = Ingredient('wolfsbane', 1.50)
coffin_nails = Ingredient('coffin nails', 8.00)
lemon_zest = Ingredient('lemon zest', 1.00)
cows_tongue = Ingredient("cow's tongue", 14.00)
clover = Ingredient('four-leaf clover', 3.00)
moss = Ingredient('moss', 0.50)
wishbone = Ingredient('wishbone', 4.00)

love_potion = Recipe(
    'Love Potion',
    'breakfast', 
    ['1. combine all ingredients in a large pot', '2. boil'],
    {
        lemon_zest: 3,
        cows_tongue: 1,
        clover: 4,
        wishbone: 1
    }
)
immortality_potion = Recipe(
    'Immortality Potion',
    'dinner', 
    ['1. grind all ingredients into a powder', '2. mix with water', '3. ...', '4. profit'],
    {
        coffin_nails: 1,
        wolfsbane: 2,
        clover: 2,
        moss: 4,
        wishbone: 1
    }
)

book = RecipeBook()
book.add(love_potion)
book.add(immortality_potion)
book.find_recipes('dinner') # => [<Recipe: Immortality Potion>]
```

### Magic Methods

We'll have talked about some magic methods, but we won't have covered them in much depth. Magic methods provide a way to build objects that can interact with the rest of the Python ecosystem as most Python operations actually call a magic method on the objects.

For example,
```python
a + b # => a.__add__(b)
```

This is a little misleading, though, because if `a.__add__(b)` returns `NotImplemented`, Python will next try `b.__radd__(a)`. That probably won't come up since in our examples, we mostly deal with adding/subtracting/multiplying/comparing objects of the same type.

The problems in this section are mostly mathematical (`Polynomial` and `Vector`), but musical notes is a really nice deviation from that trend! The type of letter wrapping that is done in `MusicNote` is **very useful** for the Caesar cipher on their assignment.

### Exceptions
@Michael, could you fill this in?

### Inheritance
We covered inheritance at a conceptual level in the [Lecture 3 handout](http://stanfordpython.com/#/page/handout/data-model). We've talked about how an object can be an instance of multiple types and how the `__mro__` method reveals all of the types of an object.

For example,
```python
type(True).__mro__ # => (bool, int, object)
```
shows how booleans inherit from integers, so we can do integer-like operations on booleans. It looks strange, but this is valid Python code:
```python
(True + 1) * 10 + 5 # => 25
```

Here's a collection of slides explaining more of the syntax of inheritance if you want to teach it in section: <>.
