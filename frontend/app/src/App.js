import './App.css';
import React, {Fragment} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
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
            <Button onClick={() => pushNewMessage(msgText, true)}>
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

function pushNewMessage(msgText, fromUser) {
    let messages = this.state.messages
    messages.push(
        {
            'msgText': msgText,
            'fromUser': fromUser
        }
    )
    this.setState({messages})
}

function getMoreInfo(itemName) {

}

class App extends React.Component{
    constructor(...args) {
        super(...args);
        this.state = {'messages': []}
    }
    componentDidMount() {
        pushNewMessage = pushNewMessage.bind(this)
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
                <Container fluid="true" style={{width: '99.2%', textAlign: 'center'}}>
                    <Row>
                        <Col className="Chat" style={{height: '92.5vh'}}>
                            <div className="Messenger">
                                <h1>Chat</h1>
                                {this.state.messages.map(message =>
                                message.fromUser ?
                                <span className="userMessage"> {message.msgText} </span>:
                                <span className="botMessage"> {message.msgText} </span>
                                )}
                            </div>
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
