import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('task');
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.newPendingTask();
  }
});
