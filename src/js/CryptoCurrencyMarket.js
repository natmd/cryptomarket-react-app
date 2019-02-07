import React, { Component } from 'react';
import Moment from 'react-moment'; 
import '../css/CryptoCurrencyMarket.css';

const Header = () => {
    return(
      <header className="cryptocurrency-market-header">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>Cryptocurrency Market</h1>
              <p>Top 3 Cryptocurrencies by Market Capitalization</p>
            </div>
          </div>
        </div>
      </header>
    );
};

const CurrencyCard = (props) => {

  return(
    <div className="cryptocurrency-market-list-item col-sm-12 col-md-6 col-lg-4">
      <div className="card">
        <div className="card-image">
          <a href={"/cryptocurrency/" + props.currency}>
            <img src={props.imageLogo} alt="{props.name} logo" />
          </a>
        </div>
        <div className="card-button">
          <a href={"/cryptocurrency/" + props.currency} className="btn btn-secondary" role="button">Check {props.name} market</a>        
        </div>
      </div>
    </div>

  );
};

const CurrencyList = (props) => {
    return(
      <div className="cryptocurrency-market-list">
        <div className="container">
          <div className="row">
            {props.currenciesInfo.map(currency => <CurrencyCard key={currency.currency} {...currency}/>)}
          </div>
        </div>
      </div>
    );
};

//reduces the array and returns the quote object with the maximum price
function getMaxPriceQuote(quotes) {
  return quotes.reduce((prev, current) => (prev.price > current.price) ? prev : current)
}

//reduces the array and returns the quote object with the minimum price
function getMinPriceQuote(quotes) {
  return quotes.reduce((prev, current) => (prev.price < current.price) ? prev : current)
}

//calculates the difference between the max price and the min price of the day, parses it to number and display only two decimals
function getProfitResult(quotes){
  let result = getMaxPriceQuote(quotes).price - getMinPriceQuote(quotes).price;
  return Number(result).toFixed(2);
}

const ProfitTable = (props) => {

  return(
    <table className="table table-bordered">
      <thead>
        <tr>
          <th className="text-center" colSpan="2">{props.currency}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th className="text-center" >Buy</th>
          <th className="text-center" >Sell</th>
        </tr>
        <tr>
          <td>${getMinPriceQuote(props.quotes).price}</td>
          <td>${getMaxPriceQuote(props.quotes).price}</td>
        </tr>
        <tr>
          <td><Moment format="HH:mmA" parse="HHmm">{getMinPriceQuote(props.quotes).time}</Moment></td>
          <td><Moment format="HH:mmA" parse="HHmm">{getMaxPriceQuote(props.quotes).time}</Moment></td>
        </tr>
        <tr>
          <th>Profit:</th>
          <td>${getProfitResult(props.quotes)}</td>
        </tr>
        <tr>
          <td colSpan="2" className="small">Update on <Moment format="DD/MM/YYYY" parse="YYYY/MM/DD">{props.date}</Moment></td>
        </tr>
      </tbody>
    </table>
  );

}

const ProfitSection = (props) => {
  if (typeof props.currenciesData != "undefined" && (props.currenciesData).length > -1 ) {
    return(
      <div className="cryptocurrency-market-profit-table">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xs-12">
              <h3>Market summary</h3>
            </div>
          </div>
          <div className="row justify-content-center">
            {props.currenciesData.map((currencyData,i) => <ProfitTable key={i} {...currencyData}/>)}
          </div>
        </div>
      </div>
    );
  } else {
    return "Loading..."
  }
};

class CryptoCurrencyMarket extends Component {

  constructor(props) {
    super();
    this.state = {
      currenciesInfo: props.currenciesInfo,
      currenciesData: props.currenciesData
    };
  }

  render() {
    return (
      <div className="cryptocurrency-market">
          <Header />
          <CurrencyList {...this.state} />
          <ProfitSection {...this.state} />
      </div>
    );


  }
}

export default CryptoCurrencyMarket;
