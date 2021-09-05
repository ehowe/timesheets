import * as React from 'react'

type PropsT = {
  children: JSX.Element | Array<JSX.Element>,
}

type DispatchT = (loading: boolean) => void

export const LoadingContext = React.createContext<boolean>(false)
export const DispatchLoadingContext = React.createContext<DispatchT | typeof undefined>(undefined)

export const LoadingProvider: React.FC<PropsT> = (props: PropsT) => {
  const [loading, setLoading] = React.useState(false)

  return (
    <DispatchLoadingContext.Provider value={setLoading}>
      <LoadingContext.Provider value={loading}>
        {props.children}
      </LoadingContext.Provider>
    </DispatchLoadingContext.Provider>
  )
}
