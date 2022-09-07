import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const DisplayNotes = ({data}) => {
  return (
    <Box sx={{ width: '100%' }}  >
      <Grid container spacing={6}>
        {
          data.map((savedNote,index) =>(
            <Grid key={index} item xs={12} sm={4}>
              {savedNote.name.map((notas)=>(
                 <Item key={notas.toString()}>
                   {notas}
                 </Item>
              ))}
            </Grid>
          ))
        }

      </Grid>
    </Box>
  );
}

export default DisplayNotes;
