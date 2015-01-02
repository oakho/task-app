import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  label: DS.attr('string'),
  locker: DS.attr('string'),
  owner: DS.attr('string'),
  private: DS.attr('boolean'),
  done: DS.attr('boolean'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  isLocked: Ember.computed.bool('locker'),

  isLocker: function(locker) {
    return this.get('locker') === locker;
  },
  lock: function(locker) {
    this.set('locker', locker);
  },
  unlock: function() {
    this.set('locker', null);
  }
});
