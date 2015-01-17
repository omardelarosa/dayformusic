var $ = require("jquery")
  , Backbone = require('backbone')
  , Day = require('../collections/day')
  , Handlebars = require('handlebars')
  , d3 = require('d3')
  , c3 = require('c3');

Backbone.$ = $;


function makeGauge (avg, selectorOfTarget) {
  var chart = c3.generate({
        bindto: selectorOfTarget,
        data: {
            columns: [
                ['average', Math.round(avg*100)/100]
            ],
            type: 'gauge',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        gauge: {
          label: {
             format: function(value, ratio) {
                 return value;
             },
             // show: false // to turn off the min/max labels.
          },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 10.0, // 100 is default
        units: '',
           width: 39 // for adjusting arc thickness
        },
        color: {
            pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
            threshold: {
              unit: 'points', // percentage is default
              max: 10.0, // 100 is default
              values: [4.0, 6.0, 8.0, 9.0, 10.0]
            }
        },
        size: {
          height: 200
        }
    });
  return chart;
}

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
      this.collection = window._d4m.current_day;
      this.listenTo(this.collection, 'sync', this.render.bind(this) );
    },

    className: 'content-wrapper',

    appendCovers: function() {
      if (!this.collection || this.collection.models.length == 0) { return this; }
      var self = this;
      this.collection.each(function(review){
        var imgSrc = review.get('cover')
        $('.covers').append('<img class="cover" src="'+imgSrc+'"/>');
      })
    },

    render: function() {
      this.appendCovers();
      return this;
    }

  }),

  Splash: Backbone.View.extend({

    id: 'day',

    initialize: function() {
      this.collection = window._d4m.current_day
      this.listenTo(this.collection, 'sync', this.render.bind(this) )
    },

    className: 'splash-container',

    template: function(attrs){
      return Handlebars.compile(require('../../templates/splash')())(attrs);
    },

    render: function() {
      var avg = this.collection ? this.collection.getAverage() : "";
      this.$el.html(this.template({
        date: this.collection.fmtDate(),
        scoreAverage: avg
      }));
      this.gauge = makeGauge(avg, '.gauge-big');
      return this;
    },

  }),

  Form: Backbone.View.extend({

    initialize: function() {

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

    className: 'content',

    id: 'years',

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