// Generate a rfc4122 compliant guid
// see : http://stackoverflow.com/a/2117523
function generate() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

export function initialize(container, application) {
  var guid = window.localStorage.getItem('guid');

  if(!guid) {
    guid = generate();
    window.localStorage.setItem('guid', guid);
  }

  container.register('guid:main', guid, { singleton: true, instantiate: false });
  application.inject('route', 'guid', 'guid:main');
  application.inject('controller', 'guid', 'guid:main');
}

export default {
  name: 'guid',
  initialize: initialize
};
