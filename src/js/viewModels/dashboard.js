define(
  ['accUtils',
    'knockout',
    'ojs/ojmodel',
    'ojs/ojcollectiondataprovider',
    'appController',
    'ojs/ojmodule-element-utils',
    'ojs/ojarraydataprovider',
    "ojs/ojlistdataproviderview",
    "ojs/ojanimation",
    "show-details/loader",
    'ojs/ojlabel',
    "ojs/ojtable", "ojs/ojinputtext",
    'ojs/ojlistview',
    'ojs/ojavatar',
    "ojs/ojpopup",
    "ojs/ojradioset",
    "ojs/ojbutton"
  ],

  function (accUtils, ko, Model, CollectionDataProvider, app, moduleUtils,
    ArrayDataProvider, ListDataProviderView, AnimationUtils) {

    function DashboardViewModel() {
      
      var model = Model.Model.extend({
          defaults : {
            "name":"name123",
            "contact":"jhj"
          }
      });
      console.log(model);

      var collection = new Model.Collection.extend({
        model: model,
      });

      console.log(collection)
      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function () {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function () {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);