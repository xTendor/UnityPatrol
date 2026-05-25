// ===============================
// Grundeinstellungen
// ===============================

const imageUrl = "karte.png";

const map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: -4,
  maxZoom: 3,
  zoomControl: true,
  attributionControl: false
});

// Bild automatisch laden und echte Größe auslesen
const img = new Image();

img.onload = function () {
  const imageWidth = img.naturalWidth;
  const imageHeight = img.naturalHeight;

  console.log("Bildbreite:", imageWidth);
  console.log("Bildhöhe:", imageHeight);

  const bounds = [
    [0, 0],
    [imageHeight, imageWidth]
  ];

  L.imageOverlay(imageUrl, bounds).addTo(map);

  map.fitBounds(bounds);
  map.setMaxBounds(bounds);

  // Beispiel-Marker erst NACH dem Laden des Bildes setzen
  const markers = [
    {
      name: "Beispiel-Ort 1",
      description: "Das ist ein erster Testmarker.",
      x: imageWidth / 2,
      y: imageHeight / 2
    }
  ];

  markers.forEach(marker => {
    L.marker([marker.y, marker.x])
      .addTo(map)
      .bindPopup(`
        <strong>${marker.name}</strong><br>
        ${marker.description}<br><br>
        <small>X: ${Math.round(marker.x)} / Y: ${Math.round(marker.y)}</small>
      `);
  });

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
};

img.src = imageUrl;
