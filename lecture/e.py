import pygame

pygame.init()
screen = pygame.display.set_mode((500, 500))
white = (255, 255, 255)
blue = (0, 0, 255)

running = True

while running:

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Fill the background with white
    screen.fill(white)

    # Draw a solid blue circle in the center
    pygame.draw.circle(screen, blue , (250, 250), 75)

    # Call to update the display with drawing
    pygame.display.update()

#when game is over
pygame.quit()


