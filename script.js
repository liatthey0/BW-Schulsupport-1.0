function initMap() {
  const frauenfeld = { lat: 47.55442319355212, lng: 8.890950176357947 };  // Koordinaten von Frauenfeld
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: frauenfeld,
  });
  const marker = new google.maps.Marker({
    position: frauenfeld,
    map: map,
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const icon = document.querySelector('#menu-icon');
  const menu = document.querySelector('.menu');

  document.getElementById("contact-form").addEventListener("submit", submitMailForm);

  icon.addEventListener('click', () => {
    icon.classList.toggle('bx-x');
    menu.classList.toggle('open');
  });
});
// TODO:: New Function, Delete SendMail

function submitMailForm(event) {
  let inputCaptchaValue = document.querySelector(".contact-container .captcha input").value;
  if(inputCaptchaValue !== captchaValue){
    alert("Invalid captcha");
    return; // Beendet die Funktion, wenn der Captcha ungültig ist
  } // Prevents the default behavior of the form

  // Capture data from the form
  var firstName = document.getElementById("first-name").value;
  var lastName = document.getElementById("last-name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  // Create an object with the captured data
  var formData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    subject: subject,
    message: message
  };

  var contactSendInfo = document.getElementById("contactSendInfo");

  // Send the data to the server (POST method) - Make sure the URL starts with https and the send_mail.php file is in the same directory
  fetch("https://bw-familienberatung.ch/send_mail.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(function(response) {
      if (response.ok) {
        contactSendInfo.innerHTML = "Ihre Nachricht wurde erfolgreich versendet.";
        contactSendInfo.style.color = "#155724";
        contactSendInfo.style.backgroundColor = "#d4edda";
        contactSendInfo.style.borderColor = "#c3e6cb";
        document.getElementById("contact-form").reset();
        console.log("Form submitted successfully");
        // You can perform additional actions here, such as displaying a confirmation message
      } else {
        contactSendInfo.innerHTML = "Error";
        contactSendInfo.style.color = "#721c24";
        contactSendInfo.style.backgroundColor = "#f8d7da";
        contactSendInfo.style.borderColor = "#f5c6cb";
        document.getElementById("contact-form").reset();
        console.log("Error submitting the form");
        // You can display an error message or perform additional actions here
      }
    })
    .catch(function(error) {
      contactSendInfo.innerHTML = error;
      contactSendInfo.style.color = "#721c24";
      contactSendInfo.style.backgroundColor = "#f8d7da";
      contactSendInfo.style.borderColor = "#f5c6cb";
      document.getElementById("contact-form").reset();
      console.log("Form submitted successfully");
      console.log("Error submitting the form:", error);
    });
  }


(function(){
  const fonts = ["cursive","sans-serif","serif","monospace"];
  let captchaValue = "";
  function generateCaptcha(){
    let value = btoa(Math.random()*1000000000);
    value = value.substr(0,5+Math.random()*3);
    captchaValue = value;
  }
  function setCaptcha(){
    let html = captchaValue.split("").map((char)=>{
      const rotate = -20 + Math.trunc(Math.random()*30);
      const font = Math.trunc(Math.random()*fonts.length);
      return `<span
        style="
          transform:rotate(${rotate}deg);
          font-family:${fonts[font]}
        "
      >${char}</span>`;
    }).join("");
    document.querySelector(".contact-container .captcha .preview").innerHTML = html;
  }
  function initCaptcha(){
    document.querySelector(".contact-container .captcha .captcha-refresh").addEventListener("click",function(){
      generateCaptcha();
      setCaptcha();
    });
    generateCaptcha();
    setCaptcha();
  }
  initCaptcha();
})();
