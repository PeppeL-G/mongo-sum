Package.describe({
	name: 'peppelg:mongo-sum',
	version: '1.0.0',
	summary: 'Reactive sum queries in MiniMongo on client.',
	// URL to the Git repository containing the source code for this package.
	git: '',
	documentation: 'README.md'
})

Package.onUse(function(api) {
	
	api.versionsFrom('1.0.3.1', 'client')
	
	api.use('mongo', 'client')
	api.use('reactive-var', 'client')
	
	api.addFiles('main.js', 'client')
	
})