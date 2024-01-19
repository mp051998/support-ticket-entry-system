import { Notification, toaster } from "rsuite";

import { UserContext } from "../App";
import { useContext } from "react";

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

  function onAgentClick(agent: any) {
    setActiveAgent(agent);
    toaster.push(<Notification closable type='success' header={`'${agent.name}' is now the active agent!`}/>, {
      duration: 5000
    });
  }

  return (
    <div>
      <h2 style={{textAlign:'left', marginBottom:'1rem'}}>Agents</h2>
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
