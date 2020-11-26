import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CharCard from '../components/charCard.js'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

export default function Home() {

  const [searchText, setSearchText] = useState('');
  const [statusText, setStatusText] = useState('');
  const [charList,setCharList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if(searchText == ''){
      setStatusText('ENTER TEXT TO BEGIN YOUR SEARCH');
      setCharList([]);
      setLoading(false);
    }else{
      axios.get('/api/marvel',{
        params :{
          searchText: searchText
        }
      }).then((result) => {
        if(result.data.data.results.length > 0){
          setCharList(result.data.data.results);
          setLoading(false);
        }else{
          setCharList([])
          setStatusText('NO RESULTS FOUND');
          setLoading(false);
        }
      }).catch(() =>{
        console.error('An Error Occured with the API call to Marvel')
      })
    }
 }

  return (
    <div className={styles.container}>
      <Head>
        <title>Character Search</title>
        <link rel="icon" href="/marvel-icon.png" />
      </Head>
      <main className={styles.main}>
          <h1 className={styles.title}>
            <span>MARVEL CHARACTER SEARCH</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <input placeholder="SEARCH MARVEL DATABASE" onChange={e => setSearchText(e.target.value)}></input>
            <br></br>
            <br></br>
            <button type="submit">SEARCH</button>
          </form>
          <div className={styles.grid}>
            {charList.map((char, index) => {
              return <CharCard
                key={index}
                name = {char.name}
                image = {char.thumbnail.path + "." + char.thumbnail.extension}
                link = {char.urls[1].url}
              />
            })}
          </div>
          { isLoading ? <Image src="/spinner.gif" width="64" height="64"/> : null }
          {charList.length == 0 && isLoading == false &&
            <h2>{statusText}</h2>
          }
      </main>
      </div>
  )
}
