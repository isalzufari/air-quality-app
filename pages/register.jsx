import React, { useState } from "react";
import Link from "next/link";

export default function Login({ registerEmail }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onLogin = (e) => {
    e.preventDefault();
    registerEmail(formData).then((e) => {
      if (e) {
        setFormData({
          email: '',
          password: ''
        });
      }
    })
  }

  return (
    <section className="mt-5">
      <div className="text-center">
        <main
          style={{
            width: "100%",
            maxWidth: "330px",
            padding: "15px",
            margin: "auto",
          }}
        >
          <form onSubmit={onLogin}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <label forname="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <label forname="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-primary mb-3" type="submit">
              Register
            </button>
            <p>Sudah punya akun ? <Link href='/login'>Login</Link></p>
            <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
          </form>
        </main>
      </div>
    </section>
  );
}
