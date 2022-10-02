// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed
$(document).ready(function () {
    $("#map-image").on("click")
    {

    }

    $('#go-to-top').click(function () {
        $('html,body').animate({scrollTop: 0}, 400);
        return false;
    });
    // 갤러리가 몇개 없으니 대충 복붙
    var portraitImageNames = ["portrait1.jpeg", "portrait2.jpeg", "portrait3.jpeg", "portrait4.jpeg", "portrait5.jpeg", "portrait6.jpeg", "portrait7.jpeg", "portrait8.jpeg"]
    var landscapeImageNames = ["landscape1.jpeg", "landscape2.jpeg", "landscape3.jpeg", "landscape4.jpeg", "landscape5.jpeg"]

    $(".card a img")[0].src = "images/" + portraitImageNames.splice(rand(0, portraitImageNames.length), 1)
    $(".card a img")[1].src = "images/" + landscapeImageNames.splice(rand(0, landscapeImageNames.length), 1)
    $(".card a img")[2].src = "images/" + landscapeImageNames.splice(rand(0, landscapeImageNames.length), 1)
    $(".card a img")[3].src = "images/" + portraitImageNames.splice(rand(0, portraitImageNames.length), 1)
    $(".card a img")[4].src = "images/" + portraitImageNames.splice(rand(0, portraitImageNames.length), 1)
    $(".card a img")[5].src = "images/" + landscapeImageNames.splice(rand(0, landscapeImageNames.length), 1)

    setCoupleAccounts()
})

function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function setCoupleAccounts() {
    addGroomAccounts(couple.groom.accounts)
    addBrideAccounts(couple.bride.accounts)
}

function addGroomAccounts(accounts) {
    accounts.forEach(function(account) {
        $("#groom-accounts").append(createAccountItemElement(account));
    })
}

function addBrideAccounts(accounts) {
    accounts.forEach(function(account) {
        $("#bride-accounts").append(createAccountItemElement(account));
    })
}

function createAccountItemElement(accountInfo) {
    var plainText = {
        bankName: accountInfo["bank_name"],
        bankAccountNumber: decodeAES256(accountInfo["bank_account_number"]),
        holderName: accountInfo["holder_name"]
    }
    return `<div class="dropdown-content-container">
               <div class="bank-account-item"><span onclick="copyToClipboard(this)">${plainText.bankName} ${plainText.bankAccountNumber}</span><br>${plainText.holderName}</div>
               <div class="quick-link-item">
                   <a href="http://kko.to/cqsSb1RLo" target="_blank"><img class="map-icon" src="images/icon/pay-qr.png" style="width: 30px"/></a>
                   <a href="http://kko.to/cqsSb1RLo" target="_blank"><img class="map-icon" src="images/icon/pay-logo.png" style="width: 30px"/></a>
               </div>
           </div>`
}

function getContact(coupleType, prefix) {
    console.log(prefix + ":" + decodeAES256(couple[coupleType]["phone_number"]))
    document.location.href = prefix + ":" + decodeAES256(couple[coupleType]["phone_number"])
}

function copyToClipboard(e) {
    var content = e.textContent
    navigator.clipboard.writeText(content)
            .then(() => {
                alert('클립보드에 복사하였습니다.')
            })
            .catch(err => {
                console.log('Something went wrong', err);
            })
}


function decodeAES256(data) {
    var cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(AES256_KEY), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);
};

function encodeAES56(data) {
    var cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(AES256_KEY), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
}

// Smooth scroll for links with hashes
$("a.smooth-scroll").click(function (event) {
    // On-page links
    if (
        location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
    ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $("html, body").animate(
                {
                    scrollTop: target.offset().top
                },
                1000,
                function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    }
                }
            );
        }
    }
});
