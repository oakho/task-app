import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  doneInputId: function() {
    return 'task-done-input-'+ this.get('content.id');
  }.property('content.id'),

  change: function() {
    this.sendAction();
  }
});
