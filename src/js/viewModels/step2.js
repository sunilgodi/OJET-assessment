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
     "ojs/ojbutton",
     "ojs/ojpopup",
     "ojs/ojradioset",
     "ojs/ojselectsingle",
     "ojs/ojbutton",
     "ojs/ojformlayout",
     "ojs/ojcheckboxset",
     "ojs/ojinputnumber"
    ]
     , function (accUtils, ko, Model, CollectionDataProvider,app,moduleUtils,
        ArrayDataProvider,ListDataProviderView,AnimationUtils,$,AsyncRegExpValidator) {
      function step2viewModel(params) {
        $(".oj-web-applayout-footer").hide();
        $(".oj-hybrid-applayout-navbar-app").hide();
          var self = this;
          self.router = params.parentRouter;
          //self.router.go({ path: 'step3', params: {} });
          
          self.subHeaderConfig = ko.observable({ 'view': [], 'viewModel': null });
          moduleUtils.createView({ 'viewPath': 'views/sub-header.html' }).then(function (view) {
            self.subHeaderConfig({ 'view': view, 'viewModel': app.getSubHeaderModel(self.router) })
          })
      
        self.addr1 = ko.observable();
        self.addr2 = ko.observable();
        self.pcode = ko.observable(000000);
         self.lat = ko.observable();
        self.lang = ko.observable();
        self.addr1Validator = [
            new AsyncRegExpValidator({
                pattern: "^([a-zA-z0-9/\\''(),-\s]{2,255})$",
                hint: "Enter a valid address",
                messageDetail: "Enter at least 10 letters",
            }),
        ];

        self.addr2Validator = [
            new AsyncRegExpValidator({
                pattern: "^([a-zA-z0-9/\\''(),-\s]{2,255})$",
                hint: "Enter a valid address",
                messageDetail: "Enter at least 10 letters",
            }),
        ];

        self.pcodeValidator = [
            new AsyncRegExpValidator({
                pattern: "^[0-9][0-9]{5}$",
                hint: "Enter a valid pincode",
                messageDetail: "Enter a valid 6 digit code",
            }),
        ];
        /*self.latValidator = [
            new AsyncRegExpValidator({
                pattern: "^[0-9][0-9]",
                hint: "Enter a valid latitiude",
                messageDetail: "Enter a valid latitiude",
            }),
        ];

        self.langValidator = [
            new AsyncRegExpValidator({
                pattern: "/^-?[0-9]\d*(\.\d+)?$/",
                hint: "Enter a valid longitude",
                messageDetail: "Enter a valid longitude",
            }),
        ];*/

        self.selectedCountry = ko.observable("SPAIN");
        this.countryList = [
            { value: "INDIA", label: "INDIA" },
            { value: "SPAIN", label: "SPAIN" },
            { value: "FRANCE", label: "FRANCE" },
        ];
        this.countryListSource = new ArrayDataProvider(this.countryList, {
            keyAttributes: "value",
        });

        self.selectedState = ko.observable("Karnataka");
        this.stateList = [
            { value: "Karnataka", label: "Karnataka" },
            { value: "Delhi", label: "Delhi" },
            { value: "Mumbai", label: "Mumbai" },
        ];
        this.stateListSource  = new ArrayDataProvider(this.stateList, {
            keyAttributes: "value",
        });

        //Latitude and longitude handlers
        self.selectedLatitude = ko.observable("N");
        self.selectedLongitude= ko.observable("N");
       
        self.latList = [
            { value: "N", label: "N" },
            { value: "W", label: "W" },
            { value: "E", label: "E" },
            { value: "S", label: "S" }
        ];
        this.latDirListSource = new ArrayDataProvider(this.latList, {
            keyAttributes: "value",
        });

        self.langList = [
            { value: "N", label: "N" },
            { value: "W", label: "W" },
            { value: "E", label: "E" },
            { value: "S", label: "S" }
        ];
        this.langDirListSource = new ArrayDataProvider(this.langList, {
            keyAttributes: "value",
        });    
        
        self.currentAddrType = ko.observable("General");
        self.addrOptions = [
            { id: "General", value: "General" },
            { id: "shipTo", value: "Ship to"},
            { id: "billTo", value: "Bill to"},
            
    
          ];
          self.getCurrentPos = function(){
            navigator.geolocation.getCurrentPosition(
                function(pos){console.log(pos)
                self.lat(pos.coords.latitude);
                self.lang(pos.coords.longitude);
                }, 
                function(err){console.log("Unable to fetch loc")} );
          }
          self.gotoStep3 = function(){
            let ele1 = document.getElementById("addr1");
            let ele2 = document.getElementById("addr2");
            let ele3 = document.getElementById("pcode");
            let ele4 = document.getElementById("lat");
            let ele5 = document.getElementById("lang");
            let test = "valid";
            ele1.validate().then((res1)=>{
                    ele2.validate().then((res2)=>{
                        ele3.validate().then((res3)=>{  
                            ele4.validate().then((res4)=>{
                                ele5.validate().then((res5)=>{
                                if(res1 == test && res2 == test && res3 == test && res4 == test && res5 == test){
                                    //valid case
                                    console.log(self.addr1()+ self.addr2() + self.currentAddrType()+ self.selectedCountry()+
                                        self.lat()+self.lang()+self.selectedState());
                                        if(isFinite(self.lang()) && Math.abs(self.lang()) <= 180)
                                        {
                                            if(isFinite(self.lat()) && Math.abs(self.lat()) <= 90)
                                            {
                                                self.router.go({ path: 'step3', params: {} });
                                            }
                                        }
                                       
                                }
                                })
                            })
                        })   
                    })
            });
          }
          self.goBack = function(){
            self.router.go({path:'step1',params:{}})
        }
        }
    return step2viewModel;
});