mongo-sum
=================
A Meteor package making it easy to reactively calculate sums in Mongo
collections on the client.

This package adds a property called `sum` to `Mongo.Cursor.prototype` on
the client. It can be used to reactively calculate sums in a collection.
Example: 

```javascript
HighScores = new Mogno.Collection()
HighScores.insert({score:   10})
HighScores.insert({score:  100})
HighScores.insert({score: 1000})

Tracker.autorun(function(){
	console.log("The sum of all scores is "+HighScores.sum({}, 'score'))
})

// The follwing has been printed to the console: The sum of all scores is 1110

HighScores.insert({score: 1})

// The follwing has been printed to the console: The sum of all scores is 1111
```

Documentation
-----
`cursor.sum(fieldOrFunc)`

If the parameter `fieldOrFunc` is a string, it will return the sum of all the
values `doc[fieldOrString]` in the cursor. 

If the parameter `fieldOrFunc` is a function, it will return the sum of all the
values `fieldOrFunc(doc)` in the cursor. 

Note that `cursor.sum` is affected by tranformations, and that it overall will
work the same way as [cursor.count](http://docs.meteor.com/#/full/count)
(regarding reactivity).