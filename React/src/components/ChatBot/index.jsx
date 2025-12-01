import { ChatBotContext, ChatBotProvider } from "@src/components/ChatBot/Context"
import InputMessage from "@src/components/ChatBot/InputMessage"
import Messages from "@src/components/ChatBot/Messages"



const ChatBot = () => {


    return (
        <ChatBotProvider>
            <div className="fixed z-20 bottom-5 right-5">

                <ChatBotContext.Consumer>
                    {
                        ({ isOpen, toggleChat }) => isOpen ? (
                            <div className='w-96 border border-primary bg-zinc-50 rounded overflow-hidden'>
                                <Messages />
                                <InputMessage />
                            </div >
                        ) : (
                            <img
                                className="w-72 cursor-pointer"
                                alt="chatbot"
                                src="/gif/chatbot.gif"
                                onClick={toggleChat}
                            />
                        )
                    }

                </ChatBotContext.Consumer>
            </div >

        </ChatBotProvider>

    )
}

export default ChatBot