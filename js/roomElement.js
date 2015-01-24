;(function (root, $) {

  var defaults = {

  };

  function RoomElement (options) {
    this.options = _.extend({}, defaults, options);
    this.prepare();
  }

  RoomElement.prototype.prepare = function () {
    this.template = _.template($(this.options.template).html());
    this.$el = $('<li />', {
      text: this.options.subject
    });

    this.el = this.$el[0];

    this.render();
  };

  RoomElement.prototype.render = function () {
    this.$el.html(this.template(this.options));
  };

  root.RoomElement = RoomElement;

} (window, jQuery));
