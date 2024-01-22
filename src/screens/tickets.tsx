import { Button, Container, FlexboxGrid, Form, IconButton, Input, InputGroup, List, Modal, MultiCascader, Notification, Pagination, SelectPicker, Tag, toaster } from 'rsuite';
import { Ref, cloneElement, forwardRef, useContext, useEffect, useState } from 'react';

import CalendarIcon from '@rsuite/icons/Calendar';
import CreativeIcon from '@rsuite/icons/Creative';
import DangerIcon from '@rsuite/icons/Danger';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import PlusRoundIcon from '@rsuite/icons/PlusRound';
import RemindOutlineIcon from '@rsuite/icons/RemindOutline';
import SearchIcon from '@rsuite/icons/Search';
import SendIcon from '@rsuite/icons/Send';
import { Ticket } from '../interfaces/ticket';
import TicketsService from '../services/tickets';
import { TypeAttributes } from 'rsuite/esm/@types/common';
import UserCircleIcon from '@rsuite/icons/legacy/UserCircleO';
import { UserContext } from '../App';
import { capitalizeFirstLetter } from '../utils/stringTransformers';
import { timestampToDatestring } from '../utils/datetime';

// Accepters for rsuite components
const Textarea = forwardRef((props, ref: Ref<HTMLTextAreaElement>) => <Input {...props} as="textarea" ref={ref} />);

const tagStyle = { display: 'inline-block', width: 'fit-content' };

const icons = {
  'bug': <DangerIcon/>,
  'enhancement': <CreativeIcon />,
  'feature': <PlusRoundIcon />,
  'issue': <RemindOutlineIcon />
};

const severities = [
  {label: 'Low', value: 'low'},
  {label: 'Medium', value: 'medium'},
  {label: 'High', value: 'high'}
];

const ticketTypes = [
  {label: 'Bug', value: 'bug'},
  {label: 'Enhancement', value: 'enhancement'},
  {label: 'Feature', value: 'feature'},
  {label: 'Issue', value: 'issue'}
];

const filters = [
  {
    value: 'severity',
    label: 'Severity',
    multiple: false,
    children: [
      {label: 'Low', value: 'low'},
      {label: 'Medium', value: 'medium'},
      {label: 'High', value: 'high'}
    ]
  },
  {
    value: 'type',
    label: 'Type',
    children: [
      {label: 'Bug', value: 'bug'},
      {label: 'Enhancement', value: 'enhancement'},
      {label: 'Feature', value: 'feature'},
      {label: 'Issue', value: 'issue'}
    ]
  }
]

const defaultFiltersForm = {
  severity: [],
  type: []
} as {
  severity: string[],
  type: string[]
};


interface TagProperties {
  color: TypeAttributes.Color;
}

const tags = {
  severity: {
    low: {color: 'green'} as TagProperties,
    medium: {color: 'orange'} as TagProperties,
    high: {color: 'red'} as TagProperties
  },
  status: {
    new: {color: 'green'} as TagProperties,
    assigned: {color: 'orange'} as TagProperties,
    resolved: {color: 'cyan'} as TagProperties
  },
  type: {
    bug: {color: 'red'} as TagProperties,
    enhancement: {color: 'cyan'} as TagProperties,
    feature: {color: 'green'} as TagProperties,
    issue: {color: 'orange'} as TagProperties
  }
};

function getTag(tagType: string, tagKey: string, tagSize: string) {
  const tagData:TagProperties = tags[tagType as keyof typeof tags][tagKey as keyof typeof tags[keyof typeof tags]];
  const color = tagData?.color;
  return <Tag color={color} size={tagSize as any} style={tagStyle}>{capitalizeFirstLetter(tagKey)}</Tag>
}

const perPageOptions = [
  {label: '1', value: 1},
  {label: '10', value: 10},
  {label: '20', value: 20},
  {label: '30', value: 50},
];

const styleCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const slimText = {
  fontSize: '0.666em',
  color: '#97969B',
  fontWeight: 'lighter',
  paddingBottom: 5
};

// TODO: These styles are not properly responsive, fix that
const titleStyle = {
  paddingBottom: 5,
  whiteSpace: 'nowrap',
  fontWeight: 1000,
  fontSize: '1em',
};

// TODO: These heights and widths are not properly responsive, fix that
const landscapeStyle = {
  height: '55vh',
  // width: '20vw',
  // overflow: 'hidden'
}

const portraitStyle = {
  height: '65vh',
  width: '100%',
  // overflow: 'hidden'
}

function Tickets() {

  const appContext = useContext(UserContext);

  const [style, setStyle] = useState(landscapeStyle);
  const [activePage, setActivePage] = useState(1);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [totalTicketsCount, setTotalTicketsCount] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [selectedTicket, setSelectedTicket] = useState<Ticket>();
  const [comment, setComment] = useState('');

  const [filtersForm, setFiltersForm] = useState(defaultFiltersForm);

  const [createTicketModalOpen, setCreateTicketModalOpen] = useState(false);
  const [ticketData, setTicketData] = useState({
    topic: '',
    description: '',
    severity: '',
    type: ''
  });
  const [ticketFormErrors, setTicketFormErrors] = useState({
    topic: '',
    description: '',
    severity: '',
    type: ''
  });
  
  useEffect(() => {
    console.log("Orientation changed to: ", appContext.orientation);
    if (appContext.orientation === 'landscape') {
      setStyle(landscapeStyle);
    } else {
      setStyle(portraitStyle);
    }
  }, [appContext.orientation])

  // Get the tickets from the express server
  // TODO: Make this call and integrate the list with this data
  useEffect(() => {
    TicketsService.getTickets([], filtersForm.severity, activePage, perPage).then((response) => {
      console.log("Tickets: ", response);
      setTickets(response?.data);
      setTotalTicketsCount(response?.meta?.count);
    }, (err) => {
      console.log(err);
    });
  }, [perPage, activePage, filtersForm]);

  function selectTicket(ticket:any) {
    console.log("Selected ticket: ", ticket);
    setSelectedTicket(ticket);
  }

  function openCreateTicketModal() {
    setCreateTicketModalOpen(true);
  }

  function handleCloseCreateTicketModal() {
    setCreateTicketModalOpen(false);
  }

  function handleTicketChange(name: string, value: string) {
    setTicketData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  function createTicket() {
    // Clear all errors
    setTicketFormErrors({
      topic: '',
      description: '',
      severity: '',
      type: ''
    });

    let erred = false;
    if (!ticketData.topic) {
      setTicketFormErrors(prevErrors => ({
        ...prevErrors,
        topic: 'Topic is required'
      }));
      erred = true;
    }
    if (!ticketData.description) {
      setTicketFormErrors(prevErrors => ({
        ...prevErrors,
        description: 'Description is required'
      }));
      erred = true;
    }
    if (!ticketData.severity) {
      setTicketFormErrors(prevErrors => ({
        ...prevErrors,
        severity: 'Severity is required'
      }));
      erred = true;
    }
    if (!ticketData.type) {
      setTicketFormErrors(prevErrors => ({
        ...prevErrors,
        type: 'Type is required'
      }));
      erred = true;
    }

    if (erred) {
      return;
    }

    console.log("Creating ticket");

    appContext.setShowLoader(true);
    TicketsService.createTicket(ticketData.topic, ticketData.description, ticketData.severity, ticketData.type).then((response) => {
      console.log("Ticket created: ", response);
      const newTicketID = response?.data?.id;
      handleCloseCreateTicketModal();
      appContext.setShowLoader(false);
      toaster.push(<Notification closable type='success' header='Ticket created successfully'/>, {
        duration: 5000
      });
      // Flush the ticket data
      setTicketData({
        topic: '',
        description: '',
        severity: '',
        type: ''
      });

      // Also refresh the tickets list
      TicketsService.getTickets().then((response) => {
        console.log("Tickets: ", response);
        setTickets(response?.data);
        // Select the newly created ticket
        const newTicket = response?.data?.find((ticket:Ticket) => ticket.id === newTicketID);
        if (newTicket) {
          selectTicket(newTicket);
        }
      }, (err) => {
        console.log(err);
      });
    }, (err) => {
      console.log(err);
      appContext.setShowLoader(false);
    });
    
  }

  function sendComment() {
    // Send comment to the ticket's chat conversation
    console.log("Sending comment: ", comment);
    setComment('');
    // TODO: Implement this
  }

  // Filters cascade related
  function handleCascadeCheck(value:any, item:any, checked:boolean) {
    const filterParent = item.parent?.value as keyof typeof defaultFiltersForm;
    const filterChild = item.value;
    
    setFiltersForm(prevForm => {
      let newForm = {...prevForm};
      if (checked) {
        if (!prevForm[filterParent].includes(filterChild)) {
          newForm[filterParent].push(filterChild);
        }
      } else {
        const index = prevForm[filterParent].indexOf(filterChild);
        if (index !== -1) {
          newForm[filterParent].splice(index, 1);
        }
      }
      return newForm;
    });
  }

  function handleCascadeClean(event:any) {
    console.log("Cascade clean: ", event);
    setFiltersForm(prevForm => ({
      severity: [],
      type: []
    }));
  }



  return (
    <div>
      <Modal backdrop='static' open={createTicketModalOpen} onClose={handleCloseCreateTicketModal}>
        <Modal.Header>
          <h3>Create Ticket</h3>
        </Modal.Header>
        <Modal.Body>
          <Form fluid
            formValue={ticketData}
          >
            <Form.Group>
              <Form.ControlLabel>Topic</Form.ControlLabel>
              <Form.Control
                name="topic"
                value={ticketData.topic}
                onChange={(value) => handleTicketChange("topic", value)}
                errorMessage={ticketFormErrors.topic}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Description</Form.ControlLabel>
              <Form.Control
                accepter={Textarea}
                // rows={5}
                name="description"
                value={ticketData.description}
                onChange={(value) => handleTicketChange("description", value)}
                errorMessage={ticketFormErrors.description}
              />
            </Form.Group>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Form.Group style={{ width: '40%', textAlign: 'left' }}>
                <Form.ControlLabel>Severity</Form.ControlLabel>
                <Form.Control
                  accepter={SelectPicker}
                  name="severity"
                  value={ticketData.severity}
                  data={severities}
                  searchable={false}
                  onChange={(value) => handleTicketChange("severity", value)}
                  errorMessage={ticketFormErrors.severity}
                  block // Add the block prop to use all available width
                />
              </Form.Group>
              <Form.Group style={{ width: '40%', textAlign: 'left' }}>
                <Form.ControlLabel>Type</Form.ControlLabel>
                <Form.Control
                  accepter={SelectPicker}
                  name="type"
                  data={ticketTypes}
                  value={ticketData.type}
                  searchable={false}
                  onChange={(value) => handleTicketChange("type", value)}
                  errorMessage={ticketFormErrors.type}
                  block // Add the block prop to use all available width
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseCreateTicketModal} appearance="subtle">
            Cancel
          </Button>
          <Button onClick={createTicket} appearance="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
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
            <Button appearance="primary" style={{margin:'10px'}} onClick={openCreateTicketModal}>Create Ticket</Button>
          </div>
      }

      
      <br/>

      { appContext.orientation === 'landscape' &&
        <div>
          <FlexboxGrid justify='space-between'>
            <FlexboxGrid.Item colspan={6}>
              <InputGroup inside style={{marginBottom:'0.5rem'}}>
                <Input />
                <InputGroup.Button>
                  <SearchIcon />
                </InputGroup.Button>
              </InputGroup>
              <div style={{marginBottom:'0.5rem', display:'flex', justifyContent: 'right', alignItems:'center'}}>
                <MultiCascader 
                  labelKey='label'
                  cascade={false}
                  searchable={false} 
                  appearance='default' 
                  data={filters} 
                  placeholder='Filters' 
                  style={{width:'80%'}}
                  onClean={handleCascadeClean}
                  onCheck={handleCascadeCheck}
                  menuHeight='auto'
                />
                <Button style={{ marginLeft: '0.5rem', width:'20%'}}>Sort By</Button>
              </div>
              
              <List bordered style={style} hover autoScroll={true}>
                {tickets.map((item:Ticket, index) => (
                  <List.Item 
                    key={item['id']} 
                    index={index + 1} 
                    onClick={() => selectTicket(item)}
                    style={selectedTicket?.id === item['id'] ? {backgroundColor: 'lightskyblue'} : {}}
                  >
                    <FlexboxGrid>
                      <FlexboxGrid.Item colspan={4} style={{...styleCenter, fontSize: 45, float:'left', width: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom:'auto'}}>
                        {cloneElement(icons[item['type'] as keyof typeof icons], {
                          style: {
                            // color: 'darkgrey',
                            // fontSize: '1.5em'
                          }
                        })}
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item
                        colspan={18}
                        style={{
                          ...styleCenter,
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          overflow: 'hidden',
                        }}
                      >
                        <div style={titleStyle}>#{item['id']} {item['topic']}</div>
                        <div style={{display: 'flex', alignItems: 'center', marginBottom:'0.25rem'}}>
                          {getTag('status', item.status, 'sm')}
                          {getTag('severity', item.severity, 'sm')}
                          {getTag('type', item.type, 'sm')}
                        </div>

                        <div style={{display: 'block', alignItems: 'left', justifyContent: 'left', fontSize: '0.7em'}}>
                        {/* TODO: The Calendar Icon and User Circle Icon do not align properly column wise*/}
                          
                          <FlexboxGrid>
                            <FlexboxGrid.Item colspan={24} style={{textAlign:'left'}}>
                              <CalendarIcon /> 
                              {' ' + timestampToDatestring(item?.createdAt)}
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={24} style={{textAlign:'left'}}>
                              <UserCircleIcon /> 
                              {' ' + item?.assignedTo?.name } <i>{'[#' + item?.assignedTo?.id + ']'}</i>
                            </FlexboxGrid.Item>
                          </FlexboxGrid>
                        </div>
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  </List.Item>
                ))}
              </List>
              <div style={{display:'flex', justifyContent:'center', marginTop:'0.5rem'}}>
                <Pagination 
                  prev 
                  next
                  first
                  last
                  total={totalTicketsCount} 
                  limit={perPage} 
                  activePage={activePage} 
                  onChangePage={setActivePage}
                  maxButtons={4}
                />
                <div style={{justifyContent: 'right'}}>
                  <span style={{fontSize: 12, justifyContent: 'right', marginRight:'0.5rem'}}>Per Page</span>
                  <SelectPicker
                    value={perPage}
                    onChange={(value) => {
                      if (value)
                        setPerPage(value);
                    }}
                    cleanable={false}
                    searchable={false}
                    data = {perPageOptions}
                    size='sm'
                    placement='topEnd'
                  />
                </div>
              </div>
            </FlexboxGrid.Item>
        
            <FlexboxGrid.Item colspan={13} style={{display:'flex', }}>
              {
                selectedTicket?.id && 
                  <Container style={{ textAlign: 'right', border: '1px solid lightgrey', borderRadius: '10px', padding: '1rem' }}>
                    <h5 style={{ textAlign: 'left', display: 'block', marginBottom:'0.5rem' }}>#{selectedTicket.id} {selectedTicket.topic}</h5>
                    
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom:'1rem' }}>
                      {getTag('status', selectedTicket.status, 'md')}
                      {getTag('severity', selectedTicket.severity, 'md')}
                      {getTag('type', selectedTicket.type, 'md')}
                    </div>
                    
                    <p style={{ textAlign: 'left', fontSize: '0.8em' }}>{selectedTicket.description}</p>
                    <hr/>

                    <h5 style={{textAlign:'left', 'marginBottom': '0.5rem'}}>Comments</h5>
                    
                    { 
                      selectedTicket?.comments &&
                        <List style={{ overflow: 'auto', maxHeight: '25vh' }}>
                          {selectedTicket.comments.map((comment, index) => (
                            <List.Item key={index}>
                              <FlexboxGrid>
                                <FlexboxGrid.Item colspan={2} style={styleCenter}>
                                  <UserCircleIcon style={{ color: 'darkgrey', fontSize: '1.5em' }} />
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item
                                  colspan={21}
                                  style={{
                                    display: 'block',
                                    flexDirection: 'column',
                                    alignItems: 'left',
                                    textAlign: 'left'
                                  }}
                                >
                                  <div style={{
                                    border: '1px solid lightgrey',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    maxWidth: '100%', // Set the maximum width to 100%
                                    width: 'fit-content', // Set the width to fit the content
                                  }}>
                                    <div style={{fontSize:'0.9em', marginBottom:'0.1rem'}}>{comment.message}</div>
                                    {/* TODO: Add support to show active user's messages on the RHS */}
                                    <div style={{}}>
                                      <FlexboxGrid style={slimText}>
                                        <FlexboxGrid.Item colspan={12} style={{textAlign:'left'}}>
                                          {comment.user}
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item colspan={12} style={{textAlign:'right'}}>
                                          {comment.sentAt.toDateString()}
                                        </FlexboxGrid.Item>
                                      </FlexboxGrid>
                                    </div>
                                      
                                  </div>
                                  
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
                          <h6 style={{textAlign:'center'}}>No comments yet.</h6>
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
              {
                !selectedTicket?.id &&
                  /* TODO: Add a placeholder screen with useful info/statistics maybe. Otherwise there is too 
                        much empty space till a ticket is selected.
                  */
                  
                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <h4>Please create a ticket or select a ticket to view</h4>
                  </div>
              }

              
            </FlexboxGrid.Item>
            
            <FlexboxGrid.Item colspan={4} style={{display:'block'}}>
              { selectedTicket?.id &&
                <List style={{display:'block', textAlign:'left' }} hover bordered={true}>
                  <List.Item>
                    <h6>Created At</h6>
                    {selectedTicket?.createdAt ? timestampToDatestring(selectedTicket?.createdAt) : ''}
                  </List.Item>
                  <List.Item>
                    <h6>Updated At</h6>
                    {selectedTicket?.updatedAt ? timestampToDatestring(selectedTicket?.updatedAt) : ''}
                  </List.Item>
                  <List.Item>
                    <h6>Type</h6>
                    {capitalizeFirstLetter(selectedTicket?.type)}
                  </List.Item>
                  <List.Item>
                    <h6>Severity</h6>
                    {capitalizeFirstLetter(selectedTicket?.severity)}
                  </List.Item>
                  <List.Item>
                    <h6>Status</h6>
                    {capitalizeFirstLetter(selectedTicket?.status)}
                  </List.Item>
                  <List.Item>
                    <h6>Assigned To</h6>
                    {selectedTicket?.assignedTo ? (
                      <span>
                        {selectedTicket?.assignedTo?.name} <i>{'[#' + selectedTicket?.assignedTo?.id + ']'}</i>
                      </span>
                    ) : 'UNASSIGNED'}
                  </List.Item>
                  {
                    selectedTicket?.autoAssignedTo && 
                      <List.Item>
                        <h6>Auto Assigned To</h6>
                        {selectedTicket?.autoAssignedTo?.name} <i>{'[#' + selectedTicket?.autoAssignedTo?.id + ']'}</i>
                    </List.Item>
                  }

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
                <div>
                  <InputGroup inside style={{marginBottom:'0.5rem'}}>
                    <Input />
                    <InputGroup.Button>
                      <SearchIcon />
                    </InputGroup.Button>
                  </InputGroup>
                  <div style={{marginBottom:'0.5rem', display:'flex', justifyContent: 'right', alignItems:'center'}}>
                    <MultiCascader 
                      labelKey='label'
                      cascade={false}
                      searchable={false} 
                      appearance='default' 
                      data={filters} 
                      placeholder='Filters' 
                      style={{width:'80%'}}
                      onClean={handleCascadeClean}
                      onCheck={handleCascadeCheck}
                      menuHeight='auto'
                    />
                    <Button style={{ marginLeft: '0.5rem', width:'20%'}}>Sort By</Button>
                  </div>
                  <List bordered style={style} hover>
                    {tickets.map((item:Ticket, index) => (
                      <List.Item 
                        key={item.id} 
                        index={index + 1} 
                        onClick={() => selectTicket(item)}
                        style={selectedTicket?.id === item.id ? {backgroundColor: 'lightskyblue'} : {}}
                      >
                        <FlexboxGrid>
                          <FlexboxGrid.Item colspan={4} style={{...styleCenter, fontSize: 60, float:'left', width: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom:'auto'}}>
                            {cloneElement(icons[item.type as keyof typeof icons], {})}
                          </FlexboxGrid.Item>
                          <FlexboxGrid.Item
                            colspan={18}
                            style={{
                              ...styleCenter,
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              overflow: 'hidden',
                            }}
                          >
                            <div style={titleStyle}>#{item['id']} {item['topic']}</div>
                            <div style={{display: 'flex', alignItems: 'center', marginBottom:'0.25rem'}}>
                              {getTag('status', item.status, 'sm')}
                              {getTag('severity', item.severity, 'sm')}
                              {getTag('type', item.type, 'sm')}
                            </div>

                            <div style={{display: 'block', alignItems: 'left', justifyContent: 'left'}}>
                            {/* TODO: The Calendar Icon and User Circle Icon do not align properly column wise*/}
                              
                              <FlexboxGrid>
                                <FlexboxGrid.Item colspan={24} style={{textAlign:'left'}}>
                                  <CalendarIcon /> 
                                  {' ' + timestampToDatestring(item?.createdAt)}
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={24} style={{textAlign:'left'}}>
                                  <UserCircleIcon /> 
                                  {' ' + item?.assignedTo?.name } <i>{'[#' + item?.assignedTo?.id + ']'}</i>
                                </FlexboxGrid.Item>
                              </FlexboxGrid>
                            </div>
                          </FlexboxGrid.Item>
                        </FlexboxGrid>
                      </List.Item>
                    ))}
                  </List>
                  <div style={{display:'flex', justifyContent:'center', marginTop:'0.5rem'}}>
                    <Pagination 
                      prev 
                      next
                      first
                      last
                      total={totalTicketsCount} 
                      limit={perPage} 
                      activePage={activePage} 
                      onChangePage={setActivePage}
                      maxButtons={4}
                    />
                    <div style={{justifyContent: 'right'}}>
                      <span style={{fontSize: 12, justifyContent: 'right', marginRight:'0.5rem'}}>Per Page</span>
                      <SelectPicker
                        value={perPage}
                        onChange={(value) => {
                          if (value)
                            setPerPage(value);
                        }}
                        cleanable={false}
                        searchable={false}
                        data = {perPageOptions}
                        size='sm'
                        placement='topEnd'
                      />
                    </div>
                  </div>
                </div>
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
                      {getTag('status', selectedTicket.status, 'md')}
                      {getTag('severity', selectedTicket.severity, 'md')}
                      {getTag('type', selectedTicket.type, 'md')}
                    </div>
                    
                    <p style={{ textAlign: 'left', fontSize: 16 }}>{selectedTicket.description}</p>
                    <hr/>

                    <div>
                      <h5 style={{textAlign:'left', marginBottom:'0.5rem'}}>Comments</h5>
                      { selectedTicket?.comments &&
                        <List style={{ overflow: 'auto', maxHeight: '40vh' }}>
                          {selectedTicket.comments.map((comment, index) => (
                            <List.Item key={index}>
                              <FlexboxGrid>
                                <FlexboxGrid.Item colspan={2} style={styleCenter}>
                                  <UserCircleIcon style={{ color: 'darkgrey', fontSize: '1.5em' }} />
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item
                                  colspan={21}
                                  style={{
                                    display: 'block',
                                    flexDirection: 'column',
                                    alignItems: 'left',
                                    textAlign: 'left',
                                  }}
                                >
                                  <div style={{
                                    border: '1px solid lightgrey',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    maxWidth: '100%', // Set the maximum width to 100%
                                    width: 'fit-content', // Set the width to fit the content
                                  }}>
                                    <div style={{fontSize:'0.9em', marginBottom:'0.1rem'}}>{comment.message}</div>
                                    {/* TODO: Add support to show active user's messages on the RHS */}
                                    <div style={{}}>
                                      <FlexboxGrid style={slimText}>
                                        <FlexboxGrid.Item colspan={12} style={{textAlign:'left'}}>
                                          {comment.user}
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item colspan={12} style={{textAlign:'right'}}>
                                          {comment.sentAt.toDateString()}
                                        </FlexboxGrid.Item>
                                      </FlexboxGrid>
                                    </div>
                                      
                                  </div>
                                  
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
                    <h6>Created At</h6>
                    {selectedTicket?.createdAt ? timestampToDatestring(selectedTicket?.createdAt) : ''}
                  </List.Item>
                  <List.Item>
                    <h6>Updated At</h6>
                    {selectedTicket?.updatedAt ? timestampToDatestring(selectedTicket?.updatedAt) : ''}
                  </List.Item>
                  <List.Item>
                    <h6>Type</h6>
                    {selectedTicket?.type}
                  </List.Item>
                  <List.Item>
                    <h6>Severity</h6>
                    {selectedTicket?.severity}
                  </List.Item>
                  <List.Item>
                    <h6>Status</h6>
                    {selectedTicket?.status}
                  </List.Item>
                  <List.Item>
                    <h6>Assigned To</h6>
                    {selectedTicket?.assignedTo ? (
                      <span>
                        {selectedTicket?.assignedTo?.name} <i>{'[#' + selectedTicket?.assignedTo?.id + ']'}</i>
                      </span>
                    ) : 'UNASSIGNED'}
                  </List.Item>
                  {
                    selectedTicket?.autoAssignedTo && 
                      <List.Item>
                        <h6>Auto Assigned To</h6>
                        {selectedTicket?.autoAssignedTo?.name} <i>{'[#' + selectedTicket?.autoAssignedTo?.id + ']'}</i>
                    </List.Item>
                  }
                </List>
              </div>
            }
            
          </div>
      }
      
    </div>
    
  );
}

export default Tickets;
