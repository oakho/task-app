import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['task'],
  classNameBindings: [
    'isEditing:task-editing',
    'content.done:task-done'
  ],

  isEditing: false,

  actions: {
    editStart: function() {
      this.set('isEditing', true);
      this.sendAction('editStart', this.get('content'));
    },

    editEnd: function() {
      this.set('isEditing', false);
      this.sendAction('editEnd', this.get('content'));
    }
  }
});
