const API_BASE_URL = 'http://localhost:8000/api'; // Your Laravel API URL

const api = {
  // Auth endpoints
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  logout: async (token) => {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    return response.json();
  },

  // Book endpoints
  getBooks: async (token) => {
    const response = await fetch(`${API_BASE_URL}/books`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    return response.json();
  },

  updateBook: async (token, bookId, data) => {
    const response = await fetch(`${API_BASE_URL}/books/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Request endpoints
  getRequests: async (token, status = null) => {
    const url = status ? `${API_BASE_URL}/requests?status=${status}` : `${API_BASE_URL}/requests`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    return response.json();
  },

  approveRequest: async (token, requestId) => {
    const response = await fetch(`${API_BASE_URL}/requests/${requestId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    return response.json();
  },

  rejectRequest: async (token, requestId, reason) => {
    const response = await fetch(`${API_BASE_URL}/requests/${requestId}/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({ reason }),
    });
    return response.json();
  },

  // Book Log endpoints
  getBookLogs: async (token, returned = null) => {
    const url = returned !== null 
      ? `${API_BASE_URL}/book-logs?returned=${returned}`
      : `${API_BASE_URL}/book-logs`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    return response.json();
  },

  returnBook: async (token, logId, condition) => {
    const response = await fetch(`${API_BASE_URL}/book-logs/${logId}/return`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({ condition }),
    });
    return response.json();
  },
};

export default api;