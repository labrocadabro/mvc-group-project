/** some controls on client side before sending the form */
const formEl = document.querySelector("form");
// select by name.If we add a repeat password field, we don't need to take care of input[type="password"] and change the code
const formInfo = document.querySelector("#formInfo");
formEl.addEventListener("submit", (event) => {
  // get element here, so we get the value of the element on submit and not an page load
  const email = document.querySelector("input[name=email]").value.trim();
  const password = document.querySelector("input[name=password]").value.trim();
  const btnSubmit = document.querySelector("button[type=submit]");
  // don't send the form as if;
  event.preventDefault();
  btnSubmit.disabled = true;
  // Check if a field is empty
  if (validator.isEmpty(email) || validator.isEmpty(password)) {
    showInformation("alert-danger", "All fields are required", btnSubmit);
    return false;
  }
  // Validate the email address
  if (!validator.isEmail(email)) {
    showInformation("alert-danger", "Please enter a valid email address.", btnSubmit);
    return false;
  }
  // if no passwport
  if (!password) {
    showInformation("alert-danger", "Password cannot be blank.", btnSubmit);
    return false;
  }
  formEl.submit();
});