'use client';

import { useActionState } from 'react';
import {createUser} from './createuser';

const initialState = { success: false, message: '' };

export default function CreateUserForm() {
  const [state, formAction, isPending] = useActionState(createUser, initialState);

  return (
    // <div style={{ maxWidth: '400px', margin: '40px auto', fontFamily: 'sans-serif' }}>
    <div className="w-full max-w-2xl '1200px', fontFamily: 'serif', justifyContent: 'left' ">
      <h2>Log in or Create New Account</h2>
      
      <form action={formAction}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm"   
            required
            //style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm"   
            required
            //style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label htmlFor="role" style={{ paddingRight: '10px', display: 'block', marginBottom: '10px', marginRight: '10px' }}>Role: 
          <select
            id="role"
            name="role"
            required
            className="px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm" >
            <option value="host">host</option>
            <option value="vendor">vendor</option>
            <option value="guest">guest</option>
          </select>
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          style={{ padding: '10px 15px', backgroundColor: '#daa4c2', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          {isPending ? 'Saving...' : 'Submit'}  
        </button>
      </form>

      {state.message && (
        <p style={{ marginTop: '15px', color: state.success ? 'green' : 'red' }}>
          {state.message}
        </p>
      )}
    </div>
  );
}

//TODO replace role form box woth drop-down or radio button and route response to DB
