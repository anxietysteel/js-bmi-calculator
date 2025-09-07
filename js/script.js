const eTitle = document.querySelector(".title");
const eSubtitle = document.querySelector(".subtitle");
const bmiForm = document.querySelector("form");
const eLabelH = document.querySelector(".label-h");
const eLabelW = document.querySelector(".label-w");
const formBtn = document.querySelector(".form-btn");
const result = document.querySelector("#result");
const eBackBtn = document.querySelector("#back-btn");
const eAnnotation = document.querySelector(".annotation");
const translateBtn = document.querySelector("#translate");

let currentLang = "en";

let category = "";

let BMI;

const translations = {
  ru: {
    userBmi: `ИМТ`,
    title: `Индекс массы тела (ИМТ)`,
    subtitle: `Расчётный показатель, который показывает соотношение веса и роста и помогает оценить, находится ли масса тела в пределах нормы.`,
    labelH: `Рост (см)`,
    labelW: `Вес (кг)`,
    calculateBtn: `Посчитать`,
    backBtn: `Назад`,
    annotation: `Этот калькулятор не заменяет консультацию врача. Для индивидуальных рекомендаций обратитесь к специалисту`,
    underweight: `ИМТ меньше 18.5 — Недостаточный вес\nЭто может говорить о том, что организму не хватает питательных веществ. Иногда это связано с особенностями обмена веществ или образом жизни. Если такой показатель сочетается с усталостью, слабостью или частыми болезнями — стоит обсудить это с врачом.`,
    normal: `ИМТ от 18.5 до 24.9 — Нормальный вес\nЭто считается здоровым диапазоном. Обычно он говорит о том, что масса тела и рост находятся в балансе. Конечно, на здоровье влияют и другие факторы (питание, физическая активность, сон), но этот показатель обычно считается благоприятным.`,
    overweight: `ИМТ от 25 до 29.9 — Избыточный вес\nЭто может означать, что масса тела выше нормы. Для некоторых людей это связано с мышечной массой (например, у спортсменов), но часто это сигнал, что стоит обратить внимание на питание и уровень активности.`,
    obesity: `ИМТ больше либо равно 30 — Ожирение\nПри таких значениях могут повышаться риски для здоровья (сердечно-сосудистые заболевания, диабет и т. д.). Важно воспринимать это как повод задуматься о корректировке образа жизни и, по возможности, проконсультироваться с врачом.`,
  },
  en: {
    userBmi: `BMI`,
    title: `Body Mass Index (BMI)`,
    subtitle: `A calculated value that shows the ratio of weight to height and helps assess whether body weight is within the normal range.`,
    labelH: `Height (cm)`,
    labelW: `Weight (kg)`,
    calculateBtn: `Calculate`,
    backBtn: `Back`,
    annotation: `This calculator does not replace medical advice. For personalized recommendations, please consult a healthcare professional.`,
    underweight: `BMI is less than 18.5 — Underweight\nThis may indicate that the body lacks essential nutrients. Sometimes it is related to metabolism or lifestyle. If this result is accompanied by fatigue, weakness, or frequent illnesses, it’s worth discussing with a doctor.`,
    normal: `BMI from 18.5 to 24.9 — Normal weight\nThis is considered a healthy range. It usually means that body weight and height are in balance. Of course, health also depends on other factors (nutrition, physical activity, sleep), but this range is generally favorable.`,
    overweight: `BMI from 25 to 29.9 — Overweight\nThis may mean that body weight is above normal. For some people, it may be due to muscle mass (e.g., athletes), but often it is a sign that diet and activity levels should be reviewed.`,
    obesity: `BMI greater than or equal 30 — Obesity\nAt these levels, health risks may increase (cardiovascular diseases, diabetes, etc.). It’s important to treat this as a reason to consider lifestyle adjustments and, if possible, consult a doctor.`,
  },
};

bmiForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(bmiForm);

  const height = formData.get("height");
  const weight = formData.get("weight");

  const bmi = weight / (height / 100) ** 2;
  BMI = bmi.toFixed(1);

  if (bmi < 18.5) {
    category = "underweight";
    result.textContent =
      `${translations[currentLang].userBmi} = ${bmi.toFixed(1)}\n` +
      translations[currentLang].underweight;
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = "normal";
    result.textContent =
      `${translations[currentLang].userBmi} = ${bmi.toFixed(1)}\n` +
      translations[currentLang].normal;
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = "overweight";
    result.textContent =
      `${translations[currentLang].userBmi} = ${bmi.toFixed(1)}\n` +
      translations[currentLang].overweight;
  } else if (bmi >= 30) {
    category = "obesity";
    result.textContent =
      `${translations[currentLang].userBmi} = ${bmi.toFixed(1)}\n` +
      translations[currentLang].obesity;
  }

  bmiForm.reset();
  bmiForm.style.display = "none";
  eBackBtn.hidden = false;
});

function toggleLang() {
  if (category == "underweight") {
    result.textContent =
      `${translations[currentLang].userBmi} = ${BMI}\n` +
      translations[currentLang].underweight;
  } else if (category == "normal") {
    result.textContent =
      `${translations[currentLang].userBmi} = ${BMI}\n` +
      translations[currentLang].normal;
  } else if (category == "overweight") {
    result.textContent =
      `${translations[currentLang].userBmi} = ${BMI}\n` +
      translations[currentLang].overweight;
  } else if (category == "obesity") {
    result.textContent =
      `${translations[currentLang].userBmi} = ${BMI}\n` +
      translations[currentLang].obesity;
  }

  eTitle.textContent = translations[currentLang].title;
  eSubtitle.textContent = translations[currentLang].subtitle;
  eLabelH.textContent = translations[currentLang].labelH;
  eLabelW.textContent = translations[currentLang].labelW;
  formBtn.textContent = translations[currentLang].calculateBtn;
  eBackBtn.textContent = translations[currentLang].backBtn;
  eAnnotation.textContent = translations[currentLang].annotation;
}

translateBtn.addEventListener("click", () => {
  currentLang = currentLang === "ru" ? "en" : "ru";
  toggleLang();
});

eBackBtn.addEventListener("click", () => {
  eBackBtn.hidden = true;
  bmiForm.style.display = "block";
  result.textContent = "";
});
