var $ = require("jquery")
  , Backbone = require('backbone')
  , Day = require('../collections/day')
  , Handlebars = require('handlebars')
  , Review = require('../models/review')
  , d3 = require('d3')
  , c3 = require('c3');

Backbone.$ = $;


function makeGauge (avg, selectorOfTarget, label) {
  var percent = Math.round(avg*10);
  var chart = c3.generate({
        bindto: selectorOfTarget,
        data: {
            columns: [
                ['% score', percent ]
            ],
            type: 'gauge',
            onclick: function (d, i) { console.log("onclick", d, i); },
            // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        gauge: {
          label: {
             format: function(value, ratio) {
                 return value/10;
             },
             show: false // to turn off the min/max labels.
          },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 100, // 100 is default
        units: '',
           width: 39 // for adjusting arc thickness
        },
        color: {
            pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.

            threshold: {
              unit: ' %', // percentage is default
              max: 100, // 100 is default
              values: [50, 60, 70, 90]
            }
        },
        size: {
          height: 200
        }
    });
  // console.log("MAKING CHART", chart, arguments);
  return chart;
}

var HomeViews = {
  
  Body: Backbone.View.extend({

    initialize: function(opts){
      this.day = opts.day;
    },

    el: function() { return $('#main-container') },

    render: function() {
      console.log("collection", this.day)
      // this.$el.html(this.template());

      this.views = {
        header: new HomeViews.Header({day: this.day}),
        contentWrapper: new HomeViews.ContentWrapper({day: this.day}),
        splash: new HomeViews.Splash({day: this.day}),
        form: new HomeViews.Form({day: this.day}),
        years: new HomeViews.Years({day: this.day}),
        footer: new HomeViews.Footer({day: this.day})
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

    initialize: function(opts){
      // console.log("")
      this.day = opts.day;
      this.listenTo(this.day, 'sync', this.render.bind(this) );
    },

    className: 'content-wrapper',

    appendCovers: function() {
      var self = this;
      if (!this.day || this.day.models.length == 0) { return this; }
      if (self.album_views && self.album_views.length > 0) {
        self.album_views.forEach(function(view){ view.remove(); });
      }
      // reset views
      self.album_views = [];
      var total = this.day.models.length;

      this.day.each(function(review, idx){
        // var imgSrc = review.get('cover')
        
        var album = new HomeViews.Album({
          model: review,
          total: total,
          index: idx
        });
        album.render();
        self.album_views.push(album)
        $('.albums').append(album.$el);
        album.appendChart();
      })
    },

    render: function() {
      this.appendCovers();
      return this;
    }

  }),

  Splash: Backbone.View.extend({

    id: 'day',

    initialize: function(opts) {
      this.day = opts.day;
      this.listenTo(this.day, 'sync', this.render.bind(this) )
    },

    className: 'splash-container',

    template: function(attrs){
      return Handlebars.compile(require('../../templates/splash')())(attrs);
    },

    render: function() {
      var avg = this.day ? this.day.getAverage() : "";
      this.$el.html(this.template({
        date: this.day.fmtDate(),
        scoreAverage: avg
      }));
      this.gauge = makeGauge(avg, '.gauge-big');
      return this;
    },

  }),

  Form: Backbone.View.extend({

    initialize: function(opts) {

    },

    id: 'subscribe',

    className: 'ribbon l-box-lrg pure-g',

    subscribe: function  (e) {

      function createSubscriber (attrs) {
        $.ajax({
          url: '/subscribers', 
          type: 'POST',
          dataType: 'json',
          data: attrs, 
          success: function (res, statusText, req) {
            console.log("res", res)
          }
        })
      }

      e.preventDefault()
      var $form = $(e.target)
      var $email_input = $form.find('#email')
      var $score_threshold_input = $form.find('#score_threshold')
      var $first_name = $form.find('#first_name')
      var $last_name = $form.find('#last_name')
      var attrs = {
        "email": $email_input.val(),
        "score_threshold": $score_threshold_input.val(),
        "first_name": $first_name.val(),
        "last_name": $last_name.val()
      }
      createSubscriber(attrs)
      $email_input.val("")
      $score_threshold_input.val("")
      $first_name.val("")
      $last_name.val("")
    },

    template: require('../../templates/form'),

    render: function() {
      this.$el.html(this.template());
      this.$('.subscribe-form').bind('submit', this.subscribe)
      return this;
    },

  }),

  Years: Backbone.View.extend({

    initialize: function(opts) {

    },

    className: 'content',

    id: 'years',

    template: require('../../templates/years'),

    render: function() {
      this.$el.html(this.template());
      return this;
    },

  }),

  Header: Backbone.View.extend({

    initialize: function(opts) {

    },

    className: 'header',

    template: require('../../templates/partials/_header'),

    render: function() {
      this.$el.html(this.template());
      return this;
    },

  }),

  Footer: Backbone.View.extend({

    initialize: function(opts) {

    },

    className: 'footer l-box is-center',

    template: require('../../templates/partials/_footer'),

    render: function() {
      this.$el.html(this.template());
      return this;
    },

  }),

  Album: Backbone.View.extend({

    initialize: function(opts) {
      this.total = opts.total || 0;
      this.index = opts.index || 0;
    },

    model: Review,

    className: 'album',

    template: function(attrs){
      return Handlebars.compile(require('../../templates/album')())(attrs);
    },

    appendChart: function() {
      var $gauge = $("<span class='pure-u-1-1 gauge-small-"+this.index+"'>");
      this.$('.album-meta-gauge').append($gauge)
      this.gauge = makeGauge(this.model.get('score'), '.gauge-small-'+this.index );
    },

    render: function() {
      this.$el.html(this.template({
        title: this.model.get('album'),
        artist: this.model.get('artist')
      }));
      this.$el.addClass("pure-u-1-"+this.total);
      this.$('.album-meta-cover').append("<img class='pure-u-1-1 cover'src='"+this.model.get('cover')+"'/>");
      
      return this;
    },
  })

}

module.exports = HomeViews;