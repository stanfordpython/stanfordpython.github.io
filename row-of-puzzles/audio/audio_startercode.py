#!/usr/bin/env python3 -tt
import numpy as np
import requests
import json
from scipy.io import wavfile
from io import BytesIO

BASE_URL  = 'https://stanfordpython.com/row-of-puzzles/audio/'
def get_url_data(url):
    """Queries the url, parses the data, and returns
    that information in a dict object.

    Arguments:
    url -- The url to query.
    """
    raise NotImplementedError

def obtain_matrix(textfile_url):
    """
    This function obtains a NumPy matrix from the url at which it is located.

    We can use the the np.genfromtxt file to generate a NumPy matrix from
    bytes-data obtained from a url. Therefore, this function must access
    https://www.stanfordpython.com/row-of-puzzles/audio/textfile_url.txt, 
    and pass the bytes-data from the content of the request into the 
    np.genfromtxt function to reconstruct the matrix.

    When encoding matrices as text files (which is what the course staff did 
    before hiding those text files throughout the course website), NumPy
    allows the user to specify a matrix delimiter. In this case, we comma-delimited
    our matrices. Look into the np.genfromtxt documentation to explore how
    you might need to modify your np.genfromtxt function call to account for this
    information.

    Arguments:
    textfile_url -- the location of the file on the Stanford Python website. E.g. if
    textfile_url were equal to 123abc.txt, the file would be located at 
    https://stanfordpython.com/row-of-puzzles/audio/123abc.txt.
    """

    raise NotImplementedError


def parse_site():
    """
    This function parses the course site, starting at 
    https://stanfordpython.com/row-of-puzzles/audio/audio_start.json,
    and following the chain of JSON files as described in the assignment
    specification. As it goes, it retrieves the audio matrix components
    from each JSON file (by calling obtain_matrix), then
    vertically concatenates them to obtain the decoded Nx2 audio matrix.
    The function returns the decoded Nx2 audio matrix.

    Arguments: N/A
    """
    raise NotImplementedError

if __name__ == "__main__":
    wavfile.write("out.wav", 44100, parse_site())


