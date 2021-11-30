import React, { Component } from 'react';
import { IEnvironmentDataDto } from '../../Logic/Interfaces';
import './EnviromentDataComponent.css';



type EnviromentDataComponentProps = {
  environmentDataDto: IEnvironmentDataDto
}
class EnviromentDataComponent extends Component<EnviromentDataComponentProps> {

  render() {
    return (
      <div className="container-fluid text-white environmentdatacomponent">
      
        <div className="enviromentDataComponent-card">
          <div>{this.props.environmentDataDto.name}</div>
          <div className="sensor-data-field">{this.props.environmentDataDto.sensorData}</div>
          <div>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-clock p-1" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
              </svg>

            </span>
            {this.props.environmentDataDto.timestamp}
          </div>
        </div>

      </div>
    );
  }
}

export default EnviromentDataComponent;
