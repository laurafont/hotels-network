import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import Modal from "react-bootstrap/Modal";

export default class App extends Component {
  constructor(props) {
    super(props);
    const fecha = new Date();
    const hoy = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();
    const mañana = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + (fecha.getDate() + 1);
    this.state = {
     checkin: hoy,
     checkout: mañana,
     adults: 1,
     children: 1,
     rooms: [],
     chosenRoom: null,
     chosenRoomPrice: null,
     discountPrice: null,
     show: false,
     promo_code: "",
     validation: true
    };
  }

  componentDidMount() {
    axios.get("data.json")
        .then(result => {
        this.setState({
          rooms: result.data,
          chosenRoom: result.data[0].name
        })
      })
      .catch(error => this.setState({ error: error.message }));
  };

  handleInput(e) {
    const value = e.target.value;
    const id = e.target.id;

    this.setState({
      [id]: value
    });
  }

  chooseRoom(room) {
    this.setState({
      chosenRoom: room.name,
      chosenRoomPrice: room.price
    })
  }

  modify(event) {
    event.preventDefault();
    console.log("hola");
    axios.get("http://localhost/hotels-network/api/index.php/", {
          params: {
              "checkin": this.state.checkin,
              "checkout": this.state.checkout,
              "adults": this.state.adults,
              "children": this.state.children
          }
          })
          .then(result => {
          this.setState({
            rooms: result.data
          })
        })
        .catch(error => this.setState({ error: error.message }));
  };

  handleClose = () => {
    this.setState({
        show: false
    })
  }

  handleShow() {
      this.setState({
          show: true
        });
  }

  handlePromoCode() {
    const regex = /^THN[0-9][0-9]$/
    console.log(regex.test("THN25"));
    if(!regex.test(this.state.promo_code)) {
      this.setState({
        validation: false
      });
    } else {
      const discount = this.state.promo_code.slice(-2);
      console.log(discount);
      this.setState({
        discountPrice: this.state.chosenRoomPrice - (discount/ 100 * this.state.chosenRoomPrice)
      });
    }
  }

  render() {
    return (
      <div className="room-and-rates">
        <nav className="navbar navbar-fixed-top text-center">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand visible-xs-block" href="index.html">
                <img src="images/cocos/logo_mobile.png" alt="LosCocos" height="36"/>
              </a>
            </div>

            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Rooms</a></li>
                  <li><a href="#">Restaurant</a></li>

                  <li className="hidden-xs">
                      <a href="index.html">
                          <img src="images/cocos/logo.png" alt="LosCocos" height="36"/>
                      </a>
                  </li>

                  <li><a href="#">Weddings</a></li>
                  <li><a href="#">Membership</a></li>
                  <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="engine text-center">
            <div className="engine-wrapper">
                <div className="container text-center">
                  <form id="search" className="form-inline">
                    <div className="form-group">
                      <div className="input-group date datepicker" data-date-format="dd/mm/yyyy">
                      <input id="checkin" type="text" className="form-control" placeholder={this.state.checkin} onChange={e => this.handleInput(e)}/>
                          <div className="input-group-addon" >
                            <span className="glyphicon glyphicon-calendar"></span>
                          </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group date datepicker" data-date-format="dd/mm/yyyy">
                        <input id="checkout" type="text" className="form-control" placeholder={this.state.checkout} onChange={e => this.handleInput(e)}/>
                          <div className="input-group-addon" >
                            <span className="glyphicon glyphicon-calendar"></span>
                          </div>
                      </div>
                    </div>
                    <div className="form-group select-inline">
                      <select className="form-control" placeholder="Adults" id="adults" onChange={e => this.handleInput(e)}>
                        <option value="1">Adults: 1</option>
                        <option value="2">Adults: 2</option>
                        <option value="3">Adults: 3</option>
                        <option value="4">Adults: 4</option>
                        <option value="5">Adults: 5</option>
                        <option value="6">Adults: 6</option>
                        <option value="7">Adults: 7</option>
                        <option value="8">Adults: 8</option>
                        <option value="9">Adults: 9</option>
                      </select>
                    </div>
                    <div className="form-group select-inline">
                      <select className="form-control" placeholder="Children" id="children" onChange={e => this.handleInput(e)}>
                        <option value="1">Children: 1</option>
                        <option value="2">Children: 2</option>
                        <option value="3">Children: 3</option>
                        <option value="4">Children: 4</option>
                        <option value="5">Children: 5</option>
                        <option value="6">Children: 6</option>
                        <option value="7">Children: 7</option>
                        <option value="8">Children: 8</option>
                         <option value="9">Children: 9</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <button className="btn btn-primary"
                      onClick={e => this.modify(e)}>Modify</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

<div className="container rar-summary">
    <div className="row">
        <div className="col-md-8 main">
            <h2>Rooms & Rates</h2>
            <p className="subtitle">Plan your perfect stay at our hotel</p>
            <img src="images/cocos/wizard_1.png" width="480" className="wizard" />
        </div>
        <div className="col-md-4 sidebar-header"></div>
    </div>
    <div className="row">
        <div className="col-md-8 main">
        <div>
                {this.state.rooms.map((room, index) => {
                    return (
                        <div key={index} 
                        onClick={() => this.chooseRoom(room)}
                        className="card clearfix pointer active">
                            <div className="room-image">
                            <img src={room.image} width="100%" />
                            </div>

                            <div className="room-content">
                            <h5 className="form-group">{room.name}</h5>
                            <p className="form-group">{room.description}</p>

                            <p className="form-group">{room.size}</p>

                            <div className="room-info">
                                <div className="item">
                                    <span className="inline-block">
                                        <img src="images/icons/double-bed.svg" width="40"/>
                                    </span>
                                    <div>Beds: {room.beds}</div>
                                </div>
                                <div className="item">People: {room.people}</div>
                                <div className="item price text-right">
                                    <span className="line-through">€400</span>
                                    €{room.price}
                            </div>
                            </div>
                        </div>
                      </div>
                    );
                    })}
                </div>
        </div>

        {/* <!-- SIDEBAR --> */}
        <div className="col-md-4 sidebar">

            <div className="card">
                <h2>Reservation Summary</h2>
                <div className="clearfix">
                    <h5 className="pull-left">{this.state.chosenRoom}</h5>
                    <div className="form-group pull-right">
                        <select className="pull-right" id="rooms">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                        </select>
                    </div>
                </div>

                <div className="clearfix">

                    <div className="card-content">
                        <p className="main">Check in</p>
                        <p className="base">From 15.00h</p>
                    </div>

                    <div className="card-content">
                        <p className="main">Check out</p>
                        <p className="base">Before 12.00h</p>
                    </div>

                    <div className="card-content">
                        <p className="main">Reservation date</p>
                        <p className="base">From <strong><span id="checkin-summary">{this.state.checkin}</span></strong> to <strong id="checkout-summary">{this.state.checkout}</strong></p>
                    </div>

                    <div className="card-content">
                        <p className="main">People</p>
                        <p className="base" id="adults-summary">{this.state.adults < 2 ? this.state.adults + " adult" : this.state.adults + " adults"}</p>
                        <p className="base" id="children-summary">{this.state.children < 2 ? this.state.children + " child" : this.state.children + " children"}</p>
                    </div>

                    <div className="card-checkout clearfix">
                        <div className="left pull-left">
                            <p className="main">Total</p>
                            <p className="base"><a href="#">Price details</a></p>
                        </div>
                        <div className="right pull-right">
                            <p className="main">€ {this.state.discountPrice ? 
                            <span className="line-through">{this.state.chosenRoomPrice}</span> : this.state.chosenRoomPrice}</p>
                            <p className="main">{this.state.discountPrice ? "€ " + this.state.discountPrice : null}</p>
                        </div>
                    </div>
                    
                      <div className="form-group">
                        <label for="promoCode">Please enter your promo code</label>
                        <input id="promo_code" type="text" className="form-control" onChange={e => this.handleInput(e)}/>
                        <button type="submit" className="btn btn-secondary" onClick={() => this.handlePromoCode()}>Validate</button>
                        
                      </div>
                      <span>{this.state.validation ? null : "Incorrect Promo code"}</span>
                    
                    <button type="button" className="btn btn-primary btn-group-justified" onClick={() => this.handleShow()}>
                    Save
                    </button>
                </div>
            </div>


        </div>
    </div>
</div>


<footer className="footer">

    <span className="ico ico-logo"></span>
    <span className="ico ico-social"></span>

    <div className="text-left col-left">
        <ul className="inline-block">
            <li>
                <a href="#">Terms & Conditions</a>
            </li>
            <li>
                <a href="#">Privacy Policy</a>
            </li>
            <li>
                <a href="#">About Us</a>
            </li>
            <li>
                <a href="#">Partners</a>
            </li>
        </ul>
    </div>
    <div className="text-right col-right">
        <ul className="inline-block">
            <li className="link">
                <a href="#">reservations@loscocosbungalows.com</a>
            </li>
            <li className="link">
                <a href="#">Tlf: +34 987 675 432</a>
            </li>
        </ul>
    </div>

</footer>

{/* Modal */}
                <Modal
                    centered
                    style={{opacity:1}}
                    show={this.state.show}
                    onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Congratulations</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Your room has been booked!</Modal.Body>
                    <Modal.Footer>
                    <button variant="secondary" onClick={this.handleClose}>Proceed to payment</button>
                    </Modal.Footer>
                </Modal>

      </div>
    )
  }
}
