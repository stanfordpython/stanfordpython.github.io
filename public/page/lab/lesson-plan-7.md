# Lesson Plan: Functional Programming (Week 7)

[[TOC]]

## Pre-Section Preparation
Visit the [Ed Workspace](https://edstem.org/us/courses/2850/workspaces/p2DbNM2ycZt6iMpxsyVLGrspUqpmgliU) and fork it to create your own copy.

## Community Building \[5 mins\]

Here are some ideas for community building activities (mostly these are the same as last week, with the top one being a new addition):
* Ask everyone a Would You Rather question; there's a list in [this folder](https://drive.google.com/drive/folders/1SobifNwo_dPMA_dO78IUVUuyATwlqF9N?usp=sharing)
* Have people sign up to lead a community building activity each week by adding their name to a Google Doc; then, each week, they'll be in charge of doing some sort of icebreaker during the first 5 minutes of section or so
* Ask people to send you their favorite meme/video/song/picture/... and share during section.
* Ask people to DM you a fun fact about themselves and then share the fun facts; have them guess whose it was.
* Ask people to share the last picture they took on their phone (that they're comfortable with) and share about it.
* Play a (short) game like skribbl.io!
* Build a trivia quiz (maybe from the trivia API?) and see if your students can figure it out.
* Show and tell: ask everyone to get an object from their room that represents how they're feeling right now and share with the class.

## Concept Review \[15-20 mins\]

I've allocated 15-20 minutes for concept review this time because there's a lot more that people may be unfamiliar with this time around.

### Iterators
An iterator is...a thing that can be iterated over. It's kind of uninteresting on its own, but the idea is that when Python loops over, say, a list, it first builds an *iterator* from the list and loops over that. Once the iterator is complete, it raises `StopIteration` to signal that it's out of items.

```python
l = [1, 2, 3]

i = iter(l)

next(i) # => 1
next(i) # => 2
next(i) # => 3
next(i) # => StopIteration
```

Thus, the construction `for x in iterable` works like

```python
i = iter(iterable)
while True:
    try:
        x = next(i)
    except StopIteration:
        break
    
    do_something_to(x)
```

You can build custom objects that can be iterated over by implementing the `__iter__` method as a generator (see below).

### Generators
Generator functions are ways of creating iterables through the Python function construction. The paradigm is that you build a function which `yield`s values while it's executing; Python converts that into a generator. The function doesn't have to loop infinitely, but infinite sequences are a compelling reason to create a generator.

```python
def fibbi():
    a, b = 0, 1
    while True:
        a, b = b, a + b
        yield a

g = fibbi()

next(g) # => 1
next(g) # => 1
next(g) # => 2
next(g) # => 3
next(g) # => 5
next(g) # => 8
```

This generator continues forever but you can create a finite generator by `return`ing at some point during the function's execution. You can also create a generator comprehension which lazily executes using parenthesis:

```python
# doesn't compute the value for the entire range immediately:
g = (i ** 2 for i in range(10_000_000_000))

next(g) # => 0
next(g) # => 1
next(g) # => 4
next(g) # => 9
next(g) # => 16
```

This can be useful for doing things like membership checking. For example, you might check if `desired_value in (expensive_operation(elem) for elem in collection)`.

### Functions as Objects
This shouldn't be too confusing, but we used it as a way to segue into the idea of decorators. Briefly: because functions are objects, you can pass them into functions as parameters and return them from functions.

### Decorators
Decorators are functions which do both of the things above—they take a function as a parameter and they return a function as output. In this way, they can take a function, "dress it up" (modify it), and then return the modified function. For example, this decorator returns a new function which behaves the same as the original function except prints out the time that it took to execute:

```python
from time import time

def timeit(fn):
    def timed(*args, **kwargs):
        start = time()
        out = fn(*args, **kwargs)
        end = time()

        print(f"Took {end - start:.2f} seconds.")
        return out
    
    return timed
```

Notice that the inner function, `timed`, has a generic signature. That's so it'll support any `fn` as input. Note also that we return `out` from the inner function and `timed` from the outer function. That way, it can be used like this:

```python
def fibbi(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

timed_fibbi = timeit(fibbi)
```

Because we returned `timed` from the inner function, `timed_fibbi` is in fact a function and references the original `fibbi` function in its implementation. If we wanted to, we could even have written `fibbi = timeit(fibbi)`, overwriting the value of `fibbi` in the global namespace. Python offers a different syntax for this, as well:

```python
@timeit
def fibbi(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

The `@timeit` syntax will automatically replace `fibbi` with `timeit(fibbi)`.

### Map, Filter
Map and filter are functional replacements for comprehensions. They return generators instead of evaluating the `map` or `filter` function all at once.

Other than that, these two are analogous:

```python
[fn(x) for x in collection]
map(fn, collection)
```

and these two are analogous

```python
[x for x in collection if condition(x)]
filter(condition, collection)
```

You might prefer `map` and `filter` over the comprehension if the `collection` is very large (or infinite) or if the `fn` and `condition` are expensive or you don't want them computed on teh entire collection all at once.

### Lambda
Lambda functions are small, anonymous functions that are usually immediately passed to other functions. The syntax is `lambda [params]: [output value]`. For example:

```python
filter(lambda x: x.isnumeric(), lst)
```

## Problems \[45-50 mins\]
You'll notice that we don't have group work time anymore! It seems that groups aren't always in the same section enough for us to plan around that, so we've cut that time to focus more on the problems.

<!-- TODO: Finish -->

## Let students out 10 minutes early
Because why not? It's week 7—let's give people their time back 😊

## [Weekly Reflection](https://forms.gle/5mvxfu5bJS3ZukJx7)
Click the header link above to access this week's reflection. Have an absolutely lovely weekend everyone!