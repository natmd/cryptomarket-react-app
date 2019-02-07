import React from 'react';
import ReactDOM from 'react-dom';
import CryptoCurrency from './CryptoCurrency';
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

describe('CryptoCurrency', () => {
	
	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<CryptoCurrency {...state} currencyId="LTC"/>, div);
	  ReactDOM.unmountComponentAtNode(div);
	});

	describe('when the Banner is rendered', () => {
		let wrapper;
		beforeAll(() => {
			wrapper = mount(<CryptoCurrency {...state} currencyId="LTC" />);
		});
		it('should have the banner component with a H1 heading', () => {
			expect(wrapper.find('div.cryptocurrency .banner h1').exists()).toBe(true);
		})

		it('should have the h1 heading with Litecoin', () => {
			expect(wrapper.find('div.cryptocurrency .banner h1').text()).toBe('Litecoin');
		})
	});

	describe('when the MarketTable is rendered', () => {
		let wrapper;
		beforeAll(() => {
			wrapper = mount(<CryptoCurrency {...state} currencyId="LTC" />);
		});
		it('should have the table with the latest quotes', () => {
			expect(wrapper.find('section.cryptocurrency-market table').exists()).toBe(true);
		})

		it('should have the first time from state object in the first row of time column', () => {
			expect(wrapper.find('section.cryptocurrency-market table tr td').first().text()).toBe('09:30 AM');
		})
	});

});
