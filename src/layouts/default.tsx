import { Dehaze } from '@mui/icons-material'
import { useState } from 'react'
import { Outlet, Link as RouterLink } from 'react-router-dom'
import styled
  // { keyframes }
  from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;
  height: 65px;
  padding: 1rem;

  background-color: #333;

  color: #fff;
  text-align: center;
`

const HeaderNav = styled.nav`
  display: flex;
  flex-grow: 1;
  align-items: center;
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
  z-index: 0;

  width: ${(props) => (props.$isOpen ? '250px' : '0')};
  height: 100%;
  box-shadow: ${(props) => (props.$isOpen ? '2px 0 5px rgba(0, 0, 0, 0.1)' : 'none')};

  background-color: #f4f4f4;

  transition: width 0.3s ease;
`

const SidebarContainer = styled.div`
  padding: 1rem;
`

const ContentWrapper = styled.div`
  display: flex;

  height: 100%;
  padding-top: 65px;
`

const Content = styled.main<{ $isOpen: boolean }>`
  width: 100%;
  overflow-y: auto;
`

// const Shake = keyframes `
//   0% {
//     transform: translateX(-3em) rotate(0deg);
//   }
//   12% {
//     transform: translateX(3rem) rotate(-2deg);
//   }
//   25% {
//     transform: translateX(-2rem) rotate(0deg);
//   }
//   37% {
//     transform: translateX(2rem) rotate(2deg);
//   }
//   50% {
//     transform: translateX(-1.5rem) rotate(0deg);
//   }
//   62% {
//     transform: translateX(1.5rem) rotate(-2deg);
//   }
//   75% {
//     transform: translateX(-1rem) rotate(0deg);
//   }
//   87% {
//     transform: translateX(1rem) rotate(2deg);
//   }
//   100% {
//     transform: rotate(0deg);
//   }
// `

const HeaderUtil = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  width: 50px;
  height: 50px;
  border-radius: 50%;

  background: rgba(255,255,255,0.2);

  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    scale: 1.2;
  }
`

const DefaultLayout = () => {
  const [isSidebarOpen, setIsOpen] = useState(true)
  return (
    <Wrapper>
      <Header>
        <HeaderUtil onClick={() => setIsOpen(!isSidebarOpen)}>
          <Dehaze fontSize='large' />
        </HeaderUtil>
        <HeaderNav>
          <StyledLink to='/'>Home</StyledLink>
          <StyledLink to='/about'>About</StyledLink>
          <StyledLink to='/kanban'>Kanban</StyledLink>
        </HeaderNav>
      </Header>
      <ContentWrapper>
        <Sidebar $isOpen={isSidebarOpen}>
          <SidebarContainer>
            Sidebar
          </SidebarContainer>
        </Sidebar>
        <Content $isOpen={isSidebarOpen}>
          <Outlet />
        </Content>
      </ContentWrapper>
    </Wrapper>
  )
}

export default DefaultLayout
