import { Link } from 'react-router-dom';

const Sidebar = () => {
	return (
		<div className="side-bar">
			<h1>Admin Panel</h1>
			<ul>
				<li>
					<Link to="/">dashboard</Link>
				</li>
				<li>
					<Link to="/users"></Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
