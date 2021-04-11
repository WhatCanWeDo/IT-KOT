import './App.scss';
import React, {Fragment} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player'
import 'react-chat-widget/lib/styles.css';
import { Widget, addResponseMessage } from 'react-chat-widget';
import {
    CardDeck,
    Card,
    Navbar,
    Form,
    Nav,
    NavDropdown,
    FormControl,
    Button,
    Container,
    Col,
    Row,
} from "react-bootstrap"
import Dictaphone from "./Dictaphone";

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
                <br/>
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
    currentPlayer = <ReactPlayer height='100%' width='100%' url={video_src} playing loop={looped} />
    this.setState({currentPlayer})
}

function handleNewUserMessage() {

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
            'currentPlayer': <ReactPlayer height='100%' width='100%' url="/demo.mp4" playing={true}/>
        }
    }
    componentDidMount() {
        makeOrder = makeOrder.bind(this)
        addItem = addItem.bind(this)
        getMoreInfo = getMoreInfo.bind(this)
        sendToChat = sendToChat.bind(this)
        changeCurrentPlayer = changeCurrentPlayer.bind(this)

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
                        <Col className="ItemList" style={{height: '92.5vh'}}> <ItemList/> </Col>
                        <Col className="VirtualAssistant" style={{height: '92.5vh'}}>

]                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
