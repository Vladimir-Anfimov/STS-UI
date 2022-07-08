import React from 'react'
import './PontajButtons.css'

interface ClickHandler {
    onClick: () => void
}

const StartWorkIcon : React.FC = () => <img className="ICON" src="https://img.icons8.com/dusk/64/000000/work-light.png"/>;

const PauzaIcon: React.FC = () => <img className="ICON" src="https://img.icons8.com/color/48/000000/relax.png" />

const IncheiePauzaIcon: React.FC = () => <img className="ICON" src="https://img.icons8.com/color/48/000000/stand-up.png" />

const IncheieProgramIcon: React.FC = () => <img className="ICON" src="https://img.icons8.com/officel/40/000000/home.png" />

export const BtnIncepeProgram: React.FC<ClickHandler> = ({ onClick }) => <button onClick={onClick} className="btn BTN-PROGRAM btn-primary btn-lg shadow"><StartWorkIcon /> Incepere program</button>

export const BtnIncepePauza: React.FC<ClickHandler> = ({ onClick }) => <button onClick={onClick} className="btn BTN-PROGRAM btn-primary btn-lg shadow "><PauzaIcon /> Incepere pauza</button>

export const BtnIncheiePauza: React.FC<ClickHandler> = ({ onClick }) => <button onClick={onClick} className="btn BTN-PROGRAM btn-secondary btn-lg shadow"><IncheiePauzaIcon /> Incheie pauza</button>

export const BtnIncheieProgram: React.FC<ClickHandler> = ({ onClick }) => <button onClick={onClick} className="btn BTN-PROGRAM btn-info btn-lg  shadow"><IncheieProgramIcon/> Incheie program</button>