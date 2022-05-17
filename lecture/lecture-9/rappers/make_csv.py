"""
File: make_csv.py
-----------------

Creates a CSV from the data in rapper-data/.
"""
from glob import glob
from pathlib import Path
import csv
import json

HEADERS = ['artist', 'lyrics']

if __name__ == '__main__':
    csv_data = []
    for file in glob('rapper-data/*.json'):
        p = Path(file)
        artist = p.stem.replace('-', ' ')

        with p.open() as f:
            data = json.load(f)

        csv_data.append({
            'artist': artist,
            'lyrics': ' '.join(data.values())
        })

    # write CSV
    with open('rappers.csv', 'w') as f:
        writer = csv.DictWriter(f, fieldnames=HEADERS)
        writer.writeheader()
        writer.writerows(csv_data)
