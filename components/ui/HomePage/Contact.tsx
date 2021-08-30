import emailjs from "emailjs-com";
import React from "react";
import toast from "react-hot-toast";
import contact from "../../../public/images/contact_us.png";

const Contact = () => {
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const loadingId = toast.loading("Loading...");

    emailjs
      .sendForm(
        "service_73qb7cg",
        "template_oznqcux",
        target,
        "user_yHYAoZsap8fcwMhDqGTPM"
      )
      .then(
        (result) => {
          if (result) {
            target.reset();
            toast.dismiss(loadingId);
            toast.success("Email Send Successfully!");
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <div>
        {/* <Image src={} alt="contact us" /> */}
        <img src={contact.src} alt="contact us" />
      </div>
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
          <input type="email" name="email" required /> <label>Message</label>
          <textarea name="message" cols={10} rows={8} required />
          <input type="submit" value="Send" className="button" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
