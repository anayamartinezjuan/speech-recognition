import { useEffect, useState } from "react";
import micon from "./images/micon.webp";
import mutedmic from "./images/mutedmic.webp";
import { Grid, IconButton, Typography } from "@mui/material";
import { NeonButton } from "./components/StyledComponents";


import './App.css';
import DisplayNotes from "./components/DisplayNotes";
import { Box } from "@mui/system";

// Inicializacion del reconocimiento de voz
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition

// Configuracion
mic.continuos = true;
mic.interimResults = true;
mic.lang = "es-CO";


function App() {
  const [isListening, setIslistening] = useState(false);
  const [note, setNote] = useState(null);

  const [savedNotestodo, setSavedNotestodo] = useState([]);
  const [savedNotesinprocess, setSavedNotesinprocess] = useState([]);
  const [savedNotesdone, setSavedNotesdone] = useState([]);

  const savedNotes = [
    {
      group: "todo",
      name: savedNotestodo,
    }, {
      group: "inprocess",
      name: savedNotesinprocess,
    }, {
      group: "done",
      name: savedNotesdone,
    }
  ]

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () =>{
    if(isListening){
      mic.start()
      mic.onend = () => {
        console.log("continue ...");
        mic.start();
       }
      } else {
        mic.stop();
        mic.onend = () => {
          console.log("Stopped the microphone on Click");
        }
      }
      mic.onstart = () => {
        console.log("Mic is on");
      }
      mic.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript).join("");
          console.log(transcript);
          setNote(transcript);
          mic.onerror = (event) => console.log(event.error);
      }
    }
  

  return (
    <>
      <div className="notes">

        <h1>Voice Notes</h1>

        <div className="microphone">
          <IconButton onClick={()=> setIslistening((prevState => !prevState))}>
            <img className="mic-icon" src={isListening ? micon : mutedmic} alt="microfono"/>
          </IconButton>
        </div>



       <Box sx={{ flexGrow: 1 }}>
       <Grid container spacing={3}>
       <Grid item xs={12} sm={4}>
          <NeonButton status="todo" disabled={!note} onClick={()=> {
            setSavedNotestodo([...savedNotestodo, note])
            setNote("");
            }}>
            To do
          </NeonButton>
       </Grid>

        <Grid item xs={12} sm={4}>
        <NeonButton status="inprocess" disabled={!note} onClick={() => {
          setSavedNotesinprocess([...savedNotesinprocess, note])
          setNote("");
          }}>
          In process
        </NeonButton>
        </Grid>

        <Grid item xs={12} sm={4}>
        <NeonButton status="done" disabled={!note} onClick={() => {
          setSavedNotesdone([...savedNotesdone, note])
          setNote("");
          }}>
          Done
        </NeonButton>
        </Grid>
        </Grid>
       </Box>

        <Typography variant="h4" component="h2" gutterBottom>
          {console.log(savedNotes)}
          {note}
        </Typography>
        <DisplayNotes data={ savedNotes }/>
          
      </div>

    </>
  );
}

export default App;
