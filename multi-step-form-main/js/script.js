const stepsDesktop = document.querySelectorAll('.steps-desktop');
const stepsNumber = document.querySelectorAll('.number-steps');
const informationPage = document.querySelector('.information');
const informationH1 = document.getElementById('information-h1');
const informationH3 = document.getElementById('information-h3');
const btnProceed = document.querySelector('.btn-proceed');
const btnDesktop = document.querySelector('.btn-desktop');

const arcadeFees = document.getElementById('arcade-fees');
const advancedFees = document.getElementById('advanced-fees');
const proFees = document.getElementById('pro-fees');

const monthlyFees = document.querySelectorAll('.step2-mothly');
const yearlyFees = document.querySelectorAll('.step2-yearly'); 

const root = document.documentElement;
const purpleBlue = getComputedStyle(root).getPropertyValue('--clr-purpleBlue').trim();
const marineBlue = getComputedStyle(root).getPropertyValue('--clr-marineBlue').trim();

const planSwitcher = document.getElementById('label');
const monthly = document.getElementById('monthly');
const yearly = document.getElementById('yearly');

const onlineFees = document.querySelectorAll('.online-fees');
const largerFees = document.querySelectorAll('.larger-fees');
const customFees = document.querySelectorAll('.custom-fees');

const finalPlan = document.getElementById('final-plan');
const finalplanFees = document.getElementById('final-plan-fees');

const totalPlan = document.getElementById('total-plan');
const totalFees = document.getElementById('total-fees');

const backBtn = document.querySelectorAll('.backBtn');
const nextBtn = document.querySelectorAll('.nextBtn');
const confirmBtn = document.querySelectorAll('.confirmBtn');
const confirmationPage = document.querySelector('.confirmation-page');

const fieldsets = document.querySelectorAll('.fieldset');
const fieldsetStep3 = document.getElementById('fieldset-step3');
const flexWrapperBtns = document.querySelectorAll('.flex-wrapper');
const flexWrapperBtns3 = document.querySelectorAll('.flex-wrapper3');

const validations = [
    null,
    stepOneValidation,
    stepTwoValidation,
    stepThreeValidation,
];

const data = {
    monthly: {
            arcade: 9,
            advanced: 12,
            pro: 15,
            "online service": 1,
            "larger storage": 2,
            "customizable profile": 2,
        }, 
    yearly: {
            arcade: 90,
            advanced: 120,
            pro: 150,
            "online service": 10,
            "larger storage": 20,
            "customizable profile": 20,
        },
    }
const userData = [
    {
        name: "",
        email: "",
        "phone number": "",
        planDuration: "",
        plan: "",
        addons: [],   
    }
]

const information = [
    {
        h1: "Personal info",
        h3: "Please provide your name, email address, and phone number.",
    },
    {
        h1: "Select your plan",
        h3: "You have the option of monthly or yearly biling.",
    },
    {
        h1: "Pick add-ons",
        h3: "Add-ons help enhance your gaming experience.",
    },
    {
        h1: "Finishing up",
        h3: "Double-check everything looks OK before confirming."
    },
]
let count = 1;
const totalSteps = fieldsets.length;

nextBtn.forEach(btn1 => btn1.addEventListener('click', nextStep));
backBtn.forEach(btn2 => btn2.addEventListener('click', previousStep));
confirmBtn.forEach(btn3 => btn3.addEventListener('click', confirmStep));
planSwitcher.addEventListener('click', switchPlan);

let previousBtn = null;
flexWrapperBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        if (previousBtn) {
            previousBtn.removeAttribute('data-selected');
        }

        btn.setAttribute('data-selected', 'true');
        previousBtn = btn;
    })
})

flexWrapperBtns3.forEach(btn => {
    btn.addEventListener('click', (e) => {

        if (e.target.tagName !== 'INPUT') {
            e.preventDefault();
            console.log("hoy hoy hoy")
        }
    });
});

function nextStep() {
    const validation = validations[count];
    if (validation && !validation()) {
        console.log('errorr');
        return;
    }

    if (count < totalSteps) {
        count++;
        updateStep();
    }

};

function previousStep() {
    if (count > 1) {
        count--;
        updateStep();
    }
};

function updateStep() {
    informationH1.textContent = information[count - 1].h1; 
    informationH3.textContent = information[count - 1].h3;

    if (count === totalSteps) {
        confirmPayment();
    } else {
        confirmBtn.forEach(btn => { 
            btn.classList.remove('visible');
            btn.classList.add('hidden');
        });
    }

    fieldsets.forEach((field, index) => { 
        field.classList.toggle('visible', index + 1 === count);
        field.classList.toggle('hidden', index + 1 !== count); 
    });

    stepsNumber.forEach((step, index) => {
        step.classList.toggle('active', index + 1 === count);
    });

    backBtn.forEach(btn => toggleButtonVisiblity(btn , count > 1));
    nextBtn.forEach(btn => toggleButtonVisiblity(btn, count < totalSteps));
}

function toggleButtonVisiblity(button, isVisible) {
    button.classList.toggle('hidden', !isVisible);
    button.classList.toggle('visible', isVisible);
}

function switchPlan() {
    const isYearly = planSwitcher.style.transform === "translateX(20px)";
    planSwitcher.style.transform = isYearly ? "translateX(0)" : "translateX(20px)";
    isYearly ? durationPlan("monthly") : durationPlan("yearly");
}   

function durationPlan (duration) {
    const string = duration === "monthly" ? "mo" : "yr";

    if (duration === "monthly") {
        monthlyFees.forEach(monthly => monthly.classList.remove('hidden'));
        yearlyFees.forEach(yearly => yearly.classList.add('hidden'));
    } else if (duration === "yearly") {
        monthlyFees.forEach(monthly => monthly.classList.add('hidden'));
        yearlyFees.forEach(yearly => yearly.classList.remove('hidden'));
    }

    arcadeFees.textContent = `$${data[duration].arcade}/${string}`;
    proFees.textContent = `$${data[duration].pro}/${string}`;
    advancedFees.textContent = `$${data[duration].advanced}/${string}`;

    onlineFees.forEach(online => online.textContent = `+$${data[duration]["online service"]}/${string}`)
    largerFees.forEach(larger => larger.textContent = `+$${data[duration]["larger storage"]}/${string}`)
    customFees.forEach(custom => custom.textContent = `+$${data[duration]["customizable profile"]}/${string}`)
}

function confirmPayment() {
    confirmBtn.forEach(btn => toggleButtonVisiblity(btn, count === totalSteps));

    const fieldsetContainer = document.getElementById('fieldset-step4');
    let totalFees = 0;
    console.log(userData[0]["planDuration"]);
    console.log(userData[0]["plan"]);
    console.log(data["monthly"]["arcade"]);
    const planFee = data[userData[0]["planDuration"]][userData[0]["plan"].toLowerCase()];
    totalFees += planFee;
    console.log(planFee);

    let planHTML = `
         <div class="flex-wrapper4">
            <h3 id="final-plan">${userData[0]["plan"]} (${userData[0]["planDuration"].replace(/(m|y)/, match => match.toUpperCase())})<br><a href="#" id="change">Change</a></h3>
            <span id="final-plan-fees">$${planFee}/${userData[0]["planDuration"] === "monthly" ? "mo" : "yr"}</span>
        </div>
        <hr>
    `;

    userData[0]["addons"].forEach(addon => {
        const addonFee = data[userData[0]["planDuration"]][addon];
        totalFees += addonFee;

        planHTML += `
            <div class="flex-wrapper4">
                <span>${addon.charAt(0).toUpperCase() + addon.slice(1)}</span>
                <span class="step3-fees">${addonFee > 0 ? `+$${addonFee}/${userData[0]["planDuration"] === "monthly" ? "mo" : "yr"}` : ""}</span>
            </div>
        `
    });

    planHTML += `
        <div class="flex-wrapper4">
            <span id="total-plan">Total (per ${userData[0]["planDuration"].replace('ly', '')})</span>
            <span id="total-fees">+$${totalFees}/${userData[0]["planDuration"] === "monthly" ? "mo" : "yr"}</span>
        </div>
    `
    fieldsetContainer.innerHTML = planHTML;

    const change = document.getElementById('change');

    change.addEventListener('click', () => {
        count = 2;
        updateStep();
    
    })
};

function stepOneValidation() {

    const fields = [
        {
            element: document.getElementById('name'),
            errorElement: document.getElementById('name-error'),
            key: "name",
            value: document.getElementById('name').value.trim(),
            rules: [
                { test: value => value !== '', message: "This field is required."},
                { test: value => /^[a-zA-Z\s]+$/.test(value), message: "Name must contain only letters and spaces." },
                { test: value => value.length >= 2, message: "Name must be at least 2 characters long." }
            ]
        },
        {
            element: document.getElementById('email'),
            errorElement: document.getElementById('email-error'),
            key: "email",
            value: document.getElementById('email').value.trim(),
            rules: [
                { test: value => value !== '', message: "This field is required." },
                { test: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), message: "Please enter a valid email address." }
                ]
        },
        {
            element: document.getElementById('number'),
            errorElement: document.getElementById('number-error'),
            key: "phone number",
            value: document.getElementById('number').value.trim(),
            rules: [
                { test: value => value !== '', message: "This field is required." },
                { test: value => /^\d+$/.test(value), message: "Phone number must contain only numbers." },
                { test: value => value.length === 10, message: "Phone number must be exactly 10 digits long." }
            ]
        }
    ];

    let isValid = true;

    fields.forEach(({ element, errorElement, value, rules }) => {
        let fieldValid = true;

        for (const rule of rules) {
            if(!rule.test(value)) {
                errorElement.textContent = rule.message;
                element.style.borderColor = 'red';
                fieldValid = false;
                isValid = false;
                break;
            }
        }

        if (fieldValid) {
            errorElement.textContent = "";
            element.style.borderColor = purpleBlue;
        }
    });

    if(isValid) {
        fields.forEach(({ key, value }) => {
            userData[0][key] = value;
        });
    }
    return isValid;

}

function stepTwoValidation() {
    let isValid = true;
    let selectedButtonFound = false;

    flexWrapperBtns.forEach(btn => {
        if (btn.hasAttribute('data-selected')) {
            console.log('btn pressed');
            const feeSpan = btn.querySelector('span');
            const planValue = btn.querySelector('h3').firstChild.textContent.trim();
            userData[0]["plan"] = planValue;
            userData[0]["planDuration"] = feeSpan.textContent.includes('/mo') ? "monthly" : "yearly";

            selectedButtonFound = true;
        } 
    })

    if (!selectedButtonFound) {
        alert("This field is required");
        isValid = false;
    }

    return isValid;

}

function stepThreeValidation() {
    let isValid = true;

    flexWrapperBtns3.forEach(btn => {
        const input = btn.querySelector('input');
        if (input.checked) {
            const addons = input.getAttribute('data-addons');

            if (!userData[0]["addons"].includes(addons)) {
                userData[0]["addons"].push(addons);
            }
        }
    })

    return isValid;
}

function confirmStep() {
    btnProceed.style.display = 'none';
    btnDesktop.style.display = 'none';
    informationPage.style.display = 'none';
    confirmationPage.style.display = 'grid';
}