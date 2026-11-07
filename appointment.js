(() => {
  "use strict";

  const form = document.getElementById("appointmentForm");
  const dateInput = document.getElementById("preferredDate");
  if (!form || !dateInput) return;

  const now = new Date();
  const localToday = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  dateInput.min = localToday;

  const firmWhatsApp = "918006782740";
  const firmEmail = "caabhishekmaurya@hotmail.com";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const clean = (value) => String(value || "").trim();

    const message = [
      "Appointment request — Maurya & Associates",
      "",
      "Name: " + clean(data.get("fullName")),
      "Mobile / WhatsApp: " + clean(data.get("phone")),
      "Email: " + (clean(data.get("email")) || "Not provided"),
      "Area: " + clean(data.get("topic")),
      "Meeting preference: " + clean(data.get("meetingMode")),
      "Preferred date: " + clean(data.get("preferredDate")),
      "Preferred time: " + clean(data.get("preferredTime")),
      "Brief note: " + (clean(data.get("notes")) || "Not provided"),
      "",
      "Please confirm whether this date and time are available. I understand this is a request and not a confirmed appointment."
    ].join("\n");

    const channel = event.submitter?.dataset.channel || "whatsapp";
    if (channel === "email") {
      const subject = encodeURIComponent("Appointment request — Maurya & Associates");
      const body = encodeURIComponent(message);
      window.location.href = "mailto:" + firmEmail + "?subject=" + subject + "&body=" + body;
      return;
    }

    const whatsappUrl = "https://wa.me/" + firmWhatsApp + "?text=" + encodeURIComponent(message);
    window.location.href = whatsappUrl;
  });
})();