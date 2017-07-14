import test from 'ava';
import supportCenter from '../../../src/parsers/body/support-center';

test('Support Center', t => {
	const elements = {
		orderTabs: ['Tools', 'Desktop', 'Application'],
		serviceDesk: true
	};
	const result = supportCenter(elements);
	const expected = {
		orderTabs: [
			{
				tab: ['Tools', 'Desktop', 'Application']
			}
		],
		serviceDesk: {
			enable: true
		}
	};
	t.deepEqual(result, expected);
});

test('Valid throw tabs error', t => {
	const elements = {
		orderTabs: ['Tools', 'Desktop', 'Application', 'Session'],
		serviceDesk: 'True'
	};
	const result = t.throws(() => supportCenter(elements));
	t.is(result.message, `Expected serviceDesk to be of type boolean, received ${typeof (elements.serviceDesk)}`);
});

test('Valid throw boolean error', t => {
	const elements = {
		orderTabs: ['Tools', 'Desktop', 'Application', 'Session', 'Period'],
		serviceDesk: true
	};
	const result = t.throws(() => supportCenter(elements));
	t.is(result.message, `Expected maximum number of tabs to be 4, received ${elements.orderTabs.length}`);
});
