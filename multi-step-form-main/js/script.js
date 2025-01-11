const stepsDesktop = document.querySelectorAll('.steps-desktop');
const stepsNumber = document.querySelectorAll('.steps li');
const informationH1 = document.getElementById('information-h1');
const informationH3 = document.getElementById('information-h3');

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

const fieldsets = document.querySelectorAll('.fieldset');

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
            "larger storage":20,
            "customizable profile": 20,
        },
    }
const userData = [
    {
        name: "",
        email: "",
        "phone number": "123",
        "plan duration": "monthly",
        plan: "arcade",
        addons: [
            "online service",
            "larger storage",
        ]   
    }
]
let count = 1;
const totalSteps = fieldsets.length;

nextBtn.forEach(btn1 => btn1.addEventListener('click', nextStep));
backBtn.forEach(btn2 => btn2.addEventListener('click', previousStep));
planSwitcher.addEventListener('click', switchPlan);

function nextStep() {
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

    if (count === totalSteps) {
        
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
