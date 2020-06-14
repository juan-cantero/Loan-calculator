// @ts-nocheck


class LoanFormUI {

  

  getForm = () => {
    return document.querySelector('#form')
  }

  getLoanAmount = () => {
    
    return document.querySelector(".form__loan-input").value
    
  }

  getAnnualInterest = ()=> {
    return document.querySelector(".form__interest-input").value
  }

  getRepaymentYears = () => {
    return document.querySelector(".form__years-input").value
  }
  
  getLoader = () => {
    return document.querySelector(".form__loader")
  }
}


class LoanCalculator {
  constructor(loanAmount,annualInterest,repaymentYears) {
    this.loanAmount = Number(loanAmount);
    this.annualInterest = Number(annualInterest);
    this.repaymentYears = Number(repaymentYears);
  }

  calculateMonthlyPayment() {
    return this.totalToRepayPerYear() / this.totalMonthsToPay()
  }

  calculateTotalPayment() {
    return this.totalToRepayPerYear() * this.repaymentYears
  }

  calculateTotalInterest() {
    return this.calculateTotalPayment() - this.loanAmount
  }

  getInterestPerYear() {
    return  (this.loanAmount / this.repaymentYears) * (this.annualInterest/100)
  }
  totalToRepayPerYear() {
    return this.loanAmount/this.repaymentYears + this.getInterestPerYear()
  }

  totalMonthsToPay() {
    return this.repaymentYears * 12;
  }
}

const loanForm = new LoanFormUI();




  function Calculator() {
    const values = {
      loanAmount:loanForm.getLoanAmount(),
      annualInterest:loanForm.getAnnualInterest(),
      repaymentYears:loanForm.getRepaymentYears()
    }
    let{loanAmount,annualInterest,repaymentYears} = values
    return new LoanCalculator (loanAmount,annualInterest,repaymentYears)
  }

  function renderResult() {
    const loanCalculator = Calculator()
    let results='';
    const resultsContainer = document.querySelector(".results")
    const loader = loanForm.getLoader()
    loader.style.display = 'block';
    resultsContainer.style.display = 'none'

    
    results = `<h2>Results</h2>
    <p>Monthly Payment ${loanCalculator.calculateMonthlyPayment()}</p>
    <p>Total Payment ${loanCalculator.calculateTotalPayment()}</p>
    <p>Total Interest ${loanCalculator.calculateTotalInterest()}</p>
    `
    resultsContainer.innerHTML= results;
    
    setTimeout(()=>{
      loader.style.display = 'none'
      resultsContainer.style.display='block'
    },
      2000)
  }

  const formUI = loanForm.getForm();
  formUI.addEventListener('submit',(e)=>{
    e.preventDefault();
    renderResult();
  })







 
