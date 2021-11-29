import React, { Component } from 'react';
import { IEnvironmentDataDto } from '../../Logic/Interfaces';
import './EnviromentDataComponent.css';



type EnviromentDataComponentProps = {
  environmentDataDto: IEnvironmentDataDto
}
class EnviromentDataComponent extends Component<EnviromentDataComponentProps> {

  render() {
    return (
      <div className="container-fluid bg-dark text-white">
      
        <div className="enviromentDataComponent-card">
          <div>{this.props.environmentDataDto.name}</div>
          <div>{this.props.environmentDataDto.sensorData}</div>
          <div>{this.props.environmentDataDto.timestamp}</div>
        </div>

      </div>
    );
  }
}

export default EnviromentDataComponent;
