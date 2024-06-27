import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.header`
  background-color: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
`

const Sidebar = styled.aside`
  background-color: #f4f4f4;
  padding: 1rem;
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
`

const Content = styled.main`
  margin-left: 250px;
  padding: 1rem;
  height: 100vh;
  overflow-y: auto;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const DefaultLayout = () => {

  return (
    <Container>
      <Header>Header</Header>
      <Sidebar>Sidebar</Sidebar>
      <Content><Outlet /></Content>
    </Container>
  )
}

export default DefaultLayout
