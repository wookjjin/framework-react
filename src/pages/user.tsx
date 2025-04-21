// 예시 컴포넌트
import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '~/app/hooks';
import { increment, selectCount } from '~/features/counter/counterSlice';
import {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation
} from '~/services/api';

interface FormData {
  name: string;
  email: string;
}

function UserComponent() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
  });

  // RTK Query 훅 사용
  const {
    data: users,
    isLoading,
    error
  } = useGetUsersQuery();

  const [addUser, { isLoading: isAdding }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addUser(formData).unwrap();
      setFormData({ name: '', email: '' });
    } catch (err) {
      console.error('Failed to add user:', err);
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {(error as any).message}</div>;

  return (
    <div>
      <div>
        <button onClick={() => dispatch(increment())}>
          카운트 증가
        </button>
        <span>현재 카운트: {count}</span>
      </div>

      <div>
        <h2>사용자 추가:</h2>
        <form onSubmit={handleAddUser}>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            placeholder='이름'
            required
          />
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            placeholder='이메일'
            required
          />
          <button type='submit' disabled={isAdding}>
            {isAdding ? '추가 중...' : '사용자 추가'}
          </button>
        </form>
      </div>

      <div>
        <h2>사용자 목록:</h2>
        <ul>
          {users?.map(user => (
            <li key={user.id}>
              {user.name} ({user.email})
              <button
                onClick={() => updateUser({
                  id: user.id,
                  name: `${user.name} (수정됨)`
                })}
                disabled={isUpdating}
              >
                이름 수정
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserComponent;