import './App.css';
import $ from 'jquery';
import Elevator from './Elevator.jsx';


function App() {
    var  ElevatorApp;

    ElevatorApp = new Elevator();
  
    $(ElevatorApp).on('pressed', function(e, {floor, dir}) {
      var car=ElevatorApp.findBestCar(floor);
      $(`#elevator${car} .car`).toggleClass('red');
       ElevatorApp.moveCar(car, floor).then(function() {
        $(`#elevator${car} .car`).toggleClass('green');
        ElevatorApp.clearButton(floor, dir);
        $(`#elevator${car} .car`).toggleClass('black');

        return;

      });
    });
  
  };


export default App;
