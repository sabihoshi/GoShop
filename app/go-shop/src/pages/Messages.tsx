import { useState, useEffect } from 'react';
import { getUserConversations, sendMessage } from '../services/messagesData';
import { Container, Row, Form, InputGroup, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import '../components/Messages/Aside.css';
import '../components/Messages/Article.css';

interface User {
    _id: string;
    avatar: string;
    name: string;
}

interface Chat {
    _id: number;
    seller: User;
    buyer: User;
    conversation: { message: string, senderId: string }[];
    isBuyer: boolean | null;
}

interface Selected {
    chats: Chat;
    isBuyer: boolean | null;
    myId: number;
}

type MatchParams = {
    id: string; // or id: number; based on your requirements.
}

function Messages() {
    let { id } = useParams<MatchParams>();
    let chatId = id;
    const [conversations, setConversations] = useState<Chat[]>([]);
    const [isSelected, setIsSelected] = useState(false);
    const [selected, setSelected] = useState<Selected>({
        chats: {
            _id: 0,
            seller: {
                _id: "",
                avatar: "",
                name: ""
            },
            buyer: {
                _id: "",
                avatar: "",
                name: ""
            },
            conversation: [],
            isBuyer: null
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
        if (isSelected) {
            const foundChat = conversations.find((x: Chat) => x._id === Number(chatId));
            if (foundChat) {
                setSelected({
                    chats: foundChat,
                    isBuyer: foundChat.isBuyer,
                    myId: 0 // You may need to adjust this value according to your logic
                });
            }
        }
    }, [isSelected, chatId, setSelected]);

    const handleMsgSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let chatId = Number(id);
        sendMessage(chatId, message)
            .then((res) => {
                setAlert("Message sent!");
                setAlertShow(true);
                setMessage("");
                setSelected({ ...selected, chats: { ...selected.chats, conversation: [...selected.chats.conversation, { message, senderId: res.sender }] } });
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
                    {conversations.length >= 1 ?
                        <>
                            {conversations.map(x =>
                                <div className="chat-connections" key={x._id}>
                                    <Link onClick={() => setIsSelected(true)} to={`/messages/${x._id}`}>
                                        {x.isBuyer ?
                                            <><img src={x.seller.avatar} alt="user-avatar" /> <span>{x.seller.name}</span></>
                                            :
                                            <><img src={x.buyer.avatar} alt="user-avatar" /> <span>{x.buyer.name}</span></>
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
                                    <Link to={`/profile/${selected.chats.seller._id}`}>
                                        <img src={selected.chats.seller.avatar} alt="user-avatar" />
                                        <span>{selected.chats.seller.name}</span>
                                    </Link>
                                    :
                                    <Link to={`/profile/${selected.chats.buyer._id}`}>
                                        <img src={selected.chats.buyer.avatar} alt="user-avatar" />
                                        <span>{selected.chats.buyer.name}</span>
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
                                {selected.chats.conversation.map((x, index) =>
                                    <div className={selected.myId.toString() === x.senderId ? 'me' : "not-me"} key={index}>
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






