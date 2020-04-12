import React from 'react';
import 'tachyons';
import './FaceRecognition.css';

const getBoxes = (boxes) => {
    console.log(boxes);
    return boxes.map( (box, i) => <div key={i} className='bounding-box' style={{top: box.top_row, right: box.right_col, bottom: box.bottom_row, left: box.left_col}}></div>)
}

const FaceRecognition = ({imgUrl, boxes}) => {
    return (
        <div className="center ma">
            <div className='absolute mt2'>
                <img id='inputimage' src={imgUrl} alt="" width='500px' height='auto'/>
                {
                    getBoxes(boxes)
                }
            </div>
        </div>
    )
}

export default FaceRecognition;