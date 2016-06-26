require('./writer.less');
const all = require('./index');

module.exports = all.Writer;
for (const key of Object.keys(all)) {
  module.exports[key] = all[key];
}
