import { Box, CssBaseline } from '@mui/material'
import React from 'react'

import LoginCard from '~/components/LoginCard'

const LoginPage: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
        bgcolor='#F5F7FA'
      >
        <LoginCard />
      </Box>
    </>
  )
}

export default LoginPage
