import React from 'react'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;
`

const ErrorPage: React.FC = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      // ...
    } else if (error.status === 404) {
      // ...
    }

    return (
      <Container>
        <h1>Oops! {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data && (
          <p>
            <i>{error.data}</i>
          </p>
        )}
      </Container>
    )
  } else if (error instanceof Error) {
    return (
      <Container>
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong.</p>
        <p>
          <i>{error.message}</i>
        </p>
      </Container>
    )
  } else {
    return <></>
  }
}

export default ErrorPage
