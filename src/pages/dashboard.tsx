import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/user';
import { Role } from '../models/user';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { Menu } from '../components/menu';

const FillAllPage = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
`;

export const Dashboard: FunctionComponent<{}> = () => {
	const user = useSelector(selectUser);
	switch (user?.role) {
		case Role.STUDENT:
			break;
		case Role.LECTURER:
			break;
		case Role.ADMIN:
			break;
	}
	return (
		<FillAllPage>
			<Row gutter={[0, 0]} style={{ margin: 0, height: '100%' }}>
				<Col span={6}>
					<Menu />
				</Col>
				<Col span={18}>Page</Col>
			</Row>
		</FillAllPage>
	);
};
