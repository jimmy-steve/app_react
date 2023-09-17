import React, { useState, useEffect } from 'react';
import BlackHeart from '../../../assets/img/black-heart.png';
import PinkHeart from '../../../assets//img/pink-heart.png';

export default function Heart(props) {

    const [animation, setAnimation] = useState(0)
    const toggle = props.toggle

    useEffect(() => {
        renderAnimations()
    }, [toggle])

    const renderHeart = () => {
        return toggle ? PinkHeart : BlackHeart
    }

    const renderAnimations = () => {
        return toggle ? setAnimation(1) : setAnimation(0)
    }

    return (
        <img
            className="heart"
            onClick={() => props.handleClick()}
            src={renderHeart()}
            animation={animation}
            alt="Heart" />
    )
}