require('./vico.less');
const all = require('./index');

module.exports = all.Vico;
for (const key of Object.keys(all)) {
  module.exports[key] = all[key];
}
