import React, {useState,useRef} from "react";


export default function GameTitle(props) {
    const {gameTitle} = props
    return (
        <div className={'title'}>
            <h1>{gameTitle}</h1>
        </div>
    )
}
