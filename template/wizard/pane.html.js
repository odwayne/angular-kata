angular.module("template/wizard/pane.html", []).run(["$templateCache", function($templateCache){
  $templateCache.put("template/wizard/pane.html",
    "<div class='pane' ng-class='step.status' ng-transclude></step>");
}]);
