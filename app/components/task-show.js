import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['task'],
  classNameBindings: [
    'isEditing:task-editing',
    'content.done:task-done'
  ],

  isEditing: false,

  actions: {
    start: function() {
      this.set('isEditing', true);
    },
    end: function() {
      this.set('isEditing', false);
    }
  }
});
