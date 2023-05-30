import time
import random
import pygame

# Constants and variables
white = (255, 255, 255)
blue = (50, 153, 213)
green = (0, 255, 0)

dis_width = 600
dis_height = 400

block_size = 10
snake_length = 15

# Initialize pygame window
pygame.init()
screen = pygame.display.set_mode((dis_width, dis_height))
pygame.display.set_caption('CS 41 PYTHON')

# Helper functions
def initialize_snake(len, start_left, start_top):
    initialize_snake = []
    for i in range(len):
        initialize_snake.append((start_left, start_top + (block_size * i)))
    return initialize_snake

def draw_snake(snake_coords):
    for x, y in snake_coords:
        pygame.draw.rect(screen, blue, [x, y, block_size, block_size])

def update_snake(x, y, snake):
    snake.append((x, y))
    if len(snake) > snake_length:
        del snake[0]
    return snake

def generate_food(snake):
    while True:
        food_x = random.randrange(0, dis_width, block_size)
        food_y = random.randrange(0, dis_height, block_size)
        if (food_x, food_y) not in snake:
            return food_x, food_y

def draw_food(food_x, food_y):
    pygame.draw.rect(screen, green, [food_x, food_y, block_size, block_size])

def check_collision(snake_head, food_x, food_y):
    if snake_head[0] == food_x and snake_head[1] == food_y:
        return True
    return False

def game():
    global snake_length  # Use the global snake_length variable
    running = True
    x_change = 0
    y_change = 0
    x = dis_width / 2
    y = dis_height / 2
    snake = initialize_snake(snake_length, x, y)
    food_x, food_y = generate_food(snake)

    while running:
        screen.fill(white)
        draw_snake(snake)
        draw_food(food_x, food_y)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    x_change = -block_size
                    y_change = 0
                if event.key == pygame.K_RIGHT:
                    x_change = block_size
                    y_change = 0
                if event.key == pygame.K_UP:
                    x_change = 0
                    y_change = -block_size
                if event.key == pygame.K_DOWN:
                    x_change = 0
                    y_change = block_size

        x += x_change
        y += y_change
        snake = update_snake(x, y, snake)
       
        if check_collision(snake[-1], food_x, food_y):
            snake_length += 1
            food_x, food_y = generate_food(snake)
        draw_snake(snake)

        pygame.time.Clock().tick(15)
        pygame.display.flip()

    pygame.quit()


if __name__ == "__main__":
    game()
