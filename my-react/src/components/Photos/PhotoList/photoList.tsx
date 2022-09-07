import React from "react";
import {useState, useEffect} from "react"
import {PhotoItem} from "../PhotoItem/photoItem";
import Select from 'react-select'

export const PhotoList = () => {
  const [photos, setPhotos] = useState([])
  const [lastIndex, setLastIndex] = useState(4)
  const [selectedOption, setSelectedOption] = useState({value: 0, label: ''});
  const [options, setOptions] = useState([])
  const [filteredOptions, setFilteredOptions] = useState([])

  const getPhotos = async () => {
    await fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(json => setPhotos(json))
  }

  const getAlbums = async () => {
    await fetch('https://jsonplaceholder.typicode.com/albums')
      .then(response => response.json())
      .then(json =>
        setOptions((prev: any) => prev.concat(
    json.map(({id: value, title: label}: any) => {
      return {value, label};
     }))))
  }

  useEffect(() => {
    getPhotos()
    getAlbums()
  }, [])

  useEffect(() => {
    setFilteredOptions(photos.filter((photo: any) => {
      return photo.albumId === selectedOption.value
    }))
  }, [selectedOption])

  const showMoreElements = () => {
    setLastIndex((prev) => prev + 4)
  }

  const hideElements = () => {
    setLastIndex((prev) => prev && prev - 4)
  }

  const onChangeSelect = (option: any) => {
    setSelectedOption(option)
    console.log("1")
  }

  return <div style={{background: "lightblue"}}>

    <Select
      value={selectedOption}
      onChange={onChangeSelect}
      options={options}
      noOptionsMessage= {() => "no options"}
    />
    <div>Photo List
      {filteredOptions.length

        ? filteredOptions.slice(0, lastIndex).map((item: any) => {
          return <PhotoItem item={item} key={item.id}/>})

        : photos.slice(0, lastIndex).map((item: any) => {
            return <PhotoItem item={item} key={item.id}/>
          })}
    </div>
    <button onClick={() => showMoreElements()} style={{width: '120px', height: '40px', margin: "20px 0 20px 0", background: 'lightgreen'}}>Show more</button>
    <button onClick={() => hideElements()} style={{width: '120px', height: '40px', margin: "20px 0 20px 0", background: 'cornflowerblue'}}>Hide Photos</button>
  </div>
}