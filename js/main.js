document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("qa-form");

  form.addEventListener("submit", sendForm);

  async function sendForm(e) {
    e.preventDefault();

    let error = validateForm(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add("send");
      let response = await fetch("sendmail.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        form.classList.remove("send");
      } else {
        alert("Помилка!");
        form.classList.remove("send");
      }
    } else {
      alert("Заповніть обов'язкові поля!");
    }
  }

  function validateForm(form) {
    let error = 0;

    let formReq = document.querySelectorAll(".required");

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);

      if (input.classList.contains("email")) {
        if (checkEmail(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add("error");
    input.classList.add("error");
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove("error");
    input.classList.remove("error");
  }

  function checkEmail(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});
