import React from 'react';

const propTypes = {
  labels: React.PropTypes.array.isRequired,
  labelSize: React.PropTypes.number,
  orientation: React.PropTypes.string
};

const orientations = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
};

class AxisLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  getStyles() {
    const { labelSize, orientation } = this.props;
    const styles = {};
    const sizeInPx = `${labelSize}px`;

    styles[orientation === orientations.HORIZONTAL ? 'height' : 'width'] = sizeInPx;

    return styles;
  }
  render() {
    const { labels, labelStyle } = this.props;

    return (
      <div>
        {labels.map((label, index) => {
          return <div key={index} style={this.getStyles()}>{label}</div>
        })}
      </div>
    );
  }
}

AxisLabel.defaultProps = {
  labelSize: 20,
  orientation: 'horizontal'
};

AxisLabel.propTypes = propTypes;

export default AxisLabel;
