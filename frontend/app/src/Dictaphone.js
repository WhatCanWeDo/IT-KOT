import React, {useState} from 'react'
import SpeechRecognition from "react-speech-recognition";
import {BsMic, BsMicMute} from "react-icons/bs";
import {Button} from "react-bootstrap";
import "./App.scss"
import {sendToChat} from "./App";
const options = {
    autoStart: false,
    continuous: true
};
class Dictaphone extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {muted: true}
    }
    render() {
        const {
            listening,
            transcript,
            resetTranscript,
            browserSupportsSpeechRecognition
        } = this.props;

        const handleStartListen = event => {
            console.log('started')
            if (listening) {
                this.props.abortListening();
            }
            this.props.recognition.lang = 'ru'
            this.props.startListening();
            this.setState({ muted: false })
            event.target.classList.toggle("record");
        };


        const handleStopListen = event => {
            console.log('stopped')
            if (transcript !== '') {
                sendToChat(transcript, true)
            }
            this.props.abortListening();
            console.log(transcript)
            resetTranscript();
            console.log(transcript)
            this.setState({muted: true})
        }

        const resetListen = () => {
            this.props.resetTranscript();
        };

        if (!browserSupportsSpeechRecognition) {
            return null;
        }

        if (this.state.muted) {
            return (
                <div className="wrapper">
                    <Button className="MicButton" onClick={handleStartListen} style={{
                        borderRadius: '45%',
                        border: '5px solid white',
                        backgroundColor: 'black'
                    }}>
                        <BsMicMute className="Mic" size="50px" style={{ margin : '0 5px'}}/>
                        {console.log(transcript)}
                    </Button>
                </div>
            )
        } else {
            return (
                <div className="wrapper">
                    <Button className="MicButton" onClick={handleStopListen} style={{
                        borderRadius: '45%',
                        border: '5px solid white',
                        backgroundColor: 'black'
                    }}>
                        <BsMic className="Mic" size="50px" style={{ margin : '0 5px'}}/>
                        {console.log(transcript)}
                    </Button>
                </div>
            )
        }
    }
}

export default SpeechRecognition(options)(Dictaphone)
