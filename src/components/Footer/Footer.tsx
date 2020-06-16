import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const FooterStyled = styled.footer`
	position: fixed;
	bottom: 0;
	width: 100%;
	display: block;
	text-align: center;
`;

export const Footer: FunctionComponent<{}> = () => {
	return <FooterStyled> &copy; Copyright 2020 All rights reserved.</FooterStyled>;
};
