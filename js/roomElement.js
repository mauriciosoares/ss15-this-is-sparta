;(function (root, $) {

  var defaults = {
    users: 0
  };

  function RoomElement (options) {
    this.options = _.extend({}, defaults, options);
    this.prepare();
    this.bind();
  }

  RoomElement.prototype.prepare = function () {
    this.template = _.template($(this.options.template).html());
    this.$el = $('<li />');
    this.el = this.$el[0];
    this.users = 0;
    this.render();
  };

  RoomElement.prototype.render = function () {
    this.$el.html(this.template(this.options));
  };

  RoomElement.prototype.bind = function () {
    this.options.usersReference.on('child_added', this.onUserAdd.bind(this));
    this.options.usersReference.on('child_removed', this.onUserRemoved.bind(this));
  };

  RoomElement.prototype.onUserAdd = function () {
    this.options.users++;
    this.render();
  };

  RoomElement.prototype.onUserRemoved = function () {
    this.options.users--;
    this.render();
  };

  root.RoomElement = RoomElement;

} (window, jQuery));
