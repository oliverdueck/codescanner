
# Weber&Ott Scanner for Zebra TC20

### Daten und Verwendung

Die EANs werden als CSV unter `public/data.csv` im folgenden Format bereitgestellt:

| EAN           | color   |
|---------------|---------|
| 4049333844284 | #3dabff |
| 4049333844291 |         |
| ...           | ...     |


- Ist eine Farbe angegeben, wird diese verwendet.
- Wenn keine Farbe angegeben wird, wird grün verwendet.
- Ist das Format der EAN unbekannt, wird gelb ausgegeben.
- Wird die EAN nicht gefunden, rot.
