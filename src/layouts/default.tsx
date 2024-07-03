import { Dehaze } from '@mui/icons-material'
import { useState } from 'react'
import { Outlet, Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.header`
  display: flex;
  background-color: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1; // Sidebar보다 위에 오도록 설정
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

const Sidebar = styled.aside<{$isOpen: boolean}>`
  background-color: #f4f4f4;
  padding: ${(props) => (props.$isOpen ? '1rem' : '0')};
  width: ${(props) => (props.$isOpen ? '250px' : '0')};
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: ${(props) => (props.$isOpen ? '2px 0 5px rgba(0, 0, 0, 0.1)' : 'none')};
  margin-top: 4rem;
  z-index: 0;
  transition: width 0.3s ease;
  overflow: hidden;
`

const Content = styled.main<{ $isOpen: boolean }>`
  margin-left: ${(props) => (props.$isOpen ? '250px' : '0')};
  margin-top: 4rem;
  padding: 1rem;
  height: calc(100vh - 4rem);
  overflow-y: auto;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Button = styled.button`
`

const DefaultLayout = () => {
  const [isSidebarOpen, setIsOpen] = useState(false)

  return (
    <Wrapper>
      <Header>
        <Button onClick={() => setIsOpen(!isSidebarOpen)}>
          <Dehaze fontSize='large' />
        </Button>
        <HeaderNav>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/about">About</StyledLink>
          <StyledLink to="/kanban">Kanban</StyledLink>
        </HeaderNav>
      </Header>
      <Sidebar $isOpen={isSidebarOpen}>Sidebar</Sidebar>
      <Content $isOpen={isSidebarOpen}>
        <Outlet />
      </Content>
    </Wrapper>
  )
}

export default DefaultLayout
