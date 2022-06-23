import React, { useState, useEffect, useRef } from 'react';
import AudioControl from './AudioControl/AudioControl';
import s from './Music.module.css';
import cn from 'classnames';

import Play from '../../assets/imeges/play.png';
import Pause from '../../assets/imeges/Stop.png';

const Music = (props) => {
    //Плеер на основе статьи: https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
    //state
    const [nowSong, SetNowSong] = useState(0); //текущий номер песни из массива
    const [trackProgress, setTrackProgress] = useState(0); //прогресс песни
    const [isPlaying, setIsPlaying] = useState(false); //Играет ли песня

    //деструкторизация данных с store.state.music.songs
    let { title, artist, audioSrc, image, id } = props.songs[nowSong];

    //Refs
    const audioRef = useRef(new Audio(audioSrc));
    const intervalRef = useRef(); //ссылка для setInterval
    const isReady = useRef(false); //готовность выполнения кого-то действия

    // Destructure for conciseness
    const { duration } = audioRef.current;

    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                toNextTrack();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000]); //считываем значение каждую секунду
    }

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play(); //включение песни
            startTimer();
        } else {
            clearInterval(intervalRef.current);
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        audioRef.current.pause();

        audioRef.current = new Audio(audioSrc);
        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            isReady.current = true;
        }

    }, [nowSong]); //при переключении песни

    useEffect(() => {
        //остановка песни и отчитска интервала
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }
    }, []);

    const toPrevTrack = () => { //для переключения на прошлый трек
        if (nowSong - 1 < 0) {
            SetNowSong(props.songs.length - 1); //переходим на последнюю песню в списке
        } else {
            SetNowSong(nowSong - 1);//переходим на предыдушую песню
        }
    }
    const toNextTrack = () => { //для переключения на следующий трек
        if (nowSong < props.songs.length - 1) {
            SetNowSong(nowSong + 1);//переход на следующию песню
        } else {
            SetNowSong(0);//переход на первую песню в списке
        }
    }

    const onScrub = (value) => {
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    }

    const onScrubEnd = () => {
        if (isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    }

    const timeScale = (time, maxTime) => {
        time = time - time % 1; //избавляемся от долей секунд
        maxTime = maxTime - maxTime % 1; //избавляемся от долей секунд

        let hours = 0; //считаем колличество часов
        for (let j = 0; maxTime > 3600; j++) {
            hours++;
            maxTime = maxTime - 3600;
        }
        let minutes = 0;//считаем количество минут
        for (let i = 0; maxTime > 60; i++) {
            minutes++;
            maxTime = maxTime - 60;
        }

        let result = '';//Выводимый таймер 
        if (hours > 0) {
            result = `${hours}:${minutes}:${(maxTime - time) < 10 ? '0' : ''}${maxTime - time}`;
        } else {
            result = `${minutes}:${(maxTime - time) < 10 ? '0' : ''}${maxTime - time}`;
        }

        return result;
    }

    let songElement = props.songs.map((el) => {
        return <div key={el.id} className={cn(s.song_element)}
            onClick={() => {
                setIsPlaying(!isPlaying);
                if (nowSong != el.id) {
                    SetNowSong(el.id);
                }
            }}>
            <div className={cn(s.song_element__audio, { [s.song_element__play]: (nowSong == el.id) })}>
                <div className={s.audio_ava}>
                    <img src={el.image} />
                </div>
                <div className={s.audio_title}>
                    <p>{el.title ? el.title : 'Undefined'}</p>
                    <p>{el.artist ? el.artist : 'Undefined'}</p>
                </div>
                <div className={s.audio_time}>
                    <span>
                        {trackProgress
                            ? nowSong == el.id
                                ? (timeScale(trackProgress, duration))
                                : (timeScale(0, duration))
                            : '0:00'}
                    </span>
                </div>
            </div>
            <div className={cn(s.song_element__control__eny)}>
                <div className={cn(s.song_element__control)} >
                    {isPlaying == true
                        ? nowSong == el.id ? <img src={Pause} /> : <img src={Play} />
                        : <img src={Play} />}
                </div>
            </div>
        </div>
    })

    return (
        <div className={s.audioPlayer}>
            <div className={s.audioPlayer_box}>
                <div className={s.audioPlayer_box__track_info}>
                    <img
                        className={s.track_info__avatar}
                        src={image}
                        alt={`track artwork for ${title ? title : 'Undefined'} by ${artist ? artist : 'Undefined'}`}
                    />
                    <div className={s.track_info__song_title}>
                        <p className={s.track_info__title}>{title ? title : 'Undefined'}</p>
                        <p className={s.track_info__artist}>{artist ? artist : 'Undefined'}</p>
                    </div>
                    <div className={s.track_info__range}>
                        <input
                            type='range'
                            value={trackProgress}
                            step='1'
                            min='0'
                            max={duration ? duration : `${duration}`}
                            onChange={(e) => onScrub(e.target.value)}
                            onMouseUp={onScrubEnd}
                            onKeyUp={onScrubEnd}
                        />

                    </div>
                    <div className={s.track_info__time}>
                        <span>{trackProgress ? (timeScale(trackProgress, duration)) : '0:00'}</span>
                    </div>
                    <div className={s.track_info__control}>
                        <AudioControl
                            isPlaying={isPlaying}
                            toPrevTrack={toPrevTrack}
                            toNextTrack={toNextTrack}
                            toPause={setIsPlaying}
                        />
                    </div>
                </div>
            </div>
            <div className={s.audioPlayer__another_songs}>
                {songElement}
            </div>
        </div>
    );
}

export default Music;