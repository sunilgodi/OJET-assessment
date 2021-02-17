
/*
 * Your customer ViewModel code goes here
 */
/*define(['knockout', 'appController', 
'ojs/ojmodule-element-utils', 'accUtils','ojs/ojmodel','ojs/ojarraydataprovider',
'ojs/ojcollectiondataprovider',"ojs/ojlistdataproviderview",
 "ojs/ojtable", "ojs/ojinputtext"],*/
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
   'ojs/ojlabel',
   "ojs/ojtable", "ojs/ojinputtext",
   'ojs/ojlistview',
   'ojs/ojavatar',
   "ojs/ojbutton",
   "ojs/ojpopup",
   "ojs/ojradioset",
   "ojs/ojselectsingle",
   "ojs/ojbutton",
   "ojs/ojformlayout",
   "ojs/ojcheckboxset"
  ],
 /*function(acct,ko, app, moduleUtils, accUtils,Model,ArrayDataProvider,
  CollectionDataProvider,ListDataProviderView) {*/
    function (accUtils, ko, Model, CollectionDataProvider,app,moduleUtils,
      ArrayDataProvider,ListDataProviderView,AnimationUtils,$,AsyncRegExpValidator) {
    function step1viewModel(params) {
        $(".oj-web-applayout-footer").hide();
        $(".oj-hybrid-applayout-navbar-app").hide();
      var self = this;
      self.router = params.parentRouter;
        self.selectedChannel = ko.observable("1");
        self.selectedType = ko.observable("1");
        this.channelList = [
            {value:"1",label:"Select channel"},
            { value: "ch1", label: "channel 1" },
            { value: "ch2", label: "channel 2" },
            { value: "ch3", label: "channel 3" },
            { value: "ch4", label: "channel 4" },
            { value: "ch5", label: "channel 5" },
        ];
        this.channelListSource = new ArrayDataProvider(this.channelList, {
            keyAttributes: "value",
        });

        this.typeList = [
            {value:"1",label:"Select type"},
            { value: "tp1", label: "type 1" },
            { value: "tp2", label: "type 2" },
            { value: "tp3", label: "type 3" },
            { value: "tp4", label: "type 4" },
            { value: "tp5", label: "type 5" },
        ];
        this.typeListSource = new ArrayDataProvider(this.typeList, {
            keyAttributes: "value",
        });
        
        this.currentClass = ko.observableArray(["wholesale"]);
              this.classOptions = [
                  { id: "wholesale", value: "Wholesale" },
                  { id: "retail-wholesale", value: "Retail - Wholesale"},
                  { id: "retail", value: "Retail" }
              ];


              /*------------------validation--------------------------*/
              self.accountName = ko.observable();
            self.nameValidator = [
                new AsyncRegExpValidator({
                    pattern: "[a-zA-Z]{5,}",
                    hint: "enter at least 5 letters",
                    messageDetail: "Enter at least 5 letter name",
                }),
               
              
            ];
              
            self.subHeaderConfig = ko.observable({ 'view': [], 'viewModel': null });
            moduleUtils.createView({ 'viewPath': 'views/sub-header.html' }).then(function (view) {
              self.subHeaderConfig({ 'view': view, 'viewModel': app.getSubHeaderModel(self.router) })
            })
           
self.goBack = function(){
   self.router.go({path:'customers',params:{}})
}
self.gotoStep2 = function(){
    let element1 = document.getElementById("accountName");
    element1.validate().then((res) => {
        if(res == "valid"){
            //call step 2 of flow
            console.log(self.currentClass() + self.selectedType()+self.selectedChannel()+"-"+element1.value)
            self.router.go({ path: 'step2', params: {} });
           

        }
    });
}
    }
    return step1viewModel;
});