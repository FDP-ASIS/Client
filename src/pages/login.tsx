import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { Classes, InputGroup, Tooltip, Button, Intent, Alert, Toaster } from '@blueprintjs/core';
import logo from '../assets/logo.png';
import { logMeIn } from '../utils/auth';
import { setUser } from '../redux/reducers/user';
import { connect } from 'react-redux';
import { User } from '../models/user';
import { AppDispatch } from '../redux/store';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type LoginProps = {
	username: string;
	password: string;
	disabled: boolean;
	isOpenError: boolean;
	showPassword: boolean;
};

interface LoginComponentProps {
	actions: { savePerson: (person: User) => ReturnType<AppDispatch> };
}

const Container = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
`;

const Logo = styled.img<{ src: string }>`
	src: ${(props) => props.src};
	alt: 'logo';
`;

const Footer = styled.footer`
	position: fixed;
	bottom: 0;
	width: 100%;
	display: block;
	text-align: center;
`;

class Login extends Component<RouteComponentProps & LoginComponentProps, LoginProps> {
	state: LoginProps = {
		username: '',
		password: '',
		disabled: false,
		showPassword: false,
		isOpenError: false,
	};

	private readonly LOGIN_INTERVALE = 2000;

	private onSubmit = (username: string, password: string) => {
		if (!username || !password) this.handleErrorOpen();
		else {
			this.setState({ disabled: !this.state.disabled });
			setTimeout(() => {
				logMeIn({ username, password })
					.then((user) => this.props.actions.savePerson(user))
					.catch((reason) => this.addToast('Username or password is invalid'))
					.finally(() => this.setState({ disabled: !this.state.disabled }));
			}, this.LOGIN_INTERVALE);
		}
	};

	private handleLockClick = () => this.setState({ showPassword: !this.state.showPassword });

	private handleErrorOpen = () => this.setState({ isOpenError: true });
	private handleErrorClose = () => this.setState({ isOpenError: false });

	private toaster!: Toaster;
	private refHandlers = {
		toaster: (ref: Toaster) => (this.toaster = ref),
	};

	private addToast = (reason: string) => {
		this.toaster.show({ message: reason, intent: Intent.DANGER, icon: 'issue' });
	};

	render() {
		const { showPassword, disabled, username, password, isOpenError } = this.state;

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
					<Toaster
						position="top"
						canEscapeKeyClear={true}
						maxToasts={1}
						ref={this.refHandlers.toaster}
					/>
					<Alert
						confirmButtonText="Okay"
						isOpen={isOpenError}
						onClose={this.handleErrorClose}
					>
						<p style={{ color: 'black' }}>
							Oops, you forget to enter your username/password
						</p>
					</Alert>
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
								value={username}
								onChange={(event: React.FormEvent<HTMLInputElement>) =>
									this.setState({ username: event.currentTarget.value })
								}
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
								value={password}
								onChange={(event: React.FormEvent<HTMLInputElement>) =>
									this.setState({ password: event.currentTarget.value })
								}
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
								disabled={disabled}
								intent={Intent.PRIMARY}
								style={{ width: '150px' }}
								onClick={() => this.onSubmit(username, password)}
							/>
						</Col>
					</Row>
				</Container>
				<Footer> &copy; Copyright 2020 All rights reserved.</Footer>
			</>
		);
	}
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
	return {
		actions: {
			savePerson: (user: User) => dispatch(setUser(user)),
		},
	};
};

export default withRouter(connect(null, mapDispatchToProps)(Login));
