import "./SearchResult.css";
import PropTypes from "prop-types";

const SearchResult = ({ name }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You selected ${name}!`)}
    >
      {name}
    </div>
  );
};

SearchResult.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SearchResult;
