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

  isPublic: Ember.computed.not('private'),
  isPrivate: Ember.computed.alias('private'),
  isLocked: Ember.computed.bool('locker'),

  lock: function(locker) {
    this.set('locker', locker);
  },
  unlock: function() {
    this.set('locker', null);
  },
  isLocker: function(locker) {
    return this.get('locker') === locker;
  },
  isOwner: function(owner) {
    return this.get('owner') === owner;
  }
});
