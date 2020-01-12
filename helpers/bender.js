function isCaps(lastCode) {
	var upperBoundUpper = "Z".charCodeAt(0);
	var lowerBoundUpper = "A".charCodeAt(0);

	if (lastCode <= upperBoundUpper && lastCode >= lowerBoundUpper)
		return true;

	return false;
}

function isLower(lastCode) {
	var upperBoundLower = "z".charCodeAt(0);
	var lowerBoundLower = "a".charCodeAt(0);

	if (lastCode <= upperBoundLower && lastCode >= lowerBoundLower)
		return true;

	return false;
}


function isAlphabet(lastCode) {
	return isLower(lastCode) || isCaps(lastCode);
}

module.exports = {
	getSpongebobString: function (msgArg) {
		if (msgArg == null)
			return null;

		var spg = "";
		var chance = 0.5;

		for (i = 0; i < msgArg.length; ++i) {

			lastChar = msgArg.charAt(i);
			lastCode = msgArg.charCodeAt(i);

			if (isAlphabet(lastCode)) {
					// Use a "feedback" technique to reduce the chance of multiple consecutive cased letters
					chance = Math.random() - ((chance - 0.5) / 2);
					spg += Math.round(chance) ? lastChar.toUpperCase() : lastChar.toLowerCase();
					continue;
			}

			spg += lastChar;
		}

		return spg;
	},

	getUpperCaseString: function (msgArg) {
		if (msgArg == null)
			return null;

		return msgArg.toUpperCase();
	},

	getLowerCaseString: function (msgArg) {
		if (msgArg == null)
			return null;

		return msgArg.toLowerCase();
	},

	getInvertedCaseString: function (msgArg) {
		if (msgArg == null)
			return null;

		var spg = "";

		for (i = 0; i < msgArg.length; ++i) {

			lastChar = msgArg.charAt(i);
			lastCode = msgArg.charCodeAt(i);

			if (isCaps(lastCode))
				lastChar = lastChar.toLowerCase();
			else
				lastChar = lastChar.toUpperCase();

			spg += lastChar;
		}

		return spg;
	},

	getCasedString: function (msgArg, type) {
		if (type == 0)
			return this.getLowerCaseString(msgArg);
		else if (type == 1)
			return this.getUpperCaseString(msgArg);
		else if (type == 2)
			return this.getInvertedCaseString(msgArg);

		return null;
	},

	getSpacedMsg: function (msg, cmd) {
		var builder = "";

		// Clean the message (extra whitespaces)
		msg = msg.replace(/\s+/g, "");

		// Probability to add space (or tab)
		var chance = 0.5;
		var tabBias = 0.8;

		if (cmd == 'spacew' || cmd == 'biggspacew') {
			msg = msg.split(' ');
			tabBias = 0.6;
		}

		if (cmd.substring(0, 4) == 'bigg')
			tabBias = 0.5

		for (i = 0; i < msg.length;) {
			if (chance > tabBias) {
				builder += '        ';
			} else if (chance > (tabBias - 0.25)) {
				builder += '  ';
			} else {
				builder += msg[i] + ' ';
				++i;
			}

			chance = Math.random();
		}
		return builder;
	},
};