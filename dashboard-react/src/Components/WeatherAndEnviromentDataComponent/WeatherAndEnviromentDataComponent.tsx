import React from 'react';
import EnviromentDataComponent from '../EnviromentDataComponent/EnviromentDataComponent';

class WeatherAndEnviromentDataComponent extends React.Component {
  render() {
    return (
      <div className="container-fluid">
      
        <div className="row">
          <div className="col-sm-4">
            .col-sm-4
          </div>
          <div className="col-sm-8">
            <div className="container-fluid">

              <div className="row">
                <div className="col-sm-4">
                  <EnviromentDataComponent msg="hello world"/>
                </div>
                <div className="col-sm-4">
                  <EnviromentDataComponent msg="hello world"/>
                </div>
                <div className="col-sm-4">
                  <EnviromentDataComponent msg="hello world"/>
                </div>
              </div>              
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default WeatherAndEnviromentDataComponent;
