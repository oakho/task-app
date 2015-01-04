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

  initStates: function() {
    //
    // This prevents a currently edited task-show component from loosing
    // it's isEditing state when it is rerendered before editEnd is triggered.
    //
    // This mostly happens when another client create or updates a task.
    //
    if(this.get('content').isLocker(this.get('viewer'))) {
      this.set('isEditing', true);
    }
  }.on('init'),

  send: function() {
    // Prevents any action to be sent while task is locked
    if(!this.get('isLocked')) {
      this._super.apply(this, arguments);
    }
  },

  actions: {
    editStart: function() {
      this.set('isEditing', true);
      this.sendAction('editStart', this.get('content'));
    },

    editEnd: function() {
      this.set('isEditing', false);
      this.sendAction('editEnd', this.get('content'));
    },

    done: function() {
      this.sendAction('done', this.get('content'));
    },

    delete: function() {
      this.sendAction('delete', this.get('content'));
    }
  }
});
