import React from 'react';
import SearchBar from 'components/SearchForm/SearchBar';

const propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
      this.onSubmit(this.state.value);
    }
  }

  onSubmit() {
    if (!(/[0-9]{4}/.test(this.state.value))) {
      return;
    }

    this.props.onSubmit(this.state.value);
  }

  render() {
    return (
      <div>
        <SearchBar
          onChange={this.onChange}
          value={this.state.value}
          onKeyPress={this.onKeyPress}
        />
        <button type="submit" onClick={this.onSubmit}>Search</button>
      </div>
    )
  }
}

SearchForm.propTypes = propTypes;

export default SearchForm;
