import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

import { signInWithEmail, signUpWithEmail, signOut } from '../services/auth';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isLogin) {
        // 로그인
        const { error } = await signInWithEmail(email, password);
        if (error) throw error;
        setMessage('로그인 성공!');
      } else {
        // 회원가입
        const { error } = await signUpWithEmail(email, password);
        if (error) throw error;
        setMessage('가입 성공! 이메일을 확인해주세요.');
      }
    } catch (error: any) {
      setMessage(`오류: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const { error } = await signOut();
      if (error) throw error;
      setMessage('로그아웃되었습니다.');
    } catch (error: any) {
      setMessage(`로그아웃 오류: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4 border rounded shadow-sm'>
      <h2 className='text-xl mb-4'>{isLogin ? '로그인' : '회원가입'}</h2>

      <form onSubmit={handleAuth} className='space-y-4'>
        <div>
          <label className='block mb-1'>이메일:</label>
          <TextField
            id='standard-basic'
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            label='Standard'
            variant='standard'
          />
        </div>

        <div>
          <label className='block mb-1'>비밀번호:</label>
          <TextField
            id='standard-basic'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label='Standard'
            variant='standard'
          />
        </div>

        <div className='flex justify-between'>
          <Button
            type='submit'
            variant='outlined'
            disabled={loading}
          >
            {loading ? '처리 중...' : isLogin ? '로그인' : '회원가입'}
          </Button>

          <Button
            type='button'
            onClick={() => setIsLogin(!isLogin)}
            variant='contained'
          >
            {isLogin ? '계정 만들기' : '이미 계정이 있습니다'}
          </Button>
        </div>
      </form>

      <Button
        variant='contained'
        onClick={handleSignOut}
      >
        로그아웃
      </Button>

      {message && (
        <div className={`mt-4 p-2 rounded ${message.includes('오류') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Auth;