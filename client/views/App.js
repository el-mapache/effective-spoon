import React from 'react';
import ajax from 'utils/ajax';
import YearColors from 'YearColors';

import SearchForm from 'components/SearchForm/SearchForm';
import AccidentDataChart from 'views/AccidentDataGraph';
import ToggleButton from 'components/ToggleButton/ToggleButton';

// const accidentData = {
//   'year': {
//     accidents: [],
//     active: false
//   }
// }

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accidentData: {},
      activeYears: [],
      error: ''
    };

    this.handleGetAccidentData = this.handleGetAccidentData.bind(this);
    this.selectYear = this.selectYear.bind(this);
  }

  handleGetAccidentData(searchValue) {
    ajax.request('GET', `/api/${searchValue}`).then((accidents) => {
      const accidentData = this.state.accidentData;
      accidentData[searchValue] = {
        accidents: accidents,
        active: true
      };

      this.setState({
        accidentData: accidentData
      });
    }).catch(error => this.setState({error: error}));
  }

  selectYear(year, isActive) {
    const accidentYear = this.state.accidentData[year];

    if (accidentYear) {
      // cache hit for this year, toggle it's visible state
      accidentYear.active = isActive;
      this.setState({
        accidentData: this.state.accidentData
      });
    } else {
      // cache miss, get the data from the server
      this.handleGetAccidentData(year);
    }
  }

  render() {
    return (
      <div>
        <div>{this.state.error}</div>
        <ToggleButton value="2013" selectedState={YearColors["2013"]} onClick={this.selectYear} />
        <ToggleButton value="2014" selectedState={YearColors["2014"]} onClick={this.selectYear} />
        <ToggleButton value="2015" selectedState={YearColors["2015"]} onClick={this.selectYear} />

        <AccidentDataChart
          dataset={this.state.accidentData}
          sortBy={null}
          colors={YearColors} />
      </div>
    );
  }
};

export default App;
