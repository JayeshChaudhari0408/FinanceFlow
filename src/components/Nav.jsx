import { Form, NavLink, useLocation } from "react-router-dom"
import { TrashIcon } from '@heroicons/react/24/solid'
import logomark from "../assets/logomark.svg"
import { useNavigate } from 'react-router-dom';

const Nav = ({ userName }) => {

  const navigate = useNavigate(); 
  const location = useLocation(); 
  const isDashboard = location.pathname === "/"; 


  const handleClick = () => {
    navigate('/'); 
  };
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <NavLink to="/" aria-label="Go to home" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logomark} alt="HomeBudget logo" height={30} />
          <span>FinanceFlow</span>
        </NavLink>
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