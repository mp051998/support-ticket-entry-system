import { FlexboxGrid, List } from 'rsuite';
import { cloneElement, useContext, useEffect, useState } from 'react';

import CreativeIcon from '@rsuite/icons/Creative';
import DangerIcon from '@rsuite/icons/Danger';
import PlusRoundIcon from '@rsuite/icons/PlusRound';
import RemindOutlineIcon from '@rsuite/icons/RemindOutline';
import UserCircleIcon from '@rsuite/icons/legacy/UserCircleO';
import { UserContext } from '../App';

const icons = {
  'bug': <DangerIcon />,
  'enhancement': <CreativeIcon />,
  'feature': <PlusRoundIcon />,
  'issue': <RemindOutlineIcon />
};

// Using dummy data till backend is ready
const data = [
  {
    id: 1,
    topic: "Bug Report",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    dateCreated: new Date("2022-01-01"),
    severity: "High",
    type: "bug",
    assignedTo: "support-agent-1",
    status: "New",
    resolvedOn: null
  },
  {
    id: 2,
    topic: "Feature Request",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    dateCreated: new Date("2022-01-02"),
    severity: "Low",
    type: "feature",
    assignedTo: "support-agent-2",
    status: "Assigned",
    resolvedOn: null
  },
  {
    id: 3,
    topic: "Performance Issue",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    dateCreated: new Date("2022-01-03"),
    severity: "Medium",
    type: "issue",
    assignedTo: "support-agent-3",
    status: "Resolved",
    resolvedOn: new Date("2022-01-05")
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
    resolvedOn: null
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
    resolvedOn: null
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
  height: '85vh',
  width: '20vw',
  overflow: 'auto'
}

const portraitStyle = {
  height: '75vh',
  width: '100%',
  overflow: 'auto'
}

function Tickets() {

  const appContext = useContext(UserContext);
  console.log("App context is: ", appContext);
  
  console.log("Orientation of tickets is: ", appContext.orientation);

  const [style, setStyle] = useState(landscapeStyle);

  // const style = appContext.orientation === 'landscape' ? landscapeStyle : portraitStyle;
  useEffect(() => {
    console.log("Orientation changed to: ", appContext.orientation);
    if (appContext.orientation === 'landscape') {
      setStyle(landscapeStyle);
    } else {
      setStyle(portraitStyle);
    }
  }, [appContext.orientation])

  return (
    <div>
      <h2 style={{textAlign:'left'}}>Tickets</h2>

      <br/>

      <List style={style} hover>
        {data.map((item, index) => (
          <List.Item key={item['id']} index={index + 1}>
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
    </div>
    
  );
}

export default Tickets;
