// import React, { useState } from 'react';
// import { BookOpen } from 'lucide-react';
// import api from '../../services/api';

// const Login = ({ onLogin }) => {
//   const [loginForm, setLoginForm] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleLogin = async () => {
//     setLoading(true);
//     setError('');
    
//     try {
//       const response = await api.login(loginForm);
      
//       if (response.success && response.data) {
//         onLogin(response.data.user, response.data.token);
//       } else {
//         setError(response.message || 'Login failed');
//       }
//     } catch (err) {
//       setError('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleLogin();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
//         <div className="text-center mb-8">
//           <BookOpen className="mx-auto h-12 w-12 text-blue-600 mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900">Library Management System</h1>
//           <p className="text-gray-600 mt-2">Librarian Login</p>
//         </div>
        
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//             {error}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               value={loginForm.email}
//               onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter email"
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               value={loginForm.password}
//               onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter password"
//               required
//             />
//           </div>
          
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//           >
//             {loading ? 'Logging in...' : 'Login as Librarian'}
//           </button>
//         </form>
        
//         <div className="mt-6 text-sm text-gray-500 text-center">
//           <p>Use your librarian credentials to login</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;