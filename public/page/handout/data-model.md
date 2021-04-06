# The Python data model

<style>
.container {
    font-size: 13pt;
}
</style>

[[TOC]]

Most of the things we've interacted with in the Python world are ***objects***. I don't mean that in a colloquial sense—Python has a very precise definition of an "object." In Lecture 3, we'll build our own custom objects, so before lecture, let's take a moment to talk about what objects are.

## Everything is an object
In Python, we saw how we can inspect the type of an object using the `type` function.

```python
type(3) # => int
```

The `isinstance` function is similar. It takes two parameters—first, something we're testing, and second, a type—and returns `True` if the first parameter is an instance of the type and `False` otherwise. So, the above code tells us that `3` is an integer, and indeed:

```python
isinstance(3, int) # => True
```

We've talked about a bunch of types so far: `int`, `float`, `str`, `list`. Let's now introduce another type: `object`. Most of the things we've seen so far are instances of the `object` type.

```python
isinstance(3, object)         # => True
isinstance(2.1, object)       # => True
isinstance("unicorn", object) # => True
isinstance(['a', 3], object)  # => True
isinstance(None, object)      # => True
```

<br />

<div class="alert alert-info" role="alert">
    <h4 class="alert-heading mt-1">One object can be an instance of multiple types</h4>
    <hr />
    <p>Wait a minute... Didn't we just say <code>3</code> was an <code>int</code>? How can it also be an <code>object</code>?</p> 
    <p>We'll talk about this more in class but one object can be an instance of multiple types. This is called inheritance, and it's a way for the properties of one type to be applied to other types.</p>
    <p class="mb-1">For example, in Python, booleans are actually a sub-type of integers. Under the hood, <code>True</code> is 1 and <code>False</code> is 0. This means (even though we'd never do this) we <i>could</i> do integer-like operations with booleans: <code>(True + 1) * 10 + 5</code> returns <code>25</code>. Similarly, <code>isinstance(False, int)</code> is <code>True</code>.</p>
</div>

We've seen more objects, though! Functions are objects...

```python
def greet(name):
    print(f"Hi, {name}!")

isinstance(greet, object) # => True
```

Modules are objects...

```python
import math

isinstance(math, object) # => True
```

Even types themselves are objects!

```python
isinstance(int, object)  # => True
isinstance(list, object) # => True
```

At this point you may be kind of unimpressed. I've just told you that many of our favorite things in Python are instances of the `object` type, but... what does that mean? What are some properties of `object`s?

## Objects have value, type, and identity

### Value

All objects represent some value which takes up some space on your computer. You can display the size of an object using the `sys.sizeof` method.

```python
import sys

sys.sizeof(41)        # => 28 (bytes)
sys.sizeof([1, 2, 3]) # => 104 (bytes)
```

### Type

All objects have a type, which you can display using the `type` function.

```python
type(True) # => bool
```

Objects can be instances of multiple types. To see all of the types that an object is an instance of, you can look at the `__mro__` attribute of its type.

```python
bool.__mro__ # => (bool, int, object)
```

No matter the primary type of an object, the `__mro__` tuple will always contain `object` because everything is an object in Python.


### Identity

Identity is the trickiest of the three properties to understand. The identity of an object is a unique number that identifies it. Most of the time, this unique number is the object's location in your computer's memory, so (even though that's not always true) we'll treat the identity and the memory location as interchangeable in this discussion.

When Python creates an object, it is stored somewhere in memory. That address will never change throughout the lifetime of the object, and you can access it using the `id` function.

```python
x = [1, 2, 3]

# these numbers will be different if you re-run the code:
id(x)      # => 4398104832
hex(id(x)) # => '0x10625c100' (the memory address)
```

The `is` keyword allows you to compare the *identity* of two objects (are these two objects stored at the same memory address?). For example,

```python
x = [1, 2, 3]
y = [1, 2, 3]

id(x) # => 4490234752
id(y) # => 4490680128

x == y # => True
x is y # => False
```

So, even though the two lists are the same, they're not stored at the same memory address. This might not seem important, but if we modify the above code slightly, we get different results.

```python
x = [1, 2, 3]
y = x

x == y # => True
x is y # => True
```

Okay, but what does this mean? Why should I care if `x` and `y` have the same identity?

When `x` and `y` have the same identity, they point to the same object, so modifying the value of that object will be reflected in both variables.

```python
x = [1, 2, 3]
y = x

# modify the shared object
x.append(4)

x # => [1, 2, 3, 4]
y # => [1, 2, 3, 4]
```

But, in the first example, where the two are different, this behavior doesn't happen

```python
x = [1, 2, 3]
y = [1, 2, 3]

# only modify one object
x.append(4)

x # => [1, 2, 3, 4]
y # => [1, 2, 3]
```
<br />

<div class="alert alert-warning">
    <h4 class="alert-heading mt-1">Common misconception</h4>
    <hr />
    <p>A very common error that happens in Python occurs from a misconception about identity. Say you have some list, <code>lst</code>, and you want to make an independent copy of that list. If you create a new variable <code>copy = lst</code>, you haven't really copied the list. Just like in our example, <code>copy</code> will point to the same location as <code>lst</code>.</p>
    <p class="mb-1">There are two ways to do this correctly, depending on what you want. You can either create a "shallow copy" or a "deep copy". See the last section in this file for a description and comparison.</p>
</div>

## Objects and mutability

Let's build on some of the identity weirdness we just saw for the identity of lists and see how it applies to integers.

```python
x = 41
y = x

# will this modify one variable or both?
x += 33

x # => 74
y # => 41 (y is unchanged)
```

But on the other hand, the analogous code for lists behaves differently.

```python
x = [1, 2, 3]
y = x

# will this modify one variable or both?
x += [4]

x # => [1, 2, 3, 4]
y # => [1, 2, 3, 4] (y is changed)
```

The different behavior occurs because integers are **immutable** while lists are **mutable**.

All objects are either mutable or immutable. Remember how we said objects have value, type, and identity? "Mutable" means that an object's value can change after declaration (like a list changes when you append to it) and "immutable" means that the value is fixed.

Let's inspect our examples a bit more...

```python
x = 41
y = x

id(x) # => 4346613296
id(y) # => 4346613296

x += 33

id(x) # => 4346802832 (changed)
id(y) # => 4346613296

x # => 74
y # => 41
```

Even though `x` and `y` start out as references to the same object, when we add 33, *a new object is created* and `x` is reassigned to point to that object. `y` remains pointing at the old object.

By contrast...

```python
x = [1, 2, 3]
y = x

id(x) # => 4378526208
id(y) # => 4378526208

x += [4]

id(x) # => 4378526208 (didn't change)
id(y) # => 4378526208

x # => [1, 2, 3, 4]
y # => [1, 2, 3, 4]
```

...when `x` and `y` are lists, appending 4 to the end of the list does not create a new object.

There's one important piece of clarification: every operation on an immutable object will create a new object; *some* operations on mutable objects create new objects and others don't. It's not true that any operation on a mutable object creates a new object.

```python
x = [1, 2, 3]
id(x) # => 4539869440

x = x + [4]
id(x) # => 4539685504

x # => [1, 2, 3, 4]
```

This shows how `lst += [4]` behaves differently than `lst = lst + [4]`. The former does not create a new object but the latter does.

### Modifying an object from a function

This behavior crops up frequently when you're passing an object to a function. Instead of pass-by-copy or pass-by-reference, Python passes all parameters by "object-reference". It gives the function a reference to the object and the function can modify the original object if and only if it's mutable.

So, functions can't modify the caller's integer variables...

```python
def modify(num):
    num += 33 # just like x += 33 in the earlier example

x = 41
modify(x)
print(x) # 41 (not modified)
```

...but they can modify lists.

```python
def modify(lst):
    lst += [4] # just like x += [4] in the earlier example

x = [1, 2, 3]
modify(x)
print(x) # [1, 2, 3, 4] (modified)
```

This can be a bit confusing, and if you're not interested in the mechanics, you can remember that Python effectively behaves like the following: **Mutable objects are passed by reference and immutable objects are passed by value.**

This means that in your programs, if you have a list, you can pass it between functions and they can add or remove data, but you can't do that with numbers.

### Mutability of our favorite objects

|            |  Python keyword  |  Mutable?  |
| ---------- | ---------------- | ---------- |
| Integer    | `int`            | ✗          |
| Float      | `float`          | ✗          |
| Boolean    | `bool`           | ✗          |
| String     | `str`            | ✗          |
| List       | `list`           | ✓          |
| Dictionary | `dict`           | ✓          |
| Set        | `set`            | ✓          |
| Tuple      | `tuple`          | ✗          |

## Nested objects and copies (optional)

Tuples are immutable and lists are mutable, so what happens if you put a list inside of a tuple? The behavior can be kind of sneaky because tuples store *references* to the objects contained within them, and those references can't change. The objects, however, can change.

Let's see what happens when we try to change a tuple's reference.

```python
t = (1, [2, 3], [5, 6, 7])

t[1] = [2, 3, 4]
# TypeError: 'tuple' object does not support item assignment
```

The issue here is because the list `[2, 3, 4]` is a new object which we're trying to replace the old object with. On the other hand, if we modified the list without trying to replace it, everything would work fine.


```python
t = (1, [2, 3], [5, 6, 7])

t[1].append(4)
t # => (1, [2, 3, 4], [5, 6, 7])
```

This also brings us to two different ways to make a copy of an object. We mentioned earlier that this code does not actually make a copy:

```python
lst = [1, [2, 3], 5]
clone = lst

lst.append(6)

lst   # => [1, [2, 3], 5, 6]
clone # => [1, [2, 3], 5, 6] (changed)
```

To correctly copy the object, you can either make a "shallow copy" or a "deep copy". Summarizing from the [Python documentation](https://docs.python.org/3/library/copy.html):

* A *shallow copy* constructs a new object and then inserts references into it to the objects found in the original.
* A *deep copy* constructs a new object and then, recursively, inserts copies into it of the objects found in the original. 

Basically, a deep copy makes copies of the inner objects as well, while a shallow copy does not. So, if we make a shallow copy of `lst` from the example above, the two lists will be independent except for `lst[1]`:

```python
import copy

lst = [1, [2, 3], 5]
clone = copy.copy(lst) # makes a shallow copy

lst.append(6)

lst   # => [1, [2, 3], 5, 6]
clone # => [1, [2, 3], 5]        (unchanged)

lst[1].append(4)

lst   # => [1, [2, 3, 4], 5, 6]
clone # => [1, [2, 3, 4], 5]     (changed)
```

On the other hand, a deep copy would make a new copy of `lst[1]` as well:

```python
import copy

lst = [1, [2, 3], 5]
clone = copy.deepcopy(lst) # makes a deep copy

lst.append(6)

lst   # => [1, [2, 3], 5, 6]
clone # => [1, [2, 3], 5]        (unchanged)

lst[1].append(4)

lst   # => [1, [2, 3, 4], 5, 6]
clone # => [1, [2, 3], 5]        (unchanged)
```
