import Sidebar from '../components/Dash-board/Sidebar';
import Navbar from '../components/Dash-board/Navbar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
