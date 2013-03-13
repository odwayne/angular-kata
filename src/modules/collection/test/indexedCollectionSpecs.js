describe('The Indexed Collection', function(){
	var collection, emptyCollection;

	beforeEach(module('collection'));	

	beforeEach(inject(function(IndexedCollection){
		collection = new IndexedCollection(['value1','value2','value3']);
		emptyCollection = new IndexedCollection();
	}));

	it('shoud tell if it is empty', function(){
		expect(emptyCollection.isEmpty()).toBe(true);
	});

	it('should have a size', function(){
		expect(collection.size()).toBe(3);
	});

	it('should have an array of items', function(){
		expect(collection.items).toBeDefined();
	});

	it('should add a new item', function(){
		collection.add('value4');
		expect(collection.size()).toBe(4);
	});

	it('should tell if there is a item after another', function(){
		var first = collection.getAt(0),
			last = collection.getLast();

		expect(collection.haveNext(first)).toBe(true);
		expect(collection.haveNext(last)).toBe(false);
	});

	it('should tell if there is a item before another', function(){
		var first = collection.getAt(0),
			last = collection.getLast();

		expect(collection.havePrevious(first)).toBe(false);
		expect(collection.havePrevious(last)).toBe(true);
	});

	it('should get the next element', function(){
		var first = collection.getAt(0),
			second = collection.getAt(1);

		expect(collection.getNext(first)).toBe(second);
	});

	it('should get the next element', function(){
		var first = collection.getAt(0),
			second = collection.getAt(1);

		expect(collection.getPrevious(second)).toBe(first);
	});

});