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

  getLabelStyles() {
    const { labelSize, orientation } = this.props;
    const styles = {};
    const sizeInPx = `${labelSize}px`;

    styles[orientation === orientations.HORIZONTAL ? 'height' : 'width'] = sizeInPx;

    return styles;
  }

  getStyles() {
    const {orientation} = this.props;
    return {
      display: 'flex',
      flexDirection: orientation === orientations.HORIZONTAL ? 'row' : 'column'
    };
  }

  render() {
    const { labels, labelStyle } = this.props;

    return (
      <div style={this.getStyles()}>
        {labels.map((label, index) => {
          return <div key={index} style={this.getLabelStyles()}>{label}</div>
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
