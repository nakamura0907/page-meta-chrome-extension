import * as React from "react"

type Message = {}
type CallbackResponse = {}

const Popup: React.FC = () => {
    React.useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage<Message, CallbackResponse>(tabs[0].id!, { action: "getDOM" }, (response) => {
                console.log(response)
            })
        })
    }, [])

    return(
        <>Popup</>
    )
}

export default Popup