// src/services/auth.ts
import { supabase } from './supabase';

// 이메일/비밀번호로 로그인
export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  return { data, error };
};

// 이메일/비밀번호로 회원가입
export const signUpWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  return { data, error };
};

// 로그아웃
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  return { error };
};

// 현재 사용자 가져오기
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();

  return user;
};

// 세션 확인
export const getSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();

  return session;
};