import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, useMap,useMapEvents, Rectangle, useMapEvent, ZoomControl } from 'react-leaflet';
import { useEventHandlers } from '@react-leaflet/core'
import { CRS } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/HexContent.css'
import Interface from './Inventory';

const Mapa = () => {
  const currentUrl = window.location.host == 'localhost:3000' ? 'http://localhost:3000' : `https://${window.location.hostname}`;
  const bounds = [[-15.76, -157.5], [15.9, -22.65]];
  const [hexagonos, setHexagonos] = useState([]);
  const [minZoomState, setMinZoomState] = useState(4);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [selectedTile, setSelectedTile] = useState(-90);
  const [currentZoom, setCurrentZoom] = useState(4);

  const [renderedTiles, setRenderedTiles] = useState(false);
  const [updateStates, setUpdateStates] = useState(false);

  function MyMapComponent() {


    const handleTiles = (currentBounds, zoom = 0) => {
      let torenderTiles = [];
      if (zoom == 8) {
        hexagonos.map((tile, id) => {
          if ((tile[0][0]+1 > (currentBounds)._southWest.lat && tile[5][1]+1 > (currentBounds)._southWest.lng) && tile[4][0]-1 < (currentBounds)._northEast.lat && tile[2][1]-1 < (currentBounds)._northEast.lng) {
            torenderTiles.push(tile);
          }
          if (id == hexagonos.length - 1) {
            setRenderedTiles(torenderTiles);
          }
        })
      }else{
        setRenderedTiles(false);
      }            
        setUpdateStates(!updateStates);
    }


    const mapE = useMapEvents({
      dragend: (e) => {
        let zoom = e.target.getZoom()
        handleTiles(e.target.getBounds(), zoom);
      },
      zoomend: (e) => {
        let zoom = e.target.getZoom()
        setCurrentZoom(zoom);     
        handleTiles(e.target.getBounds(), zoom);
    },
    });


    return null;
  }



  useEffect(() => {
    // Definir los límites del mapa

    const bounds = [
      [-15.7, -157.23], // Esquina suroeste del mapa
      [15.52, -22.65] // Esquina noreste del mapa
    ];


    const cellSize = 0.25; // Tamaño de la celda hexagonal (grados)

    // Generar la cuadrícula hexagonal estilo panal de abejas que cubra el área del mapa
    const hexGrid = generateHoneycombHexGrid(bounds, cellSize);

    setHexagonos(hexGrid);

    if (window.innerWidth > 1920) {
      setMinZoomState(6);
    }else if (window.innerWidth < 500){
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
        offset = cellSize+0.125;
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





  
const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

const BOUNDS_STYLE = { weight: 0.5 }

function MinimapBounds({ parentMap, zoom }) {
  const minimap = useMap()

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e) => {
      parentMap.setView(e.latlng, parentMap.getZoom())
    },
    [parentMap],
  )
  useMapEvent('click', onClick)

  // Keep track of bounds in state to trigger renders
    const [bounds, setBounds] = useState(parentMap.getBounds())
    const onChange = useCallback(() => {
      setBounds(parentMap.getBounds())
      // Update the minimap's view to match the parent map's center and zoom
      minimap.setView(parentMap.getCenter(), zoom)
    }, [minimap, parentMap, zoom])
  
  // Listen to events on the parent map
  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [])
  useEventHandlers({ instance: parentMap }, handlers)

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
}

function MinimapControl({ position, zoom }) {
  const parentMap = useMap()
  const mapZoom = zoom || 0

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
      <div className='minimap-box' >
      
      <div className='inv-img-container'>
            <img className='inv-img' src={`${currentUrl}/images/inventory.jpg`} />
        </div>
      <MapContainer

      className='minimap-container'
        style={{ height: 160, width: 340, zIndex: 10000, borderRadius: "15px", marginTop: "-1px", border: "solid 1px gray" }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        crs={CRS.EPSG4326}
        maxBoundsViscosity={1}
        maxBounds={bounds}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}>

        <TileLayer url={`${currentUrl}/qr/{z}/{x}/{y}.jpg`} />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
      </div>
    ),
    [],
  )

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  )
}


  return (
    <div className='main-hex' >{pageLoaded &&
      <MapContainer center={[0, -89]} zoom={4}
        minZoom={minZoomState} // Nivel de zoom mínimo permitido pathOptions={selectedTile == index ? { fillColor: "yellow" } : { fillColor: "transparent" }}
        maxZoom={8} // Nivel de zoom máximo permitido 
        crs={CRS.EPSG4326}
        maxBounds={bounds}
        zoomControl={false}
        attributionControl={false}
        maxBoundsViscosity={1} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url={`${currentUrl}/qr/{z}/{x}/{y}.jpg`}
          bounds={bounds}
        />
        <MyMapComponent />
        {renderedTiles && renderedTiles.map((coords, index) => (
          <Polygon key={index} positions={coords} color="yellow" fillColor={selectedTile == index ? "red" : "transparent"} weight={2}
            pathOptions={{ fillColor: selectedTile[0] == coords[5][0] && selectedTile[1] > coords[0][1] && selectedTile[1] < coords[1][1] ? "yellow" : "transparent", color: currentZoom == 8 ? "yellow" : "transparent" }}
            eventHandlers={{
              click: () => setSelectedTile([coords[5][0], coords[0][1] + 0.125])
            }}
            fillOpacity={0.5} >
            <Popup className={coords[0][0] > 38 && "leaflet-popup-top"} >{`lng: ${selectedTile[1]}, Lat: ${selectedTile[0]}`}</Popup>
          </Polygon>
        ))}
        <MinimapControl zoom={2}  position="bottomright" />
        <ZoomControl position='topright' style={{marginTop: "15px"}} />
      </MapContainer>}
    </div>
  );
};

export default Mapa;