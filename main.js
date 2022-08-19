const $datos = document.getElementById("contenedor__datos")
const $formulario = document.getElementById("formulario")
const $nombreCiudad = document.getElementById("ciudad");
const $nombrePais = document.getElementById("pais");


$formulario.addEventListener("submit",(e) =>{
e.preventDefault();
 
if($nombrePais.value === ''||$nombreCiudad.value === '')
{
  mostrarError("Ambos campos requeridos")
  return;
}

  callApi($nombrePais.value, $nombreCiudad.value);

});

function callApi(pais,ciudad){
  const apiKey = "a34b56af87188d9db6897e6e79444c92"; 
  const Apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
  fetch(Apiurl).then((data) =>{
    return data.json();
  })
  .then((dataJson) =>{
    console.log(dataJson);
    if(dataJson.cod === "404"){
      mostrarError("Ciudad no encontrada ...");
    }else{
      limpiar()
      mostrarClima(dataJson);
    }
  })
  .catch((err) =>{
    console.log(err);
  })
}
function mostrarClima(data){
  const{
    name,
    main: {temp,temp_min,temp_max},
    weather: [arr],
  } = data;

  const centigrados= kelvinCentigrados(temp);
  const centigrados_max= kelvinCentigrados(temp_max);
  const centigrados_min= kelvinCentigrados(temp_min);

  const contenido = document.createElement("div");
  contenido.innerHTML=`
  <h3> Clima en ${name}</h3>
  <img src= "http://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icono">
  <h2>${centigrados} &#x2103;</h2>
  <p> Max : ${centigrados_max} &#x2103;</p>
  <p> Min : ${centigrados_min} &#x2103;</p>
  `;
  $datos.appendChild(contenido);
}

function mostrarError(mensaje){
  const alerta=document.createElement('p')
  alerta.classList.add('mensales_alerta')
  alerta.innerHTML= mensaje;

  $formulario.appendChild(alerta)
  setTimeout(() =>{
    alerta.remove();
  },2000);
}
function kelvinCentigrados(temp){
  return parseInt(temp-273.15);
}
function limpiar(){
  $datos.innerHTML=" "
}
