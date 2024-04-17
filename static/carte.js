let map;
let buildingCoordinates = { // Déplacer la déclaration de buildingCoordinates ici
    "Restaurant CROUS": { lat: 43.23088195706794, lng: 5.439546484046008 },
    "Hexagone / BU": { lat: 43.22958219470281, lng: 5.441088154203516 },
    "TECHNOSPORT": { lat: 43.23046503591347, lng: 5.439698134937945 },
    "TPR1": {lat:43.23278, lng:5.44019},
    "TPR2": {lat:43.23147, lng:5.43957},
    "AMPHITHEATRE B": {lat:43.23207, lng:5.44132}, 
    "AMPHITHEATRE A": {lat:43.23287, lng:5.43962}  
};
let userMarker; // Variable pour stocker le marqueur de l'utilisateur

let currentRoute = null; // Pour stocker l'itinéraire actuel
// méthode pour afficher la carte 
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map"), {
    center: { lat: 43.23198578716377, lng: 5.44133307078618 },// centre de ma carte 
    zoom: 16,// niveau de zoom
  });
  


  // Tableau pour stocker les marqueurs
  let markers = []
  // logique pour ajouter des marqueurs 
    function addMarker(prop) { // argument prop renvoie aux arguments du marqueur
        let marker = new google.maps.Marker({ // créer marqeur avec se qui suit égale
            position: prop.coordinates,
            map: map,
            icon: {
                url: prop.imageURL, // L'URL de votre image personnalisée
                scaledSize: new google.maps.Size(50, 50), // Taille de l'image personnalisée
                origin: new google.maps.Point(0, 0), // Point d'origine de l'image
                anchor: new google.maps.Point(25, 50) // Point d'ancrage de l'image
            }
    });
        if (prop.content) { // si l'info existe 
            let information = new google.maps.InfoWindow({ // on créer info window (bulle)
                content: prop.content
        });
        
        //j'ai ajouté un ecouteur d'évenement 
        marker.addListener("click", function () {
            // Fermer toutes les infobulles ouvertes avant d'ouvrir celle associée à ce marqueur
            closeAllInfoWindows();
            information.open(map, marker);
        });

        // Ajouter le marqueur et son info-bulle au tableau des marqueurs
        markers.push({
            marker: marker,
            infoWindow: information
        });

    }
}

  // données au marqueurs coordonnées et contenet 
    addMarker({
        coordinates: { lat: 43.23088195706794, lng: 5.439546484046008 },
        imageURL: "../static/eat.png", // L'URL de l'image pour ce marqueur
        content: '<h4>Restaurant CROUS </h4>',
        
    });
  
    addMarker({
        coordinates: { lat: 43.22958219470281, lng: 5.441088154203516 },
        imageURL: "../static/bu.png", // L'URL de l'image pour ce marqueur
        content: '<h4>Hexagone / BU </h4>'
    });

    addMarker({
        coordinates: { lat: 43.23046503591347, lng: 5.439698134937945 },
        imageURL: "../static/sport.png", // L'URL de l'image pour ce marqueur
        content: '<h4>TECHNOSPORT </h4>'
    }); 

    addMarker({
        coordinates: { lat: 43.23278, lng: 5.44019 },
        imageURL: "../static/tp.png", // L'URL de l'image pour ce marqueur
        content: '<h4> TPR1</h4>'
    }); 

    addMarker({
        coordinates: { lat: 43.23147, lng: 5.43957 },
        content: '<h4> TPR2</h4>',
        imageURL: "../static/tp.png", // L'URL de l'image pour ce marqueur
    });

    addMarker({
        coordinates: { lat: 43.23207, lng: 5.44132 },
        imageURL: "../static/bat.png", // L'URL de l'image pour ce marqueur
        content: '<h4> AMPHITHEATRE B</h4>'
    });
    addMarker({
        coordinates: { lat: 43.23287, lng: 5.43962 },
        imageURL: "../static/bat.png", // L'URL de l'image pour ce marqueur
        content: '<h4> AMPHITHEATRE A</h4>'
    }); 

    // Fonction pour fermer toutes les infobulles ouvertes
    function closeAllInfoWindows() {
        markers.forEach(function(item) { // for each pour parcourir tous les marqueurs
            item.infoWindow.close();//appel de ma fonction close 
        });
    }

        // Fonction pour démarrer la navigation
/*function startNavigation() {
    // Récupérer les coordonnées de départ et d'arrivée
    const startPointName = document.querySelector('input[name="localisation-input"]').value;
    const endPointName = document.querySelector('input[name="destination-input"]').value;

    // Vérifier si les noms des points de départ et d'arrivée sont valides
    if (startPointName && endPointName) {
        // Vérifier si les coordonnées des points de départ et d'arrivée existent
        const startPointCoords = getBuildingCoordinates(startPointName);
        const endPointCoords = getBuildingCoordinates(endPointName);

        if (startPointCoords && endPointCoords) {
            // Définir l'itinéraire pour le service de rendu
            const request = {
                origin: startPointCoords,
                destination: endPointCoords,
                travelMode: 'WALKING' // Mode de déplacement à pied
            };

            const directionsService = new google.maps.DirectionsService();
            directionsService.route(request, (result, status) => {
                if (status === 'OK') {
                    // Afficher l'itinéraire sur la carte
                    const directionsRenderer = new google.maps.DirectionsRenderer();
                    directionsRenderer.setMap(map);
                    directionsRenderer.setDirections(result);

                    // Récupérer la première étape de l'itinéraire
                    const leg = result.routes[0].legs[0];
                    const steps = leg.steps;
                    let currentStepIndex = 0;

                    // Fonction pour avancer à l'étape suivante
                    const nextStep = () => {
                        if (currentStepIndex < steps.length) {
                            // Déplacer la carte jusqu'à l'étape suivante
                            map.panTo(steps[currentStepIndex].end_location);
                            currentStepIndex++;

                            // Vérifier si c'est la dernière étape
                            if (currentStepIndex === steps.length) {
                                // Afficher un message lorsque l'arrivée est atteinte
                                alert('Vous êtes arrivé à destination !');
                            } else {
                                // Attendre un court délai avant de passer à l'étape suivante
                                setTimeout(nextStep, 1000); // Délai en millisecondes (1000 ms = 1 seconde)
                            }
                        }
                    };

                    // Démarrer la navigation en appelant la fonction nextStep
                    nextStep();
                } else {
                    // Gérer les erreurs
                    console.error('Erreur de calcul d\'itinéraire : ', status);
                }
            });
        } else {
            // Afficher un message d'erreur si les coordonnées sont manquantes
            console.error('Coordonnées manquantes pour les points de départ ou d\'arrivée.');
        }
    } else {
        // Afficher un message d'erreur si les noms des points de départ ou d'arrivée sont manquants
        console.error('Noms des points de départ ou d\'arrivée manquants.');
    }
}

// Ajouter un événement de clic au bouton "Démarrer"
document.getElementById('search-route').addEventListener('click', startNavigation);

// Structure de données contenant les coordonnées des bâtiments
const buildingCoordinates = {
    "Restaurant CROUS": { lat: 43.23088195706794, lng: 5.439546484046008 },
    "Hexagone / BU": { lat: 43.22958219470281, lng: 5.441088154203516 },
    "TECHNOSPORT": { lat: 43.23046503591347, lng: 5.439698134937945 },
    "TPR1": {lat:43.23278, lng:5.44019},
    "TPR2": {lat:43.23147, lng:5.43957},
    "AMPHITHEATRE B": {lat:43.23207, lng:5.44132}, 
    "AMPHITHEATRE A": {lat:43.23287, lng:5.43962}  
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
}*/
document.getElementById('search-route').addEventListener('click', startNavigation)


document.getElementById('localisation-user').addEventListener('click',startWatchingUserLocation)
     // Fonction pour obtenir la position actuelle de l'utilisateur
// Fonction pour démarrer la surveillance de la position de l'utilisateur
function startWatchingUserLocation() {
    // Vérifier si la géolocalisation est disponible dans le navigateur
    if (navigator.geolocation) {
        // Démarrer la surveillance de la position de l'utilisateur
        watchId = navigator.geolocation.watchPosition(
            (position) => {
                const userPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // Mettre à jour la position du marqueur de l'utilisateur
                if (userMarker) {
                    userMarker.setPosition(userPosition);
                } else {
                    // Créer un nouveau marqueur pour l'utilisateur
                    userMarker = new google.maps.Marker({
                        position: userPosition,
                        map: map,
                        icon: {
                            url: '../static/me.png', // URL de l'icône pour représenter l'utilisateur
                            scaledSize: new google.maps.Size(50, 50), // Taille de l'icône
                            origin: new google.maps.Point(0, 0), // Point d'origine de l'icône
                            anchor: new google.maps.Point(25, 50) // Point d'ancrage de l'icône
                        }
                    });
                }

                // Centrer la carte sur la position de l'utilisateur
                map.setCenter(userPosition);
            },
            (error) => {
                console.error('Erreur de géolocalisation :', error);
            },
            {
                enableHighAccuracy: true, // Activer une localisation plus précise si possible
                maximumAge: 10000 // Utiliser les données de localisation en cache jusqu'à 10 secondes
            }
        );
    } else {
        console.error('La géolocalisation n\'est pas prise en charge dans ce navigateur.');
    }
}


function findShortestPath(startCoords, endCoords) {
    // Calcul de la distance en ligne droite entre les deux points
    const distance = Math.sqrt(Math.pow(endCoords.lat - startCoords.lat, 2) + Math.pow(endCoords.lng - startCoords.lng, 2));

    // Pour cet exemple, nous supposons simplement que le chemin le plus court est une ligne droite

    // Retourner un objet représentant le chemin le plus court
    return {
        distance: distance,
        path: [startCoords, endCoords] // Pour cet exemple, nous avons simplement un chemin entre le point de départ et le point d'arrivée
    };
}

function clearCurrentRoute() {
    if (currentRoute) {
        currentRoute.setMap(null); // Supprimer l'itinéraire de la carte
        currentRoute = null; // Réinitialiser la variable de l'itinéraire actuel
    }
}

function startNavigation() {
    // Récupérer le nom du point de destination choisi par l'utilisateur
    const endPointName = document.querySelector('input[name="destination-input"]').value;

    // Récupérer les coordonnées du point d'arrivée
    const endPointCoords = getBuildingCoordinates(endPointName);

    // Récupérer le nom du point de départ choisi par l'utilisateur
    const startPointName = document.querySelector('input[name="localisation-input"]').value;

    // Récupérer les coordonnées du point de départ à partir de la liste déroulante
    const startPointCoords = getBuildingCoordinates(startPointName);

    // Récupérer les coordonnées du point de départ en fonction de la localisation de l'utilisateur s'il s'est localisé
    const userPosition = userMarker ? { lat: userMarker.getPosition().lat(), lng: userMarker.getPosition().lng() } : null;

    // Sélectionner le point de départ en fonction de ce qui est disponible : point choisi dans la liste déroulante ou localisation de l'utilisateur
    const chosenStartPointCoords = startPointCoords || userPosition;

    // Vérifier si les noms des points de départ et d'arrivée sont valides
    if (chosenStartPointCoords && endPointCoords) {
        // Supprimer l'itinéraire existant s'il y en a un
        clearCurrentRoute();

        // Trouver le chemin le plus court entre les points de départ et d'arrivée
        const shortestPath = findShortestPath(chosenStartPointCoords, endPointCoords);

        // Afficher l'itinéraire sur la carte
        const pathCoordinates = shortestPath.path.map(point => new google.maps.LatLng(point.lat, point.lng));
        currentRoute = new google.maps.Polyline({
            path: pathCoordinates,
            geodesic: true,
            strokeColor: '#000fff',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });
        currentRoute.setMap(map);

        // Centrer la carte sur le premier point de l'itinéraire
        map.setCenter(pathCoordinates[0]);
    } else {
        console.error('Noms des points de départ ou d\'arrivée non valides.');
    }
}


// Fonction pour récupérer les coordonnées d'un bâtiment par son nom
function getBuildingCoordinates(buildingName) {
    if (buildingName in buildingCoordinates) {
        return buildingCoordinates[buildingName];
    } else {
        window.alert("Le bâtiment spécifié n'a pas de coordonnées enregistrées.");
        return null;
    }
}


}
initMap();// appel la fonction pour afficher la map une fois quand l'initialise
// Appel pour démarrer la surveillance de la localisation de l'utilisateur
startWatchingUserLocation();