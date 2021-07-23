# Prima
Endabgabe für das Modul "Prototyping interactive media-applications and games" at Furtwangen University
VOLSTÄNDIGE ABGABE BIS HEUTE ABEND
[Pages-Version](https://luca1107.github.io/L06_360_Defender/Main.html)


## Checkliste für Leistungsnachweis
© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU

| Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                         |
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Titel                 |360_Grad-Tower-Defender
|    | Name                  |Luca Bösinger
|    | Matrikelnummer        |257675
|  1 | Nutzerinteraktion     | Der Nutzer kann eine Kanone bewegen, welche sich in der Mitte des Spielfeldes befindet. Mit der Leertaste kann er die auf ihn zukommende Gegnergeometrie, welche aus einzelnen Blöcken bestehen abschießen, um sie so daran zu hindern den Spieler zu erreichen.                                                                                                                                                 |
|  2 | Objektinteraktion     | Die geschossenen Kugeln interagieren mit den abzuschießenden Objekten. Diese wiederum interagieren auch untereinander. Jedes Objekt interagiert mit den Boden um so abgeschossene Objekte zu removen.                                                                                                                                                                                 |
|  3 | Objektanzahl variabel | Es wird zur Laufzeit zufällig Gegnergeometrie erzeugt, welche zum Anfang des Spiels, je nach gewähltem Schwierigkeitsgrad, unterschiedlich komplexe Gegnergeometrie aufbaut. Wenn Gegnergeometrie abgeschossen wird, wird während der Laufzeit zufällig auf einer zufälligen Lane neue Gegnergeometrie aufgebaut.                                                                                                                                                       |
|  4 | Szenenhierarchie      | Im Designdokument enthalten                                                                                                                                                          |
|  5 | Sound                 | Es sind Sounds für das Schießen, für das Auswählen des Schwierigkeitsgrades, für das Starten des Spiels sowie für die Erzeugung neuer Gegnergeometrie eingebaut.                                                          |
|  6 | GUI                   | Es sind Buttons für die Auswahl des Schwierigkeitsgrades sowie für das Starten des Spiels vorhanden.                                                                                   |
|  7 | Externe Daten         | Ich habe versucht ein Spielerprofil aus einer JSON Datei einzulesen, hat jedoch nicht geklappt.                                                                                 |
|  8 | Verhaltensklassen     |  Kugel: Kollisionsabfrage (Mit was kollidiert die Kugel da gerade), Geschwindigkeit+ Ausrichtung der Kugel je nach Spielerposition & Rotation || QuadLane: Aufbau und Ausrichtung der Lanes auf der die Gegnergeometrie sich bewegt (setTransform) || Einzelgeometrie: Auswahl einer zufälligen Farbe für jeden Cube über ein ENUM und dazugehörig Erstellung eines Materials je nach Farbe(createMaterials), Kollisionsabfrage je nach Kollision mit Boden oder mit der Kugel (handleCollision). Gegnergeometrie: Aufbau der Gegnergeometrie über ein zufälliges Raster (Im Konstruktor), hier arbeite ich mit einer Map um doppelte Positionen zu vermeiden, jedoch klappt das noch nicht. (GetRandomEnum) erzeugt den zufälligen ENUM der an den Konstruktor der Einzelgeometrie übergeben wird.(Move) bewegt die gesammte Gegnergeometrie in Richtung des Spielers.(getPosX) ist dafür zuständig in der Main abzufragen ob die Gegnergeometrie den Spieler erreicht hat.                                                                                          |
|  9 | Subklassen            | Jede der angesprochenen Klassen ist eine Subklasse von ƒ.Node. Anfangs war es geplant die Gegnergeometrie als eine Subklasse von Einzelgeometrie zu erstellen. Im finalen Projekt ist sie jedoch keine Subklasse sondern die Einzelgeometrie wird direkt in Konstruktor der Gegnergeometrie erzeugt und positioniert.
| 10 | Maße & Positionen     | Maße, Skala und Positionen sind gut durchdacht. Wie groß sind Spielfiguren, wie ist die Welt angeordnet bezogen auf den Ursprung, wie sind Spielelemente bezogen auf ihre lokalen Koordinatensysteme definiert? Im Designdokument enthalten                                                                |
| 11 | Event-System          | Es wird KeyPress für die Tastatureingabe verwendet. Außerdem wird für die Steuerung der Kamera die Maus verwendet und entsprechend der Mauseingabe die Kamera rotiert. Des weiteren werden für alle Objekte mit einem Rigidbody die Events für die Kollision verwendet.                                                                                                                                                                               |

## Abgabeformat
* Fasse die Konzeption als ein wohlformatiertes Designdokument in PDF zusammen!
* Platziere einen Link in der Readme-Datei deines PRIMA-Repositories auf Github auf die fertige und in Github-Pages lauffähige Anwendung.
* Platziere ebenso Links zu den Stellen in deinem Repository, an denen der Quellcode und das Designdokument zu finden sind.
* Stelle zudem auf diese Art dort auch ein gepacktes Archiv zur Verfügung, welches folgende Daten enthält
  * Das Designdokument 
  * Die Projektordner inklusive aller erforderlichen Dateien, also auch Bild- und Audiodaten
  * Eine kurze Anleitung zur Installation der Anwendung unter Berücksichtigung erforderlicher Dienste (z.B. Heroku, MongoDB etc.) 
  * Eine kurze Anleitung zur Interaktion mit der Anwendung


