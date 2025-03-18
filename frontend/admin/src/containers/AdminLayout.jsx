import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import MenuLayout from '../components/Menu';
import '../styles/Layout/layout.css';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
	return (
		<div className="admin-layout container-fuild">
			<div className="left-menu">
				<div className="sidebar">
					<Sidebar />
				</div>
				<div className="menu-layout">
					<MenuLayout />
				</div>
				<div className="navbar">
					<Navbar />
				</div>
			</div>
			<div className="right-content">
				<div className="title-content">
					
				</div>
				<div className="content">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;
