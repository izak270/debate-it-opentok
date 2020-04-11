import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Player from './Player'
import Players from './Players'
import Time from './Time'
import GameTitle from './GameTitle'


export default function GameField(props) {


    const url = 'ws://127.0.0.1:8000/ws/game1/';

    const handleMessage = (e) => {
        let data = null
        console.log(data,'bloblbo')
        if(data instanceof Blob){
            data = new Blob(data)
        }
        else{
            data = JSON.parse(e.data)
            console.log(data)
        };
        if (data[0] === 'ready') {
            setStartGame(true)
            setButton(data[1]);
            setWhoSpeaks(data[2])

        }
        if (data[2] === 'burst') {
            console.log(data[2], 'burst')
            setTimeout(function () {
                setButton(data[1]);
                setWhoSpeaks(data[0])
            }, 2000)
        }
        if (data[2] === 'pass') {
            console.log(data, 'pass')
            setButton(data[1]);
            setWhoSpeaks(data[0])
        } else if (data === 'audience') {
            setAudience(true)
        }
        if (data[3] === 'startRecord') {
            console.log('startrecord')
             if(data[2]==='burst'){
                setTimeout(function(){setRecordPlayer('1')} ,2000)
            }
            else{
                setRecordPlayer('1')
             }

        }
        if (data[3] === 'stopRecord') {
            console.log('stoprecord')
            if(data[2]==='burst'){
                setTimeout(function(){setRecordPlayer('2')} ,2000)
            }
            else{
                setRecordPlayer('2')
            }

        }


    };
    const createSocket = () => {
        const x = new WebSocket(url);
        x.onopen = () => console.log('OPEN');
        x.onclose = () => console.log('CLOSE');
        x.onmessage = handleMessage;
        return x;
    };

    const [recordPlayer, setRecordPlayer] = useState('3')
    const [mr, setMr] = useState();

    const [socket, setSocket] = React.useState(createSocket);


    const [audience, setAudience] = useState(false)
    const [gameTitle, setGameTitle] = useState('test title');

    const [button, setButton] = useState('start');
    const [whoSpeaks, setWhoSpeaks] = useState(0);


    const [timePlayer1, setTimePlayer1] = useState(300);
    const [timePlayer2, setTimePlayer2] = useState(300);


    const [startGame, setStartGame] = useState(false);
    // const [startGamePlayer2, setStartGamePlayer2] = useState(false);
    const [x, setX] = useState(true);
    let a = new Audio('https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3');
    const [audio, setAudio] = useState(a);
    const tamarSpeaks = useRef(null)
    const naftaliSpeaks = useRef(null)


    const passOrBurstFunc = () => {
        if (button === 'pass') {
            console.log('pass')
            socket.send(JSON.stringify('pass'))
        }
        if (button === 'burst') {
            console.log('burst')
            socket.send(JSON.stringify('burst'))
        }


    };
    const sendReady = () => {
        socket.send(JSON.stringify('ready'));
    };


    useEffect(function () {

        const timer = setInterval(function () {
            if (startGame === true) {
                (whoSpeaks === 'player1turn' ? setTimePlayer1(x => x - 1) : setTimePlayer2(x => x - 1))
            }
        }, 1000);
        return function abort() {
            clearInterval(timer);
        }
    }, [whoSpeaks]);

    let mediaRecorder = 'null'
    const[mediaRecorder1,setMediaRecorder1] = useState()
    const record = (ms, ondata) => {

        return navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
            console.log('starting');
            let options = {
                mimeType: 'audio/webm',
            };
            mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorder.ondataavailable = ondata;
            mediaRecorder.start(ms);

            return mediaRecorder
        }, (e) => console.log(e));
    };
    useEffect(function () {
        console.log(recordPlayer,'instoperecord',mediaRecorder)
        if (recordPlayer === '1') {
            record(500, (event) => {
                console.log(event.data);
                socket.send(event.data)
            }).then(setMr);
        }
        if (recordPlayer === '2') {
            console.log(recordPlayer,'instoperecord')
            mr.stop();
        }


    }, [recordPlayer]);


    // record('stoprecord', 100, (event) => {
    //     console.log(event.data);
    // // });
    return (
        <div className={'gameContainer'}>
            <GameTitle gameTitle={gameTitle}/>
            <Time timePlayer1={timePlayer1} timePlayer2={timePlayer2} tamarSpeaks={tamarSpeaks}
                  naftaliSpeaks={naftaliSpeaks}/>
            <Players button={button} passOrBurstFunc={passOrBurstFunc} startGame={startGame} audience={audience}
                     sendReady={sendReady} whoSpeaks={whoSpeaks}/>
            {mr ? 'recording' : 'waiting'}
            <button onClick={() => mr.stop()}>stop</button>
        </div>
    )
}