import Items from "../components/Items";

const Home = props => (
  <div>
    {/* prop used in Items.js */}
    <Items page={parseFloat(props.query.page) || 1} />
  </div>
);

export default Home;
