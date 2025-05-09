import React,{ useEffect, useState } from "react"
import { Map, MapMarker} from "react-kakao-maps-sdk";
import axios from "axios"

export default function KakaoMapPage() {
  
    return(
        <>
            <Map
            center= {{lat:33.450701,lng:126.570667}}
            style={{width: '390px',height:'844px'}}
            level={3}
            />

        </>
    );
}