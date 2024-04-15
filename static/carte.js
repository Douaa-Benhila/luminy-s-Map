let map;
//initialiser ma map (son affichage)
async function initMap() {
    const googleMaps = await google.maps.importLibrary("maps");
    const Map = googleMaps.Map;
    
    map = new Map(document.getElementById("map"), {
        center: { lat: 43.23198578716377, lng: 5.44133307078618 },
        zoom: 16,
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
        content: '<h4> BATIMENT B</h4>'
    });
    addMarker({
        coordinates: { lat: 43.23287, lng: 5.43962 },
        content: '<h4> BATIMENT A</h4>'
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