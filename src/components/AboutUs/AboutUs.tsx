import * as React from 'react';
import Strings from '../../utils/strings';
import { H3 } from '@blueprintjs/core';
import styled from 'styled-components';
import { Col, Row } from 'antd';

export interface Props {
	children?: React.ReactNode;
}

export interface State {}

const FillAllPage = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export default class AboutUs extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	render() {
		const {} = this.state;

		return (
			<>
				<FillAllPage>
					<Row gutter={[6, 6]}>
						<Col span={16}>
							<H3>{Strings.ABOUT_US}</H3>
							<H3>{Strings.PROJECT_STORY}</H3>
						</Col>
					</Row>
					<p>
						Automatic Installation is a standard academic final degree project in
						software engineering.
					</p>
					<p>
						{' '}
						It was created for "Afeka College (Tel Aviv Academic College of
						Engineering)" which makes the software installation process in the various
						courses a fully automated, non-contact process.
					</p>
					<H3>{Strings.SOFTWARE}</H3>
					<p>The software in the system:</p>
					<p>
						IDE- Eclipse 2020-03 Eclipse is an open-source Integrated Development
						Environment (IDE) supported by IBM. Eclipse is popular for Java application
						development (Java SE and Java EE).
					</p>
					<p>
						Pycharm Community 2020.1- An IDE (Integrated Development Environment) by
						Jetbrains. It is used for development in Python. You can customize it with
						themes and plugins.
					</p>
					<p>Programming languages-</p>
					<p>
						JDK 8- Java is a general-purpose programming language that is class-based,
						object-oriented, and designed to have as few implementation dependencies as
						possible. It is intended to let application developers write once, run
						anywhere.
					</p>
					<p>
						Python 3.7- An interpreted, high-level, general-purpose programming
						language. Python's design philosophy emphasizes code readability with its
						notable use of significant whitespace. Its language constructs and
						object-oriented approach aim to help programmers write clear, logical code
						for small and large-scale projects.
					</p>
				</FillAllPage>
			</>
		);
	}
}
