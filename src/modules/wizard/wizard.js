angular.module('wizard', ['collection']).
	factory('Step',[function(){
		var Step = function(heading){
			this.status = undefined;
			this.heading = heading;
		}

		Step.prototype.activate = function() {
			this.status = 'active';
		};

		Step.prototype.reset = function() {
			this.status = undefined;
		};

		Step.prototype.complete = function() {
			this.status = 'complete';
		};		

		return Step;

	}]).
	directive('pane', ['Step', function(Step){
		return {
			restrict: "E",
			replace: true,
			require: "^wizard",
			templateUrl: "template/wizard/pane.html",
			transclude: true,
			scope: { heading:'@' },
			link: function(scope, element, attrs, wizardCtrl){								
				scope.step = new Step(scope.heading);
				scope.$watch('heading',function(heading){
					scope.step.heading = heading;
				});

				wizardCtrl.addStep(scope.step);				
			}
		}
	}]).	
	controller('WizardCtrl', ['$scope', 'IndexedCollection', function($scope, IndexedCollection){

		var steps = new IndexedCollection(),
			currentStep;		

		//public
		this.nextStep = function(){
			if( steps.haveNext(currentStep) ){				
				completeCurrentStep();
				activateNextStep();
			}
		}

		this.prevStep = function(){
			if( steps.havePrevious(currentStep) ){								
				deactivateCurrentStep();
				activatePrevStep();				
			}
		}

		this.addStep = function(stepScope){						
			if( steps.isEmpty() ){
				activateStep(stepScope);
			}
			steps.add(stepScope);			
		}

		//private
		function deactivateCurrentStep(){
			currentStep.reset();
		}

		function completeCurrentStep(){
			currentStep.complete();
		}

		function activateNextStep(){
			activateStep( steps.getNext( currentStep ) );
		}

		function activatePrevStep() {			
			activateStep( steps.getPrevious( currentStep ) );
		}		

		function activateStep(step){			
			currentStep = step;	
			currentStep.activate();
		}		

		//scope api
		$scope.steps = steps.items;
		$scope.nextStep = this.nextStep;
		$scope.prevStep = this.prevStep;
		
	}]).
	directive('wizard', [function(){
		return {
			restrict: "E",
			controller: "WizardCtrl",
			replace: true,
			templateUrl: "template/wizard/wizard.html",			
			scope: {},
			transclude: true
		}
	}]);