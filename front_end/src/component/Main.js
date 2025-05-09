import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import axios from 'axios'

export default function Main() {
    return (
        <>
            <Map
                center={{ lat: 36.361803, lng: 127.356542 }}
                style={{ width: '300px', height: '600px' }}
                level={3}>

                <MapMarker position={{ lat: 36.361803, lng: 127.356542 }}>
                    <div
                        style={{ 
                            padding: "5px", 
                            color: "#000", 
                            marginLeft: "40px", 
                            }}>
                        현재 위치
                    </div>
                </MapMarker>
            </Map>
        </>
    );
}
