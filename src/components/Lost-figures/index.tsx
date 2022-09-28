import React, {FC} from 'react';
import {Colors} from "../../models/Colors";
import {Figure} from "../../models/figures/Figure";

interface LostFiguresProps {
  title: string;
  figures: Figure[]
}

const LostFigures: FC<LostFiguresProps> = ({title, figures}) => {
  return (
    <div className='lost'>
      <h3>{title}</h3>
      {figures.map(figure =>
        <div key={figure.id}>
          {figure.name} {figure.logo && <img className='lost-figure-logo' src={figure.logo} alt={figure.name}/>}
        </div>
      )}
    </div>
  );
};

export default LostFigures;