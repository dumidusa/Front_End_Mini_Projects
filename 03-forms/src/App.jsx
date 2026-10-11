import { useState } from "react";

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Invalid email";
  if (form.password.length < 8) errors.password = "Min 8 characters";
  if (form.confirm !== form.password) errors.confirm = "Passwords don't match";
  return errors;
}

function Field({ name, type = "text", placeholder, value, error, showError, onChange, onBlur }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {showError && error && <p style={{ color: "red", margin: 4 }}>{error}</p>}
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);


  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;


  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleBlur(e) {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirm: true });
    if (!isValid) return;

    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500)); // fake API → real one in Project 04
    setSubmitting(false);
    alert(`Welcome ${form.name}!`);
  }

  const fieldProps = name => ({
    name,
    value: form[name],
    error: errors[name],
    showError: touched[name],
    onChange: handleChange,
    onBlur: handleBlur,
  });

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: "40px auto" }}>
      <h2>Create account</h2>

      <Field {...fieldProps("name")} placeholder="Name" />
      <Field {...fieldProps("email")} placeholder="Email" />
      <Field {...fieldProps("password")} type="password" placeholder="Password" />
      <Field {...fieldProps("confirm")} type="password" placeholder="Confirm password" />

      <button disabled={submitting}>
        {submitting ? "Creating..." : "Sign up"}
      </button>

      <pre>{JSON.stringify(form, null, 2)}</pre>
    </form>
  );
}