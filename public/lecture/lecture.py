pickle.dump(my_dogs, open("dogs.txt", "wb"))

#########################

	('Bold Ruler', 
		'Somethingroyal', 'Secretariat')
        
      horses = collections.namedtuple("horses", ("sire", "dam", "foal"))

 ways = [‘WAYS-AII’, ‘WAYS_AII’, ‘WAYS_SI’, ‘WAYS-CE’, ‘WAYS-AQR’, ‘WAYS-CE’, ‘WAYS-SMA’, ‘WAYS-CE’, ‘WAYS-FR’, ‘WAYS-ER’]

d = collections.defaultdict(list)
#############################

def foo(a, b, c=1):
	'''cool math'''
	return (a+b) * c

########################

 def print_args(func):
    def mod(*args, **kwargs):
     	'''print the args'''
        print("Arguments: ", args, kwargs)
        return func(*args, **kwargs)
    return mod

##########################

@print_args
def foo(a, b, c=1):
	'''cool math'''
	return (a+b) * c

##########################

def print_args(func):
    @functools.wraps(func)
    def mod(*args, **kwargs):
     	'''print the args'''
        print("Arguments: ", args, kwargs)
        return func(*args, **kwargs)
    return mod

##########################

def sleepy_thread(i):
	print(f"Thread {i} is going to sleep")
	time.sleep(5)
	print(f"Thread {i} is back!!")


    t = Thread(target=sleepy_thread, args=(i,))

##############################################

def find_numbers(text):
	print( re.findall("\(\d{3}\)[- ]\d{3}-\d{4}", text))

