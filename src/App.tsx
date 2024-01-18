import './App.css';
import 'rsuite/dist/rsuite.min.css';

import { Nav, Sidenav } from 'rsuite';

import Agents from './screens/agents';
import Dashboard from './screens/tickets';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import Tickets from './screens/tickets';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';

function App() {

  const [expanded, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState('1');

  const onNavSelect = (eventKey: string) => {
    console.log("Event key: ", eventKey);
    setActiveKey(eventKey);
    const component = navItems.find(item => item.eventKey === eventKey)?.component;
    if (component) {
      setActiveComponent(component);
    }
  }

  const [activeComponent, setActiveComponent] = useState(<Dashboard />);

  // Add navbar items here with associated logo and labels here
  const navItems = [
    {
      eventKey: '1',
      icon: <DashboardIcon />,
      label: 'Tickets',
      component: Tickets
    },
    {
      eventKey: '2',
      icon: <GroupIcon />,
      label: 'Agents',
      component: Agents
    }
  ]

  return (
    <div className="App">
      <ToastContainer />
      <div style={{ height: '100vh', display: 'flex' }}>
        <Sidenav appearance='inverse' expanded={expanded} defaultOpenKeys={['3', '4']} style={{ height: '100%', maxWidth: '12vw' }}
        >
          <Sidenav.Header>
            <div style={{ padding: 20 }}>
              {/* HEADING */}
            </div>
          </Sidenav.Header>
          <Sidenav.Body style={{ textAlign: 'left' }}>
            <Nav activeKey={activeKey} onSelect={onNavSelect}>
              {navItems.map(item => (
                <Nav.Item key={item.eventKey} eventKey={item.eventKey} icon={item.icon}>
                  {item.label}
                </Nav.Item>
              ))}
            </Nav>
          </Sidenav.Body>
          <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
        </Sidenav>
        <div style={{padding:'20px'}}>
          {activeComponent}
        </div>
        
      </div>
    </div>
  );
}

export default App;
