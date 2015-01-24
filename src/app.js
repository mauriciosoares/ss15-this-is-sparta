;(function (root, $) {
  var defaults = {
  
  };

  function App (options) {
    this.options = _.extend({}, defaults, options);
    this.prepare();
    this.bind();
  }

  App.prototype.prepare = function () {

  };

  App.prototype.bind = function () {
  };

  root.App = App;

} (window, jQuery));
