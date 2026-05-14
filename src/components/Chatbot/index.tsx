import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Form, Button, Spinner, Card } from "react-bootstrap";
import withProtectedRoute from "src/hoc/withProtectedRoute";
import ChatMessage from "src/components/ChatMessage";
import { sendMessage } from "src/lib/services/chatService";

type Message = {
    role: "user" | "assistant";
    content: string;
};

const ChatPage = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const conversationIdRef = useRef<string | null>(null);

    const mutation = useMutation({
        mutationFn: sendMessage,

        onSuccess: (data: any) => {
            conversationIdRef.current = data.conversationId;
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply },
            ]);
        },
    });

    const handleSend = (e: any) => {
        e.preventDefault();
        if (!input.trim() || mutation.isPending) return;
        const userMessage = input;
        setMessages((prev) => [
            ...prev,
            { role: "user", content: userMessage },
        ]);
        mutation.mutate({ message: userMessage, conversationId: conversationIdRef.current ?? undefined });
        setInput("");
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, mutation.isPending]);

    return (
        <div className="container py-4">
            <Card className="p-3 shadow-sm mb-3">
                <div className="d-flex justify-content-between">
                    <h4 className="mb-0">Event Assistant Chat</h4>
                </div>
            </Card>

            <div
                style={{
                    height: "70vh",
                    overflowY: "auto",
                    background: "#f8f9fa",
                    padding: "15px",
                    borderRadius: "10px",
                }}
            >
                {messages.map((msg, idx) => (
                    <ChatMessage key={idx} message={msg} />
                ))}

                {mutation.isPending && (
                    <div className="d-flex gap-2 align-items-center text-muted">
                        <Spinner size="sm" animation="border" />
                        Thinking...
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            <Form onSubmit={handleSend} className="mt-3 d-flex gap-2">
                <Form.Control
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />

                <Button type="submit" disabled={mutation.isPending}>
                    Send
                </Button>
            </Form>
        </div>
    );
};

export default withProtectedRoute(ChatPage);