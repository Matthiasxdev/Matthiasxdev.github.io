export default function MailTo ({ email, children }) {
    return (
      <a href={`mailto:${email}`}>{children}</a>
    );
  };