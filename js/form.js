const $form = $("form");
const $name = $("#name");
const $email = $("#email");
const $message = $("#message");
const $subject = $("#subject");
const emailApp = {};
$form.on("submit", (e) => {
  e.preventDefault();
  if ($name.val() === "" || $email.val() === "" || $message.val() === "") {
    swal({
      icon: "error",
      title: "Sorry!",
      text: "Kindly fill in your details, so I can get back to you!",
    });
  } else {
    emailApp.postEmail();
    emailApp.clearFields();
    swal({
      icon: "success",
      buttons: false,
      timer: 5000,
      text: "Thank you! I will respond as soon as possible!",
    });
  }
});
emailApp.clearFields = () => {
  $name.val("");
  $email.val("");
  $message.val("");
};
emailApp.postEmail = () => {
  $.ajax({
    url: "https://formspree.io/xwkrqjlk",
    method: "POST",
    data: {
      email: $email.val(),
      name: $name.val(),
      message: $message.val(),
      subject: $subject.val(),
    },
    dataType: "json",
  });
};
emailApp.init = () => {
  emailApp.clearFields();
};
emailApp.init();
