import imgSrc from "../assets/imeges/deep_blue_1.jpg";
import imgSrc2 from "../assets/imeges/deep_blue_2.jpg";
import imgSrc3 from "../assets/imeges/deep_blue_3.jpg";

import db1 from "../assets/music/zapsplat_pack/lukas_tvrdon_Bubbles.mp3";
import db2 from "../assets/music/zapsplat_pack/lukas_tvrdon.mp3";
import db3 from "../assets/music/zapsplat_pack/lukas_tvrdon_Otherworld.mp3";

let initialState = {
    songs: [
        {
            title: "Bubbles Lapp",
            artist: "ZapSplat",
            audioSrc: db1,
            image: imgSrc,
            id: 0
        },
        {
            title: "Otherworld Flat Ghostly",
            artist: "ZapSplat",
            audioSrc: db2,
            image: imgSrc2,
            id: 1
        },
        {
            title: "Otherworld Flat Nether",
            artist: "ZapSplat",
            audioSrc: db3,
            image: imgSrc3,
            id: 2
        }
    ]
}

const musicPage = (state = initialState, action) => {
    switch(action.type){

        default: return state;
    }
}

export default musicPage;