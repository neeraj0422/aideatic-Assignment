import React, { useState, useEffect } from "react";
import "./App.css";


import im1 from "./images/im1.png";
import im2 from "./images/im2.png";
import im3 from "./images/im3.png";
import im4 from "./images/im4.png";
import im5 from "./images/im5.png";
import im6 from "./images/im6.png";
import im7 from "./images/im7.png";
import im8 from "./images/im8.png";
import im9 from "./images/im9.png";
import im10 from "./images/im10.png";
import im11 from "./images/v.png";
import im12 from "./images/cardview.png";
import im13 from "./images/cardviewActive.png";
import im14 from "./images/listview.png";
import im15 from "./images/listviewActive.png";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import { Icon } from '@mui/material';
import ListView from "./components/ListView";
import CardView from "./components/CardView";
import ProfileForm from "./components/ProfileForm";

import  CreateProfileDialog from "./components/Dialog";
import ProfileSnackbar from './components/Modal'

const App =  () => {
  const [isCardViewActive,setCardView]=useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [usedId, setUserId] = useState()

  let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVfbmFtZSI6IlNpbWFyIiwiaXNfY2FuZGlkYXRlIjp0cnVlLCJpYXQiOjE2NzcyNzAxNTMsImV4cCI6MTY3NzYxNTc1M30.OERVKTr3kCq5cS_QzRWmiEfbPHemMPlW6GXep7IyvA0"
    );
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
      query:
        "query GetAllProfiles($orderBy: globalOrderBy, $searchString: String, $rows: Int, $page: Int) {\n  getAllProfiles(orderBy: $orderBy, searchString: $searchString, rows: $rows, page: $page) {\n    size\n    profiles {\n      id\n      first_name\n      last_name\n      email\n      is_verified\n      image_url\n      description\n    }\n  }\n}",
      variables: {
        orderBy: { key: "is_verified", sort: "desc" },
        rows: 10,
        page: 0,
        searchString: "",
      },
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: graphql,
      redirect: "follow",
    };



  const [data, setData] = useState([]);
  const [showDarkMode,setShowDarkMode]=useState(false)
  const [loading,setLoading]=useState(false)

  useEffect(() => {
      async function fetchData() {
        setLoading(true)
      let response =  await fetch("https://api.poc.graphql.dev.vnplatform.com/graphql", requestOptions);
      const jsonData =  await response.json();
      const rows = jsonData.data.getAllProfiles.profiles;
      setData(rows);
      localStorage.setItem('data',JSON.stringify(rows));
      setLoading(false)
    }

    fetchData();
  }, []);
  console.log(data)
    

  const handleSearch=(event)=>{
    const data = JSON.parse(localStorage.getItem('data'))
  const textToSearch = event.target.value?.toLowerCase();
  const filteredData = data.filter((item)=>`${item.first_name}${item.last_name}`?.toLowerCase().includes(textToSearch) );
  console.log(textToSearch,filteredData)
  setData(filteredData)
  }
  return (
    <div className="App" style={{backgroundColor:showDarkMode?"black":""}}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          // alignItems: "center",
          height: "56px",
          padding: "40px 40px 40px 24px",
          color: "#FCFCFD",
        }}
      >
        <div
          style={{
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "24px",
            letterSpacing: "0.5px",
          }}
        >
          <a>
            {" "}
            <img style={{ display: "inline" }} className=" V " src={im11} />
            Iral Nation
          </a>
        </div>
        <div className="nav-right">
          <Icon>
            <LightModeIcon style={{ color: "#212121" }} />
          </Icon>
          <Icon>
            <ToggleOffIcon style={{ color: "#616161" }} />
          </Icon>
          <Icon onClick={()=>setShowDarkMode(!showDarkMode)}>
            <NightlightIcon
              style={{ transform: "rotate(-45deg)", color: "#9E9E9E" }}
            />
          </Icon>
          
        </div>
      </nav>
      <div className="content">
      <div className="search">
        <input type="text" placeholder="Search" onChange={handleSearch} className="search-input" />
        <button style={{display:"flex"}} onClick={()=>{setOpenDialog(true); setUserId(undefined)}} >
          <Icon className="pa">
            <PersonAddAltIcon />
          </Icon>
          <span className="cp" >Create Profile</span>
          
        </button>
        <span>
          {
            !isCardViewActive ? <> <img
            style={{ display: "inline" }}
            className="icon cardViewIcon"
            src={im12}
            onClick={()=>setCardView(true)}
          ></img>
  
          <img
            style={{ display: "inline" }}
            className="icon listViewIcon "
            src={im15}
          ></img></>:<>
          <img
            style={{ display: "inline" }}
            className="icon cardViewIcon"
            src={im12}
            
          ></img>
  
          <img
            style={{ display: "inline" }}
            className="icon listViewIcon "
            src={im15}
            onClick={()=>setCardView(false)}
          ></img>
          </>
          }
       
        </span>
      </div>
      <ProfileSnackbar/>
      { data.length > 0 ? (
       isCardViewActive ? <CardView data={data} setOpenDialog={setOpenDialog} setUserId={setUserId}/>:
      <ListView data={data}/>
      ) : (
        !loading &&
        <div style={{ color: "red" }}>No data matches your search query!</div>
      )}
      </div>

      {/* <div> <ProfileForm/></div> */}
      <div>< CreateProfileDialog open={openDialog} onClose={()=>setOpenDialog(false)} userId={usedId}/></div>
    </div>
  );
}

export default App;
