
function test() {
	//RSAKeyPair(encryptionExponent, decryptionExponent, modulus)
	pvkey = new RSAKeyPair("0", "202700adbd85e2d7182720c3a0ee19c1", "30db31542ace0f7d37a629ee5eba28cb");
	pbkey = new RSAKeyPair("10001", "0", "30db31542ace0f7d37a629ee5eba28cb");
	
	ciphertext = encryptedString(pbkey, "abc");
	plaintext = decryptedString(pvkey, ciphertext);
}

function test1() {
	//RSAKeyPair(encryptionExponent, decryptionExponent, modulus)
	pvkey1 = new RSAKeyPair("202700adbd85e2d7182720c3a0ee19c1", "0", "30db31542ace0f7d37a629ee5eba28cb");
	pbkey1 = new RSAKeyPair("0", "10001", "30db31542ace0f7d37a629ee5eba28cb");
	
	ciphertext = encryptedString(pvkey1, "abc");
	plaintext = decryptedString(pbkey1, ciphertext);
}

function test2() {
	//RSAKeyPair(encryptionExponent, decryptionExponent, modulus)
	pvkey2 = new RSAKeyPair("202700adbd85e2d7182720c3a0ee19c1", "202700adbd85e2d7182720c3a0ee19c1", "30db31542ace0f7d37a629ee5eba28cb");
	pbkey2 = new RSAKeyPair("10001", "10001", "30db31542ace0f7d37a629ee5eba28cb");
	
	ciphertext = encryptedString(pvkey2, "abc");
	plaintext = decryptedString(pbkey2, ciphertext);
	
	ciphertext = encryptedString(pbkey2, "abc");
	plaintext = decryptedString(pvkey2, ciphertext);
}

primes = [1299553, 1299583, 1299601, 1299631, 1299637, 1299647, 1299653, 1299673, 1299689, 1299709];
var unique = 329121321414214;
var limit = 10;

function getAuthkey(unique, limit) {
	pvkey2 = new RSAKeyPair("202700adbd85e2d7182720c3a0ee19c1", "202700adbd85e2d7182720c3a0ee19c1", "30db31542ace0f7d37a629ee5eba28cb");
	
	var shaAuthkey = hex_sha1((unique + primes[10 - limit]).toString());
	var authkey = encryptedString(pvkey2, shaAuthkey);
	return authkey;
}

function getShortAuthkey(unique, limit) {
	pvkey2 = new RSAKeyPair("202700adbd85e2d7182720c3a0ee19c1", "202700adbd85e2d7182720c3a0ee19c1", "30db31542ace0f7d37a629ee5eba28cb");
	
	var RSAAuthkey = encryptedString(pvkey2, (unique + primes[10 - limit]).toString());
	var authkey = hex_sha1(RSAAuthkey);
	var shortAuthkeyStr = authkey.substr(0, 5);
	var shortAuthkeyNum = Math.floor(parseInt(shortAuthkeyStr, 16) / 1.048577);
	var shortAuthkey = shortAuthkeyNum.toString();
	if (shortAuthkeyNum < 100000) {
		shortAuthkey = shortAuthkeyNum.toPrecision(6).split(".")[1].concat(shortAuthkeyNum);
	}
	//shortAuthkey = ?
	return shortAuthkey;
}
