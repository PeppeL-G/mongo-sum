Mongo.Cursor.prototype.sum = function(fieldOrFunc){
	
	// This code is written by looking at and copying code in the count and map
	// methods. Therefore, a better implementation may exists.
	var self = this
	
	if(self.reactive){
		self._depend({added: true, removed: true}, true)
	}
	
	var sum = 0
	
	if(_.isFunction(fieldOrFunc)){
		
		var func = fieldOrFunc
		
		self.forEach(function(doc){
			sum += func(doc)
		})
		
	}else{
		
		var field = fieldOrFunc
		
		self.forEach(function(doc){
			sum += doc[field]
		})
		
	}
	
	return sum
	
}