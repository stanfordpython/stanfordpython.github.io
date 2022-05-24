import time
import random
import pygame
 
#constants and vars
white = (255, 255, 255)
blue = (50, 153, 213)
 
dis_width = 600
dis_height = 400


snake_size = 10
snake_length = 15

#initilize pygame window
pygame.init()
screen = pygame.display.set_mode((dis_width, dis_height))
pygame.display.set_caption('CS 41 PYTHON')


#helper functions
def snake_coords(len, start_left, start_top):
	snake_coords = []
	for i in range(len):
		snake_coords.append((start_left, start_top  + (snake_size * i)))
	return snake_coords


def draw_snake(snake_coords):
	for x,y in snake_coords:
		pygame.draw.rect(screen, blue, [x, y, snake_size, snake_size])

def game():
	
	running = True
	x_change = 0
	y_change = 0
	x = dis_width / 2
	y = dis_height / 2
	snake = snake_coords(15, x, y)

	while running:

		screen.fill(white)
		draw_snake(snake)
		
		for event in pygame.event.get():
			if event.type == pygame.QUIT:
				running = False
			if event.type == pygame.KEYDOWN:
				if event.key == pygame.K_LEFT:
					x_change = -snake_size
					y_change = 0
				if event.key == pygame.K_RIGHT:
					x_change = snake_size
					y_change = 0
				if event.key == pygame.K_UP:
					x_change = 0
					y_change = -snake_size
				if event.key == pygame.K_DOWN:
					x_change = 0
					y_change = snake_size


		x += x_change
		y += y_change
		snake.append((x,y))
		if len(snake) > snake_length:
			del snake[0]
		draw_snake(snake)

		pygame.time.Clock().tick(15)
		pygame.display.update()

game()
pygame.quit()









