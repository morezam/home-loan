const borrowerResolver = require('./borrowerResolver');
const userResolver = require('./userResolver');
const loanResolver = require('./loanResolver');
const installmentResolver = require('./installmentResolver');

module.exports = [
	borrowerResolver,
	userResolver,
	loanResolver,
	installmentResolver,
];
