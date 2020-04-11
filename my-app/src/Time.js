import React, {useState,useRef} from "react";


export default function GameField(props) {
    const {timePlayer1} = props
    const {timePlayer2} = props
    const {tamarSpeaks}= props
    const {naftaliSpeaks}= props
    let minutes1 = parseInt(timePlayer1 / 60);
    let seconds1 = parseInt(timePlayer1 % 60);
    let minutes2 = parseInt(timePlayer2 / 60);
    let seconds2 = parseInt(timePlayer2 % 60);

    return (
        <div className={'time'}>
            <audio ref={tamarSpeaks} id="player">
                <source src='http://hi5.1980s.fm/;' type='audio/mpeg'/>
            </audio>
            <audio ref={naftaliSpeaks} id="player">
                <source src='https://tunein.com/artist/Url-m82123/' type='audio/mpeg'/>
            </audio>
            {/*<button onClick={Audio}></button>*/}
            <span
                className={'left'}>{minutes1 < 10 ? '0' + minutes1 : minutes1}:{seconds1 < 10 ? '0' + seconds1 : seconds1}</span>
            <span
                className={'right'}>{minutes2 < 10 ? '0' + minutes2 : minutes2}:{seconds2 < 10 ? '0' + seconds2 : seconds2}</span>
        </div>
    )
}
