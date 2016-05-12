import React from 'react';

const propTypes = {
  onChange: React.PropTypes.func.isRequired,
  onKeyPress: React.PropTypes.func,
  value: React.PropTypes.string.isRequired
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        name="searchBar"
        type="text"
        value={this.props.value}
        placeholder="Enter year, (YYYY)"
        onChange={this.props.onChange}
        onKeyDown={this.props.onKeyPress}
      />
    );
  }
}

SearchBar.propTypes = propTypes;

export default SearchBar;
