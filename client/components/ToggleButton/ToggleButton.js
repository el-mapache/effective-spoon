import React from 'react';

const propTypes = {
  onClick: React.PropTypes.func,
  selected: React.PropTypes.bool,
  selectedState: React.PropTypes.string,
  value: React.PropTypes.string
}

class ToggleButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: !!this.props.selected
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { onClick, value } = this.props;

    this.setState({
      selected: !this.state.selected
    }, () => {
      onClick && onClick(value, this.state.selected);
    });
  }

  isSelected() {
    if (!this.state.selected) {
      return {};
    }

    return {
      background: this.props.selectedState
    }
  }

  render() {
    return (
      <input
        style={this.isSelected()}
        type="button"
        onClick={this.handleClick}
        value={this.props.value}
      />
    );
  }
}

export default ToggleButton;
