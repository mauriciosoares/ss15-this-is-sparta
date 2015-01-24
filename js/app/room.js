(function(root, $) {

  var defaults = {
    editor: {}
  };

  function Room(options) {
    this.options = options;

    this.prepare();
  }

  Room.prototype.prepare = function() {

    this.configEditor();
  };

  Room.prototype.configEditor = function() {
    var editor = ace.edit(this.options.editor.el);
  };

  root.Room = Room;

} (window.App, jQuery));