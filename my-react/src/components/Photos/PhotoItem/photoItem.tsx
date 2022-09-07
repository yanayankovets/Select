import React from "react";

export const PhotoItem = ({item}: any) => {
  const {url: link, title, albumId} = item

  return (<div style={{marginTop: "30px"}}>
    <div>Photo Item from Album: {albumId}</div>
  <img style={{width: '20%'}} src={link} alt=""/>
    <div>Title: {title}</div>
  </div>)
}