import React, { memo } from "react";
import PropTypes from "prop-types";
import "./SearchResultsList.css";
import SearchResult from "./SearchResult";

const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.length > 0 &&
        results.map(({ name, id }) => {
          return <SearchResult name={name} key={id} />;
        })}
    </div>
  );
};

SearchResultsList.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default memo(SearchResultsList);
