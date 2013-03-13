var CollectionDemoCtrl = function ($scope, IndexedCollection) {
  $scope.items = new IndexedCollection(['item1', 'item2']).items;
};