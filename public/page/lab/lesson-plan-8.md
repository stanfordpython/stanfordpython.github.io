# Lesson Plan: Python Standard Libraries (Week 8)

## Pre-Section Preparation
Visit the [Ed Workspace](https://edstem.org/us/courses/2850/workspaces/pV2SwkdsdA8XLUnzLZEi7pywcEJVuwob) and fork it to create your own copy.

## Game Plan
I was not able to cover unit tests in class, so I would love if yall would do an introduction to this topic in your section. Also, I am going to leave around 30 mins for group project work! --Tara

### `unittest [15 mins]`
I think this is one of the most under-covered libraries in Python. Testing is so important but people don't really get strong exposure to it before they leave Stanford. To build a unit test...

1. Create a class which inherits from `unittest.TestCase`
2. Optionally add `setUp` and `tearDown` methods to set up the test and tidy up after the tests have been run
3. Add methods that are named `test_<name>(self)` (where `<name>` is replaced with the name of the test), where each method represents one test
4. Use `self.assert` methods to create assertions within the tests; see a full list in the [documentation of the TestCase class](https://docs.python.org/3/library/unittest.html#test-cases)
5. Run the tests at the command line to run tests from modules, classes, or even individual test methods

    ```
    $ python -m unittest file1 file2
    $ python -m unittest file.TestClass
    $ python -m unittest file.TestClass.test_method
    ```

Here's a sample unit test from the documentation, which highlights some of the assertion methods:

```python
import unittest

class TestStringMethods(unittest.TestCase):
    def test_upper(self):
        self.assertEqual('foo'.upper(), 'FOO')
    def test_isupper(self):
        self.assertTrue('FOO'.isupper())
        self.assertFalse('Foo'.isupper())
    def test_split(self):
        s = 'hello world'
        self.assertEqual(s.split(), ['hello', 'world'])
        # check that s.split fails when the separator is not a string
        with self.assertRaises(TypeError):
            s.split(2)
if __name__ == '__main__':
    unittest.main()
```

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
* Build a slide deck for the zoom game—show three pictures, successively zooming out from an object, and ask people to guess what the object is at each level.

## Concept Review \[15 mins\]

> This is one of our first weeks where students don't need to know everything that we talked about. We intentionally talked about more material with the idea that students would come away with one main takeaway—how to navigate the standard library—and see some cool examples of these functions. As such, you don't need to spend a long time reviewing each of these libraries, but you should probably spend some time talking about Python documentation at a high level and then talking about one or two libraries.

### Reading Python Documentation
The main goal that we have for this week is that, after this week, students will be able to "deftly navigate the Python standard libraries." That's a bit vague, but it basically means that, if students have a problem they're trying to solve, they should be able to look through the Python library documentation, understand it, and identify the library to help them solve it (or determine if one doesn't exist).

Honestly, one of the best tools for this is to Google about your problem and see if other developers have encountered it before, but it helps to be familiar with the way that the Python library is structured and the way that documentation reads. In this lab, we'll practice reading Python documentation that students haven't seen, so this will be the first (and probably only) lab where students will see functions they're entirely unfamiliar with. That's ok!

Let's dive into an example about how to read Python documentation with the first of the many libraries that we covered: `pickle`.

### Example: Reading `pickle`'s Documentation
`pickle`'s documentation is hosted at <https://docs.python.org/3/library/pickle.html>. If you're reading about this module for the first time, you should start with the introduction which usually describes the module at a high level. In this case, the introduction is:

> The pickle module implements binary protocols for serializing and de-serializing a Python object structure. "Pickling" is the process whereby a Python object hierarchy is converted into a byte stream, and "unpickling" is the inverse operation, whereby a byte stream (from a binary file or bytes-like object) is converted back into an object hierarchy. Pickling (and unpickling) is alternatively known as "serialization", "marshalling," or "flattening"; however, to avoid confusion, the terms used here are "pickling" and "unpickling".

Then, you should glance at the table of contents for this module, which lives in the left-hand collapsible bar. In this case, it looks like this: 

> *   [`pickle` — Python object serialization](https://docs.python.org/3/library/pickle.html#)
>     *   [Relationship to other Python modules](https://docs.python.org/3/library/pickle.html#relationship-to-other-python-modules)
>         *   [Comparison with `marshal`](https://docs.python.org/3/library/pickle.html#comparison-with-marshal)
>         *   [Comparison with `json`](https://docs.python.org/3/library/pickle.html#comparison-with-json)
>     *   [Data stream format](https://docs.python.org/3/library/pickle.html#data-stream-format)
>     *   [Module Interface](https://docs.python.org/3/library/pickle.html#module-interface)
>     *   [What can be pickled and unpickled?](https://docs.python.org/3/library/pickle.html#what-can-be-pickled-and-unpickled)
>     *   [Pickling Class Instances](https://docs.python.org/3/library/pickle.html#pickling-class-instances)
>         *   [Persistence of External Objects](https://docs.python.org/3/library/pickle.html#persistence-of-external-objects)
>         *   [Dispatch Tables](https://docs.python.org/3/library/pickle.html#dispatch-tables)
>         *   [Handling Stateful Objects](https://docs.python.org/3/library/pickle.html#handling-stateful-objects)
>     *   [Custom Reduction for Types, Functions, and Other Objects](https://docs.python.org/3/library/pickle.html#custom-reduction-for-types-functions-and-other-objects)
>     *   [Out-of-band Buffers](https://docs.python.org/3/library/pickle.html#out-of-band-buffers)
>         *   [Provider API](https://docs.python.org/3/library/pickle.html#provider-api)
>         *   [Consumer API](https://docs.python.org/3/library/pickle.html#consumer-api)
>         *   [Example](https://docs.python.org/3/library/pickle.html#example)
>     *   [Restricting Globals](https://docs.python.org/3/library/pickle.html#restricting-globals)
>     *   [Performance](https://docs.python.org/3/library/pickle.html#performance)
>     *   [Examples](https://docs.python.org/3/library/pickle.html#examples)

Many of these sections are unique to `pickle`, which is a fairly sophisticated library. Let's jump to the "Module Interface" section which describes the exports of this module in the standard format.

This section (and most Python documentation) is ordered by indentation. The module exports are aligned to the left of the page, and indentation levels are used to nest descriptions. For example, this is the documentation for `pickle.dumps`:

![documentation for pickle.dumps](/img/lab/8-pickle-doc.png)

The name of the function is depicted in bold, and the function signature is reproduced in detail to show which arguments are required/optional and positional/keyword. In the above example, `obj` is the only required argument.

Then, there's an indented description of the function which describes what the function does. This description will refer to parameters in italics and should explicitly say when the function returns something and what the type of that object will be.

Finally, for objects that have their own attributes (like classes and instances), the documentation will typically display these with additional levels of indentation.

### `pickle`

We talked about `pickle` in a bit more detail as well. As the above documentation explains, `pickle` is a library that can be used to store Python objects on your machine and rehydrate them into the Python environment. This can be useful if you're working with an object that you want to save to the machine and work with later. If it's a dictionary or list, you might just want to use the `json` serialization format, but `pickle` works on almost any Python object.

We also gave a cautionary warning: `pickle` is unsafe because it uses the `__reduce__` method to convert the objects to a serialized format. This means that a malicious party could overwrite the `__reduce__` method on a class and use that to run malicious code whenever you unpickle the file.

You can pickle an object with the `dump` method (or `dumps` if you want to return a string):

```python
with open('filename.pkl', 'wb') as f:
    pickle.dump(my_object, f)
```

Note that we have to open the file in `'wb'` or write-as-bytes mode—Pickle uses non-UTF-8 characters, so we need to write a stream of bytes. Similarly, you can unpickle objects with the `load` method:

```python
with open('filename.pkl', 'rb') as f:
    my_object = pickle.load(f)
```

### `pdb`

The Python debugger is analogous to `gdb` for C and C++ programs: it allows you to freeze programs in the middle of execution to debug them. You can do this by placing a `breakpoint` in the program at some point like this:

```python
def fibbi(n):
    if n == 0 or n == 1:
        return n
    
    breakpoint()
    return fibbi(n-1) + fibbi(n-2)
```

The `breakpoint()` function will launch us into the `pdb` tool once its run. So, if I call `fibbi(10)` and run the file, it'll launch me into an environment that looks like this:

```
$ python fibbi.py
> /Users/parth/Desktop/fibbi.py(6)fibbi()
-> return fibbi(n-1) + fibbi(n-2)
(Pdb)
```

You can type commands after the `(Pdb)`. Type `help` to see a list of commands:

```
(Pdb) help

Documented commands (type help <topic>):
========================================
EOF    c          d        h         list      q        rv       undisplay
a      cl         debug    help      ll        quit     s        unt
alias  clear      disable  ignore    longlist  r        source   until
args   commands   display  interact  n         restart  step     up
b      condition  down     j         next      return   tbreak   w
break  cont       enable   jump      p         retval   u        whatis
bt     continue   exit     l         pp        run      unalias  where

Miscellaneous help topics:
==========================
exec  pdb

(Pdb)
```

We talked about `step` in class, which allows you to step through execution line-by-line. You can also type most Python commands, which can be helpful for inspecting the current frame to see what's going on.

```
(Pdb) locals()
{'n': 10}
(Pdb) 
```

### `collections`

We talked about three different objects from `collections`: `namedtuple`, `defaultdict`, and `Counter`.

#### `namedtuple` 
`namedtuple` is function that returns a *class*. The class it returns inherits from `tuple` but adds additional functionality. Here's how you declare a `namedtuple`.

```python:run
import collections

Point = collections.namedtuple('Point', ['x', 'y'])

p = Point(11, 22) # positional arguments...
q = Point(x=11, y=22) # or keyword arguments (or both!)

#Fields are accessible by name! "Readability counts."
-p.x, 2 * p.y # => -11, 44

#readable __repr__ with a name=value style
print(p) # Point(x=11, y=22)
```

Most notably, it allows you to add context to your code. For example, this code doesn't appear to have much context:

```python:run
p = (170, 0.1, 0.6)
if p[1] >= 0.5:
    print("Whew, that is bright!")
if p[2] >= 0.5:
    print("Wow, that is light!")
```

But with `namedtuple`s, it can have much more context:

```python:run
Color = collections.namedtuple("Color", ["hue", "saturation", "luminosity"])

pixel = Color(170, 0.1, 0.6)
if pixel.saturation >= 0.5:
    print("Whew, that is bright!")
if pixel.luminosity >= 0.5:
    print("Wow, that is light!")
```

#### `defaultdict`
The `defaultdict` function creates a dictionary with a "factory function". That is, if you try to access a dict key which doesn't exist, Python will automatically insert that key into the dictionary with the value provided by the factory function.

This allows you to eliminate most instances of checking `if key in dictionary` where you'd insert a default value.

```python:run
import collections

input_data = [('yellow', 1), ('blue', 2), ('yellow', 3), ('blue', 4), ('red', 1)]

output = collections.defaultdict(list) # or lambda: list()
for k, v in input_data:
    # don't have to initialize output[k]
    output[k].append(v)

print(output)
```

### `Counter`
In many ways, `Counter` behaves like a `defaultdict` with default value 0, but its construction mechanics are different. `Counter` can be initialized over a collection and automatically counts the items in that collection.

```python:run
import collections
s = 'mississippi'

count = collections.Counter(s)
print(count) # => Counter({'i': 4, 'm': 1, 'p': 2, 's': 4})
```

This eliminates most situations where you'd previously loop over a collection and add one to some variable to keep track of something. `Counter` also supports basic arithmetic and the `most_common` function is quite useful:

```python:run
Counter('abracadabra').most_common(3) # => [('a', 5), ('b', 2), ('r', 2)]

Counter('which') + Counter('witch') # => Counter({'c': 2, 'h': 3, 'i': 2, 't': 1, 'w': 2})
Counter('abracadabra') - Counter('alakazam') # => Counter({'a': 1, 'b': 2, 'c': 1, 'd': 1, 'r': 2})
```

### `itertools`
Tara hasn't decided which functions she wants to cover in `itertools` yet, but I'll update this page once he does.

### `functools`
`functools` is full of useful stuff, and we picked out two mini-examples to share with students.

#### `functools.wraps`
`functools.wraps` is a decorator that can be used inside of decorators. You can use it to inject the properties of a wrapped function onto its wrapper. Suppose I write a nice function with a docstring and want to decorate it.

```python
def timeit(fn):
    def timed(*args, **kwargs):
        start = time.time()
        out = fn(*args, **kwargs)
        end = time.time()

        print(f"Took {end - start:.2f} seconds")
        return out
    return timed

@timeit
def fibbi(n: int) -> int:
    """
    Computes the n-th Fibonacci number in linear time and returns the value.

    Arguments
    ---------
    n -- The index of the Fibonacci number to compute.
    """
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

Now, `fibbi` has been replaced with `timeit(fibbi)` which is really the `timed` function in disguise. In particular, `fibbi` no longer has its docstring!

```
In [1]: fibbi?
Signature: fibbi(*args, **kwargs)
Docstring: <no docstring>
File:      ~/Desktop/<ipython-input-8-28a3e757943e>
Type:      function
```

The `wraps` function helps us fix this. You can write decorators like this:

```python
def timeit(fn):
    @functools.wraps(fn)
    def timed(*args, **kwargs):
        start = time.time()
        out = fn(*args, **kwargs)
        end = time.time()

        print(f"Took {end - start:.2f} seconds")
        return out
    return timed
```

Here, `functools.wraps` will apply the attributes from the original `fn` onto the new, decorated function. Implemented this way, the decorated `fibbi` will retain its docstring and signature:

```
In [1]: fibbi?
Signature: fibbi(n: int) -> int
Docstring:
Computes the n-th Fibonacci number in linear time and returns the value.

Arguments
---------
n -- The index of the Fibonacci number to compute.
File:      ~/Desktop/<ipython-input-12-15521edd2b41>
Type:      function
```

#### `partial`
The `partial` function allows you to bind arguments to an already existing function. For example, suppose that you need to use the `textwrap.fill` function in different places in your program, but each time you call it you want to have the same customization. You always want `width = 80, tabsize=4, replace_whitespace=False, drop_whitespace=True`. Instead of specifying those parameters each time, you could just build a function which automatically injects those parameters into the `textwrap.fill` function like this:

```python
my_fill = functools.partial(textwrap.fill, width=80, tabsize=4, replace_whitespace=False, drop_whitespace=True)

my_fill('text to be filled') 
#=> textwrap.fill('text to be filled', width=80, tabsize=4, replace_whitespace=False, drop_whitespace=True)
```

### `threading`

You're probably familiar with the concept of threads. They're lightweight processes that share the same heap as their parents. Multithreading in Python is kinda broken because of something called the Global Interpreter Lock (GIL). Each Python process is only given one interpreter, so even if you have multiple threads, it's really just one interpreter hopping back and forth between the processes.

So why would you use threading? If the delay in each thread is due to somebody else, you can still speed up the program. For example, when you make a web request, the computer spends most of its time waiting for the response, not doing activity. So, one interpreter could go to a thread, launch the request, and then go to the next thread (without waiting for the thread to finish).

The `queue` module implements a threadsafe queue. In this example, we use the queue

```python
import threading, queue
import requests

tasks = queue.Queue()
output = queue.Queue()

def worker():
    while True:
        url = tasks.get()
        r = requests.get(url)
        output.put(r.json())
        tasks.task_done()

#create 8 threads
for _ in range(8):
    threading.Thread(target=worker, daemon=True).start()

#send 30 requests
for i in range(1, 31):
    tasks.put(f'https://jsonplaceholder.typicode.com/todos/{i}')

#block until the tasks are done
tasks.join()
while not output.empty():
    res = output.get()
    print(res)
```

### `re`

`re` is the regex library in Python. We talked about two different functions here.

#### `re.match`

`re.match(pattern, string)` applies the regex specified by `pattern` and looks for matches at the *beginning* of the `string`. It returns a match object, which might seem a bit unfamiliar, but here's what you need to know.

* The truthiness of a match object is determined based on whether a match was found or not.
* The match object supports a `.group` method, which allows you to pull out different subgroups of the match.

```python
m = re.match(r"(\w+) (\w+)", "Isaac Newton, physicist")
#The entire match
m.group(0) # => 'Isaac Newton'

#Parenthesized subgroups
m.group(1) # => 'Isaac'
m.group(2)# => 'Newton'
```

#### `re.findall`
`re.findall(pattern, string)` applies the regex to the entire string and returns a list of matches. It doesn't support subgroups because it returns a list of strings, not a list of matches.

## Problems \[45-50 mins\]
Please start with the unit test problem :)

### Libraries we've covered
Because we've already covered these libraries, we focus on going more in depth with each of them.

* `collections` problems focus on using `collections` to write cleaner code (by rewriting messy code); students can also implement Keith Schwarz's CS 106B "Evil Hangman" in Python
* `itertools` just has one problem, which generates a computation lookup table - it's pretty straightforward and uses `itertools.count`
* `re` has some really cool problems which range from data extraction to simple puzzles to an NP-hard problem to find a minimal regex given a collection of positives and negatives - I suggest you pick one to walk through if you do it as a class
* `unittest` has students diagnose the bug in some Python code by writing test cases

### New libraries
These new libraries problems definitely require some knowledge of context but the point is just to showcase seome of the cool things Python can do and point people towards the documentation.

* `base64` is probably my favorite problem - we've encrypted a neat message in binary and base64
* the undisclosed library (which is really `graphlib`) is a close second - did you know Python can do topological sorting for you??
* `contextlib.redirect_stdout` is incredibly useful for moving between strings and integers - this is used to capture the printed output of other functions
* `wave` is used in a slightly artificial way here, but the library is really neat and allows you to break `.wav` files into frames
* `threading` is super useful and we use it in a small example to download images

## Group work \[rest of time\]
