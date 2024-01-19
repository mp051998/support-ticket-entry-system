import { Button, Container, FlexboxGrid, IconButton, Input, InputGroup, List, Tag } from 'rsuite';
import { cloneElement, useContext, useEffect, useState } from 'react';

import CreativeIcon from '@rsuite/icons/Creative';
import DangerIcon from '@rsuite/icons/Danger';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import PlusRoundIcon from '@rsuite/icons/PlusRound';
import RemindOutlineIcon from '@rsuite/icons/RemindOutline';
import SearchIcon from '@rsuite/icons/Search';
import SendIcon from '@rsuite/icons/Send'
import { Ticket } from '../interfaces/ticket';
import UserCircleIcon from '@rsuite/icons/legacy/UserCircleO';
import { UserContext } from '../App';

const icons = {
  'bug': <DangerIcon/>,
  'enhancement': <CreativeIcon />,
  'feature': <PlusRoundIcon />,
  'issue': <RemindOutlineIcon />
};

const statusTags = {
  'New': <Tag color='green' size='lg' style={{ display: 'inline-block', width: 'fit-content' }}>New</Tag>,
  'Assigned': <Tag color='orange' size='lg' style={{ display: 'inline-block', width: 'fit-content' }}>Assigned</Tag>,
  'Resolved': <Tag color='cyan' size='lg' style={{ display: 'inline-block', width: 'fit-content' }}>Resolved</Tag>
};

const severityTags = {
  'Low': <Tag color='green' size='lg' style={{ display: 'inline-block', width: 'fit-content' }}>Low</Tag>,
  'Medium': <Tag color='orange' size='lg' style={{ display: 'inline-block', width: 'fit-content' }}>Medium</Tag>,
  'High': <Tag color='red' size='lg' style={{ display: 'inline-block', width: 'fit-content' }}>High</Tag>
};

const typeTags = {
  'bug': <Tag color='red' size='lg' style={{ display: 'inline-block', width: 'fit-content' }}>Bug</Tag>,
  'enhancement': <Tag color='cyan' size='lg' style={{ display: 'inline-block', width: 'fit-content' }}>Enhancement</Tag>,
  'feature': <Tag color='green' size='lg' style={{ display: 'inline-block', width: 'fit-content' }}>Feature</Tag>,
  'issue': <Tag color='orange' size='lg' style={{ display: 'inline-block', width: 'fit-content' }}>Issue</Tag>
};

// Using dummy data till backend is ready
const data = [
  {
    id: 1,
    topic: "Bug Report",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    dateCreated: new Date("2022-01-01"),
    severity: "High",
    type: "bug",
    assignedTo: "support-agent-1",
    status: "New",
    resolvedOn: null,
    comments: [
      {
        user: "user1",
        message: "This is the first comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user2",
        message: "This is the second comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user3",
        message: "This is the third comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user4",
        message: "This is the fourth comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user1",
        message: "This is the fifth comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      }
    ]
  },
  {
    id: 2,
    topic: "Feature Request",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    dateCreated: new Date("2022-01-02"),
    severity: "Low",
    type: "feature",
    assignedTo: "support-agent-2",
    status: "Assigned",
    resolvedOn: null,
    comments: [
      {
        user: "user1",
        message: "This is the first comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user2",
        message: "This is the second comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user3",
        message: "This is the third comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user4",
        message: "This is the fourth comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user1",
        message: "This is the fifth comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      }
    ]
  },
  {
    id: 3,
    topic: "Performance Issue",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    dateCreated: new Date("2022-01-03"),
    severity: "Medium",
    type: "issue",
    assignedTo: "support-agent-3",
    status: "Resolved",
    resolvedOn: new Date("2022-01-05"),
    comments: [
      {
        user: "user1",
        message: "This is the first comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user2",
        message: "This is the second comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user3",
        message: "This is the third comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user4",
        message: "This is the fourth comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user1",
        message: "This is the fifth comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      }
    ]
  },
  {
    id: 4,
    topic: "UI Enhancement",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    dateCreated: new Date("2022-01-06"),
    severity: "Low",
    type: "enhancement",
    assignedTo: "support-agent-4",
    status: "New",
    resolvedOn: null,
    comments: [
      {
        user: "user1",
        message: "This is the first comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user2",
        message: "This is the second comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user3",
        message: "This is the third comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user4",
        message: "This is the fourth comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user1",
        message: "This is the fifth comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      }
    ]
  },
  {
    id: 5,
    topic: "Data Import Error",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    dateCreated: new Date("2022-01-07"),
    severity: "Medium",
    type: "bug",
    assignedTo: "support-agent-5",
    status: "Assigned",
    resolvedOn: null,
    comments: [
      {
        user: "user1",
        message: "This is the first comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user2",
        message: "This is the second comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user3",
        message: "This is the third comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user4",
        message: "This is the fourth comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      },
      {
        user: "user1",
        message: "This is the fifth comment.",
        sentAt: new Date("2022-01-06T12:00:00Z")
      }
    ]
  },
  {
    id: 6,
    topic: "Login Issue",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    dateCreated: new Date("2022-01-08"),
    severity: "High",
    type: "issue",
    assignedTo: "support-agent-6",
    status: "New",
    resolvedOn: null
  },
  {
    id: 7,
    topic: "Feature Enhancement",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    dateCreated: new Date("2022-01-09"),
    severity: "Medium",
    type: "feature",
    assignedTo: "support-agent-7",
    status: "New",
    resolvedOn: null
  },
  {
    id: 8,
    topic: "Performance Optimization",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    dateCreated: new Date("2022-01-10"),
    severity: "High",
    type: "issue",
    assignedTo: "support-agent-8",
    status: "New",
    resolvedOn: null
  },
  {
    id: 9,
    topic: "Data Export Error",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    dateCreated: new Date("2022-01-11"),
    severity: "Low",
    type: "bug",
    assignedTo: "support-agent-9",
    status: "New",
    resolvedOn: null
  },
  {
    id: 10,
    topic: "Feature Request",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    dateCreated: new Date("2022-01-12"),
    severity: "Medium",
    type: "feature",
    assignedTo: "support-agent-10",
    status: "New",
    resolvedOn: null
  },
  {
    id: 11,
    topic: "Bug Report",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    dateCreated: new Date("2022-01-13"),
    severity: "High",
    type: "bug",
    assignedTo: "support-agent-11",
    status: "New",
    resolvedOn: null
  },
  {
    id: 12,
    topic: "Performance Issue",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    dateCreated: new Date("2022-01-14"),
    severity: "Medium",
    type: "issue",
    assignedTo: "support-agent-12",
    status: "New",
    resolvedOn: null
  },
  {
    id: 13,
    topic: "UI Enhancement",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    dateCreated: new Date("2022-01-15"),
    severity: "Low",
    type: "enhancement",
    assignedTo: "support-agent-13",
    status: "New",
    resolvedOn: null
  },
  {
    id: 14,
    topic: "Bug Report",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    dateCreated: new Date("2022-01-16"),
    severity: "High",
    type: "bug",
    assignedTo: "support-agent-14",
    status: "New",
    resolvedOn: null
  },
  {
    id: 15,
    topic: "Feature Request",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    dateCreated: new Date("2022-01-17"),
    severity: "Low",
    type: "feature",
    assignedTo: "support-agent-15",
    status: "New",
    resolvedOn: null
  },
  {
    id: 16,
    topic: "Performance Issue",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    dateCreated: new Date("2022-01-18"),
    severity: "Medium",
    type: "issue",
    assignedTo: "support-agent-16",
    status: "New",
    resolvedOn: null
  },
];



const styleCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '75px'
};

const slimText = {
  fontSize: '0.666em',
  color: '#97969B',
  fontWeight: 'lighter',
  paddingBottom: 5
};

const titleStyle = {
  paddingBottom: 5,
  whiteSpace: 'nowrap',
  fontWeight: 1000
};

const dataStyle = {
  fontSize: '1.2em',
  fontWeight: 500
};

// TODO: These heights and widths are not properly responsive, fix that
const landscapeStyle = {
  height: '75vh',
  // width: '20vw',
  // overflow: 'hidden'
}

const portraitStyle = {
  height: '75vh',
  width: '100%',
  // overflow: 'hidden'
}

function Tickets() {

  const appContext = useContext(UserContext);
  console.log("App context is: ", appContext);
  
  console.log("Orientation of tickets is: ", appContext.orientation);

  const [style, setStyle] = useState(landscapeStyle);
  const [selectedTicket, setSelectedTicket] = useState<Ticket>();
  const [comment, setComment] = useState('');

  // const style = appContext.orientation === 'landscape' ? landscapeStyle : portraitStyle;
  useEffect(() => {
    console.log("Orientation changed to: ", appContext.orientation);
    if (appContext.orientation === 'landscape') {
      setStyle(landscapeStyle);
    } else {
      setStyle(portraitStyle);
    }
  }, [appContext.orientation])

  function selectTicket(ticket:any) {
    console.log("Selected ticket: ", ticket);
    setSelectedTicket(ticket);
  }
  
  function createTicket() {
    // Open modal to create ticket
    // TODO: Implement this
    console.log("Clicked create ticket");
  }

  function sendComment() {
    // Send comment to the ticket' chat conversation
    console.log("Sending comment: ", comment);
    setComment('');
    // TODO: Implement this
  }

  return (
    <div style={{width: '100%'}}>
      {
        (appContext.orientation === 'landscape' || !selectedTicket) &&
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'right',
              width: '100%'
            }}>
            <h2 style={{ textAlign: 'left', margin: 0 }}>Tickets</h2>
            <Button appearance="primary" style={{margin:'10px'}} onClick={createTicket}>Create Ticket</Button>
          </div>
      }

      
      <br/>

      { appContext.orientation === 'landscape' &&
        <div>
          <FlexboxGrid justify='space-between'>
            <FlexboxGrid.Item colspan={6}>
              <InputGroup inside style={{marginBottom:'1rem'}}>
                <Input />
                <InputGroup.Button>
                  <SearchIcon />
                </InputGroup.Button>
              </InputGroup>
              <List bordered style={style} hover autoScroll={true}>
                {data.map((item, index) => (
                  <List.Item key={item['id']} index={index + 1} onClick={() => selectTicket(item)}>
                    <FlexboxGrid>
                      <FlexboxGrid.Item colspan={4} style={styleCenter}>
                        {cloneElement(icons[item['type'] as keyof typeof icons], {
                          style: {
                            color: 'darkgrey',
                            fontSize: '1.5em'
                          }
                        })}
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item
                        colspan={16}
                        style={{
                          ...styleCenter,
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          overflow: 'hidden'
                        }}
                      >
                        <div style={titleStyle}>{item['topic']}</div>
                        <div style={slimText}>{item['type']}</div>
                        <div style={slimText}>
                          <div>
                            <UserCircleIcon />
                            {' ' + item['assignedTo']}
                          </div>
                          <div>{item['dateCreated'].toDateString()}</div>
                        </div>
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  </List.Item>
                ))}
              </List>
            </FlexboxGrid.Item>
        
            <FlexboxGrid.Item colspan={13} style={{display:'flex', paddingLeft: '1.5rem', paddingRight: '1.5rem'}}>
              {
                selectedTicket?.id && 
                  <Container style={{ textAlign: 'right', border: '1px solid lightgrey', borderRadius: '10px', padding: '1rem' }}>
                    <h3 style={{ textAlign: 'left', display: 'block', marginBottom:'0.5rem' }}>#{selectedTicket.id} {selectedTicket.topic}</h3>
                    
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom:'1rem' }}>
                      {statusTags[selectedTicket.status as keyof typeof statusTags]}
                      {severityTags[selectedTicket.severity as keyof typeof severityTags]}
                      {typeTags[selectedTicket.type as keyof typeof typeTags]}
                    </div>
                    
                    <p style={{ textAlign: 'left', fontSize: 16 }}>{selectedTicket.description}</p>
                    <hr/>

                    <h4 style={{textAlign:'left', 'marginBottom': '0.5rem'}}>Comments</h4>
                    
                    { 
                      selectedTicket?.comments &&
                        <List style={{ overflow: 'auto', maxHeight: '40vh' }}>
                          {selectedTicket.comments.map((comment, index) => (
                            <List.Item key={index}>
                              <FlexboxGrid>
                                <FlexboxGrid.Item colspan={2} style={styleCenter}>
                                  <UserCircleIcon style={{ color: 'darkgrey', fontSize: '1.5em' }} />
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item
                                  colspan={18}
                                  style={{
                                    ...styleCenter,
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    overflow: 'hidden',
                                    border: '1px solid lightgrey',
                                    borderRadius: '4px',
                                    padding: '8px',
                                  }}
                                >
                                  <div style={titleStyle}>{comment.user}</div>
                                  <div style={slimText}>{comment.message}</div>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item  colspan={3} style={{display:'flex', alignItems: 'flex-bottom', marginLeft:'0.5rem'}}>
                                  <div style={slimText}>{comment.sentAt.toDateString()}</div>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={1}>

                                </FlexboxGrid.Item>
                              </FlexboxGrid>
                            </List.Item>
                          ))}
                        </List>
                    }

                    {
                      (selectedTicket?.id && !selectedTicket?.comments) &&
                        <div>
                          <h5 style={{textAlign:'center'}}>No comments yet.</h5>
                        </div>
                    }

                    <div style={{marginTop:'1rem', display: 'flex', alignItems: 'center'}}>
                      <Input style={{marginRight: '0.5rem'}} value={comment}
                        onChange={(value) => {setComment(value)}}
                      />
                      <IconButton circle icon={<SendIcon/>} style={{fontSize:25}} appearance='primary' disabled={!comment}/>
                    </div>

                  </Container>
              }
            </FlexboxGrid.Item>
            
            <FlexboxGrid.Item colspan={4} style={{display:'block'}}>
              { selectedTicket?.id &&
                <List style={{display:'block', textAlign:'left', }} hover bordered={true}>
                  <List.Item>
                    <h5>Assignees</h5>
                    {selectedTicket?.assignedTo}
                  </List.Item>
                  <List.Item>
                    <h5>Created</h5>
                    {selectedTicket?.dateCreated.toDateString()}
                  </List.Item>
                  <List.Item>
                    <h5>Type</h5>
                    {selectedTicket?.type}
                  </List.Item>
                  <List.Item>
                    <h5>Severity</h5>
                    {selectedTicket?.severity}
                  </List.Item>
                  <List.Item>
                    <h5>Status</h5>
                    {selectedTicket?.status}
                  </List.Item>

                </List>
              }
            </FlexboxGrid.Item>
          </FlexboxGrid>
        
        </div>
      }

      {
        appContext.orientation === 'portrait' &&
          <div>
            {
              !selectedTicket?.id &&
                <List bordered style={style} hover>
                {data.map((item, index) => (
                  <List.Item key={item['id']} index={index + 1} onClick={() => selectTicket(item)}>
                    <FlexboxGrid>
                      <FlexboxGrid.Item colspan={4} style={styleCenter}>
                        {cloneElement(icons[item['type'] as keyof typeof icons], {
                          style: {
                            color: 'darkgrey',
                            fontSize: '1.5em'
                          }
                        })}
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item
                        colspan={16}
                        style={{
                          ...styleCenter,
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          overflow: 'hidden'
                        }}
                      >
                        <div style={titleStyle}>{item['topic']}</div>
                        <div style={slimText}>{item['type']}</div>
                        <div style={slimText}>
                          <div>
                            <UserCircleIcon />
                            {' ' + item['assignedTo']}
                          </div>
                          <div>{item['dateCreated'].toDateString()}</div>
                        </div>
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  </List.Item>
                ))}
              </List>
            }

            {
              selectedTicket?.id && 
                <div>
                  <Container style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <PagePreviousIcon style={{ color: 'grey', fontSize: '2em', marginRight: '0.5rem' }} onClick={() => selectTicket(undefined)} />
                      <h3 style={{ textAlign: 'left', display: 'inline-block', marginBottom: '0.5rem' }}>#{selectedTicket.id} {selectedTicket.topic}</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom:'1rem' }}>
                      {statusTags[selectedTicket.status as keyof typeof statusTags]}
                      {severityTags[selectedTicket.severity as keyof typeof severityTags]}
                      {typeTags[selectedTicket.type as keyof typeof typeTags]}
                    </div>
                    
                    <p style={{ textAlign: 'left', fontSize: 16 }}>{selectedTicket.description}</p>
                    <hr/>

                    <div>
                      <h4 style={{textAlign:'left', marginBottom:'0.5rem'}}>Comments</h4>
                      { selectedTicket?.comments &&
                        <List style={{ overflow: 'auto', maxHeight: '40vh' }}>
                          {selectedTicket.comments.map((comment, index) => (
                            <List.Item key={index}>
                              <FlexboxGrid>
                                <FlexboxGrid.Item colspan={2} style={styleCenter}>
                                  <UserCircleIcon style={{ color: 'darkgrey', fontSize: '1.5em' }} />
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item
                                  colspan={18}
                                  style={{
                                    ...styleCenter,
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    overflow: 'hidden',
                                    border: '1px solid lightgrey',
                                    borderRadius: '4px',
                                    padding: '8px',
                                  }}
                                >
                                  <div style={titleStyle}>{comment.user}</div>
                                  {/* <div style={slimText}>{comment.sentAt.toDateString()}</div> */}
                                  <div style={slimText}>{comment.message}</div>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item  colspan={3} style={{display:'flex', alignItems: 'flex-bottom', marginLeft:'0.5rem'}}>
                                  <div style={slimText}>{comment.sentAt.toDateString()}</div>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={1}>

                                </FlexboxGrid.Item>
                              </FlexboxGrid>
                            </List.Item>
                          ))}
                        </List>
                      }
                      
                      <div style={{marginTop:'1rem', display: 'flex', alignItems: 'center'}}>
                        <Input style={{marginRight: '0.5rem'}} value={comment} 
                          onChange={(value) => {setComment(value)}}
                        />
                        <IconButton circle icon={<SendIcon onClick={sendComment}/>} style={{fontSize:25}} appearance='primary' disabled={!comment}/>
                      </div>
                    </div>
                  </Container>
                </div>
            }

            <br/><br/>
            
            {
              selectedTicket?.id && 
              <div style={{ textAlign:'left' }}>
                <h4 style={{marginBottom:'0.5rem'}}>Info</h4>
                <List style={{display:'block'}} hover bordered={true}>
                  <List.Item>
                    <h5>Assignees</h5>
                    {selectedTicket?.assignedTo}
                  </List.Item>
                  <List.Item>
                    <h5>Created</h5>
                    {selectedTicket?.dateCreated.toDateString()}
                  </List.Item>
                  <List.Item>
                    <h5>Type</h5>
                    {selectedTicket?.type}
                  </List.Item>
                  <List.Item>
                    <h5>Severity</h5>
                    {selectedTicket?.severity}
                  </List.Item>
                  <List.Item>
                    <h5>Status</h5>
                    {selectedTicket?.status}
                  </List.Item>

                </List>
              </div>
            }
            
          </div>
      }
      
    </div>
    
  );
}

export default Tickets;
