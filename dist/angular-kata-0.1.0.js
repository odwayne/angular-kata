angular.module('collection', []).
	factory('IndexedCollection',[function(){
		
		var IndexedCollection = function(items){
			this.items = items || [];
		}
				
		IndexedCollection.prototype.isEmpty = function() {
			return this.size() === 0;
		};

		IndexedCollection.prototype.size = function() {
			return this.items.length;
		};

		IndexedCollection.prototype.add = function(item){
			this.items.push(item);
		};

		IndexedCollection.prototype.getAt = function(idx){
			return this.items[idx];
		};

		IndexedCollection.prototype.getNext = function(refenceItem){
			var nextIndex = this.items.indexOf(refenceItem) + 1;
			return this.getAt( nextIndex );
		};

		IndexedCollection.prototype.getPrevious = function(refenceItem){
			var previousIndex = this.items.indexOf(refenceItem) - 1;
			return this.getAt( previousIndex );
		};

		IndexedCollection.prototype.getLast = function(){
			return this.getAt( this.size() - 1 );
		};

		IndexedCollection.prototype.haveNext = function(referenceItem){
			return this.items.indexOf(referenceItem)+1 < this.size();
		};

		IndexedCollection.prototype.havePrevious = function(referenceItem){
			return this.items.indexOf(referenceItem) > 0;
		};
		
		return IndexedCollection;
	}]);
describe('The Indexed Collection', function(){
	var collection, emptyCollection;

	beforeEach(module('collection'));	

	beforeEach(inject(function(IndexedCollection){
		collection = new IndexedCollection(['value1','value2','value3']);
		emptyCollection = new IndexedCollection();
	}));

	// it('shoud tell if it is empty', function(){
	// 	expect(emptyCollection.isEmpty()).toBe(true);
	// });

	// it('should have a size', function(){
	// 	expect(collection.size()).toBe(3);
	// });

	// it('should have an array of items', function(){
	// 	expect(collection.items).toBeDefined();
	// });

	// it('should add a new item', function(){
	// 	collection.add('value4');
	// 	expect(collection.size()).toBe(4);
	// });

	// it('should tell if there is a item after another', function(){
	// 	var first = collection.getAt(0),
	// 		last = collection.getLast();

	// 	expect(collection.haveNext(first)).toBe(true);
	// 	expect(collection.haveNext(last)).toBe(false);
	// });

	// it('should tell if there is a item before another', function(){
	// 	var first = collection.getAt(0),
	// 		last = collection.getLast();

	// 	expect(collection.havePrevious(first)).toBe(false);
	// 	expect(collection.havePrevious(last)).toBe(true);
	// });

	// it('should get the next element', function(){
	// 	var first = collection.getAt(0),
	// 		second = collection.getAt(1);

	// 	expect(collection.getNext(first)).toBe(second);
	// });

	it('should get the next element', function(){
		var first = collection.getAt(0),
			second = collection.getAt(1);

		expect(collection.getPrevious(second)).toBe(first);
	});

});
var CollectionDemoCtrl = function ($scope, IndexedCollection) {
  $scope.items = new IndexedCollection(['item1', 'item2']).items;
};
describe('The Wizard Module', function(){
	beforeEach(module('wizard'));

	describe('The Wizard Directive', function(){
		var elm, scope, headings, panes;

		beforeEach(module('template/wizard/wizard.html'));
		beforeEach(module('template/wizard/pane.html'));
		beforeEach(module('wizard'));
		
		beforeEach(inject(function($compile, $rootScope){		 

			elm = angular.element(
				'<wizard>' +
					'<pane heading="Step 1">' +
						'Content 1' +					
					'</pane>' +
					'<pane heading="Step 2">' +
						'Content 2' +					
					'</pane>' +
				'</wizard>');

			scope = $rootScope;
		    $compile(elm)(scope);
		    scope.$digest();
		    
		    headings = elm.find('ul.steps li a')
		    panes = elm.find('div.panes .pane');
		}));

		it('should be a element with "wizard" class', function(){		
		    expect(elm).toHaveClass('wizard');
		});		

		it('should create clickable steps with their heading text in the navigation', function(){						
		    expect(headings.length).toBe(2);
		    expect(headings.eq(0).text()).toBe('Step 1');
		    expect(headings.eq(1).text()).toBe('Step 2');		    
		});				

		it('should bind the content', function() {			
			expect(panes.length).toBe(2);
			expect(panes.eq(0).text()).toBe('Content 1');
			expect(panes.eq(1).text()).toBe('Content 2');
		});

		it('shoud activate the first step', function() {
			expect(headings.parent().eq(0)).toHaveClass('active');
			expect(panes.eq(0)).toHaveClass('active');

			expect(headings.parent().eq(1)).not.toHaveClass('active');
			expect(panes.eq(1)).not.toHaveClass('active');
			
		});		

		it('should activate the next step', function(){
			elm.find('.btn-next').click();

			expect(headings.parent().eq(1)).toHaveClass('active');
			expect(panes.eq(1)).toHaveClass('active');

			expect(headings.parent().eq(0)).toHaveClass('complete');
			expect(panes.eq(0)).toHaveClass('complete');
		});

		it('should activate the prev step', function(){			
			elm.find('.btn-next').click();
			elm.find('.btn-prev').click();

			expect(headings.parent().eq(0)).toHaveClass('active');
			expect(panes.eq(0)).toHaveClass('active');

			expect(headings.parent().eq(1)).not.toHaveClass('active');
			expect(panes.eq(1)).not.toHaveClass('active');
		});

	});

	describe('The Wizard Controller', function(){
		var ctrl, wizardScope, firstStep;

		beforeEach(inject(function($controller, $rootScope, Step) {		    
		    ctrl = $controller('WizardCtrl', {$scope: wizardScope = $rootScope});
		    firstStep = new Step();
		    ctrl.addStep(firstStep);
		 }));

		it('shoud add a child step scope to the wizardScope', inject(function($rootScope){						
			expect(wizardScope.steps).toBeDefined();
			expect(wizardScope.steps.length).toBe(1);
		}));

		it('should set the first step as active', function(){			
			expect(firstStep.status).toBe('active');			
		});

		it('should advance to next step', inject(function(Step){
			var secondStep = new Step();
			ctrl.addStep(secondStep);
			ctrl.nextStep();
			
			expect(firstStep.status).toBe('complete');
			expect(secondStep.status).toBe('active');
		}));

		it('should back to previous step', inject(function(Step){
			var secondStep = new Step(),
				thirdStep = new Step();

			ctrl.addStep(secondStep);
			ctrl.addStep(thirdStep);

			ctrl.nextStep();
			ctrl.nextStep();
			
			expect(secondStep.status).toBe('complete');
			expect(thirdStep.status).toBe('active');

			ctrl.prevStep();
			
			expect(secondStep.status).toBe('active');
			expect(thirdStep.status).toBeUndefined();
		}));
	});
	describe('The Step Factory', function(){
		var step;
		beforeEach(inject(function(Step){
			step = new Step('Heading One');
		}));

		it('should have a heading', function(){
			expect(step.heading).toBe('Heading One');
		});

		it('should be initialized with undefined status', function(){
			expect(step.status).toBeUndefined();
		});

		it('should became active', function(){
			step.activate();
			expect(step.status).toBe('active');
		});

		it('should became complete', function(){
			step.complete();
			expect(step.status).toBe('complete');
		});

		it('should revert his status', function(){
			step.activate();
			step.reset();
			expect(step.status).toBeUndefined();

			step.complete();
			step.activate();
			expect(step.status).toBe('active');
		});
	});
});
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