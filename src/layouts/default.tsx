import { Outlet, Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.header`
  background-color: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;  // Sidebar보다 위에 오도록 설정
`

const HeaderNav = styled.nav`
  display: flex;
  justify-content: space-around;
  flex-grow: 1;
`

const StyledLink = styled(RouterLink)`
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;

  &:hover {
    text-decoration: underline;
  }
`

const Sidebar = styled.aside`
  background-color: #f4f4f4;
  padding: 1rem;
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  margin-top: 4rem;  // Header 높이만큼 내려오도록 설정
  z-index: 0;  // Header보다 아래에 오도록 설정
`

const Content = styled.main`
  margin-left: 250px;
  margin-top: 4rem;  // Header 높이만큼 내려오도록 설정
  padding: 1rem;
  height: calc(100vh - 4rem);  // Header 높이를 제외한 높이
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
      <Header>
        <HeaderNav>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/about">About</StyledLink>
        </HeaderNav>
      </Header>
      <Sidebar>Sidebar</Sidebar>
      <Content><Outlet /></Content>
    </Container>
  )
}

export default DefaultLayout
