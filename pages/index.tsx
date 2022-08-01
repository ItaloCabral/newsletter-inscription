import type { NextPage } from 'next'
import { FormEvent, useState } from 'react'
import axios from 'axios';

const Home: NextPage = () => {

  const [emailInput, setEmailInput] = useState('');

  const handleEmailSubmit = (event: FormEvent) => {
    event.preventDefault();
    if(emailInput.length === 0) return;

    axios.post('/api/subscribe', {
      email: emailInput
    }).then(console.log)
  }

  return (
    <div className='w-screen h-screen grid place-items-center bg-zinc-900 text-gray-300'>
      <div className="container w-96 h-fit bg-zinc-800 rounded-lg">
        <h1 className="text-center my-5 text-4xl">
          Newsletter Signup
        </h1>
        <form className="w-full max-w-lg mb-5" onSubmit={handleEmailSubmit}>
          <div className="mx-3">
            <label className="block uppercase tracking-wide text-sm font-bold mb-2">
              Email:
            </label>
            <input
              className="appearance-none transition ease-in-out block w-full mx-auto bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              name='email'
              placeholder="email@valid.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <button className="mt-5 transition ease-in-out bg-zinc-700 hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home
