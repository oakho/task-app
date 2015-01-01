import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['task-date'],

  createdAt: null,
  createdText: 'created %@',

  updatedAt: null,
  updatedText: 'updated %@',

  isUpdated: function() {
    return !!this.get('updatedAt');
  }.property('createdAt', 'updatedAt'),

  formattedText: function() {
    var property = this.get('isUpdated') ? 'updated' : 'created',
        date     = this.get(property +'At'),
        text     = this.get(property +'Text');

    return text.fmt(moment(date).fromNow());
  }.property('isUpdated')
});
