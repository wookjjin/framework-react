import { Dehaze } from '@mui/icons-material'
import { useState } from 'react'
import { Outlet, Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;
  padding: 1rem;

  background-color: #333;

  color: #fff;
  text-align: center;
`

const HeaderNav = styled.nav`
  display: flex;
  flex-grow: 1;
  justify-content: space-around;
`

const StyledLink = styled(RouterLink)`
  color: #fff;
  font-size: 1.2rem;

  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Sidebar = styled.aside<{ $isOpen: boolean }>`
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;

  width: ${(props) => (props.$isOpen ? '250px' : '0')};
  height: 100vh;
  margin-top: 4rem;
  padding: ${(props) => (props.$isOpen ? '1rem' : '0')};
  box-shadow: ${(props) => (props.$isOpen ? '2px 0 5px rgba(0, 0, 0, 0.1)' : 'none')};

  background-color: #f4f4f4;

  transition: width 0.3s ease;
`

const Content = styled.main<{ $isOpen: boolean }>`
  height: calc(100vh - 4rem);
  margin-top: 4rem;
  margin-left: ${(props) => (props.$isOpen ? '250px' : '0')};
  padding: 1rem;

  overflow-y: auto;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
`

const Button = styled.button``

const DefaultLayout = () => {
  const [isSidebarOpen, setIsOpen] = useState(false)

  return (
    <Wrapper>
      <Header>
        <Button onClick={() => setIsOpen(!isSidebarOpen)}>
          <Dehaze fontSize='large' />
        </Button>
        <HeaderNav>
          <StyledLink to='/'>Home</StyledLink>
          <StyledLink to='/about'>About</StyledLink>
          <StyledLink to='/kanban'>Kanban</StyledLink>
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
