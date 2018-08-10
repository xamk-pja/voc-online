import React from 'react';

// Get enum types for building types from schema

export const getLabelFor = (param, selected) => {
  var options = getTypesFor(param);

  console.log(options);
  for ( var i in options ) {
    if ( options[i].key === selected ) {
      return options[i].props.children;
    }
  }
  return null;
}

// If you've time, add these mappings to schema and figure out how to render these using react from mongoose..
export const getTypesFor = (paramType) => {
    let items = [];        
    

    if ( paramType === 'buildingType') {
      items.push((<option key='Koulu' value='Koulu'>Koulu</option>));
      items.push((<option key='Toimistorakennus' value='Toimistorakennus'>Toimistorakennus</option>));
      items.push((<option key='Sote-rakennus' value='Sote-rakennus'>Sote-rakennus</option>));
      items.push((<option key='Vanhainkoti' value='Vanhainkoti'>Vanhainkoti</option>));
      items.push((<option key='Kirjasto' value='Kirjasto'>Kirjasto</option>));
      items.push((<option key='Asuintalo' value='Asuintalo'>Asuintalo</option>));
      items.push((<option key='Muu' value='Muu'>Muu</option>));
    }

    else if ( paramType === 'buildingRunkorakenne' ) {
      items.push((<option key='Betoni' value='Betoni'>Betoni</option>));
      items.push((<option key='Tiili' value='Tiili'>Tiili</option>));
      items.push((<option key='Massiivihirsi' value='Massiivihirsi'>Massiivihirsi</option>));
      items.push((<option key='Puurunkotiiliverhous' value='Puurunkotiiliverhous'>Puurunko + tiiliverhous</option>));
      items.push((<option key='Puurunkopuuverhous' value='Puurunkopuuverhous'>Puurunko + puuverhous</option>));
      items.push((<option key='Kivi' value='Kivi'>Kivi</option>));
      items.push((<option key='Muu' value='Muu'>Muu</option>));
    } 

    else if (paramType === 'buildingAlapohja') {
      items.push((<option key='Rossipohja' value='Rossipohja'>Rossipohja</option>));
      items.push((<option key='Maavarainenlattia' value='Maavarainenlattia'>Maavarainen lattia</option>));
      items.push((<option key='Kellarikerros' value='Kellarikerros'>Kellarikerros</option>));
      items.push((<option key='Muu' value='Muu'>Muu</option>));
    }
    else if (paramType === 'buildingKatto') {
      items.push((<option key='Tasakatto' value='Tasakatto'>Tasakatto</option>));
      items.push((<option key='Harjakatto' value='Harjakatto'>Harjakatto</option>));
      items.push((<option key='Pulpettikatto' value='Pulpettikatto'>Pulpettikatto</option>));
      items.push((<option key='Mansardi' value='Mansardi'>Mansardi</option>));
      items.push((<option key='Muu' value='Muu'>Muu</option>));
    }
    else if (paramType === 'buildingIV') {
      items.push((<option key='Painovoimainen' value='Painovoimainen'>Painovoimainen</option>));
      items.push((<option key='Koneellinenpoisto' value='Koneellinenpoisto'>Koneellinen poisto</option>));
      items.push((<option key='Koneellinentulojapoisto' value='Koneellinentulojapoisto'>Koneellinen tulo ja poisto</option>));
      items.push((<option key='Jaahdytys' value='Jaahdytys'>Jäähdytys</option>));
    }
    else if (paramType === 'buildingLammitys') {
      items.push((<option key='Kaukolampo' value='Kaukolampo'>Kaukolampö</option>));
      items.push((<option key='Oljylammitys' value='Oljylammitys'>Öljylämmitys</option>));
      items.push((<option key='Sahkolammitys' value='Sahkolammitys'>Sähkölämmitys</option>));
      items.push((<option key='Lampopumput' value='Lampopumput'>Lämpöpumput</option>));
      items.push((<option key='Maalampo' value='Maalampo'>Maalämpö</option>));
      items.push((<option key='Muu' value='Muu'>Muu</option>));
    }
    else if (paramType === 'buildingKerrosluku') {
      items.push((<option key='1' value='1'>1</option>));
      items.push((<option key='2' value='2'>2</option>));
      items.push((<option key='3' value='3'>3</option>));
      items.push((<option key='4' value='4'>4</option>));
      items.push((<option key='5' value='5'>5</option>));
      items.push((<option key='6' value='6'>6</option>));
      items.push((<option key='7' value='7'>7</option>));
      items.push((<option key='8' value='8'>8</option>));
      items.push((<option key='9' value='9'>9</option>));
      items.push((<option key='10' value='10'>10</option>));
    }
    else if (paramType === 'buildingLattia') {
      items.push((<option key='Muovimatto' value='Muovimatto'>Muovimatto</option>));
      items.push((<option key='Linoleum' value='Linoleum'>Linoleum</option>));
      items.push((<option key='Betoni' value='Betoni'>Betoni</option>));
      items.push((<option key='Puu' value='Puu'>Puu</option>));
      items.push((<option key='Laminaatti' value='Laminaatti'>Laminaatti</option>));
      items.push((<option key='Muu' value='Muu'>Muu</option>));
    }
    else if (paramType === 'buildingKatto') {
      items.push((<option key='Akustolevy' value='Akustolevy'>Akustolevy</option>));
      items.push((<option key='MDF' value='MDF'>MDF</option>));
      items.push((<option key='Betoni' value='Betoni'>Betoni</option>));
      items.push((<option key='Levy' value='Levy'>Levy</option>));
      items.push((<option key='Puu' value='Puu'>Puu</option>));
      items.push((<option key='Muu' value='Muu'>Muu</option>));
    }
    else if (paramType === 'buildingSeinät') {
      items.push((<option key='Betoni' value='Betoni'>Betoni</option>));
      items.push((<option key='Kipsilevy' value='Kipsilevy'>Kipsilevy</option>));
      items.push((<option key='Laatta' value='Laatta'>Laatta</option>));
      items.push((<option key='Hirsi' value='Hirsi'>Hirsi</option>));
      items.push((<option key='Lastulevy' value='Lastulevy'>Lastulevy</option>));
      items.push((<option key='Puu' value='Puu'>Puu</option>));
      items.push((<option key='Muu' value='Muu'>Muu</option>));

    }
    else if (paramType === 'usedMetrics') {
      items.push((<option key='Andersen' value='Andersen'>Andersen</option>));
      items.push((<option key='TSIAirflowJaPID' value='TSIAirflowJaPID'>TSI Airflow ja PID</option>));
      items.push((<option key='GCIMS' value='GCIMS'>GC-IMS</option>));
      items.push((<option key='GDUMultisens' value='GDUMultisens'>GDU Multisens</option>));
      items.push((<option key='Wainu' value='Wainu'>Wainu</option>));
      items.push((<option key='TSIDusttrak' value='TSIDusttrak'>TSI Dusttrak</option>));
      items.push((<option key='TrotecBZ30' value='TrotecBZ30'>Trotec BZ30</option>));
      items.push((<option key='ISO16000-6' value='ISO16000-6'>Standardi ISO 16000-6 (VOC-analyysi)</option>));

    }

    // Dynamic loop for accessing props
    // for (let i = 0; i <= this.props.maxValue; i++) {             
    //      items.push(<option key={i} value={i}>{i}</option>);   
    //      //here I will be creating my options dynamically based on
    //      //what props are currently passed to the parent component
    // }
    return items;
  }  
  