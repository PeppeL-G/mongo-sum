Mongo.Collection.prototype.sum = function(selector, field){
	
	// Get the cursor.
	var options = {
		fields: {},
		transform: null
	}
	options.fields[field] = 1
	
	var cursor = this.find(selector, options)
	
	// Calculate the sum at the moment.
	var initialSum = 0
	cursor.forEach(function(doc){
		initialSum += doc[field]
	})
	
	// Create the reactive variable storing the sum.
	var sum = new ReactiveVar(initialSum)
	
	// Change the sum on changes.
	var cursorHandle = cursor.observe({
		added: function(doc){
			sum.set(sum.get() + doc[field])
		},
		changed: function(newDoc, oldDoc){
			sum.set(sum.get() + newDoc[field] - oldDoc[field])
		},
		removed: function(doc){
			sum.set(sum.get() - doc[field])
		}
	})
	
	// Add a stop handle to the reactive sum variable.
	sum.stop = function(){
		cursorHandle.stop()
	}
	
	return sum
	
}