let currentQuestion = 0;
let answers = {};
let decisionLocked = false;

const questionBox = document.getElementById("question-box");
const optionsBox = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

// Create live result container
const liveResultBox = document.createElement("div");
liveResultBox.id = "live-result";
document.getElementById("app").appendChild(liveResultBox);

function loadQuestion() {

  if (decisionLocked) return;

  const q = questions[currentQuestion];

  questionBox.innerText = q.text;
  optionsBox.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.classList.add("option-btn");

    btn.onclick = () => {
      if (decisionLocked) return;

      selectAnswer(option);

      // Highlight selected
      const allButtons = document.querySelectorAll(".option-btn");
      allButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");

      checkImmediateDecision();
    };

    optionsBox.appendChild(btn);
  });
}

function selectAnswer(answer) {
  const questionKey = questions[currentQuestion].key;
  answers[questionKey] = answer;
}

nextBtn.onclick = () => {

  if (decisionLocked) return;

  const currentKey = questions[currentQuestion].key;

  if (!answers[currentKey]) {
    alert("Please select an option");
    return;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showFinalResult();
  }
};

function evaluateDecision(answers) {

  if (answers.CT_CON1 === "No") {
    return {
      diagnosis: "history of insignificant allergic reaction to contrast agent.",
      medication: "NA"
    };
  }

  if (answers.CT_CON7 === "Yes") {
    return {
      diagnosis: "whatever contrast reaction to Q1 to Q5 plus likely reaction to HOCM or High Osmolar Contrast media",
      medication: "NA"
    };
  }

  if (
    answers.CT_CON7 === "No" &&
    answers.CT_CON8 === "No"
  ) {
    if (answers.CT_CON2 === "Yes" && answers.CT_CON6 === "No") {
    return {
      diagnosis: "Severe Reactions to unknown CT contrast agent: Do not administer CT contrast agent, unless urgent. Refer the patient to an allergist/immunologist for evaluation and risk stratification if available. Use alternative imaging modalities or CT without contrast when possible.",
      medication: "NA"
    };
    }
    if (answers.CT_CON2 === "Yes" && answers.CT_CON6 === "Yes"){
    return {
      diagnosis: " Severe Reactions to unknown CT contrast agent at TOH: Do not administer CT contrast agent, unless urgent. Refer the patient to an allergist/immunologist for evaluation and risk stratification if available. Use alternative imaging modalities or CT without contrast when possible. In emergency situations when alternate options are not available and ICM is unavoidable, use a shared decision-making approach and consider ICM switching with Ultravist and with steroid and antihistamine premedication under anesthesia andor RACE support.",
      medication: "NA"
    };
    }
    if (answers.CT_CON2 === "No" && answers.CT_CON3 === "Yes" && answers.CT_CON6 === "Yes"){
    return {
      diagnosis: "Moderate reaction to unknown contrast agent at TOH: Contrast switching with Ultravist, with steroid and antihistamine premedication,  or different classes (MRI) without premedication, after shared decision making approach. Document all decisions and risk assessments in Epic.",
      medication: "NA"
    };
    }
    if (answers.CT_CON2 === "No" && answers.CT_CON3 === "Yes" && answers.CT_CON6 === "No"){
    return {
      diagnosis: "Moderate reaction to unknown contrast agent. Refer the patient to an allergist/immunologist for evaluation and risk stratification if available. Use alternative imaging modalities without contrast when possible. In emergency situations when alternate options are not available and ICM is unavoidable, use a shared decision-making approach and consider steroid and antihistamine premedication under anesthesia andor RACE support.",
      medication: "NA"
    };
    }
    if (answers.CT_CON2 === "No" && answers.CT_CON3 === "No" && answers.CT_CON4 === "Yes"){
    return {
      diagnosis: "Mild Reaction to Unknown contrast agent: Consider switching to with Ultravist. Corticosteroid premedication is not recommended. Premedication with second generation antihistamine can be considered. Document the reaction history, risk assessment, and agent selection in Epic.",
      medication: "NA"
    };
    }
    if (answers.CT_CON2 === "No" && answers.CT_CON3 === "No" && answers.CT_CON4 === "No" && answers.CT_CON5 === "Yes"){
    return {
      diagnosis: "Non allergic reaction to contrast media. No need for contrast switching or premedication.",
      medication: "NA"
    };
    }
  }

  if (
    answers.CT_CON7 === "No" &&
    answers.CT_CON8 === "Yes"
  ) {
    if (answers.CT_CON2 === "Yes" || answers.CT_CON3 === "Yes") {
      if (answers.CT_CON9 === "Iohexol or Omnipaque" || answers.CT_CON9 === "Iodixanol or Visipaque" || answers.CT_CON9 === "Iomeprol or Iomeron") {
    return {
      diagnosis: "Moderate to Severe Reactions to Group A contrast agents (Iohexol or Omnipaque, Iodixanol or Visipaque, Iomeprol or Iomeron or Iopromide) : Do not administer CT contrast agent unless urgently indicated. Refer the patient to an allergist/immunologist for evaluation and risk stratification if available. Use alternative imaging modalities without contrast when possible. In emergency situations when alternate options are not available and ICM is unavoidable, use a shared decision-making approach and consider ICM switching with Iopamidol or Isovue and with steroid and antihistamine premedication under anesthesia andor RACE support.",
      medication: "NA"
    };
    }
    if (answers.CT_CON9 === "Iopamidol or Isovue") {
    return {
      diagnosis: "Moderate to Severe Reactions to Group B contrast agents Iopamidol or Isovue. Do not administer CT contrast agent unless urgently indicated. Refer the patient to an allergist/immunologist for evaluation and risk stratification if available. Use alternative imaging modalities without contrast when possible. In emergency situations when alternate options are not available and ICM is unavoidable, use a shared decision-making approach and consider ICM switching with Iohexol or Omnipaque, Iodixanol or Visipaque, Iomeprol or Iomeron or Iopromide or Ultravist, and with steroid and antihistamine premedication under anesthesia andor RACE support.",
      medication: "NA"
    };
    }
    if (answers.CT_CON9 === "Iopromide or Ultravist") {
    return {
      diagnosis: "Moderate to Severe Reactions to Group C Contrast agent Iopromide or Ultravist. Do not administer CT contrast agent unless urgently indicated. Refer the patient to an allergist/immunologist for evaluation and risk stratification if available. Use alternative imaging modalities without contrast when possible. In emergency situations when alternate options are not available and ICM is unavoidable, use a shared decision-making approach and consider ICM switching with Iopamidol or Isovue, and with steroid and antihistamine premedication under anesthesia andor RACE support.",
      medication: "NA"
    };
    }
  }
    if (answers.CT_CON2 === "No" && answers.CT_CON3 === "No" && answers.CT_CON4 === "Yes") {
      if (answers.CT_CON9 === "Iohexol or Omnipaque" || answers.CT_CON9 === "Iodixanol or Visipaque" || answers.CT_CON9 === "Iomeprol or Iomeron") {
    return {
      diagnosis: "Mild Contrast Reactions to Group A contrast agents (Iohexol or Omnipaque, Iodixanol or Visipaque, Iomeprol or Iomeron or Iopromide) : Consider contrast agent switching with Iopamidol or Isovue. Premedication with corticosteroid or second generation antihistamine premedication is not recommended. Document the reaction history, risk assessment, and agent selection in Epic.",
      medication: "NA"
    };
    }
    if (answers.CT_CON9 === "Iopamidol or Isovue") {
    return {
      diagnosis: "Mild Contrast Reactions to Group B contrast agents Iopamidol or Isovue. Consider switching to with Iohexol Omnipaque OR  Iodixanol or Visipaque, Iomeprol or Iomeron or Iopromide or Ultravist.Premedication with corticosteroid or second generation antihistamine premedication is not recommended. Document the reaction history, risk assessment, and agent selection in Epic.",
      medication: "NA"
    };
    }
    if (answers.CT_CON9 === "Iopromide or Ultravist") {
    return {
      diagnosis: "Consider switching with Iopamidol or Isovue. Premedication with corticosteroid or second generation antihistamine premedication is not recommended. Document the reaction history, risk assessment, and agent selection in Epic.",
      medication: "NA"
    };
    }
  }
    if (answers.CT_CON2 === "Yes" && answers.CT_CON3 === "Yes" && answers.CT_CON6 === "Yes") {
      if (answers.CT_CON9 === "Only Iodine is mentioned as contrast agent" || answers.CT_CON9 === "None of the above") {
    return {
      diagnosis: "Moderate to Severe Reactions to Unknown Contrast agent. Do not administer CT contrast agent unless urgently indicated. Refer the patient to an allergist/immunologist for evaluation and risk stratification if available. Use alternative imaging modalities without contrast when possible. In emergency situations when alternate options are not available and ICM is unavoidable, use a shared decision-making approach and consider ICM switching with  Iopromide or Ultravist, and with steroid and antihistamine premedication under anesthesia andor RACE support.",
      medication: "NA"
    };
    }
  }
    if (answers.CT_CON2 === "Yes" && answers.CT_CON3 === "Yes" && answers.CT_CON6 === "No") {
      if (answers.CT_CON9 === "Only Iodine is mentioned as contrast agent" || answers.CT_CON9 === "None of the above") {
    return {
      diagnosis: "Moderate to Severe Reactions to Unknown Contrast agent. Do not administer CT contrast agent unless urgently indicated. Refer the patient to an allergist/immunologist for evaluation and risk stratification if available. Use alternative imaging modalities without contrast when possible. In emergency situations when alternate options are not available and ICM is unavoidable, use a shared decision-making approach with steroid and antihistamine premedication under anesthesia andor RACE support.",
      medication: "NA"
    };
    }
  }
    if (answers.CT_CON2 === "No" && answers.CT_CON3 === "No" && answers.CT_CON4 === "Yes") {
      if (answers.CT_CON9 === "Only Iodine is mentioned as contrast agent" || answers.CT_CON9 === "None of the above") {
    return {
      diagnosis: "Mild Reactions to Unknown Contrast agent given at TOH. Consider switching with Iopromide or Ultravist. Premedication with corticosteroid or second generation antihistamine premedication is not recommended. Document the reaction history, risk assessment, and agent selection in Epic.",
      medication: "NA"
    };
    }
  }
  }

  if (answers.CT_CON9 === "if history of allergy reaction is to more than option form A to E") {
    return {
      diagnosis: "Breakthrough reaction to two different contrast agent. Refer the patient to an allergist/immunologist for evaluation and risk stratification if available. Use alternative imaging modalities without contrast when possible.",
      medication: "NA"
    };
  }

  return {
    diagnosis: "Insufficient data",
    medication: ""
  };
}

function checkImmediateDecision() {

  const result = evaluateDecision(answers);

  if (result.diagnosis !== "Insufficient data") {
    decisionLocked = true;
    showImmediateResult(result);
  } else {
    liveResultBox.innerHTML = `
      <h3>Live Assessment</h3>
      <p>Awaiting more inputs...</p>
    `;
  }
}

function showImmediateResult(result) {

  questionBox.innerHTML = `
    <h2>Diagnosis: ${result.diagnosis}</h2>
    <p><strong>Suggested Medication:</strong> ${result.medication}</p>
  `;

  optionsBox.innerHTML = "";
  nextBtn.style.display = "none";

  liveResultBox.innerHTML = "";
}

function showFinalResult() {
  const result = evaluateDecision(answers);
  showImmediateResult(result);
}

loadQuestion();
