"""
File: metadata.py
-----------------

Gets metadata on the rappers.
"""
from glob import glob
from pathlib import Path
import multiprocessing as mp
from functools import partial
import logging
import sys
from collections import defaultdict
from enum import Enum, auto
from typing import Callable, Union
import re
import csv

import requests
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

# Metadata
load_dotenv()
sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())
ARTISTS = []
for file in glob('cache/*.json'):
    name = Path(file).stem
    ARTISTS.append(name.replace('-', ' '))

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


class OverwriteType(Enum):
    CHANGE_NAME = auto()
    MANUAL_ID = auto()


class ArtistLookup:
    def __init__(self):
        self.overwrites = defaultdict(list)


    def add_overwrite(
        self, 
        artist: str, 
        ow_type: OverwriteType, 
        ow_val: Union[str, Callable[str, str]]
    ):
        """
        Adds an overwrite to self.overwrites with the given type and value.

        Arguments
        ---------
        artist -- the name of the artist to whom this applies
        ow_type -- the type of the overwrite that you're adding
        ow_val -- the value of the overwrite
        """
        self.overwrites[artist].append((ow_type, ow_val))
    

    def lookup(self, artist: str):
        """
        Looks up the artist after applying the adjustments from self.overwrites.

        Arguments
        ---------
        artist -- the name of the artist to look up
        """
        logging.info(f'Looking up {artist}...')

        # apply overwrites
        overwrites = self.overwrites.get(artist, [])
        for ow_type, ow_val in overwrites:
            logging.debug(f'Applying overwrite ({ow_type=}) to {artist}')
            if ow_type is OverwriteType.CHANGE_NAME:
                artist = ow_val(artist)

            if ow_type is OverwriteType.MANUAL_ID:
                return sp.artist(f'spotify:artist:{ow_val}')
        
        # get top result
        a = sp.search(q=f'artist:{artist}', type='artist')
        results = a['artists']['items']

        if results:
            logging.info(f'{len(results)} hits found for {artist}...')
            a = results[0]
            logging.info(f'Found {artist} --> {a["name"]}')
            return a
        else:
            logging.warning(f'No results found for {artist}!')



def get_popularity(artist: str, lookup_engine: ArtistLookup, q: mp.Queue):
    """
    Gets the artist popularity and stores it in the queue.

    Arguments
    ---------
    artist -- a string representation of the artist to look up
    lookup_engine -- the engine to use to lookup the artist
    q -- the queue in which to store the result; the function will put
        (artist_name, artist_popularity)
    """
    a = lookup_engine.lookup(artist)
    if a:
        q.put((artist, a['popularity']))


def get_birth_year(artist: str, q: mp.Queue):
    """
    Gets the birth year of the artist from wikipedia and stores it in the queue.

    Arguments
    ---------
    artist -- a string representation of the artist to look up
    q -- the queue in which to store the result; the function will put
        (artist_name, artist_popularity)
    """
    # 1. get wiki url
    search = requests.get(
        f'https://en.wikipedia.org/w/api.php'
        f'?action=opensearch&search={artist}&limit=1&namespace=0&format=json'
    )
    data = search.json()
    results = data[-1]
    if not results:
        logging.warn(f'No wiki articles found for {artist}')
        return
    url = results[0]

    # 2. get the article
    slug = url.split('/')[-1]
    article = requests.get(
        f'https://en.wikipedia.org/w/api.php'
        f'?action=query&format=json&titles={slug}&prop=extracts&explaintext'
    )
    data = article.json()
    pages = data['query']['pages']
    page_id, page_data = pages.popitem()
    if page_id == -1:
        logging.warn(f'No wiki article recovered for {artist}')
        return
    text = page_data['extract']

    # 3. search for the birth year
    match = re.search(r'\(born [a-zA-Z0-9 ,;]+?\)', text)
    if not match:
        logging.warn(f'No birth year in the article {page_id} for {artist}')
        return
    bt = match.group(0)
    year_match = re.search(r'\d{4}', bt)
    if not year_match:
        logging.warn(f'No birth year in the matched string {bt} for {artist}')
        return
    year = year_match.group(0)

    q.put((artist, int(year)))

def overwrite_pd(a):
    return 'diddy'


def main():
    all_data = defaultdict(dict)

    # lookup engine
    lookup_engine = ArtistLookup()
    lookup_engine.add_overwrite(
        'puff daddy', 
        OverwriteType.CHANGE_NAME,
        overwrite_pd
    )
    lookup_engine.add_overwrite(
        'murs',
        OverwriteType.MANUAL_ID,
        '2dWF6m2ksP9GN75fufFp16'
    )
    lookup_engine.add_overwrite(
        'ti',
        OverwriteType.MANUAL_ID,
        '4OBJLual30L7gRl5UkeRcT'
    )

    # get popularity
    manager = mp.Manager()
    q = manager.Queue()
    fn = partial(get_popularity, lookup_engine=lookup_engine, q=q)
    with mp.Pool(mp.cpu_count()) as pool:
        pool.map(fn, ARTISTS)
    
    while not q.empty():
        name, popularity = q.get()
        all_data[name]['popularity'] = popularity
    
    # get birthday info
    q = manager.Queue()
    fn = partial(get_birth_year, q=q)
    with mp.Pool(mp.cpu_count()) as pool:
        pool.map(fn, ARTISTS)
    
    while not q.empty():
        name, birth_year = q.get()
        all_data[name]['birth_year'] = birth_year

    # convert to a csv
    csv_data = []
    for artist, artist_data in all_data.items():
        csv_data.append({
            'artist': artist,
            **artist_data
        })
    
    with open('rapper-metadata.csv', 'w') as f:
        writer = csv.DictWriter(
            f, fieldnames=['artist', 'popularity', 'birth_year']
        )
        writer.writeheader()
        writer.writerows(csv_data)

if __name__ == '__main__':
    main()
