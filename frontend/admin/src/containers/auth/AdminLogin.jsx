import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth.js';
import Input from '../../components/Input.jsx';
import Button from '../../components/Button.jsx';
import '../../styles/Login.css';

const AdminLogin = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			await login(email, password);
			navigate('/admin/dashboard');
		} catch (err) {
			console.log(err);
			setError(err.message);
		}
	};
	return (
		<div className="admin-login-container">
			<h2 className="title m-3">Đăng Nhập Admin</h2>
			{error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
			<div className="form-login">
				<div className="form-login-v2">
					<div className="text-title mt-5">
						<p className="mb-0">Email</p>
					</div>
					<div className="text-form">
						<Input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="text-title mt-2">
						<p className="mb-0">Mật khẩu</p>
					</div>
					<div className="text-form">
						<Input
							type="password"
							placeholder="Mật khẩu"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="login-button mb-5 mt-3">
						<Button text="Đăng Nhập" onClick={handleLogin} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;
