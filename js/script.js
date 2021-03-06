
// focus the name field
const $name = $('#name');
$name.focus();


// job role section
$('#other-job-role').hide();
const $jobRole = $('#title');
$jobRole.on('change', e => {
    if (e.target.value === 'other') {
        $('#other-job-role').show();
    } else {
        $('#other-job-role').hide();
    }
});

// t-shirt info section
// https://api.jquery.com/attribute-equals-selector/ referenced for this part
const $color = $('#color');
$color.prop('disabled', true);

$('#design').on('change', e => {
    $color.prop('disabled', false);

    if (e.target.value === 'js puns') {
        $("[data-theme='heart js']").hide();
        $("[data-theme='heart js']")[0].removeAttribute('selected');
        $("[data-theme='js puns']")[0].setAttribute('selected', 'selected');
        $("[data-theme='js puns']").show();
    } else if (e.target.value === 'heart js') {
        $("[data-theme='js puns']").hide();
        $("[data-theme='js puns']")[0].removeAttribute('selected');
        $("[data-theme='heart js']")[0].setAttribute('selected', 'selected');
        $("[data-theme='heart js']").show();
    }
});

// register for actvities section
const $activities = $('.activities');
let totalCost = 0;

// event listener for updating the total cost of the activities
$activities.on('change', e => {
    const dataCost = (parseInt($(e.target).attr('data-cost')));
    if (e.target.checked) {
        totalCost = totalCost + dataCost;
    } else {
        totalCost = totalCost - dataCost;
    }
    $('#activities-cost').html(`Total: $${totalCost}`);
});

// payment info section
const $payment = $('#payment');
$payment.val('credit-card');
$('#paypal').hide();
$('#bitcoin').hide();

// event listener for changes in payment method to change the following information given/needed
$payment.on('change', e => {
    if ($payment.val() === 'paypal') {
        $('#paypal').show();
        $('#bitcoin').hide();
        $('#credit-card').hide();
    }
    if ($payment.val() === 'bitcoin') {
        $('#bitcoin').show();
        $('#paypal').hide();
        $('#credit-card').hide();
    }
    if ($payment.val() === 'credit-card') {
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();
    }
});

// form validation
function isNameValid() {
    const $nameInput = $('#name').val();
    // regex for proper name format (at least any 1 character)
    let validName = /^.+$/;
    return validName.test($nameInput);
}

function isEmailValid() {
    const $emailInput = $('#email').val();
    // regex for a proper email address format
    let validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validEmail.test($emailInput);
}

function isCardNumberValid() {
    const $cardNumberInput = $('#cc-num').val();
    // regex for credit card number (between 13-16 digits)
    let validCCNumber = /^\d{13,16}$/;
    return validCCNumber.test($cardNumberInput);
}

function isZipValid() {
    const $cardNumberInput = $('#zip').val();
    // regex for zip code (5 digits)
    let validZip = /^\d{5}$/;
    return validZip.test($cardNumberInput);
}

function isCvvValid() {
    const $cardNumberInput = $('#cvv').val();
    // regex for cvv (3 digits)
    let validCVV = /^\d{3}$/;
    return validCVV.test($cardNumberInput);
}

function isCreditCard() {
    if ($payment.val() === 'credit-card') {
        if (isCardNumberValid() && isZipValid() && isCvvValid()) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

function isActivity() {
    const $activityInput = $('#activities-box').find('input');
    for (let i = 0; i < $activityInput.length; i++) {
        if ($activityInput[i].checked) {
            return true;
        }
    }
    return false;
}

// event listener to prevent the form from submitting if any user input was invalid
$('form').on('submit', e => {
    if (isNameValid() && isEmailValid() && isCreditCard() && isActivity()) {
        
    } else {
        e.preventDefault();
    }
});

// accessbility: focus states
$('[type="checkbox"]').on('focus', e => {
    e.target.parentNode.classList.add('focus');
});

$('[type="checkbox"]').on('blur', e => {
    e.target.parentNode.classList.remove('focus');
});

// accessibility: form validation errors

function checkIfValid(valid, element) {
    if (!valid) {
        element.parent().addClass('not-valid');
        element.parent().removeClass('valid');
        element.parent().children().last().show();
    } else {
        element.parent().addClass('valid');
        element.parent().removeClass('not-valid');
        element.parent().children().last().hide();
    }
}

$('form').on('submit', e => {
    checkIfValid(isNameValid(), $name);
    checkIfValid(isEmailValid(), $('#email'));
    checkIfValid(isCardNumberValid(), $('#cc-num'));
    checkIfValid(isZipValid(), $('#zip'));
    checkIfValid(isCvvValid(), $('#cvv'));
    
    // didn't refactor this one cuz the code is slightly different 
    if(!isActivity()) {
        $('#activities').addClass('not-valid');
        $('#activities').removeClass('valid');
        $('#activities').children().last().show();
    } else {
        $('#activities').addClass('valid');
        $('#activities').removeClass('not-valid');
        $('#activities').children().last().hide();
    }
});