import UpdateItem from "../components/UpdateItem";

const Update = props => (
  <div>
    <UpdateItem id={props.query.id} />
    {/* we have access to the id as a result of exposing the query to the user in _app.js */}
  </div>
);

export default Update;
