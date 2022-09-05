import React, {useRef, useState, useEffect, ReactDOM} from 'react';
import './style.css'

let cont = 0;
let section = 1;

export default function Corousel(){
    const cards = useRef([]); // UTILIZANDO A MESMA REFERÊNCIA PARA MULTIPLOS ELEMENTOS

    const myInterval = useRef(null);
    const [filmes, setFilmes] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);

    

    function nextSlide(event){
        console.log('NEXT');

        if(section == 0){ //SECTION 0 >>> SECTION 1
            cont = 0;
            section = 1;
            
        }else if(section == 1){ // SECTION 1 >>> SECTION 2
            cont = -1160;
            section = 2;
        }

        cards.current.forEach((el, ind)=>{
            el.style.transition = '0.3s';
            el.style.transform = `translateX(${cont}px)`; //POSITION SECTION 2
        });
    }

    function prevSlide(event){

        if(section == 2){ //SECTION 2 >>> 1
            cont = 0;
            section = 1;
        }else if(section == 1){ // SECTION 1 >>> SECTION 0
            cont = 1160;
            section = 0;
        }

        cards.current.forEach((el, ind)=>{
            el.style.transition = '0.3s';
            el.style.transform = `translateX(${cont}px)`; //POSITION SECTION 2
        });
    }

    /*function breakSlide(event){
        cancelAnimationFrame(myInterval.current);
    }*/

    return(
        <div>
            <div className='slideSections'>
                <span className='section section1'></span>
                <span className='section section2'></span>
                <span className='section section3'></span>
            </div>
        
            <div className='corousel'>

                <button 
                    className='btt bttPrev' 
                    onClick={(e)=>{
                        if(section == 0){
                            if(filmes[0] == '1'){
                                setFilmes(['5','6','7','8','9','10','11','12','1','2','3','4'])
                            }else if(filmes[0] == '5'){
                                setFilmes(['9','10','11','12','1','2','3','4','5','6','7','8'])
                            }else if(filmes[0] == '9'){
                                setFilmes(['1','2','3','4','5','6','7','8','9','10','11','12'])
                            }

                            cards.current.forEach((el, ind)=>{
                                el.style.transition = '0s';
                                el.style.transform = `translateX(-1160px)`; //POSITION SECTION 2
                            });

                            section = 2
                        }
                        
                        myInterval.current = requestAnimationFrame(prevSlide)
                    
                    }} 
                    onMouseUp={(e)=>cancelAnimationFrame(myInterval.current)}>PREV
                </button>

                {filmes.map((item, ind)=>{
                    // UTILIZANDO A MESMA REFERÊNCIA PARA MULTIPLOS ELEMENTOS
                    return <div key={ind} ref={(el)=>{cards.current[ind] = el}} className='card'>{item}</div>
                })}

                <button 
                    className='btt bttNext' 
                    onClick={(e)=>{
                        if(section == 2){
                            if(filmes[8] == '1'){ //filmes[8] == primeiro elemento da última seção
                                setFilmes(['1','2','3','4','5','6','7','8','9','10','11','12']);
                            }else if (filmes[8] == '5'){
                                setFilmes(['5','6','7','8','9','10','11','12','1','2','3','4']);
                            }else if (filmes[8] == '9'){
                                setFilmes(['9','10','11','12','1','2','3','4','5','6','7','8']);
                            }
                            
                            cards.current.forEach((el, ind)=>{
                                el.style.transition = '0s';
                                el.style.transform = `translateX(1160px)`; //POSITION SECTION 0
                            });

                            section = 0; 
                        }

                        myInterval.current = requestAnimationFrame(nextSlide)
                    }} 
                    onMouseUp={(e)=>cancelAnimationFrame(myInterval.current)}
                >NEXT
                </button>
            </div>

            <button onClick={(e)=>console.log(filmes)}>CLICK</button>

        </div>

        
    )
}