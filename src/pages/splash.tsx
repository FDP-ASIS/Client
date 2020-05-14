// TODO add search for session
// TODO add request to auth the user

import React, { Component } from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import logo from '../assets/logo.png';

import { getAuthToken, logMeInWithToken } from '../utils/auth';
import { RoutesPath } from '../routers/routesPath';
// import { connect } from 'react-redux'

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

class Splash extends Component<RouteComponentProps> {
	private readonly SLASH_TIME = 5000;

	componentDidMount() {
		this.checkAuth();
	}

	private navTo(route: RoutesPath, withTimeOut: boolean): void {
		setTimeout(
			() => {
				this.props.history.push(route);
			},
			withTimeOut ? this.SLASH_TIME : 0
		);
	}

	private checkAuth = async () => {
		getAuthToken()
			.then((token) => {
				logMeInWithToken(token).catch(() => this.navTo(RoutesPath.Login, false));
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

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

export default withRouter(Splash);

// export default connect(mapStateToProps, mapDispatchToProps)(Splash)
