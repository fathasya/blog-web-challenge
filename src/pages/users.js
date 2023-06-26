import { DeleteIcon, CloseIcon, EditIcon, AddIcon } from 'assets'
import { ButtonSubmit, InputSearch, Inputs } from 'components'
import MainLayout from 'layouts/MainLayout'
import React, { useState, useEffect } from 'react'

const UsersPage = () => {
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState({ name: '', email: '', gender: '', status: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [isAdd, setIsAdd] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://gorest.co.in/public-api/users')
        const data = await response.json()
        setUsers(data.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }
    
  const handleAddUser = async () => {  
    try {
      const response = await fetch('https://gorest.co.in/public-api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 2e4b4b470f3fc24ec5fa73419b7764a962b066c049a1f0e77fd1e07e8a3406da',
        },
        body: JSON.stringify(newUser),
      })
  
      if (response.ok) {
        const data = await response.json()
        setUsers([...users, data.data])
        setNewUser({ name: '', email: '', gender: '', status: '' })
        setIsAdd(false)
      } else {
        console.error('Error adding user:', response.status)
      }
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  const handleEditUser = async () => {
    try {
      const response = await fetch(`https://gorest.co.in/public-api/users/${editUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 2e4b4b470f3fc24ec5fa73419b7764a962b066c049a1f0e77fd1e07e8a3406da',
        },
        body: JSON.stringify(editUser),
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map((user) => (user.id === updatedUser.data.id ? updatedUser.data : user)));
        setEditUser(null);
        setIsEditing(false);
      } else {
        console.error('Error editing user:', response.status);
      }
    } catch (error) {
      console.error('Error editing user:', error);
    }
  }  

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`https://gorest.co.in/public-api/users/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id))
      } else {
        console.error('Error deleting user:', response.status)
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const handleEditButtonClick = (user) => {
    setEditUser(user)
    setIsEditing(true)
  }

  return (
    <MainLayout>
      <div className='w-full md:w-2/3 bg-white px-3 lg:p-5 rounded-lg'>
        <div className='w-full flex justify-between my-5 space-x-6'>
          <button 
            onClick={()=> setIsAdd(true)}
            className='bg-blue-500 p-2 rounded-lg'>
            <AddIcon />
          </button>
          <InputSearch 
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}        
          />
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200 text-gray-900 overflow-auto'>
            <thead className='text-sm'>
              <tr className='bg-blue-100'>              
                <th className='p-2 md:p-4'>Name</th>
                <th className='p-2 md:p-4'>Email</th>
                <th className='p-2 md:p-4'>Status</th>
                <th className='p-2 md:p-4'>Action</th>
              </tr>
            </thead>
            <tbody className='text-xs text-gray-800'>
              {users && users.filter((user) => user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((user) => (
                  <tr key={user.id}>
                    <td className='p-2 lg:p-3 bg-gray-50'>{user.name}</td>
                    <td className='p-2 lg:p-3 bg-gray-50 min-w-fit'>{user.email}</td>
                    <td className='p-2 lg:p-3 text-center bg-gray-50'>{user.status}</td>
                    <td className='p-2 lg:p-3 bg-gray-50 space-x-2 justify-center flex'>
                      <button onClick={() => handleEditButtonClick(user)} className='bg-yellow-400 p-2 md:px-3 md:py-2 rounded-lg'><EditIcon /></button>
                      <button onClick={ () => confirm('Are you sure want to delete?') && handleDeleteUser(user.id)} className='bg-red-600 p-2 md:px-3 md:py-2 rounded-lg'><DeleteIcon /></button>
                    </td>
                  </tr>
                ))}
              {(!users || users.length === 0) && (
                <tr>
                  <td colSpan="4" className="p-3 text-center text-gray-900">No Data Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {isAdd && (
          <div className='fixed inset-0 z-40 h-screen'>
            <div className="flex h-full items-center justify-center bg-black/50 backdrop-blur">
              <form className='w-full mx-5 md:w-1/2 bg-white rounded-xl'>
                <div className='flex justify-end'>
                  <button onClick={()=>setIsAdd(false)}>
                    <CloseIcon/>
                  </button>
                </div>
                <div className='flex flex-col px-4 pb-4 md:px-8 md:pt-4 md:pb-8'>
                  <h2 className='font-bold uppercase text-center mb-4 text-gray-800 text-lg md:text-2xl'>Add User</h2>
                  <Inputs
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={handleInputChange}                
                  />
                  <Inputs
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={handleInputChange}
                  />
                  <select 
                    name='gender' 
                    value={newUser.gender}
                    onChange={handleInputChange}
                    className='p-3 bg-gray-50 rounded-lg my-2 text-sm text-gray-400'
                  >
                    <option value='' className='text-gray-900'>Gender</option>
                    <option value='female' className='text-gray-900'>Female</option>
                    <option value='male' className='text-gray-900'>Male</option>
                  </select>
                  <select 
                    name='status' 
                    value={newUser.status}
                    onChange={handleInputChange}
                    className='p-3 bg-gray-50 rounded-lg my-2 text-sm text-gray-400'                  
                  >
                    <option value='' className='text-gray-900'>Status</option>
                    <option value='active' className='text-gray-900'>Active</option>
                    <option value='inactive' className='text-gray-900'>Inactive</option>
                  </select>
                  <div className='mt-4 font-bold'>
                    <ButtonSubmit 
                      onClick={handleAddUser}
                      text={'Submit'}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        {isEditing && (
          <div className='fixed inset-0 z-40 h-screen'>
            <div className="flex h-full items-center justify-center bg-black/50 backdrop-blur">
              <form className='w-full mx-5 md:w-1/2 bg-white rounded-xl'>
                <div className='flex justify-end'>
                  <button onClick={()=>setIsEditing(false)}>
                    <CloseIcon/>
                  </button>
                </div>
                <div className='flex flex-col px-4 pb-4 md:px-8 md:pt-4 md:pb-8'>
                  <h2 className='font-bold uppercase text-center mb-4 text-gray-800 text-lg md:text-xl'>Edit User</h2>
                  <Inputs
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={editUser.name}
                    onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                  />
                  <Inputs
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={editUser.email}
                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  />
                  <select 
                    name='gender' 
                    value={editUser.gender}
                    onChange={(e) => setEditUser({ ...editUser, gender: e.target.value })}
                    className='p-3 bg-gray-50 rounded-lg my-2 text-sm text-gray-900'
                  >
                    <option value=''>Gender</option>
                    <option value='female'>Female</option>
                    <option value='male'>Male</option>
                  </select>
                  <select 
                    name='status' 
                    value={editUser.status}
                    onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
                    className='p-3 bg-gray-50 rounded-lg my-2 text-sm text-gray-900'                  
                  >
                    <option value=''>Status</option>
                    <option value='active'>Active</option>
                    <option value='inactive'>Inactive</option>
                  </select>
                  <div className='mt-4 font-bold'>
                    <ButtonSubmit 
                      onClick={handleEditUser}
                      text={'Submit'}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default UsersPage
