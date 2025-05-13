import { Card, CardContent, TextField, Button, Typography } from '@mui/material'
import React, { useState } from 'react'

import { signInWithEmail } from '~/services/auth'

const LoginCard: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      await signInWithEmail(formData.email, formData.password)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card sx={{ width: 360, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant='h5' gutterBottom>
          로그인
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            type='text'
            label='이메일'
            variant='outlined'
            name='email'
            value={formData.email}
            fullWidth
            margin='normal'
            autoComplete='off'
            required
            onChange={handleInputChange}
          />
          <TextField
            label='비밀번호'
            type='password'
            name='password'
            variant='outlined'
            fullWidth
            value={formData.password}
            margin='normal'
            required
            onChange={handleInputChange}
          />
          <Button type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>
            로그인
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginCard
