import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['createdAt'],
  sortAscending: false,

  pending: null,

  filteredContent: function() {
    var self = this,
        filteredContent = this.get('arrangedContent');

    filteredContent = filteredContent.filter(function(task) {
      return !task.get('isNew');
    });

    filteredContent = filteredContent.filter(function(task) {
      return task.get('isPublic') || (task.get('isPrivate') && (task.isOwner(self.guid) || task.isLocker(self.guid)));
    });

    return filteredContent;
  }.property('arrangedContent', 'arrangedContent.@each', 'arrangedContent.@each.private'),

  newPendingTask: function() {
    this.set('pending', this.store.createRecord('task', {
      label: '',
      owner: this.guid
    }));
  },

  actions: {
    didSubmitPendingTask: function(task) {
      var self = this;

      task.save().then(function() {
        self.newPendingTask();
      });
    },
    didStartTaskEdit: function(task) {
      task.lock(this.guid);
      task.save();
    },
    didEndTaskEdit: function(task) {
      task.unlock();
      task.save();
    },
    didSubmitTask: function(task) {
      task.save();
    },
    didCancelTask: function(task) {
      task.rollback();
      task.save();
    },
    deleteTask: function(task) {
      task.destroyRecord();
    }
  }
});
