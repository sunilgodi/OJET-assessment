/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
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
    function CustomerViewModel(params) {
      var self = this;
      self.router = params.parentRouter;
      var popup = "";
      $(".oj-web-applayout-footer").show();
      $(".oj-hybrid-applayout-navbar-app").show();
      self.headerConfig = ko.observable({ 'view': [], 'viewModel': null });
      moduleUtils.createView({ 'viewPath': 'views/header.html' }).then(function (view) {
        self.headerConfig({ 'view': view, 'viewModel': app.getHeaderModel() })
      })
      self.currentStatus = ko.observable("All");
      this.statusOptions = [
        { id: "all", value: "All", status: "All", color: 'black' },
        { id: "active", value: "ACTIVE", status: "ACTIVE", color: 'green' },
        { id: "inactive", value: "INACTIVE", status: "INACTIVE", color: 'red' },
        { id: "inprogress", value: "INPROGRESS", status: "INPROGRESS", color: 'yellow' }

      ];
      this.color = "blue;"
      self.handleValueChanged = () => {
        this.filter(document.getElementById("filter").rawValue);
      };
      self.length = ko.observable(0);
      var ctr = 0;
      self.filter = ko.observable();
      self.baseDeptArray = ko.observableArray();
      var myObservableArray = ko.observableArray();

      var RESTurl = "http://demo6785834.mockable.io/accounts";
      function parseItem(response) {
        var LastVisitVal = response.LastVisit;
        let months = {
          "1": "Jan", "2": "Feb", "3": "March", "4": "Apr",
          "5": "May", "6": "June", "7": "July", "8": "Aug", "9": "Sept",
          "10": "Oct", "11": "Nov", "12": "Dec"
        };
        let lday, lmonth, lyear, lflag;
        let nday, nmonth, nyear, nflag;
        if (LastVisitVal == null) {
          LastVisitVal = 'NA';
          lflag = false;
        } else {
          LastVisitVal = new Date(LastVisitVal);
          lflag = true;

          lday = LastVisitVal.getDay();
          lmonth = months[LastVisitVal.getMonth() + 1];
          lyear = LastVisitVal.getFullYear();
          //LastVisitVal = day+","+month+","+year;
        }
        var NextVisitVal = response.NextVisit;
        if (NextVisitVal == null) {
          NextVisitVal = 'NA';
          nflag = false;
        }
        else {
          nflag = true;
          nday = LastVisitVal.getDay();
          nmonth = months[LastVisitVal.getMonth() + 1];
          nyear = LastVisitVal.getFullYear();
        }
        var accountName = response.OrganizationName == null ? "NA" : response.OrganizationName;
        ctr++;
        self.length(ctr);
        return {
          name: accountName,
          lday: lday,
          lmonth: lmonth,
          lyear: lyear,
          nday: nday,
          nmonth: nmonth,
          nyear: nyear,
          nflag: nflag,
          lflag: lflag,
          LastVisit: LastVisitVal,
          NextVisit: NextVisitVal,
          orgStatus: response.OrganizationDEO_Status_c,
          status: response.SalesProfileStatus
        }
      }

      var activityModel = Model.Model.extend({
        urlRoot: RESTurl,
        parse: parseItem,
        idAttribute: 'SyncLocalId'
      });

      var activityCollection = new Model.Collection.extend({
        url: RESTurl,
        model: activityModel,
        comparator: 'SyncLocalId'
      });
      self.myActivityCol = new activityCollection();
      self.activityDataProvider = ko.observableArray();
      self.activityDataProvider(new CollectionDataProvider(self.myActivityCol));

      console.log(ctr)

      this.filter = ko.observable();
      console.log(this.baseDeptArray)



      this.handleValueChanged = (event) => {
        if (event.detail.value === null || event.detail.value === undefined || event.detail.value === "") {
          this.activityDataProvider(new CollectionDataProvider(this.myActivityCol));
        };
        if (this.filteredCollection === undefined) {
          this.filteredCollection = this.myActivityCol.clone();
          this.filteredDataProvider = new CollectionDataProvider(this.filteredCollection);
        }
        var ret = this.myActivityCol.where({
          name: {
            value: event.detail.value,
            comparator: (model, attr, value) => {
              let name = model.get("name");
              return name.toLowerCase().includes(value.toLowerCase());
            },
          },
        });
        console.log(ret);
        this.filteredCollection.reset(ret);
        this.activityDataProvider(this.filteredDataProvider);
      };




      this.highlightingCellRenderer = (context) => {
        let field = null;
        if (context.columnIndex === 0) {
          field = "OrganizationName";
        }
        else if (context.columnIndex === 1) {
          field = "NextVisit";
        }
        else if (context.columnIndex === 2) {
          field = "LastVisit";
        }

        var data = context.row[field].toString();
        if (field == "NextVisit") {
          data = new Date(data);
          data = data.getDate() + "=" + data.getMonth() + 1 + "=" + data.getFullYear();
        }

        const filterString = this.filter();
        let textNode;
        let spanNode = document.createElement("span");
        if (filterString && filterString.length > 0) {
          const index = data.toLowerCase().indexOf(filterString.toLowerCase());
          if (index > -1) {
            const highlightedSegment = data.substr(index, filterString.length);
            if (index !== 0) {
              textNode = document.createTextNode(data.substr(0, index));
              spanNode.appendChild(textNode);
            }
            let bold = document.createElement("b");
            textNode = document.createTextNode(highlightedSegment);
            bold.appendChild(textNode);
            spanNode.appendChild(bold);
            if (index + filterString.length !== data.length) {
              textNode = document.createTextNode(data.substr(index + filterString.length, data.length - 1));
              spanNode.appendChild(textNode);
            }
          }
          else {
            textNode = document.createTextNode(data);
            spanNode.appendChild(textNode);
          }
        }
        else {
          textNode = document.createTextNode(data);
          spanNode.appendChild(textNode);
        }
        context.parentElement.appendChild(spanNode);
      };


      self.openListener = function () {
        popup = document.getElementById("popup1");
        popup.open("#btnGo");
      }
      self.clearFilters = function () {
        self.currentStatus("All");
        popup.close();
        self.activityDataProvider(new CollectionDataProvider(self.myActivityCol))
      }

      self.closeFilter = function(){
        popup.close();
      }

      self.applyFilters = function () {
        if (this.filteredCollection === undefined) {
          this.filteredCollection = self.myActivityCol.clone();
          this.filteredDataProvider = new CollectionDataProvider(this.filteredCollection);
        }

        if (self.currentStatus() == "All") {
          self.activityDataProvider(new CollectionDataProvider(self.myActivityCol));
          popup.close();
          return;
        }
        var ret = self.myActivityCol.where({
          status: {
            value: self.currentStatus(),
            comparator: (model, attr, value) => {
              let name = model.get("status");
              return name.toLowerCase().includes(value.toLowerCase());
            },
          },
        });
        console.log(ret);
        this.filteredCollection.reset(ret);
        self.activityDataProvider(this.filteredDataProvider);

        popup.close();
      }

      self.startAnimationListener = (event) => {
        let ui = event.detail;
        if (event.target.id !== "popup1") {
          return;
        }
        if (ui.action === "open") {
          event.preventDefault();
          let options = { direction: "top" };
          AnimationUtils.slideIn(ui.element, options).then(ui.endCallback);
        }
        else if (ui.action === "close") {
          event.preventDefault();
          ui.endCallback();
        }
      };

      self.addAccounts = function () {

        /*       var model123 =  self.myActivityCol.add(
                 
                {
                  "SyncLocalId": 500,
                  "PartyNumber": "home",
                  "name": "home",
                  "SalesProfileStatus": "ACTIVE",
                  "OrganizationDEO_Status_c": "CANDIDATE",
                  "NextVisit": "2021-10-21T13:46:07+00:00",
                  "LastVisit": "2021-01-01T13:46:07+00:00"
                },
                  {
                    merge:true,
                    deferred:true,
                    at:1,
                    "SyncLocalId": 500,
                    "PartyNumber": "home",
                    "OrganizationName": "home",
                    "SalesProfileStatus": "ACTIVE",
                    "OrganizationDEO_Status_c": "CANDIDATE",
                    "NextVisit": "2021-10-21T13:46:07+00:00",
                    "LastVisit": "2021-01-01T13:46:07+00:00"
                  }
                )
                console.log(model123)
                model123.then((res)=>{
                    console.log(res)
                })
      */
        /* var res = self.myActivityCol.get(self.activityModel,{});
         console.log(res)
         res.then((res)=>{
           console.log(res)
         })*/
        self.router.go({ path: 'step1', params: {} });
      }
      self.showDetails = function (accountName, lmonth, lday, lyear, nmonth, nday, nyear, accountStatus, orgStatus) {
        let LastVisit, NextVisit = "";
        if (lday === undefined) {
          LastVisit = "NA";
        }
        else {
          LastVisit = lday + "," + lmonth + "," + lyear;
        }
        console.log(LastVisit)
        if (nday === undefined) {
          NextVisit = "NA";
        }
        else {
          NextVisit = nday + "," + nmonth + "," + nyear;
        }

        self.router.go({
          path: 'accountDetails', params: {
            "accountName": accountName,
            "LastVisit": LastVisit,
            "NextVisit": NextVisit,
            "accountStatus": accountStatus,
            "orgStatus": orgStatus
          }
        });

      }
      this.connected = () => {
        accUtils.announce('Customers page loaded.');
        document.title = "Customers";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return CustomerViewModel;
  }
);
