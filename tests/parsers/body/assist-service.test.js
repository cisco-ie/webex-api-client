import test from 'ava';
import assistService from '../../../src/parsers/body/assist-service';

test('AssistService Parser', t => {
	const result = assistService({
		assistRequest: 'None'
	});

	t.deepEqual(result, {assistRequest: 'None'});
});

test('Validate assistRequest', t => {
	const error = t.throws(() =>
		assistService({
			assistRequest: 'Nonz'
		})
	);

	t.is(error.message, 'Expected a valid type (None, Dry Run, Consult, Live Event Support, Audio Streaming, Video), received Nonz');
});

test('Validate assistConfirm', t => {
	const error = t.throws(() =>
		assistService({
			assistConfirm: 'Pendz'
		})
	);

	t.is(error.message, 'Expected a valid type (Pending, Confirmed, Cancelled), received Pendz');
});
