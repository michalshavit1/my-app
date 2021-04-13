import './App.css';
import $ from 'jquery';
import bell from './ElevatorBell.mp3';
import React from 'react';



class Elevator extends React.Component{
    constructor(props) {
      super(props);
      var buttons, me , floor;
      this.floors = 10;
      this.cars = [
        {
          floor: 1,
          moving: false
        },
        {
          floor: 1,
          moving: false
        },
        {
          floor: 1,
          moving: false
        },
        {
          floor: 1,
          moving: false
        },
        {
          floor: 1,
          moving: false
        }
      ];
      me = this;

     buttons = ((function() {
        var j, results;
        results = [];

        for (floor = j = 10; j >= 1; floor = j += -1) {
          results.push(`<div id = 'button-floor-${floor}' class='button-floor'>
  <button class='button' data-floor='${floor}'>call<div class='waiting'></button>
</div>`);
        }
        return results;
      })()).join('');
      $('#buttons').empty().append($(buttons)).off('click').on('click', 'button', function() {
        if ($(this).hasClass('waiting')) {
          return;
        }
        $(this).toggleClass('waiting');
        
        return $(me).trigger('pressed', [
          {
            floor: parseInt($(this)[0].dataset.floor),
            dir: $(this).children().hasClass('waiting') ? 'waiting' : 'arrived'
          }
        ]);
      }); 

    
   
  
     
    }

  

     
    clearButton(floor, dir ) {
      var birdSound = new Audio(bell);
      birdSound.loop = false;
      birdSound.play(); 
      $(`#button-floor-${floor} > button > div.${dir}`).parent().removeClass('waiting');
      return;
    }


    findBestCar(floor) {
      var a, car, closest, i, lowest, nonmoving;
      nonmoving = (function() {
        var j, len, ref, results;
        ref = this.cars;
        results = [];
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          car = ref[i];
          if (!car.moving) {
            results.push([i + 1, Math.abs(floor - car.floor)]);
          }
        }
        return results;
      }).call(this);
      closest = nonmoving.reduce(function(a, b) {
        if (a[1] <= b[1]) {
          return a;
        } else {
          return b;
        }
      });
      lowest = (function() {
        var j, len, results;
        results = [];
        for (j = 0, len = nonmoving.length; j < len; j++) {
          a = nonmoving[j];
          if (a[1] === closest[1]) {
            results.push(a[0]);
          }
        }
        return results;
      })();
      return lowest[Math.floor(Math.random() * lowest.length)];
    }

    moveCar(car, floor) {
      var deferred, myCars;
      myCars = this.cars;
      deferred = $.Deferred();
      if (this.cars[car - 1].moving) {
        return deferred.reject();
      }
      if (floor < 1 || floor > this.floors) {
        return deferred.reject();
      }
      this.cars[car - 1].moving = true;
      $(`#elevator${car} .car`).animate({
        bottom: `${(floor - 1) * 23}px`
      }, {
        duration: 500 * Math.abs(myCars[car - 1].floor - floor),
        easing: 'swing',
        complete: function() {
          myCars[car - 1].floor = floor;
          myCars[car - 1].moving = false;
          return deferred.resolve();
        }
      }).delay(75);
      $(`#elevator${car} .car > div`).animate({
        top: `${-230 + floor * 23}px`
      }, {
        duration: 500 * Math.abs(myCars[car - 1].floor - floor),
        easing: 'swing'
      }).delay(75);

      return deferred;
    }

  };

  export default Elevator;