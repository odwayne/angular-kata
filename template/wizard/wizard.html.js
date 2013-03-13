angular.module("template/wizard/wizard.html", []).run(["$templateCache", function($templateCache){
  $templateCache.put("template/wizard/wizard.html",
    "<div class=\"wizard\">			" +
    "	" +
    "	<ul class=\"steps\">" +
    "		<li ng-repeat=\"step in steps\" ng-class='step.status'>" +
    "			<a ng-bind=\"step.heading\"></a>" +
    "		</li>		" +
    "	</ul>	" +
    "" +
    "	<div class=\"actions\">" +
    "		<button class=\"btn btn-mini btn-prev\" ng-click=\"prevStep()\">   " +
    "			<i class=\"icon-arrow-left\"></i>Prev" +
    "		</button>" +
    "		<button class=\"btn btn-mini btn-next\" data-last=\"Finish\" ng-click=\"nextStep()\">" +
    "			Next<i class=\"icon-arrow-right\"></i>" +
    "		</button>" +
    "	</div>" +
    "" +
    "	<div class=\"panes\" ng-transclude></div>" +
    "	" +
    "</div>");
}]);
