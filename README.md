mongo-sum
=================
A Meteor package making it easy to reactively calculate sums in Mongo
collections on the client.

This package adds a property called `sum` to `Mongo.Collection.prototype` on
the client. It can be used to reactively calculate sums in a collection.
Example: 

```javascript
HighScores = new Mogno.Collection()
HighScores.insert({score:   10})
HighScores.insert({score:  100})
HighScores.insert({score: 1000})

var totalScore = HighScores.sum({}, 'score')

console.log("The sum of all scores is "+totalScore.get()) // Logs: The sum of all scores is 1110
totalScore.stop()
```

Documentation
-----
`collection.sum(selector, field, options)`

`selector` and `options` work the same way as for
[collection.find](http://docs.meteor.com/#/full/find). `options` is optional.
`field` is the field in the collection that should be summed.

Returns an instance of `ReactiveVar` that will be updated reactively. Use the
`get` method to retrive the sum. Don't use the `set` method. An additional
`stop` method has been added to the returned instance. This method must be
called when you've used the `get` method for the last time (otherwise will the
reactive instance returned continue to be updated for infinity (AKA memory leak).

Advice
------
Using `collection.sum` in reactive computations (for example template helpers)
is probably a bad idea. Instead, use the returned `ReactiveVar` instance's
`get` method in reactive computations. Typically, in templates, it would look
like this:

```javascript
Template.myTemplate.created = function(){
	this.sum = MyCollection.sum({}, 'theField')
}

Template.myTemplate.helpers({
	sum: function(){
		return this.sum.get()
	}
})

Template.myTemplate.destroyed = function(){
	this.sum.stop()
}
```