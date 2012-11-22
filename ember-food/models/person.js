FoodChart.Person = Ember.Object.extend({
  name: null,
  balance: 0,

  increment: function() {
    this.set('balance', this.get('balance') + 1);
  },

  decrement: function() {
    this.set('balance', this.get('balance') - 1);
  }
});
