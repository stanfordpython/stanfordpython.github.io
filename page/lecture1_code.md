# Lecture 1 Code

[[TOC]]

## Variables and Types
```python
x = 1
type(x)
# => <class 'int'>

x = "Unicorn"
type(x)
# => <class 'str'>
```

## Numbers and Booleans
### Numeric Types
```python
5
# => 5

5.0
# => 5.0

1 + 8
# => 9

8 + 5.1
# => 13.1
```
### Mathematical Assignment
```python
x += 5        
x -= 2
```
### Booleans
```python
5 == 5 
# => True

1 != 100 
# => True

3 > 6 
# => False

4 >= 9 
# => False

(1 < 100) and (5 + 5 == 10)
# => True

(1 < 100) or (5 + 5 != 10)
# => True

3 > 2 > 1 
# => True

3 < 2 != 1 > 0
# => False
```

## Strings and Lists
### Strings
```python
game = "HHTTTHHTHTT"

"HHTTTHHTHTT" == 'HHTTTHHTHTT'
# => True

len(game)
# => 11

"HTH" in course
# => True

"TTHT" in course
# => False

game[3:8]
# => 'TTHHT'

game[:5]
# => 'HHTTT'

game[3:]
# => 'TTHHTHTT'

game[:]
# => 'HHTTTHHTHTT'

game[8:3]
# => ''

game[::2]
# => 'HTTHHT'

game[8:3:-1]
# => 'HTHHT'

game[1:8:-1]
# => ''

game[::-1]
# => 'TTHTHHTTTHH'
```
### Lists
```python
count_up = [1, 2, 3]
easy_as = ['a', 'b', 'c']
multi_type = [False, "Parth", 5, 2.4]

len(count_up)
# => 3

3 in count_up
# => True

"3" in count_up
# => False

count_up.append(4)
# => None

count_up
# => [1, 2, 3, 4]
```
## String Formatting
### Overloaded Addition
```python
course = 41
print("This class is CS " + str(41) + ".")
# This class is CS 41.
```
### The `.format()` operator
```python
course = 41
print("This class is CS {}.".format(course))
# This class is CS 41.

course2 = 106
print("This class is CS {}, which has CS {} as a prerequisite.".format(course, course2))
# This class is CS 41, which has CS 106 as a prerequisite.
```
### `f`-strings
```python
course = 41
print(f"This class is CS {course}.")
# This class is CS 41.
```

## Control Flow
### User Input
```python
in_data = input("Prompt: ")
# => Prompt: [user enters data]

type(in_data)
# => str
```

### `if` and `else`
```python
course = int(input("What class are you in? ")) # 41
if course == 41:
    print("You're in the right place!")
else:
    print("Go find the right Zoom link!")
```

### Truthiness and Falsiness
```python

bool(None)                      
# => False

bool(False)                     
# => False

bool(0)                         
# => False

bool(0.0)                       
# => False

bool("")                        
# => False

bool([])                        
# => False

bool(42)                        
# => True

bool("Unicorns")             
# => True

bool([1, 2, 3])                 
# => True

bool([False])                   
# => True
```
### `try` and `except`
```python
course = int(input("What class are you in? ")) # a fun one!
if course == 41:
    print("You're in the right place!")
else:
    print("Go find the right Zoom link!")
# => ValueError: invalid literal for int() with base 10: 'a fun one'

while True:
    try:
        course = int(input("What class are you in? ")) # 41
        if course == 41:
            print("You're in the right place!")
        else:
            print("Go find the right Zoom link!")
        break
    except ValueError:
        print("Please enter a course number.")
```
## Functions
```python
def is_prime(n):
    for i in range(2, n):
        if n % i == 0:
            return False
    return True

```