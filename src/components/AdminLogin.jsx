import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.message || 'Invalid username or password.');
        return;
      }

      const data = await res.json();

      if (!data.token) {
        setError('Login failed: no token returned.');
        return;
      }

      localStorage.setItem('adminToken', data.token);
      navigate('/admin');
    } catch (err) {
      console.error('Login error', err);
      setError('Unable to login. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-50">
      <form onSubmit={login} className="bg-white p-10 rounded-xl shadow max-w-sm w-full">
        <h2 className="text-2xl mb-2 font-bold text-center">Admin Login</h2>
        <p className="text-stone-400 text-center text-sm mb-6">AURA COFFEE</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 w-full mb-6 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-400"
          required
        />
        <button
          type="submit"
          className="bg-black text-white w-full py-3 rounded-md hover:bg-stone-800 transition-colors font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
