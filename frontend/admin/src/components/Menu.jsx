import React, { useState } from 'react';
import {
	AppstoreOutlined,
	ContainerOutlined,
	DesktopOutlined,
	MailOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const items = [
	{
		key: '/Admin/Login',
		icon: <PieChartOutlined />,
		label: 'Dashboard',
	},
	{
		key: '2',
		icon: <DesktopOutlined />,
		label: 'User Manage',
	},
	{
		key: '/admin/products',
		icon: <ContainerOutlined />,
		label: 'Product',
	},
	{
		key: 'sub1',
		label: 'Navigation One',
		icon: <MailOutlined />,
		children: [
			{
				key: '5',
				label: 'Option 5',
			},
			{
				key: '6',
				label: 'Option 6',
			},
			{
				key: '7',
				label: 'Option 7',
			},
			{
				key: '8',
				label: 'Option 8',
			},
		],
	},
	{
		key: 'sub2',
		label: 'Navigation Two',
		icon: <AppstoreOutlined />,
		children: [
			{
				key: '9',
				label: 'Option 9',
			},
			{
				key: '10',
				label: 'Option 10',
			},
			{
				key: 'sub3',
				label: 'Submenu',
				children: [
					{
						key: '11',
						label: 'Option 11',
					},
					{
						key: '12',
						label: 'Option 12',
					},
				],
			},
		],
	},
];
const MenuLayout = () => {
	const [collapsed, setCollapsed] = useState(false);
	const navigate = useNavigate();
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	//Handle navigate event
	const handleClick = ({ key }) => {
		navigate(key);
	};

	return (
		<div>
			<Button
				type="primary"
				onClick={toggleCollapsed}
				style={{
					marginBottom: 16,
				}}
			>
				{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
			</Button>
			<Menu
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['sub1']}
				mode="inline"
				theme="dark"
				inlineCollapsed={collapsed}
				items={items}
				onClick={handleClick}
			/>
		</div>
	);
};
export default MenuLayout;
