import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { Classes, InputGroup, Tooltip, Button, Intent } from '@blueprintjs/core';
import logo from '../assets/logo.png';

type LoginProps = {
	username: string;
	password: string;
	disabled: boolean;
	showPassword: boolean;
};

const Container = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	/* width: 100%;
	height: 100%;
	padding: 18% 30% 0% 30%;*/
	text-align: center;
`;

const Logo = styled.img<{ src: string }>`
	src: ${(props) => props.src};
	alt: 'logo';
	max-width: 100%;
`;

const Footer = styled.footer`
	position: fixed;
	bottom: 0;
	width: 100%;
	display: block;
	text-align: center;
`;

export default class Login extends Component<{}, LoginProps> {
	state: LoginProps = {
		username: '',
		password: '',
		disabled: false,
		showPassword: false,
	};

	private onSubmit = () => {};

	private handleLockClick = () => this.setState({ showPassword: !this.state.showPassword });

	render() {
		const { showPassword, disabled } = this.state;

		const lockButton = (
			<Tooltip content={`${showPassword ? 'Hide' : 'Show'} Password`} disabled={disabled}>
				<Button
					disabled={disabled}
					icon={showPassword ? 'unlock' : 'lock'}
					intent={Intent.WARNING}
					minimal={true}
					onClick={this.handleLockClick}
				/>
			</Tooltip>
		);

		return (
			<>
				<Container>
					<Row gutter={[8, 48]} align="middle">
						<Col span={24}>
							<Logo src={logo}></Logo>
						</Col>
					</Row>
					<Row gutter={[20, 16]} className={Classes.TEXT_LARGE}>
						<Col offset={3} span={5} style={{ textAlign: 'end' }}>
							Username:
						</Col>
						<Col span={12}>
							<InputGroup
								disabled={disabled}
								placeholder="Enter your username"
								type="text"
								fill={true}
							/>
						</Col>
						<Col offset={3} span={5} style={{ textAlign: 'end' }}>
							Password:
						</Col>
						<Col span={12}>
							<InputGroup
								disabled={disabled}
								placeholder="Enter your password"
								rightElement={lockButton}
								type={showPassword ? 'text' : 'password'}
							/>
						</Col>
					</Row>
					<Row gutter={[8, 48]} align="middle" style={{ marginTop: '30px' }}>
						<Col span={24}>
							<Button
								text="Login"
								large={true}
								intent={Intent.PRIMARY}
								style={{ width: '150px' }}
								onClick={this.onSubmit}
							/>
						</Col>
					</Row>
				</Container>
				<Footer> &copy; Copyright 2020 All rights reserved.</Footer>
			</>
		);
	}
}
