import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Spin } from 'antd';
import { fetchListProduct } from '../../api/product/list-product';
import { useQuery } from '@tanstack/react-query';
import IconText from './IconText';

const ListProduct = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['products'],
		queryFn: fetchListProduct,
	});

	const products = Array.isArray(data?.data?.data) ? data.data.data : [];

	if (isLoading)
		return <Spin size="large" className="flex justify-center mt-10" />;
	if (isError)
		return (
			<div className="text-red-500 text-center mt-10">Lỗi tải dữ liệu.</div>
		);

	return (
		<List
			itemLayout="vertical"
			size="large"
			pagination={{
				onChange: (page) => {
					console.log(page);
				},
				pageSize: 4,
			}}
			dataSource={products}
			footer={
				<div>
					<b>ant design</b> footer part
				</div>
			}
			renderItem={(item) => (
				<List.Item
					key={item.nameProduct}
					actions={[
						<IconText
							icon={StarOutlined}
							text="156"
							key="list-vertical-star-o"
						/>,
						<IconText
							icon={LikeOutlined}
							text="156"
							key="list-vertical-like-o"
						/>,
						<IconText
							icon={MessageOutlined}
							text="2"
							key="list-vertical-message"
						/>,
					]}
					extra={
						<img
							width={272}
							alt="logo"
							src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
						/>
					}
				>
					<List.Item.Meta
						avatar={
							<Avatar
								src={
									item.Images?.Length > 0
										? item.Images[0]
										: 'https://via.placeholder.com/100'
								}
							/>
						}
						title={
							<a href={'/admin/product/' + item._id}>{item.nameProduct}</a>
						}
						description={`Giá: ${item.price} VND`}
					/>
					{item.desc}
				</List.Item>
			)}
		/>
	);
};
export default ListProduct;
