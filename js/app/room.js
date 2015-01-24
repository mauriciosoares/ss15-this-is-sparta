(function(root, $) {

  var defaults = {
    editor: {}
  };

  function Room(options) {
    this.options = options;
    this.editor;

    this.prepare();
  }

  Room.prototype.prepare = function() {

    this.configEditor();
  };

  Room.prototype.configEditor = function() {
    var editor = ace.edit(this.options.editor.el);

    editor.setTheme(this.options.editor.theme);
    editor.session.setMode(this.options.editor.mode);
    editor.setOptions(this.options.editor.options);
    editor.$blockScrolling = this.options.editor.$blockScrolling;

    this.editor = editor;
  };

  root.Room = Room;

} (window.App, jQuery));