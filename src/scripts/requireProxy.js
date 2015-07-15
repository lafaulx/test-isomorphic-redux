module.exports = (module) => {
  switch (module) {
  case 'react':
    return require('react');
  case 'update':
    return require('react/lib/update');
  case 'immutable':
    return require('immutable');
  default:
    throw new Error(`Module "${module}" not defined for external require in requireProxy`);
  }
};
