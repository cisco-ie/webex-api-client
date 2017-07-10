import test from 'ava';
import supportCenter from '../supportCenter';

test('Valid throw error', t => {

	/*const elements = {
		orderTabs : [{"tab":["Title","Great"]}],
		serviceDesk : {enable:"True"}
	}*/

	//const elements = {"supportCenter":{"orderTabs":[{"tab":["Title","Great"]}],"serviceDesk":[{"enable":["True"]}]}}

	const elements = {
		orderTabs : ["Tools","Desktop","Application","session","Period"],
		serviceDesk : true
	}

	const result = t.throws(() => supportCenter(elements));


	t.is(result.message, 'Max 4 tabs allowed in orderTabs');

});
