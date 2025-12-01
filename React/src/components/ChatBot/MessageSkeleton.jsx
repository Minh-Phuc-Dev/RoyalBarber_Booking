import { useEffect, useRef } from 'react'

const MessageSkeleton = () => {
    const messagesRef = useRef(null)
    const timeoutId = useRef(null)
    useEffect(
        () => {
            timeoutId.current = setTimeout(
                () => {
                    const container = messagesRef.current?.parentElement;
                    container?.scrollBy(
                        {

                            top: container.scrollHeight,
                            behavior: 'smooth'
                        }
                    );

                }, 300
            )

            return () => {
                if (timeoutId.current) {
                    clearTimeout(timeoutId.current)
                }
            }
        }, []
    )


    return (
        <div
            className="w-fit rounded-lg bg-neutral-200 p-3 flex space-x-1"
            ref={messagesRef}
        >
            <div className="size-1 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="size-1 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="size-1 bg-primary-500 rounded-full animate-bounce" />
        </div>
    )
}

export default MessageSkeleton