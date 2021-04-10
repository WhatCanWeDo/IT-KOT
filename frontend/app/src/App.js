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

class ItemList extends React.Component {
    render() {
        return (
            <div className="item-list">
                <h1>Меню</h1>
                <CardDeck style={{height: '21.75vh'}}>
                    <Container>Салаты</Container>
                    <Card as="a" onClick={() => pushNewMessage('ЙОУ Я КУПИЛ ЦЕЗАРЬ ДА!', true)}>
                        <Card.Img variant="top" src="https://st.vkuso.ru/data/cache/thumb/9e/6006e0b9367ac9e_660x440.jpg"
                        width="100" height="100" alt="HUEWFFHUHUEhu"/>
                        <Card.Title>Салат цезарь </Card.Title>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src="https://www.gastronom.ru/binfiles/images/20191113/b50e9f2a.jpg"
                                  width="100" height="100" alt="HUEWFFHUHUEhu"/>
                        <Card.Title>Салат греческий </Card.Title>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src="https://www.gastronom.ru/binfiles/images/20191113/b50e9f2a.jpg"
                                  width="100" height="100" alt="HUEWFFHUHUEhu"/>
                        <Card.Title>Салат из морепродуктов </Card.Title>
                    </Card>
                </CardDeck>
                <CardDeck style={{height: '21.75vh'}}>
                    <Container>Хинкал</Container>
                    <Card as="a" onClick=''>
                        <Card.Img variant="top" src="https://st.vkuso.ru/data/cache/thumb/9e/6006e0b9367ac9e_660x440.jpg"
                                  width="100" height="100" alt="HUEWFFHUHUEhu"/>
                        <Card.Title>Хинкал с бараниной </Card.Title>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src="https://www.gastronom.ru/binfiles/images/20191113/b50e9f2a.jpg"
                                  width="100" height="100" alt="HUEWFFHUHUEhu"/>
                        <Card.Title>Хинкал с говядиной </Card.Title>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src="https://www.gastronom.ru/binfiles/images/20191113/b50e9f2a.jpg"
                                  width="100" height="100" alt="HUEWFFHUHUEhu"/>
                        <Card.Title>Хинкал с индейкой </Card.Title>
                    </Card>
                </CardDeck>
                <CardDeck style={{height: '21.75vh'}}>
                    <Container>Алкоголь</Container>
                    <Card as="a" onClick=''>
                        <Card.Img variant="top" src="https://st.vkuso.ru/data/cache/thumb/9e/6006e0b9367ac9e_660x440.jpg"
                                  width="100" height="100" alt="HUEWFFHUHUEhu"/>
                        <Card.Title> Вино красное Испания </Card.Title>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src="https://www.gastronom.ru/binfiles/images/20191113/b50e9f2a.jpg"
                                  width="100" height="100" alt="HUEWFFHUHUEhu"/>
                        <Card.Title> Вино красное Италия </Card.Title>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src="https://www.gastronom.ru/binfiles/images/20191113/b50e9f2a.jpg"
                                  width="100" height="100" alt="HUEWFFHUHUEhu"/>
                        <Card.Title> Вино белое Франция </Card.Title>
                    </Card>
                </CardDeck>
                <CardDeck style={{height: '21.75vh'}}>
                    <Container>Напитки</Container>
                    <Card as="a" onClick=''>
                        <Card.Img variant="top" src="https://st.vkuso.ru/data/cache/thumb/9e/6006e0b9367ac9e_660x440.jpg"
                                  width="100" height="100" alt="HUEWFFHUHUEhu"/>
                        <Card.Title> Гранатовый сок </Card.Title>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src="https://www.gastronom.ru/binfiles/images/20191113/b50e9f2a.jpg"
                                  width="100" height="100" alt="HUEWFFHUHUEhu"/>
                        <Card.Title> Минеральная вода </Card.Title>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src="https://www.gastronom.ru/binfiles/images/20191113/b50e9f2a.jpg"
                                  width="100" height="100" alt="HUEWFFHUHUEhu"/>
                        <Card.Title> Лимонад "Буратино" </Card.Title>
                    </Card>
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
            <div className="App">
                <Navbar bg="info" expand="lg">
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
                <Container fluid="true">
                    <Row>
                        <Col lg={4} className="Chat">
                            <div className="Messenger">
                                <h1>Chat</h1>
                                {this.state.messages.map(message =>
                                message.fromUser ?
                                <span className="userMessage"> {message.msgText} </span>:
                                <span className="botMessage"> {message.msgText} </span>
                                )}
                            </div>
                        </Col>
                        <Col md={3} className="ItemList"> <ItemList/> </Col>
                        <Col md={3} className="VirtualAssistant">

                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
