import React, { useState, useEffect } from 'react';
import { searchUsers, getUsers } from '../../constants/api';

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredUsers(users); // Memperbarui filteredUsers dengan users saat query kosong
      return;
    }

    try {
      const response = await searchUsers(query);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search users" />
      <ul>
        {filteredUsers && filteredUsers.map((user) => ( // Menambahkan pengecekan filteredUsers sebelum map
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
