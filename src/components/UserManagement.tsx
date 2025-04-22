import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

import {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  User,
  CreateUserRequest
} from '../services/api';

const UserManagement: React.FC = () => {
  const [formData, setFormData] = useState<CreateUserRequest>({
    name: '',
    email: '',
  });

  const { data: users, isLoading, error } = useGetUsersQuery();
  const [addUser, { isLoading: isAdding }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

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
      alert('사용자가 성공적으로 추가되었습니다.');
    } catch (err: any) {
      alert(`사용자 추가 실패: ${err.message || JSON.stringify(err)}`);
    }
  };

  const handleUpdateName = async (user: User) => {
    try {
      await updateUser({
        id: user.id,
        name: `${user.name} (수정됨)`
      }).unwrap();
      alert('사용자가 성공적으로 수정되었습니다.');
    } catch (err: any) {
      alert(`사용자 수정 실패: ${err.message || JSON.stringify(err)}`);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      try {
        await deleteUser(id).unwrap();
        alert('사용자가 성공적으로 삭제되었습니다.');
      } catch (err: any) {
        alert(`사용자 삭제 실패: ${err.message || JSON.stringify(err)}`);
      }
    }
  };

  if (isLoading) return <div>사용자 데이터 로딩 중...</div>;
  if (error) return <div>에러 발생: {JSON.stringify(error)}</div>;

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>사용자 관리</h1>

      <div className='mb-8 p-4 border rounded'>
        <h2 className='text-xl mb-2'>사용자 추가</h2>
        <form onSubmit={handleAddUser} className='space-y-4'>
          <div>
            <label className='block mb-1'>이름:</label>
            <TextField
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              required
              variant='standard'
            />
          </div>
          <div>
            <label className='block mb-1'>이메일:</label>
            <TextField
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              required
              variant='standard'
            />
          </div>
          <Button variant='contained'>
            {isAdding ? '추가 중...' : '사용자 추가'}
            </Button>
        </form>
      </div>

      <div>
        <h2 className='text-xl mb-2'>사용자 목록</h2>
        {users && users.length > 0 ? (
          <ul className='space-y-2'>
            {users.map(user => (
              <li key={user.id} className='p-3 border rounded'>
                <div className='flex justify-between items-center'>
                  <div>
                    <div className='font-bold'>{user.name}</div>
                    <div className='text-gray-600'>{user.email}</div>
                  </div>
                  <div className='space-x-2'>
                    <Button
                      onClick={() => handleUpdateName(user)}
                      disabled={isUpdating}
                      variant='contained'
                    >
                      이름 수정
                    </Button>
                    <Button
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={isDeleting}
                      variant='outlined'
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>사용자가 없습니다. 새 사용자를 추가해보세요!</p>
        )}
      </div>
    </div>
  );
};

export default UserManagement;