var site = require('apostrophe-site')();

site.init({

  // This line is required and allows apostrophe-site to use require() and manage our NPM modules for us.
  root: module,
  shortName: 'NEW_TAADAS',
  hostName: 'NEW_TAADAS',
  title: 'NEW_TAADAS',
  sessionSecret: 'apostrophe sandbox demo party',
  adminPassword: 'demo',
  address: '0.0.0.0',
  port: 3000,

  // Force a2 to prefix all of its URLs. It still
  // listens on its own port, but you can configure
  // your reverse proxy to send it traffic only
  // for URLs with this prefix. With this option
  // "/" becomes a 404, which is supposed to happen!

  // prefix: '/test',

  // If true, new tags can only be added by admins accessing
  // the tag editor modal via the admin bar. Sometimes useful
  // if your folksonomy has gotten completely out of hand
  lockTags: false,

  // Give users a chance to log in if they attempt to visit a page
  // which requires login
  secondChanceLogin: true,

  locals:  require('./lib/locals.js'),

  // you can define lockups for areas here

  // Here we define what page templates we have and what they will be called in the Page Types menu.

  // For html templates, the 'name' property refers to the filename in ./views/pages, e.g. 'default'
  // refers to '/views/pages/default.html'.

  // The name property can also refer to a module, in the case of 'blog', 'map', 'events', etc.

  pages: {
    types: [
      { name: 'default', label: 'Default' },
      { name: 'home', label: 'Home Page'},
      { name: 'dvds', label: 'Free DVD Library'},
      { name: 'resources', label: 'Resources'},
  	  { name: 'contact', label: 'About Us'},
  	  { name: 'donate', label: 'Donate'},
  	  { name: 'materials', label: 'Training Materials'},
  	  { name: 'membership-info', label: 'Membership Info'}
    ]
  },

  // These are the modules we want to bring into the project.
  modules: {
    // Styles required by the new editor, must go FIRST
    'apostrophe-editor-2': {},
    'apostrophe-ui-2': {},
    'apostrophe-browserify': {
      files: ['./public/js/modules/_site.js']
    },
    'apostrophe-blog-2': {
      perPage: 5,
      pieces: {
        addFields: [
          {
            name: '_author',
            type: 'joinByOne',
            withType: 'person',
            idField: 'authorId',
            label: 'Author'
          }
        ]
      }
    },
    'apostrophe-people': {
      addFields: [
        {
          name: '_blogPosts',
          type: 'joinByOneReverse',
          withType: 'blogPost',
          idField: 'authorId',
          label: 'Author',
          withJoins: [ '_editor' ]
        },
        {
          name: 'thumbnail',
          type: 'singleton',
          widgetType: 'slideshow',
          label: 'Picture',
          options: {
            aspectRatio: [100,100]
          }
        }
      ]
    },
    'apostrophe-groups': {},
    'apostrophe-search': {},
      
    'dvds': {
      extend: 'apostrophe-snippets',
      name: 'dvds',
      label: 'DVDs',
      instance: 'dvd',
      instanceLabel: 'Dvd',
      addFields: [
        {
          name: 'title',
          type: 'string',
          label: 'Title',
        },
        {
          name: 'body',
          type: 'string',
          label: 'Description'
        },
        {
          name: 'information',
          type: 'string',
          label: 'Information',
        },
        {
          name: 'identifiers',
          type: 'array',
          label: 'Identifiers',
          schema: [
            {
              name: 'identifier',
              type: 'integer',
              label: 'Identifier'

            }
          ]
        }
      ]
    },
  },

  // These are assets we want to push to the browser.
  // The scripts array contains the names of JS files in /public/js,
  // while stylesheets contains the names of LESS files in /public/css
  assets: {
    stylesheets: ['bootstrap.min', 'modern-business', 'font-awesome', 'font-awesome.min', 'custom-styles'],
    scripts: ['_site-compiled', 'bootstrap.min', 'contact_me', 'jqBootstrapValidation', 'testing']
  },

  afterInit: function(callback) {
    // We're going to do a special console message now that the
    // server has started. Are we in development or production?
    var locals = require('./data/local');
    if(locals.development || !locals.minify) {
      console.error('Apostrophe Sandbox is running in development.');
    } else {
      console.error('Apostrophe Sandbox is running in production.');
    }

    callback(null);
  }

});
