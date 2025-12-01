import { CHAT_STATUS, useChatBotContext } from "@src/components/ChatBot/Context";
import Message from "@src/components/ChatBot/Message";
import MessageSkeleton from "@src/components/ChatBot/MessageSkeleton";


const Messages = () => {
    const { messages, status, toggleChat } = useChatBotContext()


    return (
        <>
            <div className="flex justify-between items-center px-5 py-2 border-b">
                <div className="flex gap-x-2">

                    <img
                        className="flex-none w-10 h-10 rounded-full border"
                        src="/images/chatbot.gif"
                        alt="logo"
                    />

                    <div>
                        <h1 className="font-bold text-neutral-700">Trợ lý ảo Royal Barber</h1>
                        <div className="flex items-center justify-start space-x-1">
                            <div className="size-2 rounded-full bg-green-500" />
                            <p className="text-xs font-normal text-neutral-600">Đang hoạt động</p>
                        </div>
                    </div>
                </div>
                <button
                    className="hover:opacity-90 cursor-pointer"
                    onClick={toggleChat}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clipRule="evenodd" />
                    </svg>
                </button>


            </div>
            <div

                className="w-96 h-96 overflow-y-auto p-5 space-y-5"
            >

                {
                    messages.map(
                        (message, index) => (
                            <Message
                                key={Math.random().toString(36)}
                                message={message}
                                last={status === CHAT_STATUS.FETCHING ? false : index === messages.length - 1}
                            />
                        )
                    )
                }

                {
                    status === CHAT_STATUS.FETCHING ? (
                        <MessageSkeleton />
                    ) : null
                }


            </div>
        </>
    );
}

export default Messages;