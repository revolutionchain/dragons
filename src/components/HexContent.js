import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, useMap, useMapEvents } from 'react-leaflet';
import { CRS } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Home.css'

const Mapa = () => {
  const bounds = [[-48, -180], [48.65, -1]];
  const [hexagonos, setHexagonos] = useState([]);
  const [minZoomState, setMinZoomState] = useState(3);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [selectedTile, setSelectedTile] = useState(-90);
  const [currentZoom, setCurrentZoom] = useState(3);

  const [renderedTiles, setRenderedTiles] = useState(false);
  const [updateStates, setUpdateStates] = useState(false);

  function MyMapComponent() {


    const handleTiles = (currentBounds, zoom = 0) => {
      let torenderTiles = [];
      if (zoom == 6 || currentZoom == 6 ) {
        hexagonos.map((tile, id) => {
          if ((tile[0][0]+1 > (currentBounds)._southWest.lat && tile[5][1]+1 > (currentBounds)._southWest.lng) && tile[4][0]-1 < (currentBounds)._northEast.lat && tile[2][1]-1 < (currentBounds)._northEast.lng) {
            torenderTiles.push(tile);
          }
          if (id == hexagonos.length - 1) {
            setRenderedTiles(torenderTiles);
          }
        })

        setUpdateStates(!updateStates);
      }
    }


    const map = useMap();
    const mapE = useMapEvents({
      dragend: (e) => {
        handleTiles(e.target.getBounds());
      },
      zoomend: (e) => {
        let zoom = e.target.getZoom()
        setCurrentZoom(zoom);     
        handleTiles(e.target.getBounds(), zoom);
    },
    });

/*
    const handleZoomChange = () => {
      const zoom = map.getZoom();
      console.log('Zoom actual:', zoom);
      setCurrentZoom(zoom);     

    };


    map.on('zoomend', handleZoomChange);

    return () => {
      map.off('zoomend', handleZoomChange);
    };

*/


    return null;
  }



  useEffect(() => {
    // Definir los límites del mapa

    const bounds = [
      [-47.75, -179], // Esquina suroeste del mapa
      [47.75, -1] // Esquina noreste del mapa
    ];


    const cellSize = 1; // Tamaño de la celda hexagonal (grados)

    // Generar la cuadrícula hexagonal estilo panal de abejas que cubra el área del mapa
    const hexGrid = generateHoneycombHexGrid(bounds, cellSize);

    setHexagonos(hexGrid);

    if (window.innerWidth > 1920) {
      setMinZoomState(4);
    }
    setPageLoaded(true);
  }, []);

  // Función para generar la cuadrícula hexagonal estilo panal de abejas
  const generateHoneycombHexGrid = (bounds, cellSize) => {
    const hexGrid = [];
    const [swLat, swLng] = bounds[0];
    const [neLat, neLng] = bounds[1];

    let lat = swLat;
    let rowOffset = 0;
    while (lat < neLat) {
      let lng = swLng;
      let offset = 0;
      if (rowOffset % 2 !== 0) {
        offset = cellSize + 0.5;
      }
      while (lng < neLng - offset) {
        const hexCoords = [
          [lat - cellSize * 0.2, lng - (cellSize / 2) + offset],
          [lat - cellSize * 0.2, lng + (cellSize / 2) + offset],
          [lat + (cellSize / 1.5), lng + cellSize + offset],
          [lat + cellSize + cellSize / 2, lng + (cellSize / 2) + offset],
          [lat + cellSize + cellSize / 2, lng - (cellSize / 2) + offset],
          [lat + (cellSize / 1.5), lng - cellSize + offset]
        ];
        hexGrid.push(hexCoords);
        lng += cellSize * 3;
      }
      lat += cellSize / 1.17;
      rowOffset++;
    }

    return hexGrid;
  };


  /*

          [lat, lng + offset],
          [lat + cellSize / 2, lng + cellSize + offset],
          [lat + cellSize + cellSize / 2, lng + cellSize + offset],
          [lat + cellSize * 2, lng + offset],
          [lat + cellSize + cellSize / 2, lng - cellSize + offset],
          [lat + cellSize / 2, lng - cellSize + offset]

*/
  return (
    <div>{pageLoaded &&
      <MapContainer center={[0, 0]} zoom={3}
        minZoom={minZoomState} // Nivel de zoom mínimo permitido pathOptions={selectedTile == index ? { fillColor: "yellow" } : { fillColor: "transparent" }}
        maxZoom={6} // Nivel de zoom máximo permitido 
        crs={CRS.EPSG4326}
        maxBounds={bounds}
        maxBoundsViscosity={1} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url={`http://${"localhost:3000"}/qr/{z}/{x}/{y}.jpg`}
          bounds={bounds}
        />
        <MyMapComponent />
        {renderedTiles && renderedTiles.map((coords, index) => (
          <Polygon key={index} positions={coords} color="yellow" fillColor={selectedTile == index ? "red" : "transparent"} weight={2}
            pathOptions={{ fillColor: selectedTile[0] == coords[5][0] && selectedTile[1] > coords[0][1] && selectedTile[1] < coords[1][1] ? "yellow" : "transparent", color: currentZoom == 6 ? "yellow" : "transparent" }}
            eventHandlers={{
              click: () => setSelectedTile([coords[5][0], coords[0][1] + 0.5])
            }}
            fillOpacity={0.5} >
            <Popup className={coords[0][0] > 38 && "leaflet-popup-top"} >{`lng: ${selectedTile[1]}, Lat: ${selectedTile[0]}`}</Popup>
          </Polygon>
        ))}
      </MapContainer>}
    </div>
  );
};

export default Mapa;