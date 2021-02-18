define(
    ['accUtils',
      'knockout',
      'ojs/ojmodel',
      'ojs/ojcollectiondataprovider',
      'appController',
      'ojs/ojmodule-element-utils',
      'show-details/loader',
      'ojs/ojarraydataprovider',
      "ojs/ojlistdataproviderview",
      "ojs/ojanimation",
      "show-details/loader",
      "ojs/ojbutton"
    ],
    /*function(acct,ko, app, moduleUtils, accUtils,Model,ArrayDataProvider,
     CollectionDataProvider,ListDataProviderView) {*/
    function (accUtils, ko, Model, CollectionDataProvider, app, moduleUtils) {
      function accountDetails(args) {
        $(".oj-web-applayout-footer").hide();
        $(".oj-hybrid-applayout-navbar-app").hide();
        self.headerConfig = ko.observable({ 'view': [], 'viewModel': null });
        moduleUtils.createView({ 'viewPath': 'views/header.html' }).then(function (view) {
          self.headerConfig({ 'view': view, 'viewModel': app.getHeaderModel() })
        });
        
        self.router = args.parentRouter;
        self.rxdargs = args.params;
        console.log(rxdargs)
        self.accountName = self.rxdargs.accountName;
        self.status = self.rxdargs.accountStatus;
        self.lastVisit = self.rxdargs.LastVisit;
        self.nextVisit = self.rxdargs.NextVisit;
        self.orgStatus = self.rxdargs.orgStatus;


        self.gotoDashboard = function(){
          self.router.go({path:'customers',params:{}})
        }
      }
      return accountDetails;
});