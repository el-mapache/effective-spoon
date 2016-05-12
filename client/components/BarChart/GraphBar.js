import React from 'react';

const propTypes = {
  backgroundColor: React.PropTypes.string,
  height: React.PropTypes.string,
  text: React.PropTypes.string,
  maxWidth: React.PropTypes.string,
  value: React.PropTypes.number
};

class GraphBar extends React.Component {
  // get progress on a logarithmic scale
  // not really sure how good or accurate this is.
  // Technically, it should be linear up to a point, and then logarithmic as
  // the dataset grows larger and larger?
  getLnProgress() {
    const widthPerItem = 30;
    const { maxWidth, value } = this.props;
    const clampedValue = Math.log(value) || 0.5;

    return Math.abs((widthPerItem * clampedValue) + Math.log(maxWidth) + value);
  }

  getStyle() {
    const { height, maxWidth } = this.props;
    return {
      height: `${height}px`,
      maxWidth: `${maxWidth}px`
    };
  }

  getInnerStyle() {
    const backgroundColor = this.props.backgroundColor;

    return {
      background: backgroundColor,
      width: `${this.getLnProgress()}px`
    };
  }

  render() {
    return(
      <div className="graph__bar" style={this.getStyle()}>
        <span className="graph__bar-text">
          {this.props.text}
        </span>
        <div className="graph__bar-inner" style={this.getInnerStyle()}></div>
      </div>
    );
  }
}

GraphBar.defaultProps = {
  height: '20',
  maxWidth: '400',
  value: 0
};
GraphBar.propTypes = propTypes;

export default GraphBar;
