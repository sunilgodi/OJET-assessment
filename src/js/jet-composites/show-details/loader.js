/**
  Copyright (c) 2015, 2021, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
define(['ojs/ojcomposite', 'text!./show-details-view.html',
 './show-details-viewModel', 'text!./component.json', 
 'css!./show-details-styles',"ojs/ojactioncard"],
  function(Composite, view, viewModel, metadata) {
    Composite.register('show-details', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);