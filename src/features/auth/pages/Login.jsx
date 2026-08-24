import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { loginSchema } from "../schemas/login.schema";
import { ShieldCheck, SlidersHorizontal } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  
  // 💡 យក State & Logic ទាំងអស់ចេញពី useAuth
  const { login, loading, errors, apiError, clearFieldError,handlegooglelogin } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearFieldError(name); // លុប Error របស់ Input នោះ
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ហៅ function login ដោយបញ្ជូន form data ទៅ
    const isSuccess = await login(form);
    
    // បើ Login ជោគជ័យ ទើប Navigate ទៅ Dashboard
    if (isSuccess) {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex mx-auto max-w-7xl rounded-[20px] overflow-hidden
                shadow-[0_0_35px_rgba(0,0,0,0.15)]">
          <div className=" bg-blue-800 w-[675px] rounded-l-[20px] p-15 ">
            <div className="relative">
              <img src="/src/assets/Images/small.png" className="w-50 mt-10 ms-100 absolute" alt="" />
            </div>
            <div className="relative">
              <img src="/src/assets/Images/small.png" className="w-50 mt-17 me-100 absolute" alt="" />
            </div>
          <div>
            <h1 className="text-3xl text-white font-bold">POS <span className="text-amber-600 text-3xl fw-bold">SYSTEM</span></h1>
            <p className="text-white text-sm">Manage your POS System <br /> the easy way</p>
          </div>
          <div className="flex justify-center items-center mt-15 mb-15">
            
            <div className="bg-white flex w-[600px] h-[320px] rounded-2xl ab">
              <div><img src="/src/assets/Images/no.png" className="w-[500px]" alt="Images" /></div>
            </div>
            <div className="absolute">
              <img src="/src/assets/Images/lang.png" className="w-[240px] mt-70 me-80" alt="" />
            </div>
            <div className="absolute">
              <img src="/src/assets/Images/people.png" className="w-[290px] mt-70 ms-100" alt="" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border-2 border-white rounded-lg flex items-center justify-center">
              <ShieldCheck size={24} color="white" />
            </div>
            <div>
              <h3 className="text-xl text-white font-medium">
                Secure Fast Smart
              </h3>
              <p className="text-white text-sm">
                Sign in to manage products,
                <br />
                inventory, orders, reports and
                <br />
                POS system.
              </p>
            </div>
          </div>
        </div>
        <div className="w-[675px] bg-gray-50 rounded-r-[20px] p-15 shadow-lg f">
            <div className="flex justify-center items-center mb-5 ">
              <img src="/public/Logo_POS.png" className="object-cover w-15 h-15 border border-gray-200 shadow-lg rounded-lg" alt="" />
            </div>
            <div className="flex justify-center items-center">
              <div>
                <h1 className="font-bold text-3xl">Welcome Back!</h1>
                <p>Sign in to your account to continue</p>
              </div>
            </div>
          <div>
            {apiError && <p style={{ color: "red" }}>{apiError}</p>}
            <form onSubmit={handleSubmit}>
              {/* email */}
              <div className="mb-5">
                <label className="block mb-2 font-medium text-gray-700">Email Address</label>
                <input
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="px-4 w-full py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p style={{ color: "red", margin: "4px 0" }}>{errors.email}</p>}
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                />
                {errors.password && <p style={{ color: "red", margin: "4px 0" }}>{errors.password}</p>}
              </div>
              <div className="flex mb-5 justify-between">
                <div className="flex">
                  <div>
                    <input type="checkbox"
                      className="border border-gray-300 "
                    />
                  </div>
                  <div className="ms-2 text-gray-700 font-normal">Remember me</div>
                </div>
                <div>
                  <h1 className="text-blue-800 font-semibold cursor-pointer">Forgot password?</h1>
                </div>
              </div>
              <button type="submit" disabled={loading} className="cursor-pointer bg-blue-800 w-full rounded-lg px-4 py-3 text-white font-medium">
                {loading ? "Logging in..." : "Login"}
              </button>
              <div className="flex items-center my-6 mb-5">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-4 text-gray-600 font-medium">
                  or continue with
                </span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
              <div onClick={handlegooglelogin} className="flex mb-5 justify-center items-center border border-gray-300 px-4 rounded-lg cursor-pointer">
                <div>
                  <img src="/src/assets/Images/google.png" className="w-15 h-11" alt="" />
                </div>
                <div >
                  <h1 className="font-medium text-black">Continue with Google</h1>
                </div>
              </div>
               <div className="flex justify-center items-center">
                 <h1>Don't have an account? <span onClick={()=> navigate("/register")} className="text-blue-800 font-semibold cursor-pointer">Sign up</span></h1>
               </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}