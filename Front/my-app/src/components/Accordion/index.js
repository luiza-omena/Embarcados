import * as React from 'react';
import Accordion from '@mui/material/Accordion';
// import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import DiscreteSliderMarks from '../Slider';
import cachorroImg from '../../images/cachorro.jpg'; 
import gatoImg from '../../images/gato.jpg'; 
import passarinhoImg from '../../images/passarinho.jpg'; 
import ratoImg from '../../images/rato.jpg';
import tartarugaImg from '../../images/tartaruga.jpg';

export default function AccordionUsage() {
  return (
    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      <Accordion sx={{ marginBottom: 2, borderRadius: 2}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar alt="Remy Sharp" src={cachorroImg} />
            Accordion 1
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" justifyContent="center" width="100%">
            <DiscreteSliderMarks />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ marginBottom: 2, borderRadius: 2}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar alt="Travis Howard" src={gatoImg} />
            Accordion 2
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" justifyContent="center" width="100%">
            <DiscreteSliderMarks />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ marginBottom: 2, borderRadius: 2}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar alt="Cindy Baker" src={passarinhoImg} />
            Accordion 3
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" justifyContent="center" width="100%">
            <DiscreteSliderMarks />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ marginBottom: 2, borderRadius: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar alt="Cindy Baker" src={ratoImg} />
            Accordion 4
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" justifyContent="center" width="100%">
            <DiscreteSliderMarks />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ marginBottom: 2, borderRadius: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar alt="Cindy Baker" src={tartarugaImg} />
            Accordion 5
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" justifyContent="center" width="100%">
            <DiscreteSliderMarks />
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
