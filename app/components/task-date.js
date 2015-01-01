import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['task-date'],

  createdAt: null,
  createdText: 'created %@',

  updatedAt: null,
  updatedText: 'updated %@',

  nextTick: null,

  isUpdated: function() {
    return !!this.get('updatedAt');
  }.property('createdAt', 'updatedAt'),

  formattedText: function() {
    var property = this.get('isUpdated') ? 'updated' : 'created',
        date     = this.get(property +'At'),
        text     = this.get(property +'Text');

    return text.fmt(moment(date).fromNow());
  }.property('isUpdated'),

  tick: function() {
    var tick = Ember.run.later(this, function() {
      this.notifyPropertyChange('formattedText');
      this.tick();
    }, 1000);

    this.set('nextTick', tick);
  },

  startTick: function() {
    this.tick();
  }.on('didInsertElement'),

  endTick: function() {
    Ember.run.cancel(this.get('nextTick'));
  }.on('willDestroyElement')
});
