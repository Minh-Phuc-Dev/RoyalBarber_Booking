import ChatbotService from "@src/services/ChatbotService";
import { createContext, useCallback, useContext, useState } from "react";

export const CHAT_STATUS = {
    IDLE: "IDLE",
    CANCEL: "CANCEL",
    FETCHING: "FETCHING",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR"
}

export const ChatBotContext = createContext(

    {
        isOpen: false,
        status: CHAT_STATUS.IDLE,
        messages: [
            {
                role: "assistant",
                content: "Xin chào bạn! Mình là trợ lý ảo của Royal Barber, mình có thể giúp bạn tư vấn về các dịch vụ cắt tóc và chăm sóc tóc. Hãy cho mình biết bạn đang tìm gì hoặc cần gợi ý gì nhé!",
            }
        ],
        toggleChat: () => { },
        addMessage: () => { },
        sendMessage: () => { }
    }

);

export const useChatBotContext = () => useContext(ChatBotContext);

export const ChatBotProvider = ({ children }) => {
    const [state, setState] = useState(
        {
            isOpen: false,
            status: CHAT_STATUS.IDLE,
            messages: [
                {
                    role: "assistant",
                    content: "Xin chào bạn! Mình là trợ lý ảo của Royal Barber, mình có thể giúp bạn tư vấn về các dịch vụ cắt tóc và chăm sóc tóc. Hãy cho mình biết bạn đang tìm gì hoặc cần gợi ý gì nhé!",
                    createdAt: new Date().toLocaleTimeString()
                }
            ]
        }
    )

    const toggleChat = useCallback(
        () => {
            setState(
                (state) => (
                    {
                        ...state,
                        isOpen: !state.isOpen
                    }
                )
            )
        }, []
    )

    const addMessage = useCallback(
        (message) => {
            setState(
                (state) => (
                    {
                        ...state,
                        messages: [...state.messages, message]
                    }
                )
            )
        }, []
    )

    const sendMessage = useCallback(
        async (message) => {
            setState(
                (state) => (
                    {
                        ...state,
                        status: CHAT_STATUS.FETCHING
                    }
                )
            )


            const { success, payload } = await ChatbotService.chat(message)
            if (success) {
                setState(
                    (state) => (
                        {
                            ...state,
                            status: CHAT_STATUS.SUCCESS,
                            messages: [
                                ...state.messages,
                                {
                                    role: "assistant",
                                    content: payload,
                                    createdAt: new Date().toLocaleTimeString()
                                }
                            ]
                        }
                    )
                )

            } else {
                setState(
                    (state) => (
                        {
                            ...state,
                            status: CHAT_STATUS.ERROR,
                            messages: [
                                ...state.messages,
                                {
                                    role: "assistant",
                                    content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
                                    createdAt: new Date().toLocaleTimeString()
                                }
                            ]
                        }
                    )
                )
            }

        }, []

    )
    return (
        <ChatBotContext.Provider
            value={
                {
                    isOpen: state.isOpen,
                    status: state.status,
                    messages: state.messages,
                    toggleChat,
                    addMessage,
                    sendMessage
                }
            }
        >
            {children}
        </ChatBotContext.Provider>
    )
}
