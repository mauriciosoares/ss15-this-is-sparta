(function(room, $) {

  var defaults = {};

  function Room(options) {
    this.prepare();
  }

  Room.prototype.prepare = function() {

    this.configEditor();
  };

  Room.prototype.configEditor = function() {

  };

} (window.App, jQuery));