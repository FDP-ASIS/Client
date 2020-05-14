// TODO add search for session
// TODO add request to auth the user

import React, { Component } from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

import logo from '../assets/logo.png';

import { checkAuthIPC } from '../utils/auth';
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

export default class Splash extends Component {
	componentDidMount() {
		this.checkAuth();
	}

	private checkAuth = async () => {
		checkAuthIPC().then(console.log).catch(console.log);
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

// export default connect(mapStateToProps, mapDispatchToProps)(Splash)
