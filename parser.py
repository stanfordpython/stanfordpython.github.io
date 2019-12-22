import matplotlib.pyplot as plt

l = []

for line in open("selfdestruct.html", "r"):
	for char in line:
		l.append(ord(char))

for i, elem in enumerate(l):
	if elem > 256:
		l.remove(elem)
plt.hist(l, normed=True, bins=30)
plt.show()