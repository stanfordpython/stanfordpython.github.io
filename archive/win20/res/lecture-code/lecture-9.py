#!/usr/bin/env python3
"""
File: lecture-9.py
------------------

Code from CS 41: Lecture 9 (Matplotlib).

Authors
-------
Parth Sarin (@psarin)

History
-------
3-1-2020   @psarin    Created file
"""
import matplotlib.pyplot as plt
import numpy as np

def simple_plot():
    """
    Makes a simple matplotlib plot, which is the segment of y=x from x=1, ..., 4
    """
    plt.plot([1, 2, 3, 4])
    plt.ylabel('some numbers')
    plt.show()


def plot_customizations():
    """
    Some simple customizations to the line plot.
    """
    # Specify x and y coordinates to plot
    xs = [1, 2, 3, 4]
    ys = [1, 4, 9, 16]
    plt.plot(xs, ys)
    plt.show()
    
    # Change the style of the plot
    plt.plot(xs, ys, 'ro')
    plt.show()

    # Use numpy!
    t = np.arange(0., 5., 0.2)
    # Red dashes, blue squares and green triangles
    plt.plot(t, t, 'r--', t, t**2, 'bs', t, t**3, 'g^')
    plt.show()


def multiple_subplots():
    """
    Plot multiple plots in the same figure.
    """
    def f(t):
        return np.exp(-t) * np.cos(2*np.pi*t)

    t1 = np.arange(0.0, 5.0, 0.1)
    t2 = np.arange(0.0, 5.0, 0.02)

    plt.figure()
    plt.subplot(211)
    plt.plot(t1, f(t1), 'bo', t2, f(t2), 'k')

    plt.subplot(212)
    plt.plot(t2, np.cos(2*np.pi*t2), 'r--')
    plt.show()


def object_oriented_plotting():
    """
    An example of object-oriented Matplotlib.
    """
    fig = plt.figure()
    print(type(fig)) # => matplotlib.figure.Figure

    ax = fig.add_subplot(1, 1, 1)
    print(type(ax))  # => matplotlib.axes._subplots.AxesSubplot

    ax.plot([1, 4, 9, 16])
    plt.show()


def histogram():
    """
    Plot a histogram.
    """
    # Fixing random state for reproducibility
    np.random.seed(20081203)

    mu, sigma = 100, 15
    x = mu + sigma * np.random.randn(10000)

    plt.hist(x, 50) # data, number of bins
    plt.show()


def scatter_plot():
    """
    Plot a scatter plot.
    """
    # Fixing random state for reproducibility
    np.random.seed(20081203)

    N = 50
    x = np.random.rand(N)               # x-coordinates
    y = np.random.rand(N)               # y-coordinates
    colors = np.random.rand(N)          # color spectra values
    area = (30 * np.random.rand(N))**2  # radii for points
    alpha = 0.5                         # transparency

    plt.scatter(x, y, s=area, c=colors, alpha=alpha)
    plt.show()


def main():
    simple_plot()
    plot_customizations()
    multiple_subplots()
    object_oriented_plotting()
    histogram()
    scatter_plot()

if __name__ == '__main__':
    main()