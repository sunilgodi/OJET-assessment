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
     "jquery",
     "ojs/ojasyncvalidator-regexp",
     //"subHeader",
     "ojs/ojbutton",
     "ojs/ojpopup",
     "ojs/ojradioset",
     "ojs/ojselectsingle",
     "ojs/ojformlayout",
     "ojs/ojcheckboxset",
     "ojs/ojinputnumber",
     "ojs/ojswitch",
     "ojs/ojprogress-bar"
    ]
     , function (accUtils, ko, Model, CollectionDataProvider,app,moduleUtils,
        ArrayDataProvider,ListDataProviderView,AnimationUtils,$,AsyncRegExpValidator,subHeader) {
      function step4viewModel(params) {
        $(".oj-web-applayout-footer").hide();
        $(".oj-hybrid-applayout-navbar-app").hide();
          var self = this;
          self.router = params.parentRouter;
        self.subHeaderConfig = ko.observable({ 'view': [], 'viewModel': null });
        moduleUtils.createView({ 'viewPath': 'views/sub-header.html' }).then(function (view) {
          self.subHeaderConfig({ 'view': view, 'viewModel': app.getSubHeaderModel(self.router) })
        })
        self.selectedSegment = ko.observable("SEG1");
        self.selectedpSegment = ko.observable("PS1");
        this.segmentList = [
            { value: "SEG1", label: "SEG1" },
            { value: "SEG2", label: "SEG1" },
            { value: "SEG3", label: "SEG1" },
        ];
        this.segmentSource = new ArrayDataProvider(this.segmentList, {
            keyAttributes: "value",
        });

        self.selectedsSegment = ko.observable("PS1");
        this.pSegmentList = [
            { value: "PS1", label: "PS1" },
            { value: "PS2", label: "PS2" },
            { value: "PS3", label: "PS3" },
        ];
        this.pSegmentSource = new ArrayDataProvider(this.pSegmentList, {
            keyAttributes: "value",
        });

        self.selectedsSegment = ko.observable("SS1");
        this.sSegmentList = [
            { value: "SS1", label: "SS1" },
            { value: "SS2", label: "SS2" },
            { value: "SS3", label: "SS3" },
        ];
        this.sSegmentSource = new ArrayDataProvider(this.sSegmentList, {
            keyAttributes: "value",
        });

        self.goBack = function(){
            self.router.go({path:'step3',params:{}})
        }
    }
    return step4viewModel;
});