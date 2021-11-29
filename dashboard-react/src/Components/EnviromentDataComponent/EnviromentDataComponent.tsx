import React, { Component } from 'react';
import './EnviromentDataComponent.css';

type EnviromentDataComponentProps = {
  msg: string
}
class EnviromentDataComponent extends Component<EnviromentDataComponentProps> {

  render() {
    return (
      <div className="container-fluid environmentdatacomponent">
      
        <div className="card bg-dark text-white">
          <div className="card-header">{this.props.msg}</div>
          <div className="card-body">temperatura, humidade e fumo</div> 
          <div className="card-footer">ultima atualizacao</div>
        </div>

      </div>
    );
  }
}

export default EnviromentDataComponent;
