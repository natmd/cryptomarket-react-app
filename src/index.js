import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import CryptoCurrencyMarket from './js/CryptoCurrencyMarket';
import CryptoCurrency from './js/CryptoCurrency';
import * as serviceWorker from './serviceWorker';
import './css/vendor/bootstrap.min.css';
import currenciesInfo from './js/Constants';

let state = currenciesInfo;   

const Home = () => {
	return <CryptoCurrencyMarket  {...state} />;
}

const CurrencyPage = ( { match } ) => {
	return <CryptoCurrency {...state} currencyId={match.params.currencyId} />;
}

//react render() will render the elements into the DOM
function render() {
	ReactDOM.render(
		<BrowserRouter>
			<React.Fragment>
				<Route exact path="/" component={Home}/>
				<Route path="/cryptocurrency/:currencyId" component={CurrencyPage}/>
			</React.Fragment>
		</BrowserRouter>, document.getElementById('root'));
}

//request the json file and add the response to state object currenciesData
//async - ensures that the function returns a promise
//await - wait until the promise returns a result
async function loadData () {
	state.currenciesData = await fetch('/assets/data/20180507.json')
                					.then(response => response.json());
}

//This function will make sure the loadData() will be executed before render()
async function startApp() {

  await loadData();
  render();

}

startApp(); 

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
