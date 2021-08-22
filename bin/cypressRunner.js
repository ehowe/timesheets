const concurrently = require('concurrently');
const { exec } = require('child_process')

concurrently([
  "npx cypress run",
], {
  prefix: 'name',
  killOthers: ['failure', 'success'],
}).then(
    function onSuccess(_) {
      // This code is necessary to make sure the parent terminates 
      // when the application is closed successfully.
      exec('npm run cleanup-cypress')
      process.exit();
    },
    function onFailure(_) {
      // This code is necessary to make sure the parent terminates 
      // when the application is closed because of a failure.
      exec('npm run cleanup-cypress')
      process.exit();
    }
  );
