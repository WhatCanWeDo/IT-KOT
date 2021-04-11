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
            var items = ["цезарь", "греческ", "морепродуктов", "баранин", "говя", "индейк", "испан", "бел", "гранат"];
            var full_names = [
                "Салат Цезарь", "Греческий салат", "Салат из морепродуктов", "Хинкал (говядина)", "Хинкал (баранина)",
                "Хинкал (индейка)", "Красное вино (Испания)", "Белое вино (Франция)", "Гранатовый сок"];
            var actualItems = [];
            items.forEach(
                (item, index, arr) => {if (text.includes(item)){actualItems.push([full_names[index], index])}}
            )
            return actualItems
        }

        const handleUserIntention = () => {
            let text = transcript.toLowerCase();
            // готовы

            if ((text.includes('подсказ') || text.includes('совет')) && (text.includes('ед') || text.includes('поесть'))){
                changeCurrentPlayer('/suggest_caesar.mp4', false)
                sendToChat('Советую вам попробовать салат Цезарь, это фирменное блюдо нашего шефа.', false)
                setTimeout(function(){changeCurrentPlayer('/demo.mp4', true)}, 6000)
            }
            else if (text.includes('хватит') || (text.includes('оформ') && text.includes('заказ'))){  // отправить заказ на бэкэнд
                makeOrder();
                changeCurrentPlayer('/start_cooking.mp4', false)
                setTimeout(function(){changeCurrentPlayer('/demo.mp4', true)}, 3000)
            } 
            else if ((text.includes('подсказ') || text.includes('совет')) && text.includes('пит')){
                changeCurrentPlayer('/what_to_drink.mp4', false)
                sendToChat('Советую вам заказать гранатовый сок. Мы выжимаем его   из гранатов выращенных на местных фермах прямо у нас на кухне.', false)
                setTimeout(function(){changeCurrentPlayer('/demo.mp4', true)}, 9000)
            }
            else if (text.includes('добав') || text.includes('можно') || text.includes('закаж') || text.includes('давай') || text.includes('хоч')){  // добавить товары в корзину
                var ordered = text2items(text);
                if (ordered.length === 0){
                     changeCurrentPlayer('/didnt_get_it.mp4', false)
                    setTimeout(function(){changeCurrentPlayer('/demo.mp4', true)}, 5000)
                } else{
                    changeCurrentPlayer('/well.mp4', false)
                    setTimeout(function(){changeCurrentPlayer('/demo.mp4', true)}, 3000)    
                    ordered.forEach(
                        (item, index, arr) => {addItem("Добавили к заказу " + item[0], false, item[1])}
                    )
                }
            } else if (text.includes('счёт') || text.includes('счет')){
                changeCurrentPlayer('/payment.mp4', false)
                sendToChat('С вас 570 рублей, можете приложить карту для оплаты. Также, будем рады, если вы оставите свой отзыв о нас.', false)
                setTimeout(function(){changeCurrentPlayer('/demo.mp4', true)}, 10000)
            } else {
                changeCurrentPlayer('/didnt_get_it.mp4', false)
                sendToChat('Извините, я не совсем вас поняла', false)
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
            if (transcript !== ''){
                sendToChat(transcript, true)
            }
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
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        border:'4px solid white'
                    }}>
                        <img src="mic_off.png"></img>
                    </Button>
                </div>
            )
        } else {
            return (
                <div className="wrapper">
                    {console.log(transcript)}
                    <Button className="MicButton" onClick={handleStopListen} style={{
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        border:'4px solid white'
                    }}>
                    <img src="mic_on.png"></img>
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
                    background: '#0ec645',
                    paddingLeft: '5%',
                    paddingRight: '5%',
                    width: '70%',
                    textAlign: 'center',
                    alignSelf: 'center',
                    fontSize: '70%',
                    fontFamily: 'sans-serif',
                    fontWeight: 700,
                    border: "green"
                }
            } onClick={() => addItem(msgText, false, itemId)}>
                ДОБАВИТЬ
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
                        "http://radka.in.ua/wp-content/uploads/2017/06/72e529a384da540324ddf6c7034f52dd.jpg",
                        "Салат Цезарь",
                        "Салат Цезарь добавлен в заказ",
                        "Cesar",
                        0,
                    )}
                    {createItemCard(
                        "https://www.vestniksr.ru/upload/000/u1/d/3/salat-grecheskii-photo-big.jpg",
                        "Греческий салат",
                        "Греческий салат добавлен в заказ",
                        "greek",
                        1,
                    )}
                    {createItemCard(
                        "https://richifamily.ru/upload/resize_cache/iblock/233/450_450_0/23328d98b5b458d16200c97a21e20fce.JPG",
                        "Салат из морепродуктов",
                        "Салат из морепродуктов добавлен в заказ",
                        "seafood",
                        2
                    )}
                </CardDeck>
                <br/>
                <CardDeck className="Deck">
                    <Container className="CategoryTitle">Хинкал</Container>
                    {createItemCard(
                        "https://cdn.the-village.ru/the-village.ru/post_image-image/nChWrV6k_dtQkrSSNt2Iwg.jpg",
                        "Хинкал (индейка)",
                        "Хинкал (индейка) добавлен в заказ",
                        "hinkal_ind",
                        3
                    )}
                    {createItemCard(
                        "https://odelita.ru/sites/default/files/styles/800_600/public/images/2017/09/avarskij-hinkal_w372_h248.jpg?itok\u003dsYKQlEyP",
                        "Хинкал (баранина)",
                        "Хинкал (баранина) добавлен в заказ",
                        "hinkal",
                        4
                    )}
                    {createItemCard(
                        "https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1RkXV5mISzRq0G7lmPqX82d1aaKTM5SRkZCeTgDn6uOyic",
                        "Хинкал (говядина)",
                        "Хинкал (говядина) добавлен в заказ",
                        "hinkal_go",
                        5
                    )}
                </CardDeck>
                <br/>
                <CardDeck className="Deck">
                    <Container className="CategoryTitle">Напитки</Container>
                    {createItemCard(
                        "https://wallbox.ru/resize/800x480/wallpapers/main2/201714/149161738758e8466b3e7828.09558990.jpg",
                        "Красное вино (Испания)",
                        "Красное вино (Испания) добавлен в заказ",
                        "spain",
                        6
                    )}
                    {createItemCard(
                        "https://sonko-mosreg.ru/800/600/https/avatars.mds.yandex.net/get-zen_doc/1877575/pub_5db44613c49f2900ad3b99cb_5db49547c7e50c00ad7edf88/scale_1200",
                        "Белое вино (Франция)",
                        "Белое вино (Франция) добавлен в заказ",
                        "franch",
                        7
                    )}
                    {createItemCard(
                        "https://www.prostreno.cz/image.ashx/36725/3137313032353137323430372d3532323536373439332e6a7067/640/480",
                        "Гранатовый сок",
                        "Гранатовый сок добавлен в заказ",
                        "grenade",
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
    console.log(order)
    sendToChat(msgText, fromUser)
    order.push(id)
    this.setState({order})
}

function getMoreInfo(itemName) {
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
    this.state.order = []
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
        sendToChat("Добрый день! Рады видеть вас в нашем ресторане. Во вкладке по центру вы можете ознакомиться с меню. Если вам нужна помощь или вы готовы сделать заказ, можете обратиться ко мне.", false)
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
                            src='logo.png'
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
                              }>История</span>
                        <span className="HeadSpan" style={{
                            marginLeft: '27%',
                        }} >Меню</span>
                    <span className="HeadSpan" style={{
                        marginLeft: '27%'
                    }}>Ассистент</span>
                </Navbar>
                <Container fluid="true" style={{width: '99.2%', backgroundColor: 'whitesmoke'}}>
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
