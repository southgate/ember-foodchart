FoodChart.personsController = Ember.ArrayController.create({
  content: [],

  createPerson: function(name) {
    var person = FoodChart.Person.create({ name: name });
    this.pushObject(person);
  },
});

FoodChart.NewPersonView = Ember.TextField.extend({
  insertNewline: function() {
    var name = this.get('value');

    if (name) {
      FoodChart.personsController.createPerson(name);
      this.set('value', '');
    }
  }
});

FoodChart.PersonView = Ember.View.extend({
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
    FoodChart.personsController.removeObject(person);
  }
});

var MainView = Ember.View.create({
  templateName: 'main_view',
}).appendTo('#ember-skeleton');
