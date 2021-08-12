import emailjs from "emailjs-com";
import React from "react";

const Contact = () => {
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_73qb7cg",
        "template_oznqcux",
        e.target,
        "user_yHYAoZsap8fcwMhDqGTPM"
      )
      .then(
        (result) => {
          if (result) {
            e.target.reset();
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div
      data-testid="contact-header"
      data-aos="zoom-in-up"
      className="contact-container"
    >
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="name" required />
        <label>Email</label>
        <input type="email" name="email" required />
        <label>Message</label>
        <textarea name="message" cols={10} rows={8} required />
        <input type="submit" value="Send" className="button" />
      </form>
    </div>
  );
};

export default Contact;
