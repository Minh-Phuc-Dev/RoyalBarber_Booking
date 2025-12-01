import { CHAT_STATUS, useChatBotContext } from '@src/components/ChatBot/Context'


import { isEmpty } from 'lodash'
import { useState } from 'react'

const InputMessage = () => {
    const [input, setInput] = useState('')
    const { status, addMessage, sendMessage } = useChatBotContext()


    const send = async () => {
        const question = input.trim()
        if (isEmpty(question)) {
            return
        }

        setInput('')
        addMessage(
            {
                role: 'user',
                content: question,
                createdAt: new Date().toLocaleTimeString()
            }
        )
        sendMessage(question)

    }
    return (
        <div
            className="flex border-t bg-white"
        >
            <input
                readOnly={status === CHAT_STATUS.FETCHING}
                className="grow px-5 bg-transparent leading-6 outline-none read-only:opacity-50"
                placeholder="Nhập tin nhắn của bạn..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={
                    (event) => {
                        if (event.key !== 'Enter') {
                            return
                        }
                        send()
                    }
                }

            />
            <button
                disabled={status === CHAT_STATUS.FETCHING}
                type="button"
                className="size-12 text-primary-500 disabled:opacity-50"
                onClick={send}
            >
                <svg
                    width={48}
                    height={48}
                    viewBox="0 0 48 48"
                    fill="none"
                    className="size-full"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width={48} height={48} fill="white" />
                    <path
                        d="M31.0819 19.9282L21.0952 14.9349C14.3869 11.5749 11.6336 14.3282 14.9936 21.0366L16.0086 23.0666C16.3002 23.6616 16.3002 24.3499 16.0086 24.9449L14.9936 26.9632C11.6336 33.6716 14.3752 36.4249 21.0952 33.0649L31.0819 28.0716C35.5619 25.8316 35.5619 22.1682 31.0819 19.9282V19.9282ZM27.3136 24.8749H21.0136C20.5352 24.8749 20.1386 24.4782 20.1386 23.9999C20.1386 23.5216 20.5352 23.1249 21.0136 23.1249H27.3136C27.7919 23.1249 28.1886 23.5216 28.1886 23.9999C28.1886 24.4782 27.7919 24.8749 27.3136 24.8749Z"
                        fill="currentColor"
                    />
                </svg>
            </button>
        </div>
    )
}

export default InputMessage