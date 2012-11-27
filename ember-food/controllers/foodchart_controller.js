FoodChart.peopleController = Ember.ArrayController.create({
  content: [],
  name: '',

  createPerson: function() {
    var name = this.get('name');
    if (name) {
      var person = FoodChart.Person.create({ name: name });
      this.pushObject(person);
    }
  },

  isBalanced: function() {
    var people = this.get('content');
    var sum = people.reduce(function(previousValue, item) {
      return previousValue + item.get('balance');
    }, 0);

    return sum === 0;
  }.property('@each.balance'),
});

FoodChart.NewPersonView = Ember.TextField.extend(Ember.TargetActionSupport, {
  valueBinding: 'FoodChart.peopleController.name',

  insertNewline: function() {
    this.triggerAction();
    this.set('value', '');
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
});

var MainView = Ember.View.create({
  templateName: 'main_view',
}).appendTo('#ember-skeleton');
