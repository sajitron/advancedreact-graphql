import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Signin from "./Signin";

const PleaseSignIn = props => (
  <div>
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading }) => {
        if (loading) return <p>loading...</p>;
        if (!data.me) {
          return (
            <div>
              <p>Please Sign In to Add an item</p>
              <Signin />
            </div>
          );
        }
        // return whatever is sitting within the component
        return props.children;
      }}
    </Query>
  </div>
);

export default PleaseSignIn;
