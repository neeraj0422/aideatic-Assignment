import React from 'react';
import { Grid, Card, CardHeader, CardMedia, CardContent, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Icon } from '@mui/material';
import OptionMenu from './ManageProfile';





function CardList(props) {
  

  return (
    <  Grid className='grid' container spacing={3} >
      {props.data.map((row, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={4} xl={3}>
          <Card >
          <div className='cardbody' style={{display:"flex"}}>
          <CardMedia className='lowercard'
              component="img"
              image={row.image_url}
              alt={row.first_name + row.last_name}/>
            <CardHeader
              title={row.first_name + row.last_name}
              subheader={row.email}            
            />
            <Icon>
            <OptionMenu setOpenDialog={props.setOpenDialog} setUserId={props.setUserId} id={row.id}/>
          </Icon>
          </div>
            
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {row.description}
              </Typography>
            </CardContent>

          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default CardList;
