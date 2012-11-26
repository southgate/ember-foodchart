FoodChart.peopleController = Ember.ArrayController.create({
  content: [],

  createPerson: function(name) {
    var person = FoodChart.Person.create({ name: name });
    this.pushObject(person);
  },

  isBalanced: function() {
    var people = this.get('content');
    var sum = people.reduce(function(previousValue, item) {
      return previousValue + item.get('balance');
    }, 0);

    return sum === 0;
  }.property('@each.balance'),
});

FoodChart.NewPersonView = Ember.TextField.extend({
  insertNewline: function() {
    var name = this.get('value');

    if (name) {
      FoodChart.peopleController.createPerson(name);
      this.set('value', '');
    }
  }
});

FoodChart.PersonView = Ember.View.extend({
  tagName: 'tr',

  incrementBalance: function() {
    var person = this.get('person');
    person.increment();
  },

  decrementBalance: function() {
    var person = this.get('person');
    person.decrement();
  },

  destroy: function() {
    var person = this.get('person');
    FoodChart.peopleController.removeObject(person);
  },

  canDestroy: function() {
    var person = this.get('person');
    return person.balance === 0 && FoodChart.peopleController.isBalanced;
  }.property('balance')
});

var MainView = Ember.View.create({
  templateName: 'main_view',
}).appendTo('#ember-skeleton');
