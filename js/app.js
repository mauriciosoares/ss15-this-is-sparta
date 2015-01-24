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
    this.elements.$roomsEl = $(this.options.roomsEl);
    this.elements.$formEl = $(this.options.formEl);
  };

  RoomManager.prototype.bind = function () {
    this.firebase.on('child_added', function () {
      console.log('on add');
    });

    this.elements.$formEl.on('submit', this.onSubmit.bind(this));
  };

  RoomManager.prototype.onSubmit = function (event) {
    event && event.preventDefault();

    var subject = this.getSubject();

    console.log('yesssssssssssssssssssssssssssssss', subject);
  };

  RoomManager.prototype.getSubject = function () {
    var name = 'subject',
      value = this.elements.$formEl.find('[name="' + name + '"]')
        .val()
        .trim();

    this.clearValue(name);

    return value;
  };

  RoomManager.prototype.clearValue = function (name) {
    $('[name="' + name+ '"]').val('');
  };

  root.RoomManager = RoomManager;

} (window, jQuery));
