import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/user';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { Menu } from '../components/Menu';
import { CurrentPage } from '../components/CurrentPage/CurrentPage';

const FillAllPage = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
`;

export const Dashboard: FunctionComponent<{}> = () => {
	const user = useSelector(selectUser);
	return (
		<FillAllPage>
			<Row gutter={[0, 20]} style={{ margin: 0, height: '100%' }}>
				<Col span={6}>
					<Menu user={user!} />
				</Col>
				<Col span={18}>
					<CurrentPage />
				</Col>
			</Row>
		</FillAllPage>
	);
};
