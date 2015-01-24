;(function (root, $) {

  var defaults = {

  };

  function RoomElement (options) {
    this.options = _.extend({}, defaults, options);
    this.prepare();
    this.bind();
  }

  RoomElement.prototype.prepare = function () {
    this.$el = $('<li />', {
      text: this.options.subject
    });

    this.el = this.$el[0];
  };

  RoomElement.prototype.bind = function () {

  };

  root.RoomElement = RoomElement;

} (window, jQuery));
