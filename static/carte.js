let map;
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
            map: map
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

    addMarker({
        coordinates: { lat: 43.23278, lng: 5.44019 },
        content: '<h4> TPR1</h4>'
    }); 

    addMarker({
        coordinates: { lat: 43.23147, lng: 5.43957 },
        content: '<h4> TPR2</h4>'
    });

    addMarker({
        coordinates: { lat: 43.23207, lng: 5.44132 },
        content: '<h4> AMPHITHEATRE B</h4>'
    });
    addMarker({
        coordinates: { lat: 43.23287, lng: 5.43962 },
        content: '<h4> AMPHITHEATRE A</h4>'
    }); 

    // Fonction pour fermer toutes les infobulles ouvertes
    function closeAllInfoWindows() {
        markers.forEach(function(item) { // for each pour parcourir tous les marqueurs
            item.infoWindow.close();//appel de ma fonction close 
        });
    }
}


initMap();// appel la fonction pour afficher la map une fois quand l'initialise 