// src/UserList.tsx
import React, { useEffect, useState } from 'react';
import { db, User } from '../db';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await db.users.toArray();
      setUsers(allUsers);
    };

    fetchUsers();
  }, []);

  const addUser = async () => {
    const name = prompt('Enter user name:');
    const email = prompt('Enter user email:');
    const age = parseInt(prompt('Enter user age:') || '0', 10);

    if (name && email && age) {
      await db.users.add({ name, email, age });
      setUsers([...users, { name, email, age }]);
    }
  };

  const deleteUser = async (id: number) => {
    await db.users.delete(id);
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
      <h1>User List</h1>
      <button onClick={addUser}>Add User</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.age}
            <button onClick={() => deleteUser(user.id!)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;