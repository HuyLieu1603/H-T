import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dash-board/dashboard';
import AdminLogin from './containers/auth/AdminLogin';
import AdminLayout from './containers/AdminLayout';
import ListProduct from './components/Product/list';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/admin/login" element={<AdminLogin />}></Route>
				<Route path="/admin" element={<AdminLayout />}>
					<Route path="dashboard" index element={<Dashboard />} />
					<Route path="users" element={<h1>users</h1>} />
					<Route path="products" element={<ListProduct />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
