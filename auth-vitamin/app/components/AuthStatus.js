'use client'
 
import { useState } from 'react'
 
export default function AuthStatus() {
  const [status, setStatus] = useState(null)  // null = not checked yet
 
  const checkStatus = async () => {
    const response = await fetch('/api/auth/user')
    const data = await response.json()
 
    if (data.user?.email) {
      setStatus(data.user.email)
    } else {
      setStatus('Not Logged In')
    }
  }
 
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px' }}>
      <h3>Auth Status</h3>
      <button onClick={checkStatus} style={{ padding: '10px 20px', marginBottom: '10px' }}>
        Check Login Status
      </button>
      <p>
        {status === null ? 'Click button to check' : status}
      </p>
    </div>
  )
}