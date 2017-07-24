import test from 'ava';
import tracking from '../../../src/parsers/body/tracking';

test('Tracking Parser', t => {
	const elements = ['1', 'code231', 'code4516', '3'];
	const result = tracking(elements);
	const expected = {
		trackingCode1: '1',
		trackingCode2: 'code231',
		trackingCode3: 'code4516',
		trackingCode4: '3'
	};
	t.deepEqual(result, expected);
});

test('Valid arrays error', t => {
	// Insert blank object
	const error = t.throws(() => tracking({}));
	t.is(error.message, 'Expected tracking to be an array, receieved object');
});

test('Valid length', t => {
	const error = t.throws(() => tracking(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']));
	t.is(error.message, 'Expected tracking length to be 10 or less, received 11');
});

test('Valid tracking type', t => {
	const errorType = t.throws(() => tracking([{}, 'code1']));
	t.is(errorType.message, 'Expected tracking item to be a string, received a object');

	const LONGER_STRING = 'Ppby2DgRz5O31cuDaYHiEUPHLHcEwenvuC8Ve2u4Z2knGb7Cie5wcS1j2rA2xsjBCsZ7YHsCrf5tpnQcgzJbaavOlWKDg0DrKoFG4MovenqvWSi51lUnUNHtvP6SoLM9u';
	const errorLength = t.throws(() => tracking([LONGER_STRING]));
	t.is(errorLength.message, 'Expected tracking item to be 128 characters or less, received 129 characters');
});
