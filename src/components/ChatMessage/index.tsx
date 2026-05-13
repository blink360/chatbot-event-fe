import { Card } from "react-bootstrap";

type Props = {
    message: {
        role: "user" | "assistant";
        content: string;
    };
};

const ChatMessage = ({ message }: Props) => {
    const isUser = message.role === "user";

    return (
        <div
            style={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
                marginBottom: "10px",
            }}
        >
            <Card
                style={{
                    maxWidth: "70%",
                    padding: "10px",
                    background: isUser ? "#0d6efd" : "#ffffff",
                    color: isUser ? "white" : "black",
                    borderRadius: "12px",
                }}
            >
                {message.content}
            </Card>
        </div>
    );
};

export default ChatMessage;