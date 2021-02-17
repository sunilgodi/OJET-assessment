define(
  ['accUtils',
   'knockout',
   'ojs/ojmodel',
   'ojs/ojcollectiondataprovider',
   'ojs/ojlabel',
   'ojs/ojchart',
   'ojs/ojlistview',
   'ojs/ojavatar'
  ],
  function (accUtils, ko, Model, CollectionDataProvider) {

    function DashboardViewModel() {
      
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