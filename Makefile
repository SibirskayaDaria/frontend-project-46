install:
	npm ci
gendiff:
	node gendiff.js
lint:
	npx eslint .
publish:
	npm publish --dry-run
test-coverage:
	npm test -- --coverage
link:
	sudo npm link