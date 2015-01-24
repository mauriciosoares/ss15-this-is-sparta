;(function (root, $) {

  var defaults = {

  };

  function RoomManager (options) {
    this.options = _.extend({}, defaults, options);
    this.prepare();
    this.bind();
  }

  RoomManager.prototype.prepare = function () {
    this.firebase = new Firebase(this.options.connection);
    this.reference = this.firebase.child(this.options.reference);

    this.elements = {};
    this.elements.$rooms = $(this.options.roomsEl);
    this.elements.$form = $(this.options.formEl);
  };

  RoomManager.prototype.bind = function () {
    this.firebase.on('child_added', this.onAddRoom.bind(this));
    this.elements.$form.on('submit', this.onSubmit.bind(this));
  };

  RoomManager.prototype.getValue = function (name) {
    var value = this.elements.$form.find('[name="' + name + '"]')
      .val()
      .trim();

    this.clearValue(name);

    return value;
  };

  RoomManager.prototype.clearValue = function (name) {
    $('[name="' + name+ '"]').val('');
  };

  RoomManager.prototype.creteRoom = function (data) {
    this.firebase.push({
      subject: data.subject,
      password: data.password
    });
  };

  RoomManager.prototype.onSubmit = function (event) {
    event && event.preventDefault();

    var subject = this.getValue('subject'),
        password = this.getValue('password') || null;

    if (!_.isUndefined(subject)) {
      this.creteRoom({
        subject: subject,
        password: password
      });
    }
  };

  RoomManager.prototype.onAddRoom = function (subject) {
    var values = subject.val(),
        room;

    room = new RoomElement({
      subject: values.subject,
      hasPassword: !values.password,
      template: '#room-element'
    });

    this.elements.$rooms.append(room.el);

  };

  root.RoomManager = RoomManager;

} (window, jQuery));
