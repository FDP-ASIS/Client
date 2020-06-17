import * as React from 'react';
import Strings from '../../utils/strings';

export interface Props {
	children?: React.ReactNode;
}

export interface State {}

export default class Settings extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	render() {
		return <div>{Strings.SETTINGS}</div>;
	}
}
