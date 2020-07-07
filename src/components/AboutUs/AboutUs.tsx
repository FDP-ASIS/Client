import * as React from 'react';
import Strings from '../../utils/strings';
import { H3, H4, H5 } from '@blueprintjs/core';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import pycharm from '../../assets/pycharm.png';
import python from '../../assets/python.png';
import eclipse from '../../assets/eclipse.png';
import java from '../../assets/java.png';

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

const H3Align = styled(H3)`
	text-align: center;
`;

const H4Color = styled(H4)`
	color: navy;
`;

const H5Color = styled(H5)`
	color: #654321;
`;

const Logo = styled.img<{ src: string }>`
	src: ${(props) => props.src};
	alt: 'logo';
	width: 55px;
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
					<H3Align> {Strings.ABOUT_US} </H3Align>
					<H4Color> {Strings.PROJECT_STORY} </H4Color>
					<p>
						Automatic Installation is a standard academic final degree project in
						software engineering.
						<br /> It was created for "Afeka Tel Aviv Academic College of Engineering"
						which makes the software installation process in the various courses a fully
						automated, non-contact process.
						<br /> All you need to do is just select your courses and start downloading
						the software to your computer.
					</p>
					<H4Color>{Strings.SOFTWARE}</H4Color>
					<H5Color> IDE (Integrated Development Environment)- </H5Color>

					<p>
						<Row>
							<Col span={20}>
								{' '}
								<b> Eclipse 2020-03: </b> An open-source IDE supported by IBM.
								Eclipse is popular for Java application development (Java SE and
								Java EE).
							</Col>
							<Col>
								<Logo src={eclipse}></Logo>
							</Col>
						</Row>
					</p>

					<p>
						<Row>
							<Col span={20}>
								{' '}
								<b> Pycharm Community 2020.1: </b> An IDE developed by Jetbrains. It
								is used for development in Python. You can customize it with themes
								and plugins.
							</Col>
							<Col>
								<Logo src={pycharm}></Logo>
							</Col>
						</Row>
					</p>

					<H5Color> Programming languages- </H5Color>

					<p>
						<Row>
							<Col span={20}>
								{' '}
								<b> JDK 8: </b> Java is a programming language that is class-based,
								object-oriented, and designed to have as few implementation
								dependencies as possible. It is intended to let application
								developers write once, run anywhere.
							</Col>
							<Col>
								<Logo src={java}></Logo>
							</Col>
						</Row>
					</p>

					<p>
						<Row>
							<Col span={20}>
								{' '}
								<b> Python 3.7: </b> An interpreted, high-level, general-purpose
								programming language. Python's philosophy emphasizes code
								readability. Its language constructs and object-oriented approach
								aim write clear, logical code for small and large projects.
							</Col>
							<Col>
								<Logo src={python}></Logo>
							</Col>
						</Row>
					</p>

					<Row gutter={[100, 16]}>
						<Col>
							<b> &copy; Copyright 2020 All rights reserved. </b>
						</Col>
						<Col>
							<H4Color> Enjoy! </H4Color>
						</Col>
					</Row>
				</FillAllPage>
			</>
		);
	}
}
