import { ReactNode, useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router'

import DefaultLayout from '~/components/layout/Default'
import LayoutEmpty from '~/components/layout/LayoutEmpty'
import About from '~/pages/About'
import Home from '~/pages/Home'
import LoginPage from '~/pages/Login'
import { getSession } from '~/services/auth'
import { supabase } from '~/services/supabase'

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // 초기 로드 시 세션 확인
    const checkSession = async () => {
      const session = await getSession()
      setIsAuthenticated(!!session)
    }

    checkSession()

    // 인증 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setIsAuthenticated(!!session)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  return { isAuthenticated }
}

// ProtectedRoute 컴포넌트 정의
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()

  // 인증 상태 확인 중
  if (isAuthenticated === null) {
    return <div>Loading...</div> // 또는 로딩 스피너
  }

  // 인증되지 않은 경우 로그인 페이지로
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  return <>{children}</>
}

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <DefaultLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        // 보호된 라우트 예시
        path: '/about',
        element: <About />,
      },
    ],
  },
  {
    element: <LayoutEmpty />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
])

export function Router() {
  return <RouterProvider router={router} />
}

export default Router
