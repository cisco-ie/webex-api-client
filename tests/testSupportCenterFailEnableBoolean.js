import test from 'ava';
import supportCenter from '../supportCenter';

test('Valid throw error', t => {

	const elements = {
		orderTabs : ["Tools","Desktop","Application","Session"],
		serviceDesk : "True"
	}

	const result = t.throws(() => supportCenter(elements));


	t.is(result.message, `A boolean value should be provided`);

});
