import { useState } from "react";
import { SERVER } from "../helper/helperModules";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [btnTxt, setBtnTxt] = useState("Sign Up");
  const [btnBG, setBtnBG] = useState("bg-iconNavLink");
  const [btnState, setBtnState] = useState(false); // [true, false]
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleInputChange = function (e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFormSubmit = async function (e) {
    e.preventDefault();

    // empty error messages
    setErrorEmail("");
    setErrorPassword("");

    try {
      setBtnTxt("Signing Up...");
      setBtnBG("bg-gray-400");
      setBtnState(true);
      const res = await fetch(`${SERVER}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();
      if (data.errors) throw data.errors;

      localStorage.setItem("user_token", JSON.stringify(data.token));
      // redirect to home page
      if (data.user) nav("/");
    } catch (err) {
      console.log("catch block", err);

      if (err.email) setErrorEmail(err.email);

      if (err.password) setErrorPassword(err.password);
    } finally {
      setBtnTxt("Sign Up");
      setBtnBG("bg-iconNavLink");
      setBtnState(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="mx-auto max-w-[500px] rounded-md border border-nav bg-background px-8 py-4"
      >
        <h1 className="text-2xl text-white">Sign Up</h1>

        <div>
          <label htmlFor="email" className="mb-2 mt-6 block">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full rounded-md bg-nav px-3 py-1 text-white outline-none"
          />
          <p className="text-sm text-iconNavLink">{errorEmail}</p>

          <label htmlFor="password" className="mb-2 mt-4 block">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full rounded-md bg-nav px-3 py-1 text-white outline-none"
          />
          <p className="text-sm text-iconNavLink">{errorPassword}</p>
        </div>

        <button
          className={`my-6 w-full rounded-md ${btnBG} px-3 py-2`}
          disabled={btnState}
        >
          {btnTxt}
        </button>
      </form>
      <p className="mt-3 text-center text-sm text-white">
        Already have an account?{" "}
        <Link to={"/login"} className="text-iconNavLink underline">
          Sign In
        </Link>
      </p>
    </>
  );
}
