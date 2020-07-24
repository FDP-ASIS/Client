import React, { Component } from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import logo from '../assets/logo.png';
import { getAuthToken, logMeInWithToken } from '../utils/auth';
import { RoutesPath } from '../routers/routesPath';
import { connect } from 'react-redux';
import { User } from '../models/user';
import { AppDispatch } from '../redux/store';
import { setUser } from '../redux/reducers/user';

const Center = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
`;

const Article = styled('div')`
	text-align: center;
	display: flex;
	place-content: center;
`;

interface LoginComponentProps {
	actions: { savePerson: (person: User) => ReturnType<AppDispatch> };
}

class Splash extends Component<RouteComponentProps & LoginComponentProps> {
	private readonly SLASH_TIME = 5000;
	private splashTimeoutId: number | undefined;

	componentDidMount() {
		this.checkAuth();
	}

	public componentWillUnmount() {
		clearTimeout(this.splashTimeoutId);
	}

	private navTo(route: RoutesPath, withTimeOut = false): void {
		this.splashTimeoutId = setTimeout(
			() => {
				this.props.history.replace(route);
			},
			withTimeOut ? this.SLASH_TIME : 0
		);
	}

	private checkAuth = async () => {
		getAuthToken()
			.then((token) => {
				logMeInWithToken(token)
					.then((user) => {
						this.props.actions.savePerson(user);
						this.navTo(RoutesPath.Dashboard);
					})
					.catch(() => this.navTo(RoutesPath.Login, false));
			})
			.catch(() => this.navTo(RoutesPath.Login, true));
	};

	render() {
		return (
			<Center>
				<img src={logo} alt="logo" style={{ marginBottom: '30%' }} />
				<Article>
					<ReactLoading
						type="bubbles"
						color="white"
						height={'20%'}
						width={'20%'}
						delay={2000}
					/>
				</Article>
			</Center>
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

export default withRouter(connect(null, mapDispatchToProps)(Splash));
