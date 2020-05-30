import React, { Component } from 'react';
// import { connect } from 'react-redux'
import styled from 'styled-components';
import { Alignment, Checkbox, Button, Intent } from '@blueprintjs/core';
import { downloadAndInstall } from '../utils/downloadAndIstall';

const Center = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
`;

interface ICheckboxExampleState {
	checked: boolean;
}

export default class Dashboard extends React.PureComponent<{}, ICheckboxExampleState> {
	public state: ICheckboxExampleState = {
		checked: false,
	};

	private onSubmit = () => {
		if (this.state.checked) {
			downloadAndInstall();
		}
	};

	render() {
		return (
			<Center>
				<Checkbox
					label="Course 1"
					checked={this.state.checked}
					large={true}
					onChange={(event) => this.setState({ checked: !this.state.checked })}
				/>
				<Checkbox label="Course 2" large={true} />
				<Checkbox label="Course 3" large={true} />
				<Checkbox label="Course 4" large={true} />

				<Button
					text="Start"
					large={true}
					intent={Intent.PRIMARY}
					style={{ width: '150px' }}
					onClick={() => this.onSubmit()}
				/>
			</Center>
		);
	}
}

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)Ddashboard)
