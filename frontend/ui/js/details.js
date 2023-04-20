import Web3 from "web3";
import { abi, networks } from "../../../build/contracts/ProductVerification.json"

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(abi, networks[1681805840501].address);
var account = 0x0;
web3.eth.getAccounts().then(accounts => {
    account = accounts[0];
    document.getElementById('ad').value = account;
});


var button = document.getElementById('submit');
var form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let manufacturing = new Date(e.target.mdate.value).getTime();
    let transferring = new Date().getTime();
    let expiry = new Date(e.target.edate.value).getTime();
    let role = e.target.role.value;
    let medicineID = "" + e.target.medicineID.value;
    let OwnerLincense = e.target.oln.value;
    let price = e.target.price.value;
    let radiomanu = e.target.radiomanu.checked;
    let othername = e.target.othername.checked;
    console.log(radiomanu, othername);
    // console.log(name, manufacturing, expiry, role, currentOwnerHash, medicineID, OwnerLincense);
    if (radiomanu) {
        addProduct(name, manufacturing, expiry, role, OwnerLincense, price, medicineID, account);
    } else if (othername) {
        updateOwnership(parseInt(medicineID), transferring, role, OwnerLincense, account);
    }
})


async function addProduct(name, manufacturing, expiry, role, OwnerLincense, price, medicineID, account) {
    contract.methods.addProduct(name, manufacturing, 0, expiry, role, OwnerLincense, price, medicineID, web3.utils.toChecksumAddress(account)).send({ from: web3.utils.toChecksumAddress(account) },
        (error, result) => {
            console.log(error, result);
            window.location.reload();
        }
    );
}

async function updateOwnership(medicineID, transfer, role, OwnerLincense, account) {
    contract.methods.updateOwnership(medicineID, transfer, role, OwnerLincense, web3.utils.toChecksumAddress(account)).send({ from: web3.utils.toChecksumAddress(account) },
        (error, result) => {
            console.log(error, result);
            window.location.reload();
        }
    );
}