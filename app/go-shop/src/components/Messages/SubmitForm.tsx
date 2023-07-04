import { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { io } from "socket.io-client";

function SubmitForm() {
    const socket = io();
    const [text, setText] = useState("");

    function handleMsgSubmit(e: React.FormEvent) {
        e.preventDefault();
        socket.emit('chat message', text);
    }

    return (
        <div className="chat-selected-footer col-lg-12">
            <Form onSubmit={handleMsgSubmit}>
                <Form.Group>
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={(e) => setText(e.target.value)}>
                        </Form.Control>
                        {((InputGroup as any).Append)(
                            <Button type="submit" variant="secondary">Sent</Button>
                        )}
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

export default SubmitForm;
