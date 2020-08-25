#! usr/bin/env python3 

if __name__ == "__main__":
	
	# Compile the list of animals
	animals = set()
	with open("animals.txt", "r") as f:
		for animal in f:
			animals.add(animal.strip())

	# Then replace names in chat with names of animals.
	names_animals = {}
	with open("chat.txt", "r+") as f:
		anonymized_chat = ""
		for line in f:
			lower = line.find("From ")
			upper = line.find(" :")
			
			name = line[lower+len("From "):upper]

			try:
				anonymized_chat += line.replace(
					name, "Anonymous {}".format(names_animals[name]), 1)
			except KeyError:
				animal = animals.pop()
				names_animals[name] = animal
				anonymized_chat += line.replace(
					name, "Anonymous {}".format(names_animals[name]), 1)
			
		print(anonymized_chat)