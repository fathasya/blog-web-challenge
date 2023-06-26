import React, { useState } from 'react';

const UserForm = ({ handleSubmit }) => {
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit(name);
    setName('');
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmitForm}>
        <input type="text" value={name} onChange={handleNameChange} placeholder="Name" required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default UserForm;
