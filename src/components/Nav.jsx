// rrd imports
import { Form, NavLink,useLocation } from "react-router-dom"

// library
import { TrashIcon } from '@heroicons/react/24/solid'

// assets
import logomark from "../assets/logomark.svg"

import { useNavigate } from 'react-router-dom';




const Nav = ({ userName }) => {

  const navigate = useNavigate(); // Use the useNavigate hook
  const location = useLocation(); // Add this to check current route
  const isDashboard = location.pathname === "/"; // Check if we're on the dashboard


  const handleClick = () => {
    navigate('/'); // Redirect to the homepage or any route you want
  };
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
      {/* Left side: Home and Back buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <NavLink to="/" aria-label="Go to home" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logomark} alt="HomeBudget logo" height={30} />
          <span>FinanceFlow</span>
        </NavLink>

        {/* Back button below Home button */}
        
      </div>

      {userName && isDashboard && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Form
            method="post"
            action="logout"
            onSubmit={(event) => {
              if (!confirm("Delete user and all data?")) {
                event.preventDefault()
              }
            }}
          >
            <button type="submit" className="btn btn--warning" style={{ display: 'flex', alignItems: 'center' }}>
              <span>Delete User</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      )}
    </nav>
  )
}
export default Nav