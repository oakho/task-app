import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['createdAt'],
  sortAscending: false,

  pending: null,

  filteredContent: function() {
    var filteredContent = this.get('arrangedContent');

    filteredContent = filteredContent.filter(function(task) {
      return !task.get('isNew');
    });

    return filteredContent;
  }.property('arrangedContent', 'arrangedContent.@each'),

  newPendingTask: function() {
    this.set('pending', this.store.createRecord('task', {
      label: '',
      owner: this.guid
    }));
  },

  actions: {
    didSubmitPendingTask: function(/* task */) {
      this.newPendingTask();
    },
    didStartTaskEdit: function(task) {
      task.lock(this.guid);
      task.save();
    },
    didEndTaskEdit: function(task) {
      task.unlock();
      task.save();
    },
    didSubmitTask: Ember.K,
    didCancelTask: Ember.K
  }
});
