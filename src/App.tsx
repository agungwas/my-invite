import React, { useEffect, useRef, useState } from 'react';
import copy from 'copy-to-clipboard';
import Countdown from 'react-countdown';
import ucapan, { Ucapan } from 'data';

import homeIcon from 'images/home_inactive.svg';
import kisahIcon from 'images/kisah_inactive.svg';
import galeriIcon from 'images/galeri_inactive.svg';
import coupleIcon from 'images/couple_inactive.svg';
import bukuIcon from 'images/buku-tamu_inactive.svg';
import copyIcon from 'images/copy.svg';
import saveDateIcon from 'images/save-date.svg';
import floralSeparator from 'images/separator_floral.svg';
import muteIcon from 'images/mute.svg';
import unmuteIcon from 'images/unmute.svg';
import giftboxIcon from 'images/giftbox.svg';
import avaHijab from 'images/ava hijab.png';
import avaCewek from 'images/ava cewek.png';
import avaJenggot from 'images/ava jenggot.png';
import avaCowok from 'images/ava cowok.png';
import bgImage from 'images/bgImage.jpg';
import pengantinPria from 'images/pengantinPria.jpg';
import pengantinWanita from 'images/pengantinWanita.jpg'
import prokesImg from 'images/prokes.png';
import amplop from 'images/amplop.png';
import galeri from 'images/galeri';

// @ts-ignore
import backsong from 'backsong.mp3';

import GoogleMaps from 'GoogleMaps';

import './App.scss';


function App() {
  const mempelaiRef = useRef<HTMLDivElement>(null)
  const homeRef = useRef<HTMLDivElement>(null)
  const kisahRef = useRef<HTMLDivElement>(null)
  const galeriRef = useRef<HTMLDivElement>(null)
  const bukuTamuRef = useRef<HTMLDivElement>(null)
  const hadiahRef = useRef<HTMLDivElement>(null)
  const backgroundMusicRef = useRef<HTMLAudioElement>(null)
  const [ listUcapan, setListUcapan ] = useState(([] as Ucapan[]))
  const [ play, setPlay ] = useState(false)
  const [ nama, setNama ] = useState('')
  const [ ava, setAva ] = useState('')
  const [ kehadiran, setKehadiran ] = useState('0')
  const [ ucapanTamu, setUcapanTamu ] = useState('')
  const [ opening, setOpening ] = useState(true)
  const [ errorSubmit, setErrorSubmit ] = useState('')
  const tabs = [
    {
      icon: homeIcon,
      label: 'Beranda',
      action: (e: any) => {
        e.preventDefault()
        homeRef.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
      }
    },
    {
      icon: coupleIcon,
      label: 'Mempelai',
      action: (e: any) => {
        e.preventDefault()
        mempelaiRef.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
      }
    },
    {
      icon: galeriIcon,
      label: 'Galeri',
      action: (e: any) => {
        e.preventDefault()
        galeriRef.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
      }
    },
    {
      icon: kisahIcon,
      label: 'Kisah',
      action: (e: any) => {
        e.preventDefault()
        kisahRef.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
      }
    },
    {
      icon: bukuIcon,
      label: 'Buku Tamu',
      action: (e: any) => {
        e.preventDefault()
        bukuTamuRef.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
      }
    },
  ]

  const togglePause = (e: any) => {
    e.preventDefault();
    if (play) {
      backgroundMusicRef.current!.pause()
      setPlay(false)
    } else {
      backgroundMusicRef.current!.play()
      setPlay(true)
    }
  }

  const submitUcapan = async () => {
    if (!ava) setErrorSubmit('Avatar harus dipilih');
    else if (nama.length < 3) setErrorSubmit('Nama harus lebih dari 3');
    else if (ucapanTamu.length < 5) setErrorSubmit('Ucapan tidak boleh kosong');
    else if (kehadiran !== '0' && kehadiran !== '1') setErrorSubmit('Reservasi kehadiran tidak boleh kosong');
    else {
      await ucapan.add({nama, ava: parseInt(ava), kehadiran: parseInt(kehadiran) ? true : false, ucapan: ucapanTamu })
      setAva('')
      setUcapanTamu('')
      setKehadiran('0')
      setNama('')
      setListUcapan(await ucapan.read())
    }
  }

  const openGMaps = () => {
    window.open('https://goo.gl/maps/wWDHxwTepS7DSxZf7')
  }

  const copyRek = (rek: string, bank: string) => {
    copy(rek)
    alert('Nomor rekening Bank ' + bank + ': ' + rek + ' berhasil disalin')
  }

  const selectedAva = (id: number) => {
    switch (id) {
      case 1:
        return avaCewek
      case 2:
        return avaHijab
      case 3: 
        return avaCowok
      case 4: 
        return avaJenggot
      default:
        return avaCowok
    }
  }

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <div className="countdown-label my-4">Resepsi pernikahan telah selesai</div>;
    } else {
      return (
        <div className="d-flex justify-content-around my-3 px-2 w-100">
          <div>
            <div className="countdown-value">
              {days}
            </div>
            <div className="countdown-label">
              Hari
            </div>
          </div>
          <div>
            <div className="countdown-value">
              {hours}
            </div>
            <div className="countdown-label">
              Jam
            </div>
          </div>
          <div>
            <div className="countdown-value">
              {minutes}
            </div>
            <div className="countdown-label">
              Menit
            </div>
          </div>
          <div>
            <div className="countdown-value">
              {seconds}
            </div>
            <div className="countdown-label">
              Detik
            </div>
          </div>
        </div>
      );
    }
  };


  useEffect(() => {
    if(backgroundMusicRef.current) {
      backgroundMusicRef.current.play();
    }
    setPlay(true);
    (async function () {
      const data = await ucapan.read()
      setListUcapan(data)
    })();
  }, [opening])

  useEffect(() => {
    if (errorSubmit) setTimeout(() => {
      setErrorSubmit('')
    }, 3000);
  }, [errorSubmit])


  if (opening) return (
    <div className="App bg-dark" style={{ overflow: 'hidden' }}>
      <div className="h-100 p-0 cover left-panel" style={{ opacity: 0.2 }}>
        <img src={bgImage} alt="foto-mempelai" style={{
          objectFit: 'cover',
          width: '100%',
          opacity: 0.4,
          color: 'black'
        }} />
        <div className="w-100"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="headline-title">
            Undangan Pernikahan
          </div>
          <div className="name">
            Agung
          </div>
          <div className="name">
            &amp;
          </div>
          <div className="name">
            Lusi
          </div>
          <div className="headline-title">
            20 November 2021
          </div>
        </div>
      </div>
      <div className="w-100"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20vh 20vw'
          }}
        >
          <div className="dear">
            Dear
          </div>
          <div className="dear">
            { 
              window.location.pathname.split('/').join(' ').toUpperCase().trim() ?
              window.location.pathname.split('/').join(' ').toUpperCase().trim() :
              'Anda' 
            }
          </div>
          <div className="my-2">
            <img src={amplop} style={{ width: '10vh'}} alt="" />
          </div>
          <div className="headline-title mb-2" style={{ fontSize: '2vh', textTransform: 'unset', textShadow: 'unset' }}>
            Tanpa mengurangi rasa hormat, kami memberikan kabar bahagia ini dan memohon restu dari rekan sekalian untuk senantiasa mendoakan kelancaran acara pernikahan kami.
          </div>
          <button className="rounded btn btn-success headline-title" style={{ fontSize: '1.4vh', textShadow: 'unset' }} onClick={_=> setOpening(false)}>
            Buka Undangan
          </button>
        </div>
    </div>
  ); else return (
    <div className="App row m-0">
      <audio id="backgroundMusic" ref={backgroundMusicRef} loop>
        <source src={backsong} type="audio/mpeg"  />
        Your browser does not support the audio element.
      </audio>
      <div className="col-lg-8 h-100 p-0 cover bg-dark left-panel">
        <img src={bgImage} alt="foto-mempelai" style={{
          objectFit: 'cover',
          width: '100%',
          opacity: 0.6,
          color: 'black'
        }} />
        <div className="w-100"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="headline-title">
            Undangan Pernikahan
          </div>
          <div className="name">
            Agung
          </div>
          <div className="name">
            &amp;
          </div>
          <div className="name">
            Lusi
          </div>
          <div className="headline-title">
            20 November 2021
          </div>
        </div>
      </div>

      <div className="col-lg-4 h-100 p-0 pt-5 right-panel">
        <div>
          <div ref={homeRef} className="judul text-secondary">
            Undangan Pernikahan
          </div>
          <div className="quote">
            Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir
          </div>
          <div className="quote-end">
            (QS. AR-RUM : 21)
          </div>

          <div className="floral-separator">
            <img src={floralSeparator} alt="" />
          </div>
        </div>

        
        <div className="mempelai py-3">
          <div ref={mempelaiRef} className="judul text-secondary mb-3">
            Mempelai
          </div>
          <img src={pengantinPria} alt="" className="mempelai-foto mt-4"/>
          <div className="mempelai-nama text-secondary pt-4 mb-4">
            Agung Setya Pratama
          </div>
          <img src={pengantinWanita} alt="" className="mempelai-foto mt-4"/>
          <div className="mempelai-nama text-secondary pt-4 mb-4">
            Lusi Nurjanah
          </div>

          <div className="floral-separator">
            <img src={floralSeparator} alt="" />
          </div>
        </div>

        
        <div className="galeri py-3">
          <div ref={galeriRef} className="judul text-secondary mb-3">
            Galeri
          </div>
            {galeri.map((el: string, index: number) => (
              <div className="col-12" key={index}>
                <img src={el} alt="" className="mempelai-foto mt-4 mb-2"/>
              </div>
            ))}

          <div className="floral-separator">
            <img src={floralSeparator} alt="" />
          </div>
        </div>


        <div className="kisah py-3">
          <div ref={kisahRef} className="judul text-secondary mb-3">
            Kisah Kami
          </div>
          <div className="quote-end">
            2014
          </div>
          <div className="quote">
            Pertemuan pertama kami di awali pada tahun ini. Selang waktu berjalan kami saling mengenal satu sama lain. Tentu saja diwarnai dengan suka dan duka bersama. Hingga di tahun 2019 pada bulan yang berbeda kami berdua lulus kuliah dan memulai hubungan dari jarak jauh.
          </div>
          <div className="quote-end">
            16 Mei 2021
          </div>
          <div className="quote">
            Bagus menemui orang tua Erly dan menyampaikan maksudnya untuk serius dan menikahi Erly yang kemudian dilanjutkan dengan pertemuan keluarga. Alhamdulillah acara lamaran berjalan dengan lancar.
          </div>
          <div className="quote-end">
            14 September 2021
          </div>
          <div className="quote">
            Bismillah. InsyaAllah semoga kami menjadi sepasang kekasih yang berjodoh di dunia hingga di akhirat nanti. Aamiin
          </div>
          <div className="floral-separator">
            <img src={floralSeparator} alt="" />
          </div>
        </div>


        <div className="undangan py-3">
          <div className="judul text-secondary mb-3">
            Undangan
          </div>
          <div className="undangan-nama">
            Agung Setya Pratama
          </div>
          <div className="undangan-keluarga">
            Putra pertama dari Bapak Suprayitno dan Ibu Sarinah
          </div>
          <div className="undangan-keluarga text-secondary py-1">
            dengan
          </div>
          <div className="undangan-nama">
            Lusi Nurjanah
          </div>
          <div className="undangan-keluarga">
            Putri kedua dari Bapak Suwarni dan Ibu Tumiyati
          </div>
        </div>

        <div className="undangan py-3">
          <div className="judul text-secondary mb-3">
            Akad Nikah
          </div>
          <div className="undangan-keluarga">
            Selasa, 14 September 2021
          </div>
          <div className="undangan-keluarga">
            18.30 - 20.00 WIB
          </div>
          <div className="undangan-keluarga">
            RT 14 RW 04, Dsn. Temboro, Ds. Tawing, Kec. Munjungan, Kab. Trenggalek. Jawa Timur
          </div>
        </div>
        <div className="undangan py-3">
          <div className="judul text-secondary mb-3">
            Resepsi Nikah
          </div>
          <div className="undangan-keluarga">
            Sabtu, 20 November 2021
          </div>
          <div className="undangan-keluarga">
            10.00 - 20.00 WIB
          </div>
          <div className="undangan-keluarga">
            RT 14 RW 04, Dsn. Temboro, Ds. Tawing, Kec. Munjungan, Kab. Trenggalek. Jawa Timur
          </div>
          <div className="floral-separator">
            <img src={floralSeparator} alt="" />
          </div>
        </div>


        <div className="galeri py-3 d-flex flex-column align-items-center">
          <div className="judul text-secondary mb-3">
            Peta Lokasi Resepsi Nikah
          </div>
          <img src={prokesImg} alt="prokes" className="w-75 mt-4 mb-2"/>

          <div className="w-75 mt-4 mb-2">
            <GoogleMaps
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLlrfyymn0ylUzYEzcF_YnGYiEC5OPJoI&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: '100%' }}/>}
              containerElement={<div style={{ height: '400px' }}/>}
              mapElement={<div style={{ height: '100%' }}/>}
            /> 
          </div>

          <button onClick={openGMaps} className="gmaps btn">
            Buka di Google Maps
          </button>
          <div className="floral-separator">
            <img src={floralSeparator} alt="" />
          </div>
        </div>


        <div className="py-3 px-4 d-flex flex-column align-items-center ">
          <div ref={hadiahRef} className="judul text-secondary">
            Berikan Hadiah
          </div>
          <div className="undangan-keluarga py-0 text-secondary">
            Transfer Melalui Nomor Rekening
          </div>
          <div className="undangan-keluarga">
            Tanpa mengurangi rasa hormat, untuk melengkapi kebahagiaan pengantin, Anda dapat memberikan tanda kasih dengan transfer ke rekening berikut :
          </div>

          <div className="card w-75 shadow d-flex align-items-center my-2" style={{ backgroundColor: '#fafafa'}}>
            <div className="undangan-keluarga pb-0" style={{ fontWeight: 'bold' }}>
              BCA
            </div>
            <div className="undangan-keluarga p-0">
              No. Rekening: 6695401608
            </div>
            <div className="undangan-keluarga p-0 mb-2">
              a.n. Agung Setya Pratama
            </div>
            <button className="rekening" onClick={_ => copyRek('6695401608', 'BCA')}>
              <img src={copyIcon} style={{ width: '0.9em' }} className="mr-2" alt="" />
              Copy nomor rekening
            </button>
          </div>

          <div className="card w-75 shadow d-flex align-items-center my-2" style={{ backgroundColor: '#fafafa'}}>
            <div className="undangan-keluarga pb-0" style={{ fontWeight: 'bold' }}>
              BRI
            </div>
            <div className="undangan-keluarga p-0">
              No. Rekening: 655201025525531
            </div>
            <div className="undangan-keluarga p-0 mb-2">
              a.n. Lusi Nurjanah
            </div>
            <button className="rekening" onClick={_ => copyRek('655201025525531', 'BRI')}>
              <img src={copyIcon} style={{ width: '0.9em' }} className="mr-2" alt="" />
              Copy nomor rekening
            </button>
          </div>

          <div className="floral-separator">
            <img src={floralSeparator} alt="" />
          </div>
        </div>


        <div className="save-date py-3 d-flex flex-column align-items-center w-100">
          <img src={saveDateIcon} style={{ width: '16rem'}} alt="" />
          <Countdown date={new Date("11/20/2021 10:00")} renderer={renderer} />
          {// eslint-disable-next-line react/jsx-no-target-blank
          (<a className="gmaps mb-2 btn" target="_blank" href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20211120T013000Z%2F20211120T133000Z&details=Resepsi%20Pernikahan%20Agung%20Setya%20Pratama%20dengan%20Lusi%20Nurjanah&location=https%3A%2F%2Fgoo.gl%2Fmaps%2FwWDHxwTepS7DSxZf7&text=Resepsi%20Agung%20%26%20Lusi" title="Save Event in my Calendar" >Tambahkan ke Google Calendar</a>)
          }
          {// eslint-disable-next-line react/jsx-no-target-blank
          (<a className="gmaps mb-2 btn" target="_blank" href="https://calendar.yahoo.com/?desc=Resepsi%20Pernikahan%20Agung%20Setya%20Pratama%20dengan%20Lusi%20Nurjanah&et=20211120T133000Z&in_loc=https%3A%2F%2Fgoo.gl%2Fmaps%2FwWDHxwTepS7DSxZf7&st=20211120T013000Z&title=Resepsi%20Agung%20%26%20Lusi&v=60" title="Save Event in my Calendar" >Tambahkan ke Yahoo Calendar</a>)
          }
          {// eslint-disable-next-line react/jsx-no-target-blank
          (<a className="gmaps mb-2 btn" target="_blank" href="https://outlook.live.com/calendar/0/deeplink/compose?body=Resepsi%20Pernikahan%20Agung%20Setya%20Pratama%20dengan%20Lusi%20Nurjanah&enddt=2021-11-20T13%3A30%3A00%2B00%3A00&location=https%3A%2F%2Fgoo.gl%2Fmaps%2FwWDHxwTepS7DSxZf7&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2021-11-20T01%3A30%3A00%2B00%3A00&subject=Resepsi%20Agung%20%26%20Lusi" title="Save Event in my Calendar" >Tambahkan ke Outlook Calendar</a>)
          }
          <div className="floral-separator">
            <img src={floralSeparator} alt="" />
          </div>
        </div>


        <div className="py-3 px-4 d-flex flex-column align-items-center">
          <div className="judul text-secondary mb-3" ref={bukuTamuRef}>
            Beri Ucapan dan Reservasi
          </div>
          <div className="shadow rounded w-100 p-1 mb-3">
            <div className="p-1">
              <div className="countdown-label text-left" style={{ fontWeight: 600 }}>Nama Lengkap</div>
              <input className="form-control" value={nama} placeholder="Masukkan Nama Anda" onChange={e => setNama(e.target.value)} />
            </div>
            <div className="p-1">
              <div className="countdown-label text-left" style={{ fontWeight: 600 }}>Konfirmasi Kehadiran Anda</div>
              <select className="form-control" value={kehadiran} onChange={e => setKehadiran(e.target.value)}>
                <option value="1" >Hadir</option>
                <option value="0">Tidak Hadir</option>
              </select>
            </div>
            <div className="p-1">
              <div className="countdown-label text-left" style={{ fontWeight: 600 }}>Pilih Avatar</div>
              <div className="d-flex">
                  <div className="input-group col-3 d-flex flex-column align-items-center" onClick={_ =>setAva('3')} >
                    <input type="radio" checked={ava === '3'} name="avatar" value="3" onChange={e => setAva(e.target.value)} />
                    <img style={{ width: '80%' }} className="pt-2" src={avaCowok} alt=""/>
                  </div>
                  <div className="input-group col-3 d-flex flex-column align-items-center" onClick={_ =>setAva('4')} >
                    <input type="radio" checked={ava === '4'} name="avatar" value="4" onChange={e => setAva(e.target.value)} />
                    <img style={{ width: '80%' }} className="pt-2" src={avaJenggot} alt=""/>
                  </div>
                  <div className="input-group col-3 d-flex flex-column align-items-center" onClick={_ =>setAva('1')} >
                    <input type="radio" checked={ava === '1'} name="avatar" value="1" onChange={e => setAva(e.target.value)} />
                    <img style={{ width: '80%' }} className="pt-2" src={avaCewek} alt=""/>
                  </div>
                  <div className="input-group col-3 d-flex flex-column align-items-center" onClick={_ =>setAva('2')} >
                    <input type="radio" checked={ava === '2'} name="avatar" value="2" onChange={e => setAva(e.target.value)} />
                    <img style={{ width: '80%' }} className="pt-2" src={avaHijab} alt=""/>
                  </div>
              </div>
            </div>
            <div className=" p-1">
              <div className="countdown-label text-left" style={{ fontWeight: 600 }}>Ucapan</div>
              <textarea value={ucapanTamu} placeholder="Tulis Ucapan Disini" className="form-control" onChange={e => setUcapanTamu(e.target.value)} ></textarea>
            </div>
            {
              errorSubmit && (
                <div className="p-1 my-2 font-weight-bold countdown-label alert alert-danger">
                  {errorSubmit}
                </div>
              )
            }
            <div className="p-1">
              <button onClick={submitUcapan} className="btn btn-success countdown-label font-weight-bold">
                Kirim
              </button>
            </div>

          </div>
          <div className="shadow-lg w-100 p-1 ucapan d-flex flex-column align-items-center">
          {
            listUcapan.map((el: Ucapan, index) => (
              <div key={index} className="card p-2 py-3 shadow flex-row align-items-center mb-3 w-100">
                <div className="ava col-3 p-1">
                  <img src={selectedAva(el.ava)} style={{ width: '80%' }} className="" alt="" />
                </div>
                <div className="col-9 text-left justify-content-start">
                  <div className="countdown-label" style={{ fontWeight: 600 }}>
                    {el.nama}
                  </div>
                  <div className="countdown-label text-secondary" style={{ fontSize: '8px', fontWeight: 'initial' }}>
                    {el.kehadiran ? 'hadir' : 'tidak hadir'}
                  </div>
                  <div className="countdown-label">
                    {el.ucapan}
                  </div>
                </div>
              </div>
            ))
          }
          </div>
          <div className="floral-separator">
            <img src={floralSeparator} alt="" />
          </div>
        </div>


        {// eslint-disable-next-line jsx-a11y/anchor-is-valid  
        (<a 
          href=""
          onClick={togglePause}
          className="btn btn-success"
          style={{ position: 'fixed', bottom: '7%', zIndex: 999, right: '1%' }}
          >
          {
            play ? 
            (<img src={muteIcon} alt="mute" style={{ width: '1em', fill: 'white', color: 'white'}} />) :
            (<img src={unmuteIcon} alt="unmute" style={{ width: '1em', fill: 'white', color: 'white'}} />)
          }
        </a>
        )}

        {// eslint-disable-next-line jsx-a11y/anchor-is-valid  
        (<a 
          href=""
          onClick={e => {
            e.preventDefault()
            hadiahRef.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
          }}
          className="btn btn-success d-flex align-items-center"
          style={{ position: 'fixed', right: '1%', zIndex: 999, top: '1%', fontSize: '1em' }}
          >
          <img src={giftboxIcon} alt="mute" style={{ width: '0.5em', fill: 'white', color: 'white'}} />
          <div className="ml-1 countdown-label" style={{ fontSize: '0.4em', fontWeight: 900 }}>
            BERI HADIAH
          </div>
        </a>
        )}


        <nav className="navbar bg-white shadow-lg" role="navigation" style={{ position: 'sticky', bottom: 0, zIndex: 999 }}>
          <div className="w-100 nav">
            <div className=" d-flex flex-row justify-content-around w-100">
              {
                tabs.map((tab, index) =>(
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <a 
                    key={index}
                    href=""
                    className="navbar-title text-decoration-none"
                    onClick={tab.action}
                    style={{
                      textDecoration: 'none',
                      backgroundColor: 'unset !important',
                      color: 'unset !important'
                    }}
                  >
                    <div className="row d-flex flex-column justify-content-center align-items-center">
                      <img src={tab.icon} alt="avatar"/>
                      <div className="text-decoration-none">{tab.label}</div>
                    </div>
                  </a>
                ))
              }
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;
