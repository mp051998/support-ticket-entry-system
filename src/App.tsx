import './App.css';
import 'rsuite/dist/rsuite.min.css';

import { Nav, Navbar, Sidenav } from 'rsuite';
import { createContext, useEffect, useState } from 'react';

import Agents from './screens/agents';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import Tickets from './screens/tickets';
import { ToastContainer } from 'react-toastify';

export const UserContext = createContext({ orientation: 'landscape' });


function App() {

  function useOrientation() {
    const [orientation, setOrientation] = useState(
      window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
    );
  
    useEffect(() => {
      const handleResize = () => {
        setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return orientation;
  }
  
  const appOrientation = useOrientation();
  const [expanded, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState('1');
  const [activeComponent, setActiveComponent] = useState(<Tickets/>);

  const onNavSelect = (eventKey: string) => {
    setActiveKey(eventKey);
    const component = navItems.find(item => item.eventKey === eventKey)?.component;
    if (component) {
      setActiveComponent(component);
    }
  }

  const navItems = [
    {
      eventKey: '1',
      icon: <DashboardIcon />,
      label: 'Tickets',
      component: <Tickets/>
    },
    {
      eventKey: '2',
      icon: <GroupIcon />,
      label: 'Agents',
      component: <Agents/>
    }
  ]

  const renderView = () => {
    if (appOrientation === 'landscape') {
      return (
        <div style={{ height: '100vh', display: 'flex' }}>
          <Sidenav 
            appearance='inverse'
            expanded={expanded}
            style={{ 
              height: '100%', maxWidth: '12vw' 
            }}
            activeKey={activeKey}
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

          <div style={{padding: 20}}>
            {activeComponent}
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ position: 'sticky', bottom: 0 }}>
          <Navbar appearance='inverse'>
            <Nav activeKey={activeKey} onSelect={onNavSelect}>
              {navItems.map(item => (
                <Nav.Item key={item.eventKey} eventKey={item.eventKey} icon={item.icon}>
                  {item.label}
                </Nav.Item>
              ))}
            </Nav>
          </Navbar>
          <div style={{padding: 20}}>
            {activeComponent}
          </div>
        </div>
      );
    }
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ orientation: appOrientation }}>
        <ToastContainer />
        {renderView()}
      </UserContext.Provider>
    </div>
  );
}

export default App;
