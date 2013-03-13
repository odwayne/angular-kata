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