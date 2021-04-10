import React, {useState} from 'react'
import SpeechRecognition from "react-speech-recognition";
import {BsMic, BsMicMute} from "react-icons/bs";
import {Button} from "react-bootstrap";
import "./App.css"

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
            interimTranscript,
            finalTranscript,
            browserSupportsSpeechRecognition
        } = this.props;

        const handleStartListen = event => {
            if (listening) {
                this.props.abortListening();
            }
            this.props.recognition.lang = 'ru'
            this.props.startListening();
            console.log(this.props)
            this.setState({ muted: false })
            event.target.classList.toggle("record");
        };

        const handleStopListen = event => {
            this.props.stopListening();
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
                    </Button>
                    <div id="output" className="output">
                        {transcript}
                    </div>
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
                    </Button>
                    <div id="output" className="output">
                        {transcript}
                    </div>
                </div>
            )
        }
    }
}

export default SpeechRecognition(options)(Dictaphone)
