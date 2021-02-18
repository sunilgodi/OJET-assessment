
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
    function (accUtils, ko, Model, CollectionDataProvider, app, moduleUtils,
        ArrayDataProvider, ListDataProviderView, AnimationUtils, $, AsyncRegExpValidator) {
        function step1viewModel(params) {
            $(".oj-web-applayout-footer").hide();
            $(".oj-hybrid-applayout-navbar-app").hide();
            var self = this;
            self.router = params.parentRouter;
            self.selectedChannel = ko.observable();
            self.selectedType = ko.observable();
            this.channelList = [
                
                { value: "channel 1", label: "channel 1" },
                { value: "channel 2", label: "channel 2" },
                { value: "channel 3", label: "channel 3" },
                { value: "channel 4", label: "channel 4" },
                { value: "channel 5", label: "channel 5" },
            ];
            this.channelListSource = new ArrayDataProvider(this.channelList, {
                keyAttributes: "value",
            });

            self.typeList = [
               
                { value: "type 1", label: "type 1" },
                { value: "type 1", label: "type 2" },
                { value: "type 1", label: "type 3" },
                { value: "type 1", label: "type 4" },
                { value: "type 1", label: "type 5" },
            ];
            self.typeListSource = new ArrayDataProvider(self.typeList, {
                keyAttributes: "value",
            });


            self.currentClass = ko.observable("Wholesale");
            self.classOptions = [
                { id: "wholesale", value: "Wholesale" },
                { id: "retail-wholesale", value: "Retail - Wholesale" },
                { id: "retail", value: "Retail" }
            ];

            /*------------------validation--------------------------*/
            self.accountName = ko.observable();
            self.nameValidator = [
                new AsyncRegExpValidator({
                    pattern: "[a-zA-Z s]{5,}",
                    hint: "enter at least 5 letters",
                    messageDetail: "Enter at least 5 letters and only letters are allowed",
                }),


            ];

            self.subHeaderConfig = ko.observable({ 'view': [], 'viewModel': null });
            moduleUtils.createView({ 'viewPath': 'views/sub-header.html' }).then(function (view) {
                self.subHeaderConfig({ 'view': view, 'viewModel': app.getSubHeaderModel(self.router) })
            })

            self.goBack = function () {
                self.router.go({ path: 'customers', params: {} })
            }
            self.gotoStep2 = function () {
               
                let accountName = document.getElementById("accountName");
                let channel     = document.getElementById("channel");
                let type        = document.getElementById("type");

                accountName.validate().then((res1) => {
                    if(res1 != "valid")
                    {
                            accountName.focus();
                    }     
                    channel.validate().then((res2)=>{
                        type.validate().then((res2)=>{
                    if (res1 == "valid" && res2 == "valid" && res2 == "valid") {
                        //call step 2 of flow     
                        var basicObj =  {
                        "ACCOUNTNAME" :self.accountName(),
                        "ACCOUNTTYPE":self.selectedType(),
                        "ACCOUNTCHANNEL":self.selectedChannel(),
                        "ACCOUNTCLASS":self.currentClass()
                        }
                        
                        localStorage.setItem("ACCOUNTDETAILS",basicObj);
                         self.router.go({ path: 'step2', params: basicObj });
                    }
                     });
                });
            });
            }
        }
        return step1viewModel;
    });