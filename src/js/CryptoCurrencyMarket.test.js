import React from 'react';
import ReactDOM from 'react-dom';
import CryptoCurrencyMarket from './CryptoCurrencyMarket';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter()});

const state = {
	currenciesInfo: [{
                      currency: 'LTC',
                      name: 'Litecoin',
                      description: 'Litecoin is a peer-to-peer cryptocurrency and open source software project released under the MIT/X11 license. Creation and transfer of coins is based on an open source cryptographic protocol and is not managed by any central authority.',
                      imageLogo: '/assets/images/Litecoin-Logo.png',
                      imageBackground: '/assets/images/Litecoin-Background.png',
                      imageIcon: '/assets/images/Litecoin-Icon.svg'
                    }],
    currenciesData: [{
						"currency": "LTC",
						"date": "20180507",
						"quotes": [{
							"time": "0930",
							"price": "14.32"
						}, {
							"time": "1115",
							"price": "14.87"
						}, {
							"time": "1245",
							"price": "15.03"
						}, {
							"time": "1400",
							"price": "14.76"
						}, {
							"time": "1700",
							"price": "14.15"
						}]
					}]
};

describe('CryptoCurrencyMarket', () => {
	
	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<CryptoCurrencyMarket {...state} />, div);
	  ReactDOM.unmountComponentAtNode(div);
	});

	describe('when the Header is rendered', () => {
		let wrapper;
		beforeAll(() => {
			wrapper = mount(<CryptoCurrencyMarket {...state} />);
		});
		it('should have the header component with a H1 heading', () => {
			expect(wrapper.find('header.cryptocurrency-market-header h1').exists()).toBe(true);
		})
	});

	describe('when the CurrencyList is rendered', () => {
		let wrapper;
		beforeAll(() => {
			wrapper = mount(<CryptoCurrencyMarket {...state} />);
		});
		it('should have the card component with an imageLogo', () => {
			expect(wrapper.find('div.cryptocurrency-market-list .card-image img').props().src).toBe('/assets/images/Litecoin-Logo.png');
		})
	});

	describe('when the ProfitSection is rendered', () => {
		let wrapper;
		beforeAll(() => {
			wrapper = mount(<CryptoCurrencyMarket {...state} />);
		});
		it('should have the currency data table', () => {
			expect(wrapper.find('div.cryptocurrency-market-profit-table table').exists()).toBe(true);
		})
		it('should have the currency name LTC', () => {
			expect(wrapper.find('div.cryptocurrency-market-profit-table table thead tr th').text()).toBe('LTC');
		})
	});

});