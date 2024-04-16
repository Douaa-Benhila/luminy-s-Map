let map;
// méthode pour afficher la carte 
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map"), {
    center: { lat: 43.23198578716377, lng: 5.44133307078618 },// centre de ma carte 
    zoom: 16,// niveau de zoom
  });
}

initMap();// appel la fonction pour afficher la map une fois quand l'initialise 