import DS from 'ember-data';

export default DS.Model.extend({
  label: DS.attr('string'),
  locker: DS.attr('string'),
  owner: DS.attr('string'),
  private: DS.attr('boolean'),
  done: DS.attr('boolean'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
