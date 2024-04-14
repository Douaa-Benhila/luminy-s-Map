let map;

async function calculateAndDisplayRoute() {
    const startPointName = document.querySelector('input[name="localisation-input"]').value;
    const endPointName = document.querySelector('input[name="destination-input"]').value;

    // Récupérer les coordonnées correspondant aux noms saisis
    const startPointCoords = getBuildingCoordinates(startPointName);
    const endPointCoords = getBuildingCoordinates(endPointName);

    // Vérifier si les deux points sont spécifiés et s'ils ont des coordonnées correspondantes
    if (startPointCoords && endPointCoords) {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);

        directionsService.route(
            {
                origin: startPointCoords,
                destination: endPointCoords,
                travelMode: google.maps.TravelMode.WALKING // Spécifier le mode de transport (piéton)
            },
            (response, status) => {
                if (status === "OK") {
                    directionsRenderer.setDirections(response);
                } else {
                    window.alert("Impossible de calculer l'itinéraire : " + status);
                }
            }
        );
    } else {
        window.alert("Veuillez spécifier le point de départ et le point d'arrivée.");
    }
}

// Structure de données contenant les coordonnées des bâtiments
const buildingCoordinates = {
    "Restaurant CROUS": { lat: 43.23088195706794, lng: 5.439546484046008 },
    "Hexagone / BU": { lat: 43.22958219470281, lng: 5.441088154203516 },
    "TECHNOSPORT": { lat: 43.23046503591347, lng: 5.439698134937945 }       
};

// Fonction pour récupérer les coordonnées d'un bâtiment par son nom
function getBuildingCoordinates(buildingName) {
    // Vérifier si le nom du bâtiment existe dans la structure de données
    if (buildingName in buildingCoordinates) {
        return buildingCoordinates[buildingName];
    } else {
        // Si le nom du bâtiment n'est pas trouvé, afficher une alerte et retourner null
        window.alert("Le bâtiment spécifié n'a pas de coordonnées enregistrées.");
        return null;
    }
}


// Écouter l'événement de clic sur le bouton de recherche
document.querySelector('.bx-search').addEventListener('click', calculateAndDisplayRoute);



// initialiser ma map (son affichage)
async function initMap() {
    const googleMaps = await google.maps.importLibrary("maps");
    const Map = googleMaps.Map;
    
    map = new Map(document.getElementById("map"), {
        center: { lat: 43.23198578716377, lng: 5.44133307078618 },
        zoom: 16,
    });

    // faire fonctionner mon icone de localisation 
    document.querySelector('.bx-map').addEventListener('click', function() {
        // Obtenir la position de l'utilisateur
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                // Récupérer les coordonnées de la position de l'utilisateur
                var userLatLng = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
    
                // Centrer la carte sur la position de l'utilisateur
                map.setCenter(userLatLng);
    
                // Créer un marqueur à la position de l'utilisateur
                var marker = new google.maps.Marker({
                    position: userLatLng,
                    map: map,
                    title: 'Votre position'
                });
    
                // Créer une infobulle pour le marqueur
                var infowindow = new google.maps.InfoWindow({
                    content: 'Vous êtes ici'
                });
    
                // Ouvrir l'infobulle au-dessus du marqueur
                infowindow.open(map, marker);
            }, function(error) {
                // Gérer les erreurs de géolocalisation
                console.error('Erreur de géolocalisation : ', error);
            });
        } else {
            // Gérer les navigateurs ne prenant pas en charge la géolocalisation
            console.error('La géolocalisation n\'est pas prise en charge par votre navigateur.');
        }
    });

    // Ajouter les marqueurs des endroits sur la map
    addMarker({
        coordinates: { lat: 43.23088195706794, lng: 5.439546484046008 },
        content: '<h4>Restaurant CROUS </h4>'
    });
  
    addMarker({
        coordinates: { lat: 43.22958219470281, lng: 5.441088154203516 },
        content: '<h4>Hexagone / BU </h4>'
    });

    addMarker({
        coordinates: { lat: 43.23046503591347, lng: 5.439698134937945 },
        content: '<h4>TECHNOSPORT </h4>'
    }); 
}

function addMarker(prop) {
    let marker = new google.maps.Marker({
        position: prop.coordinates,
        map: map
    });

    if (prop.content) {
        let information = new google.maps.InfoWindow({
            content: prop.content
        });

        marker.addListener("click", function () {
            information.open(map, marker);
        });
    }
}
initMap();
