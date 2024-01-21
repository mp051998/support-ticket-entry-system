import './App.css';
import 'rsuite/dist/rsuite.min.css';

import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { Loader, Nav, Navbar } from 'rsuite';

import { Agent } from './interfaces/agent';
import Agents from './screens/agents';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import Tickets from './screens/tickets';
import { ToastContainer } from 'react-toastify';

export const UserContext = createContext({ 
  orientation: 'landscape',
  activeAgent: {} as Agent,
  setActiveAgent: {} as Dispatch<SetStateAction<Agent>>,
  setShowLoader: {} as Dispatch<SetStateAction<boolean>>
});


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
  // const [expanded, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState('1');
  const [activeComponent, setActiveComponent] = useState(<Tickets/>);
  const [activeAgent, setActiveAgent] = useState<Agent>({} as Agent);

  // Loader related
  const [showLoader, setShowLoader] = useState(false);

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
    // if (appOrientation === 'landscape') {
    //   return (
    //     <div style={{ height: '100vh', display: 'flex' }}>
    //       <Sidenav 
    //         appearance='inverse'
    //         expanded={expanded}
    //         style={{ 
    //           height: '100%', maxWidth: '12vw' 
    //         }}
    //         activeKey={activeKey}
    //       >
    //         <Sidenav.Header>
    //           <div style={{ padding: 20 }}>
    //             {/* HEADING */}
    //           </div>
    //         </Sidenav.Header>
    //         <Sidenav.Body style={{ textAlign: 'left' }}>
    //           <Nav activeKey={activeKey} onSelect={onNavSelect}>
    //             {navItems.map(item => (
    //               <Nav.Item key={item.eventKey} eventKey={item.eventKey} icon={item.icon}>
    //                 {item.label}
    //               </Nav.Item>
    //             ))}
    //           </Nav>
    //         </Sidenav.Body>
    //         <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
    //       </Sidenav>

    //       <div style={{padding: 20, width:'100%'}}>
    //         {activeComponent}
    //       </div>
    //     </div>
    //   );
    // } else {
      return (
        <div style={{ pointerEvents: showLoader ? 'none' : 'all' }}>
          {showLoader && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backdropFilter: 'blur(5px)', // Apply blur effect
                zIndex: 9999, // Set z-index to make sure it sits on top
              }}
            >
              <Loader size='lg' backdrop={false} />
            </div>
          )}
          <div style={{ position: 'sticky', bottom: 0 }}>
            <Navbar appearance='inverse'>
              <Nav activeKey={activeKey} onSelect={onNavSelect}>
                {navItems.map(item => (
                  <Nav.Item key={item.eventKey} eventKey={item.eventKey} icon={item.icon}>
                    {item.label}
                  </Nav.Item>
                ))}
              </Nav>
              {
                activeAgent?.id &&
                  <Nav pullRight>
                    <Nav.Menu noCaret openDirection='end' 
                      title={
                        <div>
                          <img src={activeAgent.img} alt='user' style={{ width: '45px', height: '45px', borderRadius: '50%', marginRight: '0.5rem' }} />
                          {activeAgent.name}
                        </div>
                        
                      }
                    >
                      {/* <Nav.Item>{`${activeAgent.name} logged in`}</Nav.Item> */}
                      <Nav.Item onClick={() => {setActiveAgent({} as Agent)}}>Logout</Nav.Item>
                    </Nav.Menu>
                  </Nav>
              }
            </Navbar>
            <div style={{padding: 20}}>
              {activeComponent}
            </div>
          </div>
        </div>
      );
    // }
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ 
          orientation: appOrientation, 
          activeAgent: activeAgent, 
          setActiveAgent: setActiveAgent as Dispatch<SetStateAction<Agent>>,
          setShowLoader: setShowLoader as Dispatch<SetStateAction<boolean>>
        }}>
        <ToastContainer />
        {renderView()}
      </UserContext.Provider>
    </div>
  );
}

export default App;
