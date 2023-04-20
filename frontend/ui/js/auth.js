import Web3 from "web3";
import { abi, networks } from "../../../build/contracts/ProductVerification.json"
let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");
let submit = document.getElementById('submit');
let password = document.getElementById('password');


async function initWeb3() {
    if (window.ethereum) {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        var accounts = await web3.eth.getAccounts();
        var networkId = await web3.eth.net.getId();
        console.log("id = ", networkId, accounts);
        const account = accounts[0];
        const contract = new web3.eth.Contract(abi, networks[1681805840501].address);
        console.log(contract, account);
        localStorage.setItem("networkId", networkId)
        localStorage.setItem("account", account)
        document.getElementById('companyID').value = account;
        // return account;
    } else {
        alert("No Ethereum Window Detected!!");
        // return;
    }
}

initWeb3();


submit.addEventListener('click', () => {
    let passwordCheck = password.value;
    if (passwordCheck == "Test@123") {
        window.location.href = 'http://localhost:5173/pages/timeline.html';
    }
})
signup.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
});