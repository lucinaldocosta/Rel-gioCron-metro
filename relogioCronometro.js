"use strict";
const horaRelogio = document.querySelector(".relogio_hora");
const minRelogio = document.querySelector(".relogio_min");
const segRelogio = document.querySelector(".relogio_seg");

const horaCronometro = document.querySelector(".cronometro_hora");
const minCronometro = document.querySelector(".cronometro_min");
const segCronometro = document.querySelector(".cronometro_seg");
const miliSegCronometro = document.querySelector(".cronometro_miliseg");
const iniciar = document.querySelector(".iniciar");
const parar = document.querySelector(".parar");
const restaurar = document.querySelector(".restaurar");

/*Relógio não se recomenda usar setInterval porque usa muito recursos, 
o recomendado é usar uma biblioteca especifica para fazer um relogio 
o para trabalhar com horários. */

const addZero = (n)=>{
    if(n.toString().length < 2) return "0".concat(n);
    return n;
}

const mostrarHorario = ()=>{
    const time = new Date();
    let hora = addZero(time.getHours());
    let min = addZero(time.getMinutes());
    let seg = addZero(time.getSeconds());
    horaRelogio.textContent = `${hora}:`;
    minRelogio.textContent = `${min}:`;
    segRelogio.textContent = `${seg}`;
}
mostrarHorario();
setInterval(mostrarHorario, 500);

/*------------------------------------------------------------------------------- */

// Cronômetro.

const addZeroCronometro = (n)=>{
    if(n.toString().length == 2) return "0".concat(n);
    return n;
}
let horaCrono = "00";
let minCrono = "00";
let segCrono = "00";
let miliSegCrono = "00";

function tempoAtual(){
    horaCronometro.textContent = addZeroCronometro(`${horaCrono}:`);
    minCronometro.textContent = addZeroCronometro(`${minCrono}:`);
    segCronometro.textContent = addZeroCronometro(`${segCrono}:`);
    miliSegCronometro.textContent = addZeroCronometro(`${miliSegCrono} `);
}
function iniciarContador(){
    tempoAtual();
    miliSegCrono++;
    if(miliSegCrono > 99){
        miliSegCrono = "00";
        segCrono++;
    }else if(segCrono >= 60){
        segCrono = "00";
        minCrono++;
    }else if(minCrono >= 60){
        minCrono = "00";
        horaCrono++;
    }else if(horaCrono >=24){
        horaCrono = "00";
    }
}
let contador = true;
iniciar.addEventListener("click", ()=>{
    if(contador){
        const myTime = setInterval(iniciarContador, 10);
        contador = false;

        parar.addEventListener("click", ()=>{
            clearInterval(myTime);
            tempoAtual();
            contador = true;
        });
        restaurar.addEventListener("click", ()=>{
            horaCrono = "00";
            minCrono = "00";
            segCrono = "00";
            miliSegCrono = "00"
            tempoAtual();
            clearInterval(myTime);
            contador = true;
        });
    }
});