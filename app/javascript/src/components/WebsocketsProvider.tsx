import * as React from 'react'
import { w3cwebsocket as W3CWebSocket, IMessageEvent } from 'websocket'

type PropsT = {
  children: Array<JSX.Element>,
}

const WebsocketsContext = React.createContext(null)

export const WebsocketsProvider: React.FC<PropsT> = (props: PropsT) => {
  const host = window.location.host
  const client = new W3CWebSocket(`ws://${host}/cable`)

  React.useEffect(() => {
    client.onopen = () => {
    }
    client.onmessage = (message: IMessageEvent) => {
    };
  }, [])

  return(
    <WebsocketsContext.Provider value={client}>
      {props.children}
    </WebsocketsContext.Provider>
  )
}
