const assert = require('assert')
const addPackagesToIndex = require('../lib/addPackagesToIndex.js')

describe('addPackagesToIndex', function() {
	let index, packages

	beforeEach(function() {
		index = []
		packages = {
			"@kessler/exponential-backoff": "^2.0.0",
			"async": "^0.9.0",
			"debug": "^3.1.0",
			"lodash": "^4.17.11",
			"rc": "^1.2.8",
			"request": "^2.88.0",
			"semver": "^5.4.1",
			"stubborn": "^1.2.5",
			"text-table": "^0.2.0",
			"visit-values": "^1.0.1"
		}
	})

	it('adds a package to the index', function() {
		addPackagesToIndex({ "foo": "*" }, index)

		assert.deepStrictEqual(index, [{ fullName: 'foo', name: 'foo', version: '*', scope: undefined, alias: '' }])
	})

	it('adds a scoped package to the index', function() {
		addPackagesToIndex({ "@bar/foo": "*" }, index)

		assert.deepStrictEqual(index, [{ fullName: '@bar/foo', name: 'foo', version: '*', scope: 'bar', alias: '' }])
	})

	it('does not add duplicate packages, same package is a package that has the same name, version expression and scope', function() {
		addPackagesToIndex({ "@bar/foo": "*" }, index)
		addPackagesToIndex({ "@bar/foo": "*" }, index)
		addPackagesToIndex({ "@bar/foo": "1.2.3" }, index)
		addPackagesToIndex({ "foo": "1.1.1" }, index)
		addPackagesToIndex({ "foo": "1.1.1" }, index)
		addPackagesToIndex({ "foo": "1.2.3" }, index)

		assert.deepStrictEqual(index, [
			{ fullName: '@bar/foo', name: 'foo', version: '*', scope: 'bar', alias: '' },
			{ fullName: '@bar/foo', name: 'foo', version: '1.2.3', scope: 'bar', alias: '' },
			{ fullName: 'foo', name: 'foo', version: '1.1.1', scope: undefined, alias: '' },
			{ fullName: 'foo', name: 'foo', version: '1.2.3', scope: undefined, alias: '' }
		])
	})

	it('excludes package names that are specified in the exclusion parameter, currently this is a broad exclusion, i.e all packages with specified names are excluded', function() {
		const exclude = ['@bar/foo']
		addPackagesToIndex({ "@bar/foo": "1.2.3" }, index, exclude)
		addPackagesToIndex({
			"@bar/foo": "*",
			"foo": "1.1.1"
		}, index, exclude)

		assert.deepStrictEqual(index, [{ fullName: 'foo', name: 'foo', version: '1.1.1', scope: undefined, alias: '' }])
	})

	it('add package with alias to the index', function() {
		addPackagesToIndex({ "mocha_8.3.1": "npm:mocha@^8.3.1" }, index)

		assert.deepStrictEqual(index, [{ fullName: 'mocha', name: 'mocha', version: '^8.3.1', scope: undefined, alias: 'mocha_8.3.1' }])
	});

	it('add scoped package with alias to the index', function() {
		addPackagesToIndex({ "@kessler/tableify_1.0.1": "npm:@kessler/tableify@^1.0.1" }, index)

		assert.deepStrictEqual(index, [{ fullName: '@kessler/tableify', name: 'tableify', version: '^1.0.1', scope: 'kessler', alias: '@kessler/tableify_1.0.1' }])
	});
})