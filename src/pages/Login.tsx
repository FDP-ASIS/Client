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
import { Footer } from '../components/Footer/Footer';
import Strings from '../utils/strings/index';

type LoginProps = {
	username: string;
	password: string;
	disabled: boolean;
	isOpenError: boolean;
	showPassword: boolean;
	wiggling: boolean;
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

class Login extends Component<RouteComponentProps & LoginComponentProps, LoginProps> {
	state: LoginProps = {
		username: '',
		password: '',
		disabled: false,
		showPassword: false,
		isOpenError: false,
		wiggling: false,
	};

	private readonly LOGIN_INTERVALE = 2000;

	private wiggleTimeoutId: number | undefined;
	private loginTimeoutId: number | undefined;

	private onSubmit = (username: string, password: string) => {
		if (!username || !password) this.handleErrorOpen();
		else {
			this.beginWiggling();
			this.setState({ disabled: !this.state.disabled });
			clearTimeout(this.loginTimeoutId);
			this.loginTimeoutId = setTimeout(() => {
				logMeIn({ username, password })
					.then((user) => {
						this.props.actions.savePerson(user);
					})
					.catch(() => this.addToast(Strings.LOGIN_FAILED))
					.finally(() => this.setState({ disabled: !this.state.disabled }));
			}, this.LOGIN_INTERVALE);
		}
	};

	private handleLockClick = () => this.setState({ showPassword: !this.state.showPassword });
	private handleErrorOpen = () => this.setState({ isOpenError: true });
	private handleErrorClose = () => this.setState({ isOpenError: false });

	private toaster: Toaster | undefined;

	private addToast = (reason: string) => {
		if (this.toaster)
			this.toaster.show({ message: reason, intent: Intent.DANGER, icon: 'issue' });
	};

	public componentWillUnmount() {
		clearTimeout(this.wiggleTimeoutId);
		clearTimeout(this.loginTimeoutId);
	}

	private beginWiggling = () => {
		clearTimeout(this.wiggleTimeoutId);
		this.setState({ wiggling: true });
		this.wiggleTimeoutId = setTimeout(() => this.setState({ wiggling: false }), 300);
	};

	render() {
		const { showPassword, disabled, username, password, isOpenError } = this.state;

		const lockButton = (
			<Tooltip
				content={`${showPassword ? Strings.HIDE : Strings.SHOW} ${Strings.PASSWORD}`}
				disabled={disabled}
			>
				<Button
					disabled={disabled}
					icon={showPassword ? 'eye-open' : 'eye-off'}
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
						ref={(ref: Toaster) => (this.toaster = ref)}
					/>
					<Alert
						confirmButtonText={Strings.OK}
						isOpen={isOpenError}
						onClose={this.handleErrorClose}
					>
						<p style={{ color: 'black' }}>{Strings.USERNAME_OR_PASSWORD_NOT_ENTERED}</p>
					</Alert>
					<Row gutter={[8, 48]} align="middle">
						<Col span={24}>
							<Logo src={logo}></Logo>
						</Col>
					</Row>
					<Row gutter={[20, 16]} className={Classes.TEXT_LARGE}>
						<Col offset={3} span={5} style={{ textAlign: 'end' }}>
							{Strings.USERNAME}:
						</Col>
						<Col span={12}>
							<InputGroup
								value={username}
								onChange={(event: React.FormEvent<HTMLInputElement>) =>
									this.setState({ username: event.currentTarget.value })
								}
								disabled={disabled}
								placeholder={Strings.ENTER_USERNAME}
								type="text"
								fill={true}
							/>
						</Col>
						<Col offset={3} span={5} style={{ textAlign: 'end' }}>
							{Strings.PASSWORD}:
						</Col>
						<Col span={12}>
							<InputGroup
								value={password}
								onChange={(event: React.FormEvent<HTMLInputElement>) =>
									this.setState({ password: event.currentTarget.value })
								}
								disabled={disabled}
								placeholder={Strings.ENTER_PASSWORD}
								rightElement={lockButton}
								type={showPassword ? 'text' : 'password'}
							/>
						</Col>
					</Row>
					<Row gutter={[8, 48]} align="middle" style={{ marginTop: '30px' }}>
						<Col span={24}>
							<Button
								className={this.state.wiggling ? 'docs-wiggle' : ''}
								text={Strings.LOGIN}
								large={true}
								loading={disabled}
								icon={'log-in'}
								intent={Intent.PRIMARY}
								style={{ width: '150px' }}
								onClick={() => this.onSubmit(username, password)}
							/>
						</Col>
					</Row>
				</Container>
				<Footer />
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
