import React, { Component } from 'react';
import Moment from 'react-moment'; 
import '../css/CryptoCurrency.css';

const Banner = (currency) => {
    return(
      <section className="banner">
        <div className="container">
          <div className="banner-image">
            <img src={currency.imageBackground} alt="" />
          </div>
          <div className="banner-content">
            <div className="banner-title">
              <img src={currency.imageIcon} alt="{currency.name} icon" />
              <h1>{currency.name}</h1>
            </div>
            <p>{currency.description}</p>
          </div>
        </div>
      </section>
    );
};

const Quotes = (quote) => {
   return(
      <tr>
        <td><Moment format="HH:mm A" parse="HHmm">{quote.time}</Moment></td>
        <td>${quote.price}</td>
      </tr>
    );
}

const MarketTable = (currency) => {
    if (Object.keys(currency).length !== 0 ) {
      return(
        <section className="cryptocurrency-market">
          <div className="container">
            
            <h3>Market</h3>
            <p>Last update: <Moment format="DD/MM/YYYY" parse="YYYY/MM/DD">{currency.date}</Moment></p>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Time</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {currency.quotes.map((quote,i) => <Quotes key={i} {...quote}/>)}
              </tbody>
            </table>
          </div>
        </section>
      );
    } else {
      return <h3>Loading...</h3>;
    }
    
};


class CryptoCurrency extends Component {


  //filters the array returning the object that matches the page currency id
  getCurrencyInfo() {
    return this.state.currenciesInfo.filter(el => el.currency === this.state.currencyId)[0]
  }

  //filters the array returning the object that matches the page currency id
  getCurrencyData() {
    return this.state.currenciesData.filter(el => el.currency === this.state.currencyId)[0]
  }

  //returns the currency data into one object
  getCurrencyDetails() {
    return {...this.getCurrencyInfo(), ...this.getCurrencyData() }
  }

  constructor(props) {
    super();
    this.state = {
      currenciesInfo: props.currenciesInfo,
      currenciesData: props.currenciesData,
      currencyId: props.currencyId
    };
    this.state.currencyData = this.getCurrencyDetails();
  }


  render() {
    return (
      <div className="cryptocurrency">
        <Banner {...this.state.currencyData} />
        <MarketTable {...this.state.currencyData}/>
        <div className="d-block text-center"><a href="/">Back</a></div>
      </div>
    );
  }
}

export default CryptoCurrency;