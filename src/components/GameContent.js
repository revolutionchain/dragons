import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import gameMap from "../styles/gamemap.png";

export default function GameContent() {
    const [initialTile, setInitialTile] = useState({
        x1: 0, y1: 3, x2: 2, y2: 0, x3: 6, y3: 0, x4: 10, y4: 3, x5: 6, y5: 9, x6: 2, y6: 9
    })

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


    // function improved by chatgpt
/*

function mapTiles() {
  
    const tileList = [initialTile];
    let spaceAbove = 0;
    let spaceBetween = 17;
    let jumpSpaces = 0;
  
    for (let i = 1; tileList[i - 1].y6 < 675; i++) {
      const {
        x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6
      } = tileList[i - 1];
  
      while (x4 + 13 < 1355) {
        tileList.push({
          x1: x1 + spaceBetween + jumpSpaces, y1: y1 + spaceAbove,
          x2: x2 + spaceBetween + jumpSpaces, y2: y2 + spaceAbove,
          x3: x3 + spaceBetween + jumpSpaces, y3: y3 + spaceAbove,
          x4: x4 + spaceBetween + jumpSpaces, y4: y4 + spaceAbove,
          x5: x5 + spaceBetween + jumpSpaces, y5: y5 + spaceAbove,
          x6: x6 + spaceBetween + jumpSpaces, y6: y6 + spaceAbove
        });
        i++;
      }
  
      jumpSpaces = jumpSpaces === 0 ? 7 : 0;
      spaceAbove += 9;
    }
    setTileListState(tileList);
  }
    
*/

    return (
        <div style={{ minHeight: `100vh` }}>
            <img src={gameMap} width="100%" height="100%" useMap="#gameMap" />
            <map name="#gameMap">
                {
                    tileListState && tileListState.map((e,i) => {
                        return (<area key={i} shape="poly" coords={`${e.x1},${e.y1},${e.x2},${e.y2},${e.x3},${e.y3},${e.x4},${e.y4},${e.x5},${e.y5},${e.x6},${e.y6}`}
                            href="/" alt="1" target="_blank" />)
                    })
                }
            </map>
        </div>
    )
}
