const concurrently = require('concurrently');

concurrently([
  "RAILS_ENV=cypress bin/webpack && npx cypress open",
], {
  prefix: 'name',
  killOthers: ['failure', 'success'],
}).then(
    function onSuccess(_) {
      // This code is necessary to make sure the parent terminates 
      // when the application is closed successfully.
      process.exit();
    },
    function onFailure(_) {
      // This code is necessary to make sure the parent terminates 
      // when the application is closed because of a failure.
      process.exit();
    }
  );
