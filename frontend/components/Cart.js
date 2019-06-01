import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { adopt } from 'react-adopt'; // used to deal with render props issues
import gql from 'graphql-tag';
import User from './User';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
import CartItem from './CartItem';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import TakeMyMoney from './TakeMyMoney';

const LOCAL_STATE_QUERY = gql`
	query {
		cartOpen @client # this way, we are telling graphql to grab data from the apollo store and not the server
	}
`;

const TOGGLE_CART_MUTATION = gql`
	mutation {
		toggleCart @client
	}
`;

/* eslint-disable */
const Composed = adopt({
	// we could easily return just <User />, <Mutation />, <Query /> as the value, but we want to circumvent the proptype error
	user: ({ render }) => <User>{render}</User>,
	toggleCart: ({ render }) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
	localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
});
/* eslint-enable */

// * Since we passed the result of the current user query to its potential children, we can access them here

const Cart = () => (
	<Composed>
		{({ user, toggleCart, localState, loading }) => {
			const me = user.data.me;
			if (!me) return null;
			return (
				<div>
					{loading ? (
						<p>Loading data</p>
					) : (
						<CartStyles open={localState.data.cartOpen}>
							{/* we are able to toggle the cart on the apollo state from here */}
							<header>
								<CloseButton title="close" onClick={toggleCart}>
									&times;
								</CloseButton>
								<Supreme>{me.name}'s Cart</Supreme>
								<p>You have {me.cart.length} Item(s) in your cart.</p>
							</header>
							<ul>{me.cart.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem} />)}</ul>
							<footer>
								<p>{formatMoney(calcTotalPrice(me.cart))}</p>
								<TakeMyMoney>
									<SickButton>Checkout</SickButton>
								</TakeMyMoney>
							</footer>
						</CartStyles>
					)}
				</div>
			);
		}}
	</Composed>
);

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
