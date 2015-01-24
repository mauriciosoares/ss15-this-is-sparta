;(function (root, $) {
  var defaults = {
  
  };

  function App (options) {
    this.options = _.extend({}, defaults, options);
    this.prepare();
    this.bind();
  }

  App.prototype.prepare = function () {
    this.firebase = new Firebase(this.options.connection);
    this.reference = this.firebase.child(this.options.reference);

    this.elements = {};
    this.elements.$roomsEl = $(this.options.roomsEl);
    this.elements.$formEl = $(this.options.formEl);
  };

  App.prototype.bind = function () {
    this.firebase.on('child_added', function () {
      console.log('on add');
    });

    this.elements.$formEl.on('submit', this.onSubmit.bind(this));
  };

  App.prototype.onSubmit = function (event) {
    event.preventDefault();

    console.log('on submit');
  };

  root.App = App;

} (window, jQuery));
