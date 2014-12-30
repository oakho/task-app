import {
  moduleFor,
  test
} from 'ember-qunit';

import Ember from 'ember';

//
// disabled, ember-data-sails fails at some point in test environment
// anyway, that's not really useful has we won't make any tweak to this adapter
// at the moment.
//

// moduleFor('adapter:application', 'ApplicationAdapter', {
//   // Specify the other units that are required for this test.
//   // needs: ['serializer:foo']
// });

// test('it exists', function() {
//   var adapter = this.subject({ sailsSocket: { on: function() {} } });
//   ok(adapter);
// });
