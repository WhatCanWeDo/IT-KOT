import './App.scss';

import SpeechRecognition from "react-speech-recognition";
import {FaMicrophone, FaMicrophoneSlash} from "react-icons/fa";
import {Button} from "react-bootstrap";

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player'
import 'react-chat-widget/lib/styles.css';
import {
    CardDeck,
    Card,
    Navbar,
    Container,
    Col,
    Row,
} from "react-bootstrap"


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

        const text2items = text => {
            var items = ["цезарь", "греческий", "морепродуктов", "баранин", "говя", "индейк", "испан", "итал", "франц", "гранат", "вод", "лимонад"];
            var full_names = [
                "Салат Цезарь", "Греческий салат", "Салат из морепродуктов", "Хинкал (баранина)", "Хинкал (говядина)", 
                "Хинкал (индейка)", "Красное вино (Испания)", "Красное вино (Италия)", "Белое вино (Франция)", "Гранатовый сок", "Минеральная вода", 'Лимонад "Буратино"'];
            var actualItems = [];
            items.forEach(
                (item, index, arr) => {if (text.includes(item)){actualItems.push(full_names[index])}}
            )
            return actualItems
        }

        const handleUserIntention = text => {
            text = text.toLowerCase();
            // готовы
            if (transcript.includes('добав') | transcript.includes('можно')){  // добавить товары в корзину
                var ordered = text2items(text);
                if (ordered.length == 0){
                    changeCurrentPlayer('/didnt_get_it.mp4', false)
                    setTimeout(function(){changeCurrentPlayer('/demo.mp4', true)}, 5000)
                } else{
                    changeCurrentPlayer('/well.mp4', false)
                    setTimeout(function(){changeCurrentPlayer('/demo.mp4', true)}, 3000)    
                    ordered.forEach(
                        (item, index, arr) => {addItem("Добавили в корзину " + item, false)}
                    )
                }
            } else if (transcript.includes('всё')){  // отправить заказ на бэкэнд
                makeOrder();
                changeCurrentPlayer('/start_cooking.mp4', false)
                setTimeout(function(){changeCurrentPlayer('/demo.mp4', true)}, 3000)
            } 
            else if ((transcript.includes('подсказ') | transcript.includes('совет')) && transcript.includes('пит')){
                changeCurrentPlayer('/what_to_drink.mp4', false)
                setTimeout(function(){changeCurrentPlayer('/demo.mp4', true)}, 9000)
            }
            else if ((transcript.includes('подсказ') | transcript.includes('совет')) && transcript.includes('ед')){
                changeCurrentPlayer('/suggest_caesar.mp4', false)
                setTimeout(function(){changeCurrentPlayer('/demo.mp4', true)}, 6000)
            } else if (transcript.includes('счёт') | transcript.includes('счет')){
                changeCurrentPlayer('/payment.mp4', false)
                setTimeout(function(){changeCurrentPlayer('/demo.mp4', true)}, 10000)
            } else {
                changeCurrentPlayer('/didnt_get_it.mp4', false)
                setTimeout(function(){changeCurrentPlayer('/demo.mp4', true)}, 5000)
            }
        }

        const handleStartListen = event => {
            if (listening) {
                this.props.abortListening();
            }
            this.props.resetTranscript();
            this.props.recognition.lang = 'ru'
            this.props.startListening();
            console.log(this.props)
            this.setState({ muted: false })
            event.target.classList.toggle("record");
        };

        const handleStopListen = event => {
            this.props.stopListening();
            this.setState({muted: true})
            handleUserIntention(transcript)
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
                        border: '4px solid red',
                        backgroundColor: 'red'
                    }}>
                    <FaMicrophoneSlash className="Mic" size="50px" style={{margin: '0 5px'}}/>
                    </Button>
                </div>
            )
        } else {
            return (
                <div className="wrapper">
                    <Button className="MicButton" onClick={handleStopListen} style={{
                        borderRadius: '45%',
                        border: '4px solid green',
                        backgroundColor: 'green'
                    }}>
                        <FaMicrophone className="Mic" size="50px" style={{ margin : '0 5px'}}/>
                    </Button>
                </div>
            )
        }
    }
}

let Dict = SpeechRecognition(options)(Dictaphone);

function createItemCard(imageSrc, title, msgText, itemName, itemId) {
    return (
        <Card className="Card">
            <Card.Img variant="top" src={imageSrc}
                      width="100" height="100" alt={itemName}/>
            <Card.Title className="CardTitle" as="a" onClick={() => getMoreInfo(itemName)}> {title} </Card.Title>
            <Button className="CardButton" style={
                {
                    backgroundColor: 'yellowgreen',
                    paddingLeft: '10%',
                    paddingRight: '10%',
                    width: '70%',
                    textAlign: 'center',
                    alignSelf: 'center',
                    fontSize: '90%',
                    fontFamily: 'sans-serif',
                    border: "green"
                }
            } onClick={() => addItem(msgText, false, itemId)}>
                Добавить
            </Button>
        </Card>
    )
}

class ItemList extends React.Component {
    render() {
        return (
            <div className="item-list">
                <CardDeck className="Deck">
                    <Container className="CategoryTitle">Салаты</Container>
                    {createItemCard(
                        "https://st.vkuso.ru/data/cache/thumb/9e/6006e0b9367ac9e_660x440.jpg",
                        "Салат Цезарь",
                        "Салат Цезарь добавлен в заказ",
                        "Cesar",
                        0,
                    )}
                    {createItemCard(
                        "https://st.vkuso.ru/data/cache/thumb/9e/6006e0b9367ac9e_660x440.jpg",
                        "Салат Цезарь",
                        "Салат Цезарь добавлен в заказ",
                        "Cesar",
                        1,
                    )}
                    {createItemCard(
                        "https://st.vkuso.ru/data/cache/thumb/9e/6006e0b9367ac9e_660x440.jpg",
                        "Салат Цезарь",
                        "Салат Цезарь добавлен в заказ",
                        "Cesar",
                        2
                    )}
                </CardDeck>
                <br/>
                <CardDeck className="Deck">
                    <Container className="CategoryTitle">Хинкал</Container>
                    {createItemCard(
                        "https://st.vkuso.ru/data/cache/thumb/9e/6006e0b9367ac9e_660x440.jpg",
                        "Салат Цезарь",
                        "Салат Цезарь добавлен в заказ",
                        "Cesar",
                        3
                    )}
                    {createItemCard(
                        "https://st.vkuso.ru/data/cache/thumb/9e/6006e0b9367ac9e_660x440.jpg",
                        "Салат Цезарь",
                        "Салат Цезарь добавлен в заказ",
                        "Cesar",
                        4
                    )}
                    {createItemCard(
                        "https://st.vkuso.ru/data/cache/thumb/9e/6006e0b9367ac9e_660x440.jpg",
                        "Салат Цезарь",
                        "Салат Цезарь добавлен в заказ",
                        "Cesar",
                        5
                    )}
                </CardDeck>
                <br/>
                <CardDeck className="Deck">
                    <Container className="CategoryTitle">Алкоголь</Container>
                    {createItemCard(
                        "https://st.vkuso.ru/data/cache/thumb/9e/6006e0b9367ac9e_660x440.jpg",
                        "Салат Цезарь",
                        "Салат Цезарь добавлен в заказ",
                        "Cesar",
                        6
                    )}
                    {createItemCard(
                        "https://st.vkuso.ru/data/cache/thumb/9e/6006e0b9367ac9e_660x440.jpg",
                        "Салат Цезарь",
                        "Салат Цезарь добавлен в заказ",
                        "Cesar",
                        7
                    )}
                    {createItemCard(
                        "https://st.vkuso.ru/data/cache/thumb/9e/6006e0b9367ac9e_660x440.jpg",
                        "Салат Цезарь",
                        "Салат Цезарь добавлен в заказ",
                        "Cesar",
                        8
                    )}
                </CardDeck>
            </div>
        );
    }
}

class VirtualAssistant extends React.Component {
    render() {
        return (
            <div className="virtual-assistant">
                Привет
            </div>
        )
    }
}

class MessageBox extends React.Component {
    render() {
        return (
            <div className="chat">
                <div className="chat__wrapper">
                    {this.props.messages.map(message =>
                        message.fromUser ?
                        <div className="chat__message chat__message-own" key={message.id}>
                            <div>
                                {message.text}
                            </div>
                        </div>
                        :
                        <div className="chat__message" key={message.id}>
                            <div>
                                {message.text}
                            </div>
                        </div>
                )}
                </div>
            </div>
        )
    }
}


export function sendToChat(msgText, fromUser) {
    let messages = this.state.messages
    messages.push(
        {
            'text': msgText,
            'fromUser': fromUser,
            'id': this.state.messagesCount++
        }
    )
    this.setState({messages})
}

function addItem(msgText, fromUser, id) {
    let order = this.state.order
    sendToChat(msgText, fromUser)
    order.push(id)
    this.setState({order})
}

function getMoreInfo(itemName) {
    alert('IEJOWIFJIJiJ')
}

function changeCurrentPlayer(video_src, looped) {
    let currentPlayer = this.state.currentPlayer
    currentPlayer = <ReactPlayer className="VideoPlayer" height='80%' width='100%'  url={video_src} playing loop={looped} />
    this.setState({currentPlayer})
}

function makeOrder() {
    let data = {'items': this.state.order}
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
        mode: 'no-cors'
    }
    fetch('http://127.0.0.1:8000/query/make-order', requestOptions)
    sendToChat('Начинаем готовить ваш заказ', false)

}


class App extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            'messages': [],
            'order': [],
            'messagesCount': 0,
            'currentPlayer': <ReactPlayer className="VideoPlayer" height='80%' width='100%'  url='/demo.mp4' playing loop />
        }
    }
    
    componentDidMount() {
        sendToChat = sendToChat.bind(this)
        makeOrder = makeOrder.bind(this)
        addItem = addItem.bind(this)
        getMoreInfo = getMoreInfo.bind(this)
        changeCurrentPlayer = changeCurrentPlayer.bind(this)
        setTimeout(function(){changeCurrentPlayer('/welcome.mp4')}, 500)
        setTimeout(function(){changeCurrentPlayer('/demo.mp4', true)}, 13000)
    }

    render() {
        return (
            <div className="App" style={{width: '100%'}}>
                <Navbar bg="white" expand="lg" style={{width: '100%'}}>
                    <Navbar.Brand style={{
                        width: "10%",
                        height: "10%"
                    }}>
                        <img
                            src='brand.svg'
                            width="30%"
                            height="30%"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                        <span className="HeadSpan"
                              style={
                                  {
                                    marginLeft: '2%',
                                  }
                              }>Чат</span>
                        <span className="HeadSpan" style={{
                            marginLeft: '31.5%',
                        }} >Меню</span>
                    <span className="HeadSpan" style={{
                        marginLeft: '29%'
                    }}>Ассистент</span>
                </Navbar>
                <Container fluid="true" style={{width: '99.2%'}}>
                    <Row>
                        <Col className="Chat">
                            <MessageBox messages={this.state.messages}/>
                        </Col>
                        <Col className="ItemList"> <ItemList/> </Col>
                        <Col className="VirtualAssistant">
                            {this.state.currentPlayer}
                            <Dict classname="Dictaphone" />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
