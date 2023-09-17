import React, {useState, useEffect} from "react";
import LeftBar from "./LeftBar";
import Ozzy from "../../../assets/mp3/ozzy-musique.mp3";
import ImgCadre from "../../../assets/img/cadre.png";
import ImgUser from "../../../assets/img/user1.png";
const BottomSidebar = (props) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isPlaying, setIsPlaying] = useState(false); // État de lecture de la musique
    const audioRef = React.createRef(); // Créez une référence pour l'élément audio
    const [isAnimating, setIsAnimating] = useState(false); // État de l'animation

    // Utilise useEffect pour mettre à jour l'heure toutes les secondes
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Nettoyage de l'intervalle lorsque le composant est démonté
        return () => clearInterval(intervalId);
    }, []);
    // Fonction pour démarrer la musique
    const playMusic = () => {
        // Démarrer la musique en utilisant la référence audio
        audioRef.current.play();
        setIsPlaying(true);
        setIsAnimating(true);
    };

    // Fonction pour arrêter la musique
    const stopMusic = () => {
        // Arrêter la musique en utilisant la référence audio
        audioRef.current.pause();
        setIsPlaying(false);
        setIsAnimating(false);
    };

    // Gestionnaire d'événement pour la switch
    const handleSwitchChange = () => {
        if (!isPlaying) {
            playMusic();
        } else {
            stopMusic();
        }
    };

    return (
        <>
            <div className="container-fluid mb-2 mt-2">
                <div className="row ">
                    <div className={`col container-card-user mx-auto ${isAnimating ? 'move-animation' : ''}`}>
                        <img src={ImgCadre} alt="Cadre" className="img-cadre img-fluid"/>
                        <img src={ImgUser} alt="Cadre" className="img-user img-fluid"/>
                    </div>
                </div>
            </div>
            <nav>
                <LeftBar/>
            </nav>
            <div className="container">
                <div className="row">
                    <div className="mt-2 card">
                        <div className="div-hours mt-2">
                            <h5 className="text-center"><span
                                className="badge bg-secondary">{currentTime.toLocaleTimeString()}</span></h5>
                        </div>

                        <div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckDefault"
                                    onChange={handleSwitchChange}
                                    checked={isPlaying}
                                />
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                                    Play Music
                                </label>
                            </div>
                        </div>

                        <audio ref={audioRef} controls>
                            <source src={Ozzy} type="audio/mpeg"/>
                        </audio>

                    </div>
                </div>
            </div>
        </>
    );
};

export default BottomSidebar;
