import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import MenuLayout from '../components/Menu';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
	return (
		<div className="container-fuild">
			{/* <Sidebar />
			<Navbar /> */}
			<div className="left-menu"></div>
			<div className="right-content">
				<MenuLayout />
				<div className="content">
					<Outlet />
					<p>hello world</p>
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;
