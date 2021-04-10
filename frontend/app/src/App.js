import './App.css';
import React, {Fragment} from "react";
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
    Button,
    Container,
    Col,
    Row,
    ListGroup,
    Alert
} from "react-bootstrap"
import Dictaphone from "./Dictaphone";

function createItemCard(imageSrc, title, msgText, itemName, itemId) {
    return (
        <Card className="Card" shadow={true}>
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
            } onClick={() => addItem(msgText, true, itemId)}>
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
    alert('IEJOWIFJIJiJ')
}

function changeCurrentPlayer(video_src, looped) {
    let currentPlayer = this.state.currentPlayer
    currentPlayer = <ReactPlayer height='100%' width='100%' url={video_src} playing loop={looped} />
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
                <Navbar bg="info" expand="lg" style={{width: '100%'}}>
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
                    <Navbar.Collapse className="">
                        <Navbar.Text className="text-left">Чат</Navbar.Text>
                    </Navbar.Collapse>
                    <Navbar.Collapse>
                    <Navbar.Text className="text-center">Меню</Navbar.Text>
                    </Navbar.Collapse>
                    <Navbar.Text className="text-right">Ассистент</Navbar.Text>
                </Navbar>
                <Container fluid="true" style={{width: '99.2%'}}>
                    <Row>
                        <Col className="Chat" style={{
                            height: '92.5vh',
                        }}>
                            <div className="Messenger" style={{
                                backgroundColor: 'white',
                            }}>
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
                            <Dictaphone/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
