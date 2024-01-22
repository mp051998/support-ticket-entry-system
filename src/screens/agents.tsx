import { Button, Form, Input, InputGroup, Modal, Notification, toaster } from "rsuite";
import { Ref, forwardRef, useContext, useState } from "react";

import { AgentsService } from "../services/agents";
import { UserContext } from "../App";

// Accepters for rsuite components
const Textarea = forwardRef((props, ref: Ref<HTMLTextAreaElement>) => <Input {...props} as="textarea" ref={ref} />);

const agents = [
  {
    'id': 1,
    'name': 'Shh',
    'img': 'https://media.istockphoto.com/id/1340464041/photo/smiley-face.jpg?s=612x612&w=0&k=20&c=gAMy2Ty5P6g_flmRun96Rt4rRBYmLU23FRc9HuOoj8M='
  },
  {
    'id': 2,
    'name': 'Mischief',
    'img': 'https://cdn.pixabay.com/photo/2016/03/31/21/59/cute-1296762_1280.png'
  },
  {
    'id': 3,
    'name': 'Crybaby',
    'img': 'https://img.freepik.com/premium-vector/crying-face-emoji-sticker-yellow-face-with-tear-black-outline-cute-sticker-pink-background-groovy-aesthetic-vector-design-element_642540-905.jpg'
  },
  {
    'id': 4,
    'name': 'Laugh',
    'img': 'https://media.istockphoto.com/id/528415533/vector/emoticon-with-tears-of-joy.jpg?s=612x612&w=0&k=20&c=zt919iGd1ZSJ2kFU0g676iVKLamUXMSjMD2s-NkV8_c='
  },
  {
    'id': 5,
    'name': 'Shh',
    'img': 'https://media.istockphoto.com/id/1340464041/photo/smiley-face.jpg?s=612x612&w=0&k=20&c=gAMy2Ty5P6g_flmRun96Rt4rRBYmLU23FRc9HuOoj8M='
  },
  // {
  //   'id': 6,
  //   'name': 'Mischief',
  //   'img': 'https://cdn.pixabay.com/photo/2016/03/31/21/59/cute-1296762_1280.png'
  // },
  // {
  //   'id': 7,
  //   'name': 'Crybaby',
  //   'img': 'https://img.freepik.com/premium-vector/crying-face-emoji-sticker-yellow-face-with-tear-black-outline-cute-sticker-pink-background-groovy-aesthetic-vector-design-element_642540-905.jpg'
  // },
  // {
  //   'id': 8,
  //   'name': 'Laugh',
  //   'img': 'https://media.istockphoto.com/id/528415533/vector/emoticon-with-tears-of-joy.jpg?s=612x612&w=0&k=20&c=zt919iGd1ZSJ2kFU0g676iVKLamUXMSjMD2s-NkV8_c='
  // },
  // {
  //   'id': 9,
  //   'name': 'Shh',
  //   'img': 'https://media.istockphoto.com/id/1340464041/photo/smiley-face.jpg?s=612x612&w=0&k=20&c=gAMy2Ty5P6g_flmRun96Rt4rRBYmLU23FRc9HuOoj8M='
  // },
  // {
  //   'id': 10,
  //   'name': 'Mischief',
  //   'img': 'https://cdn.pixabay.com/photo/2016/03/31/21/59/cute-1296762_1280.png'
  // },
  // {
  //   'id': 11,
  //   'name': 'Crybaby',
  //   'img': 'https://img.freepik.com/premium-vector/crying-face-emoji-sticker-yellow-face-with-tear-black-outline-cute-sticker-pink-background-groovy-aesthetic-vector-design-element_642540-905.jpg'
  // },
  // {
  //   'id': 12,
  //   'name': 'Laugh',
  //   'img': 'https://media.istockphoto.com/id/528415533/vector/emoticon-with-tears-of-joy.jpg?s=612x612&w=0&k=20&c=zt919iGd1ZSJ2kFU0g676iVKLamUXMSjMD2s-NkV8_c='
  // }
]

const Agents = () => {

  const appContext = useContext(UserContext);

  const { activeAgent, setActiveAgent } = appContext;

  // Create agent modal related
  const [ agentDataForm, setAgentDataForm ] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });
  const [agentDataFormErrors, setAgentDataFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });
  const [createAgentModalOpen, setCreateAgentModalOpen] = useState(false);

  function openCreateAgentModal() {
    setCreateAgentModalOpen(true);
  }
  
  function handleAgentDataFormChange(name: string, value: string) {
    console.log(name, value);
    setAgentDataForm(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  function handleCloseCreateAgentModal() {
    setCreateAgentModalOpen(false);
  }

  function onAgentClick(agent: any) {
    setActiveAgent(agent);
    toaster.push(<Notification closable type='success' header={`'${agent.name}' is now the active agent!`}/>, {
      duration: 5000
    });
  }
  
  function createAgent() {
    // Clear all errors
    setAgentDataFormErrors({
      name: '',
      email: '',
      phone: '',
      description: ''
    });

    let erred = false;
    if (!agentDataForm.name) {
      setAgentDataFormErrors(prevErrors => ({
        ...prevErrors,
        name: 'Name is required'
      }));
      erred = true;
    }
    if (!agentDataForm.description) {
      setAgentDataFormErrors(prevErrors => ({
        ...prevErrors,
        description: 'Description is required'
      }));
      erred = true;
    }

    if (!agentDataForm.phone) {
      setAgentDataFormErrors(prevErrors => ({
        ...prevErrors,
        severity: 'Phone is required'
      }));
      erred = true;
    } else if (agentDataForm.phone.length !== 10) {
      setAgentDataFormErrors(prevErrors => ({
        ...prevErrors,
        severity: 'Phone number should be 10 digits'
      }));
      erred = true;
    }
    
    if (!agentDataForm.email) {
      setAgentDataFormErrors(prevErrors => ({
        ...prevErrors,
        type: 'Email is required'
      }));
      erred = true;
    }

    if (erred) {
      return;
    }

    console.log("Creating ticket");

    appContext.setShowLoader(true);

    AgentsService.createAgent(agentDataForm.name, agentDataForm.email, agentDataForm.phone, agentDataForm.description).then((response) => {
      console.log("Agent created: ", response);
      handleCloseCreateAgentModal();
      appContext.setShowLoader(false);
      toaster.push(<Notification closable type='success' header='Agent created successfully'/>, {
        duration: 5000
      });
      // Flush the agent data form
      setAgentDataForm({
        name: '',
        email: '',
        phone: '',
        description: ''
      });
    }, (err) => {
      console.log(err);
      appContext.setShowLoader(false);
    });
    
  }

  return (
    <div>
      <Modal backdrop='static' open={createAgentModalOpen} onClose={handleCloseCreateAgentModal}>
        <Modal.Header>
          <h3>Create Ticket</h3>
        </Modal.Header>
        <Modal.Body>
          <Form fluid
            formValue={agentDataForm}
          >
            <Form.Group>
              <Form.ControlLabel>Name</Form.ControlLabel>
              <Form.Control
                name="name"
                value={agentDataForm.name}
                onChange={(value) => handleAgentDataFormChange("name", value)}
                errorMessage={agentDataFormErrors.name}
              />
            </Form.Group>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <Form.Group style={{width:'48%'}}>
                <Form.ControlLabel>Email</Form.ControlLabel>
                <InputGroup inside>
                  <InputGroup.Addon style={{backgroundColor:'lightGrey', marginRight:'0.5rem'}}>@</InputGroup.Addon>
                  <Form.Control
                    name="email"
                    value={agentDataForm.email}
                    onChange={(value) => handleAgentDataFormChange("email", value)}
                    errorMessage={agentDataFormErrors.email}
                    style={{paddingRight:'0.5rem'}}
                    onBlur={() => {
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (!emailRegex.test(agentDataForm.email)) {
                        setAgentDataFormErrors(prevErrors => ({
                          ...prevErrors,
                          email: 'Invalid email format'
                        }));
                      } else {
                        setAgentDataFormErrors(prevErrors => ({
                          ...prevErrors,
                          email: ''
                        }));
                      }
                    }}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{width:'48%'}}>
                <Form.ControlLabel>Phone</Form.ControlLabel>
                <InputGroup inside>
                  <InputGroup.Addon style={{backgroundColor:'lightGrey', marginRight:'0.5rem'}}>+91</InputGroup.Addon>
                  <Form.Control
                    name="phone"
                    value={agentDataForm.phone}
                    onChange={(value) => handleAgentDataFormChange("phone", value.replace(/[^0-9]/g, "").slice(0, 10))}
                    errorMessage={agentDataFormErrors.phone}
                    onBlur={() => {
                      if (agentDataForm.phone.length !== 10) {
                        setAgentDataFormErrors(prevErrors => ({
                          ...prevErrors,
                          phone: 'Phone number should be 10 digits'
                        }));
                      } else {
                        setAgentDataFormErrors(prevErrors => ({
                          ...prevErrors,
                          phone: ''
                        }));
                      }
                    }}
                  />
                </InputGroup>
              </Form.Group>
            </div>
            <Form.Group>
              <Form.ControlLabel>Description</Form.ControlLabel>
              <Form.Control
                accepter={Textarea}
                // rows={5}
                name="description"
                value={agentDataForm.description}
                onChange={(value) => handleAgentDataFormChange("description", value)}
                errorMessage={agentDataFormErrors.description}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseCreateAgentModal} appearance="subtle">
            Cancel
          </Button>
          <Button onClick={createAgent} appearance="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h2 style={{textAlign:'left', marginBottom:'1rem'}}>Agents</h2>
        <Button appearance='primary' style={{marginBottom:'1rem'}} onClick={openCreateAgentModal}>Add Agent</Button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '75vh', flexWrap: 'wrap', overflow: 'auto' }}>
        {agents.map((agent) => (
          <div>
            {
              (activeAgent && activeAgent?.id === agent.id) ? (
                <div 
                  key={agent.id} 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '5px solid lightBlue',
                    padding: '1rem',
                    borderRadius: '5px',
                    margin: '1rem'
                  }}
                >
                  <img src={agent.img} alt={agent.name} style={{ width: '200px', height: '200px' }} />
                  <h3 style={{ textAlign: 'center', marginTop: '10px' }}>{agent.name}</h3>
                </div>
              ) : (
                <div 
                  key={agent.id} 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '1px solid lightgrey',
                    padding: '1rem',
                    borderRadius: '5px',
                    margin: '1rem'
                  }}
                  onClick={() => onAgentClick(agent)}
                >
                  <img src={agent.img} alt={agent.name} style={{ width: '200px', height: '200px' }} />
                  <h3 style={{ textAlign: 'center', marginTop: '10px' }}>{agent.name}</h3>
                </div>
              )
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default Agents;
