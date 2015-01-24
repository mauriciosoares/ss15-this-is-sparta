(function(root, $) {

  var defaults = {
    editor: {}
  };

  function Room(options) {
    this.options = options;
    this.position = {};
    this.editor;

    this.prepare();
  }

  Room.prototype.prepare = function() {
    this.room = this.getRoom();
    // this.fb = new Firebase(this.options.conn + this.room);

    this.configEditor();
    this.aceInput = document.querySelector(this.options.editor.input);

    this.bind();

  };

  Room.prototype.bind = function() {
    this.fb.on('value', this.fbValue.bind(this));

    this.aceInput.addEventListener('keyup', this.onAceKeyup.bind(this));
  };

  Room.prototype.fbValue = function(data) {
    this.editor.setValue(data.val().code);
    this.editor.gotoLine(this.position.row + 1 || 1, this.position.column || 0);
  };

  Room.prototype.onAceKeyup = function() {
    this.position = this.editor.getCursorPosition();

    this.fb.update({
      code: this.editor.getValue()
    });
  };

  Room.prototype.configEditor = function() {
    var editor = ace.edit(this.options.editor.el);

    editor.setTheme(this.options.editor.theme);
    editor.session.setMode(this.options.editor.mode);
    editor.setOptions(this.options.editor.options);
    editor.$blockScrolling = this.options.editor.$blockScrolling;

    this.editor = editor;
  };

  Room.prototype.getRoom = function() {
    var room = location.search && location.search.split('?')[1];

    if(!room) {
      window.location = '/';
    }

    return room;
  };

  root.Room = Room;

} (window.App, jQuery));