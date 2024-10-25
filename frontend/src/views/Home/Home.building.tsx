import React from 'react';
import Image from 'next/legacy/image';
// import { BuildingArea } from '../../../styles/pages/building';
import { NextPage } from 'next';

import logo from '../../assets/img/logo.png';

const Building: NextPage = () => (
  <>
    {/* <BuildingArea> */}
    <Image
      src={logo} // Route of the image file
      height={171} // Desired size with correct aspect ratio
      width={482} // Desired size with correct aspect ratio
      alt='Logo'
    />
    <br />
    <div>
      Em breve um novo lugar para você divulgar o seu talento!
      <br />
      Aguarde!
    </div>

    {/* </BuildingArea> */}
  </>
);

export default Building;
