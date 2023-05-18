import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import gameMap from "../styles/gamemap.png";

export default function GameContent() {
    


    const imageRef = useRef(null);


    const [initialTile, setInitialTile] = useState({
        x1: 0, y1: 3, x2: 2, y2: 0, x3: 6, y3: 0, x4: 10, y4: 3, x5: 6, y5: 9, x6: 2, y6: 9
    });
    const [moveValue, setMoveValue] = useState(200);

    useEffect(() => {
        document.title = `Revo | Game`
        mapTiles()

    }, []);


    const [tileListState, setTileListState] = useState(false);

    //function made by Pablitos

    let mapTiles = () => {

        let tilesList = [initialTile];
        let i = 1;
        let spaceAbove = 0;
        let spaceBetween = 13;
        let jumpSpaces = 0;
        while(tilesList[i-1].y6 < 675){
            while (tilesList[i - 1].x4 + 13 < 1355) {
                tilesList.push({
                    x1: tilesList[i - 1].x1 + spaceBetween + jumpSpaces,
                    y1: tilesList[i - 1].y1,
                    x2: tilesList[i - 1].x2 + spaceBetween + jumpSpaces,
                    y2: tilesList[i - 1].y2,
                    x3: tilesList[i - 1].x3 + spaceBetween + jumpSpaces,
                    y3: tilesList[i - 1].y3,
                    x4: tilesList[i - 1].x4 + spaceBetween + jumpSpaces,
                    y4: tilesList[i - 1].y4,
                    x5: tilesList[i - 1].x5 + spaceBetween + jumpSpaces,
                    y5: tilesList[i - 1].y5,
                    x6: tilesList[i - 1].x6 + spaceBetween + jumpSpaces,
                    y6: tilesList[i - 1].y6
                })
                i = i + 1;
            }

            if(jumpSpaces == 0){
                jumpSpaces = 7;
            }else {
                jumpSpaces = 0;
            }
            spaceAbove = spaceAbove + 8;

            if(tilesList[i - 1].x4 + 13 > 1355){
                tilesList.push({
                    x1: tilesList[0].x1 + jumpSpaces, y1: tilesList[0].y1 + spaceAbove, x2: tilesList[0].x2 + jumpSpaces, y2: tilesList[0].y2 + spaceAbove, x3: tilesList[0].x3 + jumpSpaces, y3: tilesList[0].y3 + spaceAbove, x4: tilesList[0].x4 + jumpSpaces, y4: tilesList[0].y4 + spaceAbove, x5: tilesList[0].x5 + jumpSpaces, y5: tilesList[0].y5 + spaceAbove, x6: tilesList[0].x6 + jumpSpaces, y6: tilesList[0].y6 + spaceAbove
                })
                i = i + 1;
            }
        }
        setTileListState(tilesList);
    }




    const handleMove = (direction) => {
      const image = imageRef.current;
    
      if (image) {
        switch (direction) {
          case 'up':
            image.scrollBy({ behavior: 'smooth', top: -moveValue });
            break;
          case 'down':
            image.scrollBy({ behavior: 'smooth', top: moveValue });
            break;
          case 'left':
            image.scrollBy({ left: -moveValue, behavior: 'smooth' });
            break;
          case 'right':
            image.scrollBy({ left: moveValue, behavior: 'smooth' });
            break;
          default:
            break;
        }
      }
    };



    const [zoom, setZoom] = useState(1);
    const [fixedPosition, setFixedPosition] = useState(false);



const handleZoomIn = () => {
    const image = imageRef.current;
    if(zoom < 1){
        setZoom(zoom + 0.1);
        setMoveValue(moveValue+200);
        image.scrollBy({ right: 410, bottom: 205, behavior: 'smooth' });
        setFixedPosition(true);
    }
};

const handleZoomOut = () => {
    const image = imageRef.current;
    if (zoom > 0.4 ) {
        setZoom(zoom - 0.1);
        image.scrollBy({ left: 410, top: 205, behavior: 'smooth' });
        setFixedPosition(true);
    }

    if(moveValue > 200){        
        setMoveValue(moveValue-200);
    }
};


    
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', }}>
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', paddingRight: '20px', transition: 'transform 0.3s ease'  }} ref={imageRef}>
            <img src={gameMap} useMap="#gameMap" alt="Image" style={{transform: `scale(${zoom})`, transition: 'transform 0.3s ease'  }}
            />            
            <map name="#gameMap">
                {/*
                    tileListState && tileListState.map((e,i) => {
                        return (<area key={i} shape="poly" coords={`${e.x1},${e.y1},${e.x2},${e.y2},${e.x3},${e.y3},${e.x4},${e.y4},${e.x5},${e.y5},${e.x6},${e.y6}`}
                            href="/" alt="1" target="_blank" />)
                    })*/
                }
            </map>
          </div>
          <div style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: 999 }}>
            <button onClick={() => handleMove('up')}>Up</button>
            <button onClick={() => handleMove('down')}>Down</button>
            <button onClick={() => handleMove('left')}>Left</button>
            <button onClick={() => handleMove('right')}>Right</button>
            <button onClick={handleZoomIn}>Zoom +</button>
            <button onClick={handleZoomOut}>Zoom -</button>
          </div>
        </div>
    );
    }
    

    
