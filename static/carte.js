let map;
let directionsRenderer;

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

// Écouter l'événement de clic sur le bouton "Démarrer"
document.getElementById('startButton').addEventListener('click', startNavigation);

// Fonction pour démarrer la navigation
function startNavigation() {
    const startPointName = document.querySelector('input[name="localisation-input"]').value;
    const endPointName = document.querySelector('input[name="destination-input"]').value;

    // Récupérer les coordonnées correspondant aux noms saisis
    const startPointCoords = getBuildingCoordinates(startPointName);
    const endPointCoords = getBuildingCoordinates(endPointName);

    // Vérifier si les deux points sont spécifiés et s'ils ont des coordonnées correspondantes
    if (startPointCoords && endPointCoords) {
        // Utiliser les coordonnées pour centrer la carte entre les deux points
        map.setCenter(startPointCoords);

        // Déplacer la carte le long de l'itinéraire
        const step = 100; // Définir un pas de déplacement
        let index = 0;

        // Déplacer la carte le long de l'itinéraire
        const moveAlongRoute = () => {
            if (!directionsRenderer.directions || !directionsRenderer.directions.routes || 
            !directionsRenderer.directions.routes[0] || 
            !directionsRenderer.directions.routes[0].overview_path ||
            index >= directionsRenderer.directions.routes[0].overview_path.length) {
            // Si les données de l'itinéraire ne sont pas disponibles ou si nous avons atteint la fin de l'itinéraire, arrêter la navigation
            document.getElementById('arrivalMessage').innerText = "Vous êtes arrivé à destination !";
            return;
        }

    // Déplacer la carte au prochain point de l'itinéraire
        map.panTo(directionsRenderer.directions.routes[0].overview_path[index]);
        index += step;

    // Appeler récursivement cette fonction pour déplacer la carte progressivement
        setTimeout(moveAlongRoute, 1000); // Définir le délai entre chaque déplacement (en millisecondes)
};


        // Démarrer la navigation
        moveAlongRoute();
    } else {
        window.alert("Veuillez spécifier le point de départ et le point d'arrivée.");
    }
}


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
