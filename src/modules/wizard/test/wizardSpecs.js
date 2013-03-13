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