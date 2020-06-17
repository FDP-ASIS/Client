import * as React from 'react';
import Strings from '../../../utils/strings';
import { H3 } from '@blueprintjs/core';

export interface Props {
	children?: React.ReactNode;
}

export interface State {}

export default class SearchDepartment extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	render() {
		return <H3>{Strings.SEARCH_DEPARTMENT}</H3>;
	}
}
