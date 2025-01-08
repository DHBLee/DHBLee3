const stepsDesktop = document.querySelectorAll('.steps-desktop');
const stepsNumber = document.querySelectorAll('.steps li');
const informationH1 = document.getElementById('information-h1');
const informationH3 = document.getElementById('information-h3');

const arcadeFees = document.getElementById('arcade-fees');
const advancedFees = document.getElementById('advanced-fees');
const proFees = document.getElementById('pro-fees');

const root = document.documentElement;
const purpleBlue = getComputedStyle(root).getPropertyValue('--clr-purpleBlue').trim();
const marineBlue = getComputedStyle(root).getPropertyValue('--clr-marineBlue').trim();

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

nextBtn.forEach(btn1 => btn1.addEventListener('click', nextStep));
backBtn.forEach(btn2 => btn2.addEventListener('click', previousStep));
let count = 1;

function nextStep() {
    console.log('yehey');
    if (count >= fieldsets.length) return;
    count++;
    updateStep();

};

function previousStep() {
    if (count <= 1) return;
    count--;
    updateStep();
};

function updateStep() {
    fieldsets.forEach(field => { 
        field.classList.remove('visible');
        field.classList.add('hidden') 
    });
    const currentFieldset = document.getElementById(`fieldset-step${count}`);
    if (currentFieldset) {
        currentFieldset.classList.remove('hidden');
        currentFieldset.classList.add('visible');
    }

    stepsNumber.forEach((step, index) => {
        step.classList.remove('active');

        if (index + 1 === count) {
            step.classList.add('active');
        }
    });

    backBtn.forEach(btn => {
        btn.classList.toggle('invisible', count === 1);
        btn.classList.toggle('visible', count !== 1);
    })

    if(count === 4) {
        nextBtn.forEach(btn => {
            btn.classList.remove('hidden');
        })
        confirmBtn.forEach(btn => {
            btn.classList.add('hidden');
        })
    } else {
        nextBtn.forEach(btn => {
            btn.classList.add('hidden');
        })
        confirmBtn.forEach(btn => {
            btn.classList.remove('hidden');
        })
    }
    
}

