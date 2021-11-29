import React, { Component } from 'react';

type EnviromentDataComponentProps = {
  msg: string
}
class EnviromentDataComponent extends Component<EnviromentDataComponentProps> {

  render() {
    return (
      <div className="container-fluid">
      
        <h1>{this.props.msg}</h1>

        <div className="row">
          <div className="col-sm-4">
            .col-sm-4
          </div>
          <div className="col-sm-8">
            .col-sm-4
          </div>
        </div>

      </div>
    );
  }
}

export default EnviromentDataComponent;
