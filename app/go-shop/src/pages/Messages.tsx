import {useState, useEffect} from 'react';
import {getUserConversations, sendMessage} from '../services/messagesData';
import {Container, Row, Form, InputGroup, Button, Alert} from 'react-bootstrap';
import {json, Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';

import '../components/Messages/Aside.css';
import '../components/Messages/Article.css';

interface User {
    id: number;
    avatar: string;
    name: string;
}

interface Chat {
    id: number;
    seller: User;
    buyer: User;
    conversation: { message: string, senderId: number }[];
    isBuyer: boolean | null;
}

interface Conversations {
    chats: Chat[];
    isBuyer: boolean | null;
    myId: number;
}

interface Selected {
    chat: Chat;
    isBuyer: boolean | null;
    myId: number;
}

type MatchParams = {
    id: string; // or id: number; based on your requirements.
}

function Messages() {
    let {id} = useParams<MatchParams>();
    let chatId = id;
    const [conversations, setConversations] = useState<Conversations>();
    const [isSelected, setIsSelected] = useState(false);
    const [selected, setSelected] = useState<Selected>({
        chat: {
            id: 0,
            seller: {
                id: 0,
                avatar: "",
                name: ""
            },
            buyer: {
                id: 0,
                avatar: "",
                name: ""
            },
            conversation: [],
            isBuyer: null,
        },
        isBuyer: null,
        myId: 0
    });
    const [message, setMessage] = useState<string>("");
    const [alert, setAlert] = useState<string | null>(null);
    const [alertShow, setAlertShow] = useState(false);

    useEffect(() => {
        getUserConversations()
            .then(res => {
                setConversations(res);
            })
            .catch(err => console.log(err));
    }, [chatId]);

    useEffect(() => {
        if (conversations) {
            console.log(`Selected chat id: ${chatId}`)
            const foundChat = conversations.chats.find((x: Chat) => x.id == Number(chatId));
            if (foundChat) {
                console.log("Found chat: ", json(foundChat));
                setSelected({
                    chat: foundChat,
                    isBuyer: foundChat.isBuyer,
                    myId: Number(chatId)
                });
            }
        }
    }, [isSelected, chatId, conversations]);

    const handleMsgSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let chatId = Number(id);
        sendMessage(chatId, message)
            .then((res) => {
                setAlert("Message sent!");
                setAlertShow(true);
                setMessage("");
                if (selected) {
                    selected.chat.conversation.push({message, senderId: res.senderId});
                    setSelected(selected);
                }

                setTimeout(() => {
                    setAlert(null);
                    setAlertShow(false);
                }, 1000);
            })
            .catch(err => console.log(err));
    };

    return (
        <Container>
            <Row>
                <aside className="col-lg-4 col-md-4">
                    <h3>Conversations</h3>
                    {conversations && conversations.chats?.length >= 1 ?
                        <>
                            {conversations.chats.map(x =>
                                <div className="chat-connections" key={x.id}>
                                    <Link onClick={() => setIsSelected(true)} to={`/messages/${x.id}`}>
                                        {x.isBuyer ?
                                            <><img src={x.seller.avatar} alt="user-avatar"/>
                                                <span>{x.seller.name}</span></>
                                            :
                                            <><img src={x.buyer.avatar} alt="user-avatar"/>
                                                <span>{x.buyer.name}</span></>
                                        }
                                    </Link>
                                </div>)
                            }
                        </>
                        :
                        <h5>No messages yet</h5>
                    }
                </aside>
                <article className="col-lg-8 col-md-8">
                    {isSelected &&
                        <>
                            <div className="chat-selected-header col-lg-12">
                                {selected.isBuyer ?
                                    <Link to={`/profile/${selected.chat.seller.id}`}>
                                        <img src={selected.chat.seller.avatar} alt="user-avatar"/>
                                        <span>{selected.chat.seller.name}</span>
                                    </Link>
                                    :
                                    <Link to={`/profile/${selected.chat.buyer.id}`}>
                                        <img src={selected.chat.buyer.avatar} alt="user-avatar"/>
                                        <span>{selected.chat.buyer.name}</span>
                                    </Link>
                                }
                            </div>
                            {alertShow &&
                                <Alert variant="success" onClose={() => setAlertShow(false)} dismissible>
                                    <p>
                                        {alert}
                                    </p>
                                </Alert>
                            }
                            <div className="chat-selected-body col-lg-12">
                                {selected.chat.conversation.map((x, index) =>
                                    <div className={selected.myId === x.senderId ? 'me' : "not-me"}
                                         key={index}>
                                        <span className="message">{x.message}</span>
                                    </div>
                                )}
                            </div>
                            <div className="chat-selected-footer col-lg-12">
                                <Form onSubmit={handleMsgSubmit}>
                                    <Form.Group>
                                        <InputGroup>
                                            <Form.Control
                                                as="textarea"
                                                required
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}>
                                            </Form.Control>
                                            <InputGroup>
                                                <Button type="submit" variant="secondary">Sent</Button>
                                            </InputGroup>
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                            </div>
                        </>
                    }
                </article>
            </Row>
        </Container>
    )
}

export default Messages;






