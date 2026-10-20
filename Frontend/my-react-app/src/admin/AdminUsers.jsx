import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!user || !user.token) {
                navigate('/login');
                return;
            }
            try {
                const res = await fetch('/api/auth/users', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                if (!res.ok) {
                    if (res.status === 401 || res.status === 403) {
                        logout();
                        navigate('/login');
                        return;
                    }
                }
                const data = await res.json();
                setUsers(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, [user, navigate, logout]);

    return (
        <div style={containerStyle}>
            <h2 style={{ color: '#f97316', marginBottom: '20px' }}>User Directory</h2>
            <div style={{ overflowX: 'auto' }}>
                <table style={tableStyle}>
                    <thead>
                        <tr style={rowStyle}>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>NAME</th>
                            <th style={thStyle}>EMAIL</th>
                            <th style={thStyle}>ROLE</th>
                            <th style={thStyle}>JOINED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u._id} style={rowStyle}>
                                <td style={tdStyle}>{u._id.substring(0, 8)}...</td>
                                <td style={tdStyle}>{u.name}</td>
                                <td style={tdStyle}>{u.email}</td>
                                <td style={tdStyle}>
                                    <span style={{ background: u.role === 'admin' ? 'rgba(234,88,12,0.2)' : 'rgba(16,185,129,0.2)', color: u.role === 'admin' ? '#f97316' : '#10b981', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                        {u.role.toUpperCase()}
                                    </span>
                                </td>
                                <td style={tdStyle}>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const containerStyle = { maxWidth: '1200px', margin: '40px auto', padding: '30px', background: '#18181b', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', color: '#fafafa' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const rowStyle = { borderBottom: '1px solid rgba(255,255,255,0.1)' };
const thStyle = { padding: '15px', textAlign: 'left', color: '#a1a1aa', fontSize: '0.9rem' };
const tdStyle = { padding: '15px', textAlign: 'left' };

export default AdminUsers;