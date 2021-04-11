import './App.css';


import SpeechRecognition from "react-speech-recognition";
import {BsMic, BsMicMute} from "react-icons/bs";
import {Button} from "react-bootstrap";
import "./App.css"

import React, {Fragment, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player'
import {
    CardDeck,
    Card,
    Navbar,
    Form,
    Nav,
    NavDropdown,
    FormControl,
    Container,
    Col,
    Row,
    ListGroup,
    Alert
} from "react-bootstrap"
import {Md3DRotation} from "react-icons/all";


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
            var items = ["цезарь", "греческий", "морепродуктов", "баранин", "говядин", "индейк", "испан", "итал", "франц", "гранат", "вод", "лимонад"];
            var actualItems = [];
            items.forEach(
                (item, index, arr) => {if (text.includes(item)){actualItems.push(item)}}
            )
            return actualItems
        }

        const handleUserIntention = text => {
            text = text.toLowerCase();
            // готовы
            if (transcript.includes('добавь')){  // добавить товары в корзину
                var ordered = text2items(text);
                if (ordered.length == 0){
                    changeCurrentPlayer('/didnt_get_it.mp4', false)
                    setTimeout(function(){changeCurrentPlayer('/demo.mp4', true)}, 3000)
                } else{
                    ordered.forEach(
                        (item, index, arr) => {addItem("Добавили в корзину " + item, false)}
                    )
                }
            } else if (transcript.includes('на этом всё')){  // отправить заказ на бэкэнд
                makeOrder();
                changeCurrentPlayer('/start_cooking.mp4', true)
                setTimeout(function(){changeCurrentPlayer('/demo.mp4', true)}, 3000)
            } 
            else if (transcript.includes('подсказать') && transcript.includes('напит')){
                changeCurrentPlayer('/want_to_drinkg.mp4', true)
                setTimeout(function(){changeCurrentPlayer('/demo.mp4', true)}, 8000)

            } else if (transcript.includes('всё') && transcript.includes('спасибо')){
                alert('хочеца подсказку')
            // еще не готовы
            } else if (transcript.includes('можете подсказать')){
                alert('хочеца подсказку')
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

let Dict = SpeechRecognition(options)(Dictaphone);

function createItemCard(imageSrc, title, msgText, itemName, itemId) {
    return (
        <Card>
            <Card.Img variant="top" src={imageSrc}
                      width="100" height="100" alt={itemName}/>
            <Card.Title> {title} </Card.Title>
            <Button onClick={() => addItem(msgText, true, itemId)}>
                Добавить в заказ
            </Button>
            <Button onClick={() => getMoreInfo(itemName)}> Подробнее </Button>
        </Card>
    )
}

class ItemList extends React.Component {
    render() {
        return (
            <div className="item-list">
                <h1>Меню</h1>
                <CardDeck style={{height: '20vh'}}>
                    <Container>Салаты</Container>
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
                <br/>
                <br/>
                <br/>
                <br/>

                <CardDeck style={{height: '20vh'}}>
                    <Container>Хинкал</Container>
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
                <CardDeck style={{height: '20vh'}}>
                    <Container>Алкоголь</Container>
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
                <br/>
                <CardDeck style={{height: '20vh'}}>
                    <Container>Напитки</Container>
                    {createItemCard(
                        "https://st.vkuso.ru/data/cache/thumb/9e/6006e0b9367ac9e_660x440.jpg",
                        "Салат Цезарь",
                        "Салат Цезарь добавлен в заказ",
                        "Cesar"
                    )}
                    {createItemCard(
                        "https://st.vkuso.ru/data/cache/thumb/9e/6006e0b9367ac9e_660x440.jpg",
                        "Салат Цезарь",
                        "Салат Цезарь добавлен в заказ",
                        "Cesar"
                    )}
                    {createItemCard(
                        "https://st.vkuso.ru/data/cache/thumb/9e/6006e0b9367ac9e_660x440.jpg",
                        "Салат Цезарь",
                        "Салат Цезарь добавлен в заказ",
                        "Cesar"
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

function sendToChat(msgText, fromUser) {
    let messages = this.state.messages
    messages.push(
        {
            'msgText': msgText,
            'fromUser': fromUser
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


class CanvasVideo extends React.Component {
    constructor() {
        super();
    }
}

function changeCurrentPlayer(video_src, looped) {
    let currentPlayer = this.state.currentPlayer
    currentPlayer = <ReactPlayer height='100%' width='100%' url={video_src} playing loop={looped} />
    this.setState({currentPlayer})
}

class App extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            'messages': [],
            'order': [],
            'currentPlayer': <ReactPlayer height='100%' width='100%' url="/demo.mp4" playing loop/>
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
                <Navbar bg="info" expand="lg" style={{width: '100%'}}>
                    <Navbar.Brand>
                        <img
                            src='./images/brand.png'
                            width="10"
                            height="10"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Nav className="mr-auto">
                        <NavDropdown id="basic-nav-dropdown" title="Dropdown">
                            <NavDropdown.Item href="action/1">Action 1</NavDropdown.Item>
                            <NavDropdown.Item href="action/2">Action 2</NavDropdown.Item>
                            <NavDropdown.Item href="action/3">Action 3</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                        <Button variant="outline-light">Search</Button>
                    </Form>
                </Navbar>
                <Container fluid="true" style={{width: '99.2%'}}>
                    <Row>
                        <Col className="Chat" style={{
                            height: '92.5vh',
                        }}>
                            <div className="Messenger" style={{
                                backgroundColor: 'white',
                            }}>
                                <h1>Chat</h1>
                                {this.state.messages.map((message, i) =>
                                message.fromUser ?
                                    <span className="userMessage" key={i}> {message.msgText} <br/> </span>:
                                    <span className="botMessage" key={i}> {message.msgText} <br/> </span>
                                )}
                            </div>
                            <Button onClick={makeOrder}>Сделать заказ</Button>
                        </Col>
                        <Col className="ItemList" style={{height: '92.5vh'}}> <ItemList/> </Col>
                        <Col className="VirtualAssistant" style={{height: '92.5vh'}}>
                            {this.state.currentPlayer}
                            <Dict/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
