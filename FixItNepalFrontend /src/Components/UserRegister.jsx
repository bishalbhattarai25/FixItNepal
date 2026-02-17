
export const UserRegister = () => {

    

  return (
   <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="shadow-2xl rounded-2xl p-8 w-[350px] bg-white">
        
        {/* Logo / Title */}
        <div className="text-center mb-6">
          <span className="text-3xl font-extrabold">FIX</span>
          <span className="text-2xl font-bold">IT</span>
          <span className="text-3xl font-extrabold"> Nepal</span>
          <p className="text-gray-500 mt-2">Login to your user</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <div>
            <label className="font-semibold">Fullname:</label>
            <input
              type="text"
              placeholder="Enter your username"
              name='Fullname'
              className="w-full mt-1 p-2 rounded-xl bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="font-semibold">Email:</label>
            <input
              type="email"
              placeholder="Enter your username"
              name='Email'
              className="w-full mt-1 p-2 rounded-xl bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="font-semibold">Phone Number:</label>
            <input
              type="text"
              placeholder="Enter your phoneNumber"
              name='Phone Number'
              className="w-full mt-1 p-2 rounded-xl bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="font-semibold">Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              name='Password'
              className="w-full mt-1 p-2 rounded-xl bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="font-semibold">Conform Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              name='Conform Password'
              className="w-full mt-1 p-2 rounded-xl bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-black text-white py-2 rounded-xl hover:bg-zinc-800 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
