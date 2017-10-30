"use strict";



define('emtasks/adapters/application', ['exports', 'emberfire/adapters/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var inject = Ember.inject;
  exports.default = _firebase.default.extend({ firebase: inject.service()
  });
});
define('emtasks/app', ['exports', 'emtasks/resolver', 'ember-load-initializers', 'emtasks/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Application = Ember.Application;


  var App = Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('emtasks/components/validation-error-field', ['exports', 'ember-cli-simple-validation/components/validation-error-field'], function (exports, _validationErrorField) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _validationErrorField.default;
});
define('emtasks/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define("emtasks/controllers/mail", ["exports", "ember-cli-simple-validation/mixins/validate"], function (exports, _validate) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    var isEven = function isEven() {
        var value = this.get("model.even");
        var number = parseInt(value, 10);
        return number && number % 2 === 0;
    };

    exports.default = Ember.Controller.extend(_validate.ValidationMixin, {
        nameValidation: (0, _validate.validate)("model.name"),
        emailValidation: (0, _validate.validate)("model.emailAddress", /\S+@\S+\.\S+/),
        evenValidation: (0, _validate.validate)("model.even", isEven),
        actions: {
            save: function save() {
                this.set("submitted", true);
                if (this.get("valid")) {
                    //executed when all fields are valid 
                }
            }
        }
    });
});
define('emtasks/controllers/tasks', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Controller = Ember.Controller;
  exports.default = Controller.extend({});
});
define('emtasks/controllers/tasks/new', ['exports'], function (exports) {
          'use strict';

          Object.defineProperty(exports, "__esModule", {
                    value: true
          });
          var Controller = Ember.Controller;
          exports.default = Controller.extend({
                    actions: {
                              addTask: function addTask() {
                                        var title = this.get('title');
                                        var description = this.get('description');
                                        var date = this.get('date');

                                        //Create New Task
                                        var newTask = this.store.createRecord('task', {
                                                  title: title,
                                                  description: description,
                                                  date: new Date(date)
                                        });

                                        //save to Database
                                        newTask.save();

                                        //Clear Form
                                        this.setProperties({
                                                  title: '',
                                                  description: '',
                                                  date: ''
                                        });
                              }
                    }
          });
});
define('emtasks/helpers/app-version', ['exports', 'emtasks/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('emtasks/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('emtasks/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('emtasks/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'emtasks/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _config$APP = _environment.default.APP,
      name = _config$APP.name,
      version = _config$APP.version;
  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('emtasks/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('emtasks/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('emtasks/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('emtasks/initializers/emberfire', ['exports', 'emberfire/initializers/emberfire'], function (exports, _emberfire) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberfire.default;
});
define('emtasks/initializers/export-application-global', ['exports', 'emtasks/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('emtasks/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('emtasks/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('emtasks/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("emtasks/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('emtasks/models/task', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    title: _emberData.default.attr('string'),
    description: _emberData.default.attr('string'),
    date: _emberData.default.attr('date'),
    created: _emberData.default.attr('string', {
      defaultValue: function defaultValue() {
        return new Date();
      }
    })

  });
});
define('emtasks/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('emtasks/router', ['exports', 'emtasks/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var EmberRouter = Ember.Router;


  var Router = EmberRouter.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('tasks', function () {
      this.route('new');
    });
  });

  exports.default = Router;
});
define('emtasks/routes/tasks', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({});
});
define('emtasks/routes/tasks/new', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({});
});
define('emtasks/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('emtasks/services/firebase-app', ['exports', 'emberfire/services/firebase-app'], function (exports, _firebaseApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebaseApp.default;
});
define('emtasks/services/firebase', ['exports', 'emberfire/services/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default;
});
define('emtasks/services/simple-store', ['exports', 'ember-cli-simple-store/store'], function (exports, _store) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _store.default;
    }
  });
});
define("emtasks/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "0l2Jd3J6", "block": "{\"symbols\":[],\"statements\":[[0,\" \"],[6,\"nav\"],[9,\"class\",\"navbar navbar-default\"],[7],[0,\"\\n       \"],[6,\"div\"],[9,\"class\",\"container\"],[7],[0,\"\\n       \\t \"],[6,\"div\"],[9,\"class\",\"navbar-header\"],[7],[0,\"\\n\\t   \"],[6,\"button\"],[9,\"type\",\"button\"],[9,\"class\",\"navbar-toggle collapsed\"],[9,\"data-toggle\",\"collapse\"],[9,\"data-target\",\"#navbar\"],[9,\"aria-expanded\",\"false\"],[9,\"aria-controls\",\"navbar\"],[7],[0,\"\\n\\t     \"],[6,\"span\"],[9,\"class\",\"sr-only\"],[7],[0,\"Toggle navigation\"],[8],[0,\"\\n\\t     \"],[6,\"span\"],[9,\"class\",\"icon-bar\"],[7],[8],[0,\"\\n\\t     \"],[6,\"span\"],[9,\"class\",\"icon-bar\"],[7],[8],[0,\"\\n\\t     \"],[6,\"span\"],[9,\"class\",\"icon-bar\"],[7],[8],[0,\"\\n\\t   \"],[8],[0,\"\\n\\t   \"],[6,\"ul\"],[9,\"class\",\"nav navbar-nav\"],[7],[0,\"\\n\\t     \"],[6,\"li\"],[7],[4,\"link-to\",[\"index\"],null,{\"statements\":[[0,\"Home\"]],\"parameters\":[]},null],[8],[0,\"\\n\\t     \"],[6,\"li\"],[7],[4,\"link-to\",[\"tasks.new\"],null,{\"statements\":[[0,\"Contact\"]],\"parameters\":[]},null],[8],[0,\"\\n           \"],[8],[0,\"\\n         \"],[8],[2,\"/.nav-collapse \"],[0,\"\\n       \"],[8],[0,\"\\n     \"],[8],[0,\"\\n\\n     \"],[6,\"div\"],[9,\"class\",\"container\"],[7],[0,\"\\n\\t \"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n\\t     \"],[6,\"div\"],[9,\"class\",\"col-md-12\"],[7],[0,\"\\n                 \"],[1,[18,\"outlet\"],false],[0,\"\\n\\t     \"],[8],[0,\"\\n\\t \"],[8],[0,\"\\n \\n     \"],[8],[2,\" /.container \"],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "emtasks/templates/application.hbs" } });
});
define("emtasks/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "QSeyeuNL", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false],[0,\"\\n\\t\\n\\n\"],[6,\"center\"],[7],[0,\"\\n\\n                    \"],[6,\"img\"],[9,\"src\",\"http://openebs.io/news/components/225x225xopenebs,P20logo-01,P20,281,29.png.pagespeed.ic.DaifpDKc19.png\"],[9,\"width\",\"auto\"],[9,\"height\",\"200\"],[7],[8],[0,\"\\n\\n\\n                    \"],[6,\"div\"],[9,\"style\",\"display:flex;\"],[7],[0,\"\\n\\n                        \"],[8],[0,\"\\n\\n                \"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "emtasks/templates/index.hbs" } });
});
define("emtasks/templates/tasks", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "nDNbwtN4", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "emtasks/templates/tasks.hbs" } });
});
define("emtasks/templates/tasks/new", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "fC70CMLI", "block": "{\"symbols\":[],\"statements\":[[6,\"form\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Email\"],[8],[0,\"\\n\\t\"],[1,[25,\"input\",null,[[\"type\",\"class\",\"id\",\"placeholder\"],[\"text\",\"form-control\",[19,0,[\"Email\"]],\"yyyy@zzz.com\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n\\t\"],[6,\"label\"],[7],[0,\"Comment\"],[8],[0,\"\\n\\t\"],[1,[25,\"textarea\",null,[[\"class\",\"id\",\"placeholder\"],[\"form-control\",[19,0,[\"comment\"]],\"Leave your comment.\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"button\"],[9,\"type\",\"submit\"],[9,\"class\",\"btn btn-default\"],[7],[0,\"Submit\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "emtasks/templates/tasks/new.hbs" } });
});
define('emtasks/torii-providers/firebase', ['exports', 'emberfire/torii-providers/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default;
});


define('emtasks/config/environment', [], function() {
  var prefix = 'emtasks';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("emtasks/app")["default"].create({"name":"emtasks","version":"0.0.0+"});
}
//# sourceMappingURL=emtasks.map
