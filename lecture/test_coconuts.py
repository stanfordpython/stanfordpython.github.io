import unittest
from coconuts import coconuts

class my_grader(unittest.TestCase):
	def test_too_many(self):
		response = coconuts(1, 15)
		self.assertEqual(response, "No! You cannot carry")

	def test_correct(self):
		response = coconuts(10, 1)
		self.assertEqual(response, "Yes! You can carry")

	def test_just_right(self):
		response = coconuts(5.5, 1)
		self.assertEqual(response, "Yes! You can carry")




if __name__ == "__main__":
	unittest.main(verbosity=2)