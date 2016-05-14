import React from 'react';

import GraphBar from 'components/BarChart/GraphBar';
import AxisLabel from 'components/BarChart/AxisLabel';

const propTypes = {
  data: React.PropTypes.array.isRequired,
  barColor: React.PropTypes.string
};

class BarChart extends React.Component {
  render() {
    const {data, barColor} = this.props;

    return (
      <div className="bar__chart-overlaid">
        {data.map((datum, index) => {
          const count = datum._count;

          return (
            <GraphBar
              key={index}
              text={`${count}`}
              value={count}
              backgroundColor={barColor}
            />
          );
        })}
      </div>
    );
  }
}

BarChart.propTypes = propTypes;

export default BarChart;
