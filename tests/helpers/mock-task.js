import Ember from 'ember';

function mockTask(attrs) {
  var defaultAttrs = {
    id: 1,
    label: '',
    private: false,
    done: false,
    owner: null,
    locker: null,
    save: function() {
      var self = this;
      return new Ember.RSVP.Promise(function(resolve) {
        resolve(self);
      });
    },
    rollback: Ember.K
  };

  if(!attrs) {
    attrs = {};
  }

  return Ember.Object.create(defaultAttrs, attrs);
}

export default mockTask;
