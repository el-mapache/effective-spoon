import React from 'react';
import BarChart from 'components/BarChart/BarChart';
import GraphBar from 'components/BarChart/GraphBar';
import AxisLabel from 'components/BarChart/AxisLabel';

const propTypes = {
  dataset: React.PropTypes.object.isRequired,
  sortBy: React.PropTypes.func,
  colors: React.PropTypes.object
};

class AccidentDataChart extends React.Component {
  constructor(props) {
    super(props);
  }

  getVisualization() {
    const { colors, dataset } = this.props;
    const accidentYears = Object.keys(dataset);

    return (
      <div>
        {accidentYears.reduce((memo, year, index) => {
          const colorForYear = colors[year];
          const accidentYear = dataset[year];

          if (!accidentYear.active) {
            return memo;
          }

          memo.push(
            <BarChart
              key={index}
              data={accidentYear.accidents}
              barColor={colorForYear}
            />
          );

          return memo;
        },[])}
      </div>
    );
  }
//<AxisLabel labelSize={20} labels={states} orientation={'horizontal'} />
  render() {
    //const accidents = this.getAccidentsByStateAndYear();
    // const states = accidents[0] && Object.keys(accidents[0]) || [];
    //
    return (
      <div style={{display: 'flex', alignContent: 'space-between'}}>
        {this.getVisualization()}
      </div>
    );
    return null;
  }

}

AccidentDataChart.propTypes = propTypes;

export default AccidentDataChart;
