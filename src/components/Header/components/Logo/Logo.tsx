import React from 'react';
import LogoImage from '../../../../assets/LogoImg.jpg';

const Logo = (): JSX.Element => {
	return <img src={LogoImage} alt='Imagen de logo' className='w-12' />;
};

export default Logo;
