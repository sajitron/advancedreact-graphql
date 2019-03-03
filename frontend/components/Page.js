import React, { Component } from 'react';
import Header from './Header';
import Meta from './Meta';

const MyButton = styled.button`
	background: orange;
	font-size: ${(props) => (props.huge ? '100px' : '50px')};

	span {
		font-size: 100px;
	}
`;

class Page extends Component {
	render() {
		return (
			<div>
				<Meta />
				<Header />
				{this.props.children}
			</div>
		);
	}
}

export default Page;
