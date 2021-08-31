import emailjs from "emailjs-com";
import React from "react";
import toast from "react-hot-toast";
import contact from "../../../public/images/contact_us.png";
import { Form, FormInputField } from "../../Form/Form";

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
    <section className="contact-section">
      <h1>
        Contact<span> Us</span>
      </h1>
      <div className="contact">
        <div className="contact__image">
          <img src={contact.src} alt="contact us" />
        </div>
        <div
          data-testid="contact-header"
          data-aos="zoom-in-up"
          className="contact__container"
        >
          <div className="contact__container__form">
            <Form onSubmit={sendEmail}>
              <FormInputField name="name" type="text">
                Name
              </FormInputField>
              <FormInputField name="email" type="text" required>
                Email
              </FormInputField>
              <FormInputField name="message" row={6} type="textarea" required>
                Message
              </FormInputField>
              <FormInputField type="submit" value={"Send"} />
            </Form>
          </div>

          {/* <form className="contact-form" onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="name" required />
            <label>Email</label>
            <input type="email" name="email" required /> <label>Message</label>
            <textarea name="message" cols={10} rows={8} required />
            <input type="submit" value="Send" className="button" />
          </form> */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
