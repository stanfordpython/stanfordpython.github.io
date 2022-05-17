"""
File: scrape.py
---------------

Scrapes the top N songs for each of the artists from Genius
"""
import os
import sys
import re
from string import punctuation
from pathlib import Path
from traceback import format_exc
import logging
import contextlib
import json
import multiprocessing as mp
from textwrap import indent

from unidecode import unidecode
from lyricsgenius import Genius
from nltk.corpus import stopwords
from dotenv import load_dotenv
from slugify import slugify

load_dotenv()

# Hyperparameters
N = 10

# Genius
GENIUS_TOKEN = os.getenv('GENIUS_TOKEN', '')
genius = Genius(GENIUS_TOKEN)

# Tasks
ARTISTS = set(open('artists.txt').read().split('\n'))
RECALCULATE = set(sys.argv[1:])

# NLP
STOP_WORDS = set(stopwords.words('english'))

# Get logging level
level = logging.INFO
try:
    level = int(sys.argv[sys.argv.index('-l') + 1])
except (ValueError, IndexError):
    pass

try:
    level = int(sys.argv[sys.argv.index('--level') + 1])
except (ValueError, IndexError):
    pass

# Send logging to sys.stdout
root = logging.getLogger()
root.setLevel(level)
handler = logging.StreamHandler(sys.stdout)
handler.setLevel(level)
formatter = logging.Formatter(
    '%(asctime)s:%(name)s:%(levelname)s:%(message)s'
)
handler.setFormatter(formatter)
root.addHandler(handler)


def clean_song_lyrics(lyrics: str) -> str:
    """
    Cleans the Genius song lyrics output.

    Arguments
    ---------
    lyrics -- The lyrics to clean

    Returns
    -------
    A version of the lyrics without any stop words or extraneous characters.
    """
    lyrics = re.sub(r'\[.*?\]', '', lyrics)
    lyrics = re.sub(r'\(.*?\)', '', lyrics)
    lyrics = unidecode(lyrics)

    # Remove punctuation
    for ch in ('-', '_'):
        lyrics = lyrics.replace(ch, ' ')
    for ch in punctuation:
        lyrics = lyrics.replace(ch, '')

    # Tokenize and remove stop words
    lyrics = lyrics.lower().split()
    return ' '.join(word for word in lyrics if word not in STOP_WORDS)


def scrape_artist(artist: str, num_songs: int = N):
    """
    Scrapes the lyrics for the num_songs songs for the artist and stores them in
    a JSON file in the rapper-data/ directory.

    Arguments
    ---------
    artist -- The artist to get data for
    num_songs -- The number of songs to get for the artist
    """
    logging.info(f'Starting lookup for {artist}...')
    slug = slugify(unidecode(artist))
    p = Path(f'rapper-data/{slug}.json')

    # Should we scrape lyrics for this artist?
    already_cached = p.exists()
    should_recalculate = slug in RECALCULATE
    should_continue = (not already_cached) or should_recalculate
    if not should_continue:
        logging.info(f'Skipping {artist}: {already_cached=}, '
                     f'{should_recalculate=}.')
        return

    # Query the API, silently
    with open(os.devnull, 'w') as f, contextlib.redirect_stdout(f):
        try:
            logging.info(f'Getting {num_songs} songs for {artist}...')
            artist_data = genius.search_artist(artist, max_songs=num_songs)
        except Exception as e:
            lines = format_exc().split('\n')
            tb = indent('\n'.join(lines[:4]), '    ')
            logging.error(f'Error for {artist}:\n{tb}\n'
                          f'({len(lines) - 4} lines omitted)')
            return
    if not artist_data:
        logging.warning(f'No data for {artist}.')
        return

    # Collect the data on the songs
    logging.info(f'Retrieved {len(artist_data.songs)} songs for {artist}...')
    all_songs = {}
    for song in artist_data.songs:
        all_songs[unidecode(song.title)] = clean_song_lyrics(song.lyrics)

    # Write the data to JSON
    with p.open('w') as f:
        json.dump(all_songs, f)
        logging.info(f'Stored artist data in {p}')


def main():
    # Launch scrapers
    with mp.Pool(2 * mp.cpu_count()) as p:
        p.map(scrape_artist, ARTISTS)


if __name__ == '__main__':
    main()
