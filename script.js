// ===============================
// Grundeinstellungen
// ===============================

// Dateiname deines Kartenbildes
const imageUrl = "karte.png";

// Originalgröße deines Bildes
const imageWidth = 3870;
const imageHeight = 3279;

// Leaflet-Karte erstellen
const map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: -4,
  maxZoom: 3,
  zoomControl: true,
  attributionControl: false
});

// Bildgrenzen festlegen
// Wichtig: Leaflet nutzt hier [y, x], nicht [x, y]
const bounds = [
  [0, 0],
  [imageHeight, imageWidth]
];

// Kartenbild einfügen
L.imageOverlay(imageUrl, bounds).addTo(map);

// Karte auf Bild einpassen
map.fitBounds(bounds);

// Verhindert, dass man zu weit aus der Karte rauszieht
map.setMaxBounds(bounds);


// ===============================
// Beispiel-Marker
// ===============================

const markers = [
  {
    name: "Beispiel-Ort 1",
    description: "Das ist ein erster Testmarker.",
    x: 2100,
    y: 3000
  },
  {
    name: "Beispiel-Ort 2",
    description: "Hier kann später ein weiterer Ort stehen.",
    x: 1200,
    y: 4200
  },
  {
    name: "Beispiel-Ort 3",
    description: "Marker können beliebig erweitert werden.",
    x: 3200,
    y: 1800
  }
];

markers.forEach(marker => {
  L.marker([marker.y, marker.x])
    .addTo(map)
    .bindPopup(`
      <strong>${marker.name}</strong><br>
      ${marker.description}<br><br>
      <small>X: ${marker.x} / Y: ${marker.y}</small>
    `);
});


// ===============================
// Koordinaten per Klick anzeigen
// ===============================

// Wenn du auf die Karte klickst, bekommst du die Position.
// Damit kannst du später Marker leichter setzen.
map.on("click", function (event) {
  const y = Math.round(event.latlng.lat);
  const x = Math.round(event.latlng.lng);

  L.popup()
    .setLatLng(event.latlng)
    .setContent(`
      <strong>Position</strong><br>
      X: ${x}<br>
      Y: ${y}<br><br>
      <small>Für Marker: x: ${x}, y: ${y}</small>
    `)
    .openOn(map);

  console.log(`x: ${x}, y: ${y}`);
});
