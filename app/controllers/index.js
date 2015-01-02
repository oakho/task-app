import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['createdAt'],
  sortAscending: false,

  arrangedContent: function() {
    var arrangedContent = this._super();

    arrangedContent = arrangedContent.filter(function(task) {
      return !task.get('isNew');
    });

    return arrangedContent;
  }.property('content', 'content.@each.isNew', 'sortProperties.@each'),

  resetPendingTask: function() {
    this.set('pendingTask', this.store.createRecord('task', { label: '' }));
  },

  actions: {
    didCreateTask: function(/* task */) {
      this.resetPendingTask();
    }
  }
});
