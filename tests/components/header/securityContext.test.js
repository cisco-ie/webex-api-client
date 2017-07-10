import test from 'ava';
import securityContext from '../../../components/header/securityContext';

test('Ensure sitename/siteid and email/webexid', t => {
  const errorSite = t.throws(() => securityContext({
    nothing: 'here'
  }));
  t.is(errorSite.message, 'Missing required keys: siteName or siteID');

  const errorUser = t.throws(() => securityContext({
    siteID: 'tester'
  }));
  t.is(errorUser.message, 'Missing required keys: email or webExID');

  const errorCreds = t.throws(() => securityContext({
    siteID: 'tester',
    email: 'test@test.com'
  }));
  t.is(errorCreds.message, 'Missing required keys: password or sessionTicket');
});

test('Build proper securityContext', t => {
  const xml = securityContext({
    siteID: 'test',
    email: 'test@test.com',
    password: '12345'
  });

  t.is(xml, '<securityContext><siteID>test</siteID><email>test@test.com</email><password>12345</password></securityContext>');
});
