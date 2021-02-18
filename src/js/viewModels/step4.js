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
    , function (accUtils, ko, Model, CollectionDataProvider, app, moduleUtils,
        ArrayDataProvider, ListDataProviderView, AnimationUtils, $, AsyncRegExpValidator, subHeader) {
        function step4viewModel(params) {
            $(".oj-web-applayout-footer").hide();
            $(".oj-hybrid-applayout-navbar-app").hide();
            var self = this;
            self.router = params.parentRouter;
            self.args = params.params.DATA;
            self.subHeaderConfig = ko.observable({ 'view': [], 'viewModel': null });
            moduleUtils.createView({ 'viewPath': 'views/sub-header.html' }).then(function (view) {
                self.subHeaderConfig({ 'view': view, 'viewModel': app.getSubHeaderModel(self.router) })
            })
            self.selectedSegment = ko.observable();
            self.selectedpSegment = ko.observable();
            this.segmentList = [
                { value: "SEG1", label: "SEG1" },
                { value: "SEG2", label: "SEG1" },
                { value: "SEG3", label: "SEG1" },
            ];
            this.segmentSource = new ArrayDataProvider(this.segmentList, {
                keyAttributes: "value",
            });

            self.selectedsSegment = ko.observable();
            this.pSegmentList = [
                { value: "PS1", label: "PS1" },
                { value: "PS2", label: "PS2" },
                { value: "PS3", label: "PS3" },
            ];
            this.pSegmentSource = new ArrayDataProvider(this.pSegmentList, {
                keyAttributes: "value",
            });

            self.selectedsSegment = ko.observable();
            this.sSegmentList = [
                { value: "SS1", label: "SS1" },
                { value: "SS2", label: "SS2" },
                { value: "SS3", label: "SS3" },
            ];
            this.sSegmentSource = new ArrayDataProvider(this.sSegmentList, {
                keyAttributes: "value",
            });
            
            self.goBack = function () {
                self.router.go({ path: 'step3', params: {} })
            }
            self.saveAccount = function(){
                let tSegment = document.getElementById("segment");
                let pSegment = document.getElementById("pSegment");
                let sSegment = document.getElementById("sSegment");

                tSegment.validate().then((res1)=>{
                    pSegment.validate().then((res2)=>{
                        sSegment.validate().then((res3)=>{
                            if(res1 == "valid" && res2 == "valid" && res3 == "valid"){
                                        // save to local storage
                                        console.log(self.selectedSegment()+self.selectedpSegment+this.selectedsSegment);
                                        console.log(self.args);
                                        let obj = {
                                            "ADDITIONALINFO":{
                                            "SEGMENT":self.selectedSegment(),
                                            "PSEGEMENT":self.selectedpSegment(),
                                            "SSEGMENT":self.selectedsSegment()
                                        }
                                    }
                                        let json1 = JSON.parse(self.args)
                                        let finalObj = {
                                            ...json1,
                                            ...obj
                                        }
                                        localStorage.setItem("ACCOUNTDET",JSON.stringify(finalObj));
                                        console.log(finalObj)
                                        self.router.go({ path: 'customers', params: { }})
                            }
                
                        })
                
                    }) 
                
                })
            }
        }
        return step4viewModel;
    });