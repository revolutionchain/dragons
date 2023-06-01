import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import {CRS} from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Mapa = () => {
  const [hexagonos, setHexagonos] = useState([]);
  const bounds = [[-49, -180], [49, 0]];
  const [minZoomState, setMinZoomState] = useState(3); 
  const [pageLoaded, setPageLoaded] = useState(false); 

  useEffect(() => {
    // Definir los límites del mapa
    const bounds = [
      [-48, -180], // Esquina suroeste del mapa
      [48, 0] // Esquina noreste del mapa
    ];
    const cellSize = 1; // Tamaño de la celda hexagonal (grados)

    // Generar la cuadrícula hexagonal estilo panal de abejas que cubra el área del mapa
    const hexGrid = generateHoneycombHexGrid(bounds, cellSize);

    setHexagonos(hexGrid);
    if(window.innerWidth > 1920){
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
        offset = cellSize ;
      }
      while (lng < neLng) {
        const hexCoords = [
          [lat, lng + offset],
          [lat + cellSize / 2, lng + cellSize + offset],
          [lat + cellSize + cellSize / 2, lng + cellSize + offset],
          [lat + cellSize * 2, lng + offset],
          [lat + cellSize + cellSize / 2, lng - cellSize + offset],
          [lat + cellSize / 2, lng - cellSize + offset]
        ];
        hexGrid.push(hexCoords);
        lng += cellSize * 2;
      }
      lat += cellSize * 3 / 2;
      rowOffset++;
    }

    return hexGrid;
  };

  return (
    <div>{ pageLoaded &&
    <MapContainer center={[0, 0]} zoom={3}
    minZoom={minZoomState} // Nivel de zoom mínimo permitido
    maxZoom={6} // Nivel de zoom máximo permitido
    crs={CRS.EPSG4326}
    maxBounds={bounds}
    maxBoundsViscosity={1} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="http://localhost:3000/qr/{z}/{x}/{y}.jpg"
        bounds={bounds}
      />
      {hexagonos.map((coords, index) => (
        <Polygon key={index} positions={coords} color="gray" fillColor="transparent" weight={1} fillOpacity={0.5} />
      ))}
    </MapContainer>}
    </div>
  );
};

export default Mapa;