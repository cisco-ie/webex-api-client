import test from 'ava';
import supportCenter from '../supportCenter';

test('Support Center', t => {

	//const elements = {"supportCenter":{"orderTabs":[{"tab":["Title","Great"]}],"serviceDesk":[{"enable":["True"]}]}}

	const elements = {
		orderTabs : ["Tools","Desktop","Application"],
		serviceDesk : true
	}

	const result = supportCenter(elements);
	const expected = '<supportCenter><orderTabs><tab>Tools</tab><tab>Desktop</tab><tab>Application</tab></orderTabs><serviceDesk><enable>True</enable></serviceDesk></supportCenter>';

	t.is(result, expected);

});
