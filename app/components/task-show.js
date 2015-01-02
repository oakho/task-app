import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['task'],
  classNameBindings: [
    'isEditing:task-editing',
    'content.done:task-done',
    'isLocked:task-locked'
  ],

  viewer: null,

  isEditing: false,
  isLocked: function() {
    var task = this.get('content');
    return task && task.get('isLocked') && !task.isLocker(this.get('viewer'));
  }.property('content.isLocked', 'content.locker'),

  actions: {
    editStart: function() {
      if(!this.get('isLocked')) {
        this.set('isEditing', true);
        this.sendAction('editStart', this.get('content'));
      }
    },

    editEnd: function() {
      this.set('isEditing', false);
      this.sendAction('editEnd', this.get('content'));
    }
  }
});
