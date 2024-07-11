import { Dehaze, AccountCircleOutlined ,EditNotificationsOutlined  } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import styled
  // { keyframes }
  from 'styled-components'

import TreeSection from '~/components/tree'
import { TreeSectionProps } from '~/types/tree'
import { menuData } from '~/types/tree/constant'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
`
/** Header Area */
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;


  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: lightblue;
  }
`

const HeaderLogo = styled.div`
  width: 200px;
  color: #fff;
`

const UtilWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap:1em;
`

/** Sidebar Area */
const Sidebar = styled.aside<{ $isOpen: boolean }>`
  overflow: hidden;
  z-index: 0;

  width: ${(props) => (props.$isOpen ? '350px' : '0')};
  height: 100%;
  box-shadow: ${(props) => (props.$isOpen ? '2px 0 5px rgba(0, 0, 0, 0.1)' : 'none')};

  background-color: #f4f4f4;

  transition: width 0.3s ease;
`

const SidebarContainer = styled.div`
  padding: 1rem;
`

/** Content Area */
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

const SignButton = styled.button<{ $color: string }>`
  height: 36px;
  min-width: 85px;
  padding: 5px;
  border: 2px solid ${(props) => (props.$color)};
  border-radius: 19px;

  background-color: transparent;

  color: #fff;
  font-weight: 600;
  text-align: center;

  cursor: pointer;

  /* font-family: 'Pretendard-Bold'; */
`

const LoginInfo = () => {
  const [isLogined, setIsLogined] = useState(false)
  return (<>
    {isLogined ? <UtilWrapper>
          사용자
      <EditNotificationsOutlined sx={{ fontSize: '30px', cursor: 'pointer' }} />
      <AccountCircleOutlined sx={{ fontSize: '30px', cursor: 'pointer' }} />
    </UtilWrapper>
      :
      <UtilWrapper>
        <SignButton as='a' $color={'#fff'}>
          로그인
        </SignButton>
      </UtilWrapper>
    }
  </>)
}

const Menu = () => {
  const [menuList, setMenuList] = useState<TreeSectionProps[]>([])

  useEffect(() => {
    setMenuList(menuData)
  }, [])

  return (
    <TreeSection treeProps={menuList} />
  )
}

const DefaultLayout = () => {
  const [isSidebarOpen, setIsOpen] = useState(true)

  return (
    <Wrapper>
      <Header>
        <IconWrapper onClick={() => setIsOpen(!isSidebarOpen)}>
          <Dehaze sx={{ fontSize: '30px' }} />
        </IconWrapper>
        <HeaderLogo>Logo</HeaderLogo>
        <LoginInfo />
      </Header>
      <ContentWrapper>
        <Sidebar $isOpen={isSidebarOpen}>
          <SidebarContainer>
            <Menu />
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
