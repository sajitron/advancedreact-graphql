import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import SickButton from "./styles/SickButton";

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

const Cart = () => (
  <Mutation mutation={TOGGLE_CART_MUTATION}>
    {toggleCart => (
      <Query query={LOCAL_STATE_QUERY}>
        {({ data, loading }) => (
          <>
            {loading ? (
              <p>Loading data</p>
            ) : (
              <CartStyles open={data.cartOpen}>
                {/* we are able to toggle the cart on the apollo state from here */}
                <header>
                  <CloseButton title="close" onClick={toggleCart}>
                    &times;
                  </CloseButton>
                  <Supreme>Your Cart</Supreme>
                  <p>You have __Items in your cart.</p>
                </header>
                <footer>
                  <p>$10.10</p>
                  <SickButton>Checkout</SickButton>
                </footer>
              </CartStyles>
            )}
          </>
        )}
      </Query>
    )}
  </Mutation>
);

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
