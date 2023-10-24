document.getElementById('encrypt-body').classList.add('hide')
document.getElementById('decrypt-body').classList.add('hide')

console.log("IN JS")


const keyPair = eccryptoJS.generateKeyPair();
let str = '';
let encrypted = null;

document.getElementById('pubKey').innerHTML = "PUBLIC KEY = " + keyPair.publicKey.toString('base64');
document.getElementById('private_key').innerHTML = "PRIVATE KEY = " + keyPair.privateKey.toString('base64');


document.querySelector('.key-generation-btn').addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById('pubKey').value = keyPair.publicKey.toString('base64');
    document.getElementById('private_key').value = keyPair.privateKey.toString('base64');

    const public_key = keyPair.publicKey.toString('base64');
    const privKey = keyPair.privateKey.toString('base64');
    const keys = `Public Key: ${public_key}\nPrivate Key: ${privKey}`;
    const blob = new Blob([keys], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'keys.txt';
    link.click();
    URL.revokeObjectURL(url);
});

document.getElementById('key-navlink').addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById('key-body').classList.add('hide')
    document.getElementById('encrypt-body').classList.remove('hide')
});

document.getElementById("plainTXT_encrypt").addEventListener("input", function(e) {
    str = this.value;
});

document.querySelector('.encrypt-btn').addEventListener("click", async function(e) {
    e.preventDefault();
    const msg = eccryptoJS.utf8ToBuffer(str);
    encrypted = await eccryptoJS.encrypt(keyPair.publicKey, msg);
    document.getElementById('cipherTXT_encrpyt').value = encrypted.ciphertext.toString('base64')
})

document.getElementById('encrypt-navlink').addEventListener('click', async function(e){
    e.preventDefault();
    document.getElementById('encrypt-body').classList.add('hide')
    document.getElementById('decrypt-body').classList.remove('hide')
});

document.querySelector('.decrypt-btn').addEventListener("click", async function(e){
    e.preventDefault();
    const decrypted = await eccryptoJS.decrypt(keyPair.privateKey, encrypted);
    document.getElementById('decrypted_text').value = decrypted.toString()
})

document.getElementById('decrypt-navlink').addEventListener('click', async function(e){
    e.preventDefault();
    document.getElementById('decrypt-body').classList.add('hide')
    document.getElementById('key-body').classList.remove('hide')
});




