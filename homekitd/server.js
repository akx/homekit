/* eslint-disable no-console */
const program = require('commander');

program
  .option('-p, --port <port>', 'Port to listen on', parseInt, 5000)
  .parse(process.argv);

const app = require('./app')();
app.listen(program.port, () => {
  console.log(`Serving on ${program.port}`);
});
