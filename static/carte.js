let map;

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
    
    
    
    
    // Ajouter les marqueurs avec leurs propriétés


    addMarker({
        coordinates: { lat: 43.23088195706794, lng: 5.439546484046008 },
        content: '<h4>Restaurant CROUS </h4>'
    });
  
    /*addMarker({
        coordinates: { lat:43.2318375 , lng:5.4393906  },
        iconImage: 'laptop.',
        content: '<h4> TPR2 </h4>'
    });*/
    
    /*addMarker({
        coordinates: { lat: 43.23308231813341, lng: .439935185004367 },
        iconImage: '',
        content: '<h4>TPR1 </h4>'
        
    });
    addMarker({
        coordinates: { lat:43.22869800965034 , lng:5.439088114527151  },
        iconImage: '',
        content: '<h4> AMPHI B  </h4>'
        
        
    });
    addMarker({
        coordinates: { lat: 43.23563142519068 , lng:5.4380600619600425  },
        iconImage: '',
        content: '<h4> AMPHI A </h4>'
        
    });*/ 

    addMarker({
        coordinates: { lat: 43.22958219470281, lng: 5.441088154203516 },
        content: '<h4>Hexagone / BU </h4>'
    });

 
    addMarker({
        coordinates: { lat: 43.23046503591347, lng: 5.439698134937945 },
        content: '<h4>TECHNOSPORT </h4>'
    }); 

    // Liste des points de départ
    const pointsDepart = [
        { lat: 43.23088195706794, lng: 5.439546484046008 },
        { lat: 43.22958219470281, lng: 5.441088154203516 },
        { lat: 43.23046503591347, lng: 5.439698134937945 },
        //ajouter d'autre trajets
    ];

    // Liste des points d'arrivée
    const pointsArrivee = [
        { lat: 43.23088195706794, lng: 5.439546484046008 },
        { lat: 43.22958219470281, lng: 5.441088154203516 },
        { lat: 43.23046503591347, lng: 5.439698134937945 },
        // ajouter d'autre trajets 
    ];

    // Pour chaque point de départ
    pointsDepart.forEach(pointDepart => {
        // Pour chaque point d'arrivée
        pointsArrivee.forEach(pointArrivee => {
            // Dessiner l'itinéraire entre ce point de départ et ce point d'arrivée
            drawDirection(pointDepart, pointArrivee);
        });
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
// dessine les directions a revoir 
function drawDirection(start, end, showMarkers) {
    // Créer une instance du service de directions
    const directionService = new google.maps.DirectionsService();

    // Créer une instance du rendu des directions
    const directionRenderer = new google.maps.DirectionsRenderer();

    // Associer le rendu des directions à votre carte
    directionRenderer.setMap(map);

    // Définir les options de la demande de directions
    const request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING,
        optimizeWaypoints: true // Réorganiser les waypoints pour trouver le chemin le plus court
    };

    // Envoyer la demande de directions
    directionService.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            // Afficher l'itinéraire sur la carte
            directionRenderer.setDirections(response);
            if (showMarkers) {
                // Ajouter des marqueurs uniquement si showMarkers est vrai
                addMarker({ coordinates: start });
                addMarker({ coordinates: end });
            }
        } else {
            console.error('Impossible de trouver l\'itinéraire. Statut :', status);
        }
    });
}


initMap();
