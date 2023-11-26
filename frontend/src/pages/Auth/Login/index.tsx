import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../../../components/api/Queries/useLogin';
import Loader from '../../../components/Loader';

const LoginPage: React.FC = () => {
  const { mutate: login, isLoading, error, data } = useLogin();
  const [name, setName] = useState('');
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const [password, setPassword] = useState('');
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); 
    login({ name, password })
  };

  return (
    <div className="flex items-center justify-center h-screen mt-[-100px]">
        {isLoading && <Loader />}
      <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 min-w-[270px] max-w-[500px] w-full" onSubmit={handleSubmit}>
      <h4 className={"text-center font-medium mb-4 text-[25px]"}>Login</h4>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Link to="/auth/register" className="block text-center text-gray-300 hover:text-orange-900 text-sm font-bold mb-4 transition-all">
            Don't have an account? Register here.
        </Link>
        <div className="flex items-center justify-between w-full">
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto" type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
