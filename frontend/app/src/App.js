import './App.css';
import React, {Fragment} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import withRouter from "react-router-dom"
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
import {Md3DRotation} from "react-icons/all";


function createItemCard(imageSrc, title, msgText, itemName) {
    return (
        <Card>
            <Card.Img variant="top" src={imageSrc}
                      width="100" height="100" alt={itemName}/>
            <Card.Title> {title} </Card.Title>
            <Button onClick={() => makeOrder(msgText, true)}>
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
                <br/>
                <CardDeck style={{height: '20vh'}}>
                    <Container>Алкоголь</Container>
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

function makeOrder(msgText, fromUser, id) {
    let messages = this.state.messages
    let order = this.state.order
    messages.push(
        {
            'msgText': msgText,
            'fromUser': fromUser
        }
    )
    order.push(id)
    this.setState({messages})
    this.setState({order})
}

function getMoreInfo(itemName) {
}

function makeOrder() {
    let data = {'items': this.state.order}
    const response = fetch('http://127.0.0.1:8000/query/make-order', {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify(data)
    })
    if (response.json().statusCode === 200) {
        alert('Заказ сделан')
    }
}
class App extends React.Component{
    constructor(...args) {
        super(...args);
        this.state = {
            'messages': [],
            'order': {}
        }
    }
    componentDidMount() {
        makeOrder = makeOrder.bind(this)
        makeOrder = makeOrder.bind(this)
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
                                {this.state.messages.map(message =>
                                message.fromUser ?
                                    <span className="userMessage"> {message.msgText} <br/> </span>:
                                    <span className="botMessage"> {message.msgText} <br/> </span>
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
