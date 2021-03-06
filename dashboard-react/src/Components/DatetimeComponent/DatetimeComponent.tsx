import React, { Component } from 'react';
import './DatetimeComponent.css';


class DatetimeComponent extends Component {

  date = new Date();
  dayOfWeek = this.date.getDay();
  fullDate = this.date.toLocaleDateString();
  hours = this.date.toLocaleDateString();

  render() {
    return (
      <div className="container-fluid text-white default-component">
      
        <div className="default-component-card">
          <p className="font-size-2em">
            {(this.date.getHours()<10?'0':'') + this.date.getHours()}:{(this.date.getMinutes()<10?'0':'') + this.date.getMinutes()}:{(this.date.getSeconds()<10?'0':'') + this.date.getSeconds()}
          </p>

          <hr className="my-4" />
          <p className="font-size-1-5em">
            {getDayOfTheWeek(this.dayOfWeek)} - {this.fullDate}  
          </p>
        </div>

      </div>
    );
  }
  
}

function getDayOfTheWeek(day: number) {
  switch (day) {
    case 0: return "Domingo";
    case 1: return "Segunda-feira";
    case 2: return "Terça-feira";
    case 3: return "Quarta-feira";
    case 4: return "Quinta-feira";
    case 5: return "Sexta-feira";
    case 6: return "Sábado";
  }
  return "Dia não reconhecido";
}

export default DatetimeComponent;
