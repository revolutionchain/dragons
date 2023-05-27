/*import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import gameMap from "../styles/traced.png";

import { MapContainer, ImageOverlay, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Agrega esta línea para importar 'L' desde Leaflet

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

const GameContent = () => {  
    const imageRef = useRef(null);
    const mapRef = useRef(null);
    const containerRef = useRef(null);
  
    useEffect(() => {
      const image = imageRef.current;
      const container = containerRef.current;
  
      if (image && container) {
        const { naturalWidth, naturalHeight } = image;
        container.style.width = `${naturalWidth}px`;
        container.style.height = `${naturalHeight}px`;
      }

      
    }, []);
  
    const imageBounds = [
      [0, 0], // Coordenada superior izquierda
      [16384, 16384], // Coordenada inferior derecha (ajusta estos valores según tus necesidades)
    ];
    const worldBounds = new L.LatLngBounds( new L.LatLng(0, 0), new L.LatLng(16384, 16384));

    return (
      <div className="map" ref={containerRef}>
        <MapContainer
          center={[8192, 8192]} // Centro del mapa (ajusta estos valores según tus necesidades)
          zoom={0} // Nivel de zoom inicial
          minZoom={-2} // Nivel de zoom mínimo permitido
          maxZoom={3} // Nivel de zoom máximo permitido
          maxBounds={worldBounds}
          maxBoundsViscosity={1}
          zoomControl={false} // Desactivar el control de zoom predeterminado de Leaflet
          crs={L.CRS.Simple} // Utilizar el sistema de coordenadas simples de Leaflet
          style={{ height: '100vh', width: '100%' }} // Ajusta el tamaño del mapa según tus necesidades style={{width: `${naturalWidth}px`, height: `${naturalHeight}px`}}
        >
          <ImageOverlay
            ref={imageRef}
            url={gameMap} // Ruta de la imagen (ajusta la ruta según tu proyecto)
            bounds={imageBounds}
          />
          <ZoomControl position="bottomright" /> 
        </MapContainer>
      </div>
    );

    
};

export default GameContent;

*/

import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from "react";


const GameContent = () => {  


  const [minZoomState, setMinZoomState] = useState(3); 
  const [pageLoaded, setPageLoaded] = useState(false); 

  const bounds = [[-69, -180], [69, 180]];

  useEffect(() => {
    if(window.innerWidth > 1920){
      setMinZoomState(4);
    }
    mapTiles()
    setPageLoaded(true);
  })



  
  const [initialTile, setInitialTile] = useState([
    [0, 5],
    [3, 0],
    [9, 0],
    [12, 5],
    [9, 10],
    [3, 10]
  ]
);
const [moveValue, setMoveValue] = useState(200);



const [tileListState, setTileListState] = useState(false);

//function made by Pablitos

let mapTiles = () => {

    let tilesList = [initialTile];
    let i = 1;
    let spaceAbove = 0;
    let spaceBetween = 18;
    let jumpSpaces = 0;
    while(tilesList[i-1][5][1] < 11){
        while (tilesList[i - 1][3][0] + spaceBetween < 16359) {
            tilesList.push([[tilesList[i - 1][0][0] + spaceBetween + jumpSpaces,  tilesList[i - 1][0][1]], 
              [tilesList[i - 1][1][0] + spaceBetween + jumpSpaces, tilesList[i - 1][1][1]],
              [tilesList[i - 1][2][0] + spaceBetween + jumpSpaces, tilesList[i - 1][2][1]],
              [tilesList[i - 1][3][0] + spaceBetween + jumpSpaces, tilesList[i - 1][3][1]],
              [tilesList[i - 1][4][0] + spaceBetween + jumpSpaces, tilesList[i - 1][4][1]],
              [tilesList[i - 1][5][0] + spaceBetween + jumpSpaces, tilesList[i - 1][5][1]]]
            )
            i = i + 1;
        }

        if(jumpSpaces == 0){
            jumpSpaces = 9;
        }else {
            jumpSpaces = 0;
        }
        spaceAbove = spaceAbove + 10;

        if(tilesList[i - 1][4][0] + spaceBetween > 16359){
            tilesList.push([
              [tilesList[0][0][0] + jumpSpaces, tilesList[0][0][1] + spaceAbove],
              [tilesList[0][1][0] + jumpSpaces, tilesList[0][1][1] + spaceAbove],
              [tilesList[0][2][0] + jumpSpaces, tilesList[0][2][1] + spaceAbove],
              [tilesList[0][3][0] + jumpSpaces, tilesList[0][3][1] + spaceAbove],
              [tilesList[0][4][0] + jumpSpaces, tilesList[0][4][1] + spaceAbove],
              [tilesList[0][5][0] + jumpSpaces, tilesList[0][5][1] + spaceAbove]
              ])
            i = i + 1;
        }
    }
    setTileListState(tilesList);
  }


  const purpleOptions = { color: 'purple' }


  return (
    <div className="map" >
      { pageLoaded &&
      <MapContainer center={[0, 0]} zoom={3}
          minZoom={minZoomState} // Nivel de zoom mínimo permitido
          maxZoom={6} // Nivel de zoom máximo permitido
          maxBounds={bounds}
          maxBoundsViscosity={1}
          style={{ height: '100vh', width: '100%' }}
      scrollWheelZoom={true}>
        <TileLayer attribution="its offline"
        bounds={bounds}
        url={`http://${window.location.hostname}/qr/{z}/{x}/{y}.jpg`}/>
        <Polygon pathOptions={purpleOptions} positions={tileListState[0]} />
      </MapContainer>
      }
    </div>
  );  
};

export default GameContent;
