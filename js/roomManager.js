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
    return this.firebase.push({
      subject: data.subject,
      password: data.password
    });
  };

  RoomManager.prototype.onSubmit = function (event) {
    event && event.preventDefault();

    var subject = this.getValue('subject'),
        password = this.getValue('password') || null,
        response;

    if (!_.isUndefined(subject)) {
      response = this.creteRoom({
        subject: subject,
        password: password
      });

      this.goToRoom(response.key());
    }
  };

  RoomManager.prototype.goToRoom = function (roomId) {
    window.location = 'room.html?' + roomId;
  };

  RoomManager.prototype.onAddRoom = function (subject) {
    var values = subject.val(),
        room,
        users;

    users = this.getUsers(values.users_developer) + this.getUsers(values.users_watch);

    // this.firebase.chid(subject.key()).child('users_developer').on('child_added', function () {
    //   console.log('on room add');
    // });

    room = new RoomElement({
      key: subject.key(),
      subject: values.subject,
      hasPassword: !!values.password,
      password: values.password,
      template: this.options.roomTemplate,
      usersReference: this.getUserReference(subject.key()),
      submit: subject,
      users: users
    });

    this.elements.$rooms.find(this.options.loader).remove();
    this.elements.$rooms.append(room.el);

  };

  RoomManager.prototype.getUserReference = function (key) {
    return this.firebase.child(key).child('users_developer');
  };

  RoomManager.prototype.getUsers = function (obj) {
    try {
      return Object.keys(obj).length;
    } catch (e) {
      return 0;
    }
  };

  root.RoomManager = RoomManager;

} (window, jQuery));
