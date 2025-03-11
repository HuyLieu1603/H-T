import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1>Admin Panel</h1>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/">Users</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
