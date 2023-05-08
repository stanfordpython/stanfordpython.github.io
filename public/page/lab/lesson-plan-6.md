# Lesson Plan: Low-level Python

# Materials and Preparation

Here are the things you'll need to do before the section starts:

- Read over this lesson plan
  - In particular, it might be helpful to plan one (or many) teaching routines for the "Extending Python" section
- Download [the code](/lab/6-lab.zip) for this section and make sure it runs
  - *Note:* we haven't provided this code to students because it contains the solutions to the exercises—you may need to modify it and share it with them
  - To my knowledge, this code won't run well on Ed (requests and low-level code are blocked), but I haven't tried it
- If you're not comfortable with the global interpreter lock (GIL) and how it affects threading, you can read [this article](https://realpython.com/python-gil/) to get up to speed

# Learning Objectives

After this section, students should be able to:

* Write code that uses the thread pool paradigm, where each thread is a worker that pulls from a queue of tasks
* Compare and contrast Python's approach to threading with C and C++ and identify when each is appropriate
* Extend Python's functionality with C code

# Lesson Sequence

| **Duration** | **Activity**                  | **Resources/Notes**                                  |
|--------------|-------------------------------|------------------------------------------------------|
| 10m          | Warm-up: Concept map          | Paper, pens, etc. for people to make the concept map |
| 10m          | Concept review                | Multithreading, GIL, Extending Python                |
| 30m          | Webscraper                    | Section code                                         |
| 20m          | Multiprocessing or Extending Python | Routine for brainstorm                               |

## Warm-up: Concept map

At this point in the quarter, a good introduction into the section might be to have students create a "concept map" of the topics we've covered so far. This could be a good way to get them thinking about how the topics we've covered relate to each other.

In particular, one sneaky thing about the topics we've covered lately is that some processes are I/O bound and others are CPU bound (e.g. the web scraper is I/O bound, but the image processing is CPU bound). This is a good opportunity to review the difference between these two types of processes, and connect them to the GIL.

You can have your students brainstorm topics to include on the concept map, or you can provide them with a list of topics to include. Here are some ideas:

* Primitive types: `int`, `float`, `str`, `bool`, `None`
* Data structures: `list`, `dict`, `set`, `tuple`
* Control flow: `if`, `for`, `while`, `break`, `continue`, `pass`
* File I/O: `open`, `read`, `write`, `close`
* Console I/O: `print`, `input`
* Virtual Environments
* Pip and Packages
* Classes and Objects: `__init__`, `self`, `__repr__`
* Electronics: `GPIO`, micro:bit
* Python & the Web: `requests`, `flask`
* Multithreading
* The GIL
* Extending Python with C code

If you do implement this activity, take a picture of the concept maps so far and share them in our group chat!

## Concept review

You are experts at this by now, so here are the key ideas to review from lecture:

* Multithreading is possible because there are times in the course of execution where a program is waiting for something to happen (e.g. waiting for a response from a server). Python uses the `threading` library to create threads, and once a thread is created, the OS handles scheduling (i.e. switching between threads when one is waiting).
* Even if you have multiple cores on your computer, Python can only use one of them at a time because of the GIL. This means that multithreading is only useful for I/O bound processes, not CPU bound processes.
* You can extend code by writing C code and compiling it into a package. This is useful for CPU bound processes, but it's a lot of work, so you should only do it if you really need to.


## Webscraper

The code and solution code for the webscraper are included at the link above. Before you can run the code, you'll probably need to install the `pyvis` library with

```
$ pip install pyvis
```

The results of the activity can be really gorgeous, I think! But the physics engine is can cause graphs of this size to take eons to load (it runs the engine until the graph stabilizes), so I've just disabled it. The result will be a graph that looks really un-informative, but you can have students temporarily check the physics box to reorganize the graph and get something more meaningful in just a few seconds (don't wait for the graph to fully stabilize).

Here's a video of what that looks like:

![reorganizing the graph by temporarily enabling physics](/lab/6-enable-physics.gif)

## Multiprocessing or Extending Python

For the last activity, you can choose between two options: introduce students to multiprocessing or to extending Python with C code. Both of these are pretty advanced topics, so you'll probably only have time to do one of them.

### Multiprocessing

For this activity, you'll convert the code that you wrote using threads to use processes instead. This is a good opportunity to review the difference between threads and processes, and to introduce students to the `multiprocessing` library.

**Motivation**: One way of avoiding the global interpreter lock is to... create multiple interpreters. This is the idea behind multiprocessing: you can create multiple processes, each with its own interpreter, and run them in parallel. This is a good option for CPU bound processes, but it's a lot of work to set up.

In a multiprocessing setup, almost every piece of data needs to be converted into a string and then sent to the other process. This is called "serialization" and it's a pretty expensive operation. It's also not always possible to serialize data, so you'll need to be careful when you use this. This restriction happens because processes use pipes to communicate with each other, which are supported by the operating system's file descriptors. File descriptors can only be used to read and write bytes, so you need to convert everything to bytes before you can send it to another process.

You can read more about multiprocessing and how it compares to threading at [this URL](https://realpython.com/python-concurrency/). You should also read over the [multiprocessing library](https://docs.python.org/3/library/multiprocessing.html) documentation, because you'll need a `Queue` to implement the activity.

### Extending Python

Start by filling out a T-chart with one side that reads "things C extensions are good at" and the other side that reads "things C extensions are bad at". I imagine that the main things you'll come up with are "fast" and "hard to write", respectively, but there are more!

Here are some ideas:
* Good: fast, can use multiple cores, can use C libraries, numerical computation, low-level memory manipulation, hardware access (e.g., GPIO, micro:bit, framebuffers), more efficient data structures, cross-platform executable compatability
* Bad: hard to write, hard to debug, hard to install, handling errors needs to be more explicit, code can't be dynamically updated (e.g., forced types and recompiling), can't use Python libraries (for the most part)

From here, you can brainstorm some ideas for things that you could extend Python to do. Here are some ideas:

* Multithreading: Implement a faster version of `sum` that uses multiple cores
* Data structures: Re-implement a data structure to make it more efficient (e.g., use a dynamically-sized C array instead of a Python list)
* Algorithms: Implement a faster version of a sorting algorithm, an encryption/decryption algorithm, etc.
* Math: Create a library for doing linear algebra, or for doing fast Fourier transforms (this is how `numpy` works actually!)
* Simulations: Create a library that can simulate a physical system (e.g., a pendulum, a spring, etc.)

You'll probably want to build off of the `empty_c_ext` from lecture.

# Video reflection

For today's reflection, share your answers to these questions:

* How was today's section?
* What is a modality for representing/evaluating an idea that you used today which might not be as common in other classes?