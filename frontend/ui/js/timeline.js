import Web3 from "web3";
import { abi, networks } from "../../../build/contracts/ProductVerification.json"
const web3 = new Web3(window.ethereum);

$(document).ready(function() {
    const contract = new web3.eth.Contract(abi, networks[1681805840501].address);
    // Your code here

    var address = window.location.search

    // Returns a URLSearchParams object instance
    var parameterList = new URLSearchParams(address)
    var id = parameterList.get('id')
    console.log(id);

    var div = `
        <div class="order-track-status">
            <span class="order-track-status-dot"></span>
            <span class="order-track-status-line"></span>
        </div>
        <div class="order-track-text">
            <p class="order-track-text-stat">Role: <span id="role" class="role"></span>| License Number: <span id="ln" class="ln"></span></p>
            <p class="order-track-text-stat">Address: <span id="coh" class="coh"></span></p>
            <span class="order-track-text-sub">Receiving Date: <span id="tdate" class="tdate"></span></span>
        </div>
    `
    if (id == '0') {
        document.getElementById('medicinID').value = 0;
        getData();
    }

    var timeline = document.getElementById('order-track');
    $('#button').click(function(e) {
        getData();
        // console.log(details);
    });

    function getData() {
        document.getElementById('section').classList.remove('hide');
        var medicineID = parseInt($('#medicinID').val());
        console.log(medicineID, typeof(medicineID));
        contract.methods.returnDetails(medicineID).call().then(result => {
            var first = result[0];
            console.log(parseInt("" + first[1] + '000'));
            console.log(new Date("" + new Date().getTime()));
            document.getElementById('medicineID').innerHTML = first[7];
            document.getElementById('medicine_name').innerHTML = first[0];
            document.getElementById('mdate').innerHTML = new Date(parseInt("" + first[1] + '000'));
            document.getElementById('edate').innerHTML = new Date(parseInt("" + first[3] + '000'));
            document.getElementById('cost').innerHTML = first[8];
            // document.getElementById('cost').innerHTML = first[9];
            result.forEach(element => {
                console.log(element);
                var layer = document.createElement('div');
                layer.classList.add('order-track-step');
                layer.innerHTML = div;
                layer.getElementsByClassName('role')[0].innerHTML = element[4];
                layer.getElementsByClassName('ln')[0].innerHTML = element[5];
                layer.getElementsByClassName('coh')[0].innerHTML = element[6];
                layer.getElementsByClassName('tdate')[0].innerHTML = new Date(element[2] * 1000);
                timeline.appendChild(layer);
            });
        });
    }



    (function($) {

        $.fn.timeline = function() {
            var selectors = {
                id: $(this),
                item: $(this).find(".timeline-item"),
                activeClass: "timeline-item--active",
                img: ".timeline__img"
            };
            selectors.item.eq(0).addClass(selectors.activeClass);
            selectors.id.css(
                "background-image",
                "url(" +
                selectors.item
                .first()
                .find(selectors.img)
                .attr("src") +
                ")"
            );
            var itemLength = selectors.item.length;
            $(window).scroll(function() {
                var max, min;
                var pos = $(this).scrollTop();
                selectors.item.each(function(i) {
                    min = $(this).offset().top;
                    max = $(this).height() + $(this).offset().top;
                    var that = $(this);
                    if (i == itemLength - 2 && pos > min + $(this).height() / 2) {
                        selectors.item.removeClass(selectors.activeClass);
                        selectors.id.css(
                            "background-image",
                            "url(" +
                            selectors.item
                            .last()
                            .find(selectors.img)
                            .attr("src") +
                            ")"
                        );
                        selectors.item.last().addClass(selectors.activeClass);
                    } else if (pos <= max - 40 && pos >= min) {
                        selectors.id.css(
                            "background-image",
                            "url(" +
                            $(this)
                            .find(selectors.img)
                            .attr("src") +
                            ")"
                        );
                        selectors.item.removeClass(selectors.activeClass);
                        $(this).addClass(selectors.activeClass);
                    }
                });
            });
        };
    })(jQuery);

    $("#timeline-1").timeline();


});