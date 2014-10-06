var $ = require("jquery")
  , Backbone = require('backbone')
  , Day = require('../collections/day')
  , Handlebars = require('handlebars');
Backbone.$ = $;

var HomeViews = {
  
  Body: Backbone.View.extend({

    initialize: function(){
    },

    el: function() { return $('#main-container') },

    render: function() {
      console.log("collection", this.collection)
      // this.$el.html(this.template());

      this.views = {
        header: new HomeViews.Header(),
        contentWrapper: new HomeViews.ContentWrapper(),
        splash: new HomeViews.Splash(),
        form: new HomeViews.Form(),
        years: new HomeViews.Years(),
        footer: new HomeViews.Footer()
      }

      this.$el.append(this.views.header.render().$el);
      this.$el.append(this.views.splash.render().$el);
      this.$el.append(this.views.contentWrapper.render().$el);
      this.views.contentWrapper.$el.append(this.views.years.render().$el)
      this.views.contentWrapper.$el.append(this.views.form.render().$el)
      this.$el.append(this.views.footer.$el);

      return this;
    }

    // template: require('../../templates/body')
  
  }),

  ContentWrapper: Backbone.View.extend({

    initialize: function(){
    },

    className: 'content-wrapper',

    render: function() {
      return this;
    }

  }),

  Splash: Backbone.View.extend({

    initialize: function() {
      // console.log("this", this)
      this.collection = new Day()
      this.collection.fetch()
      this.listenTo(this.collection, 'sync', this.render.bind(this) )
    },

    className: 'splash-container',

    template: function(attrs){
      return Handlebars.compile(require('../../templates/splash')())(attrs);
    },

    appendCovers: function() {
      if (!this.collection || this.collection.models.length == 0) { return this; }
      var self = this;
      this.collection.each(function(review){
        var imgSrc = review.get('cover')
        $('.covers').append('<img class="cover" src="'+imgSrc+'"/>');
      })
    },

    render: function() {
      var avg = this.collection ? this.collection.getAverage() : "";
      this.$el.html(this.template({
        date: this.collection.fmtDate(),
        scoreAverage: avg
      }));
      this.appendCovers();
      return this;
    },

  }),

  Form: Backbone.View.extend({

    className: 'ribbon l-box-lrg pure-g',

    template: require('../../templates/form'),

    render: function() {
      this.$el.html(this.template());
      return this;
    },

  }),

  Years: Backbone.View.extend({

    className: 'content',

    template: require('../../templates/years'),

    render: function() {
      this.$el.html(this.template());
      return this;
    },

  }),

  Header: Backbone.View.extend({

    className: 'header',

    template: require('../../templates/partials/_header'),

    render: function() {
      this.$el.html(this.template());
      return this;
    },

  }),

  Footer: Backbone.View.extend({

    className: 'footer l-box is-center',

    template: require('../../templates/partials/_footer'),

    render: function() {
      this.$el.html(this.template());
      return this;
    },

  })

}

module.exports = HomeViews;