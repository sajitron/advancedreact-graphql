import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
        }
      }
    }
  }
`;

// Building a render prop component
const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {/* make the payload accessible to child components */}
    {payload => props.children(payload)}
  </Query>
);

// whenever you use the User Component, you must pass a function as a child
User.propTypes = {
  children: PropTypes.func.isRequired
};

// Used in Nav.js

export default User;
export { CURRENT_USER_QUERY };
